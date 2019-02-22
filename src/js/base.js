import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'
let base = {
    url: process.env.NODE_ENV == 'production'
        ? 'http://zqjtjx.yukedaonline.com/zqjtjx/'
        : 'http://192.168.1.26:8081/xingyuan/',
    error: {
        status: '',
        message: ''
    },
    getUrlQuery: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return (r[2])
        return ''
    },
    ajax: function (json) {
        // console.log(json);
        var conf = {
            url: this.url + json.url,
            method: json.method || 'post',
            params: json.params || null,
            data: json.data || null
        }
        conf.data = qs.stringify(conf.data)
        axios(conf)
            .then((res) => {
                // console.log(res);
                var code = res.data
                if (this.resolve(code)) {
                    json.success && json.success(code.data)
                } else {
                    if (json.error) {
                        !json.error(this.error) && this.errorHandler(this.error)
                    } else {
                        this.errorHandler(this.error)
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
    resolve: function (code) {
        if (code.status == 300) {
            return true
        } else {
            this.error.status = code.status
            this.error.message = code.message
            return false
        }
    },
    errorHandler (error) {
        switch (error.status) {
            case 103: // 登录过期
                // alert(error.message)

                store.commit('showConfirm', {text: this.error.message, ok: () => {
                    router.replace('/login')
                }})
                store.commit('clearLoginInfo')
                break
            case 100:
            case 101:
            case 104:
            case 202:
            case 303:
            case 304:
            case 305:
            case 306:
            case 308:
            case 406:
                break
            default:
                // alert(this.error.message)
                store.commit('showConfirm', {text: this.error.message})
        }
    }
}


/**
 * 将秒数 转 00:00:00 格式字符串
 * @param {number} seconds
 * @param {boolean} ifHour - 第二个参数，是否显示小时，默认自动根据小时是否大于0决定。
 * @returns {string}
 */
function timeToStr (seconds) {
    var ifHourStr = typeof arguments[1] === 'boolean' ? arguments[1] : 'auto'
    if (typeof parseInt(seconds) !== 'number' || parseInt(seconds) < 0) {
        // console.log('error in CountDown.timeToStr: seconds is not a valid number')
        return ''
    }
    var formatNumber = function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    var sec = formatNumber(Math.floor(seconds % 60))
    var min = formatNumber(Math.floor(seconds / 60 % 60))
    var hour = formatNumber(Math.floor(seconds / 3600))

    if (ifHourStr === true || (seconds >= 3600 && ifHourStr === 'auto')) {
        return hour + ':' + min + ':' + sec
    } else {
        return formatNumber(Math.floor(seconds / 60)) + ':' + sec
    }
}
/**
 * 解决输入文本框获取焦点后，输入法影响fixed布局问题
 * 元素需添加fixed类名
 */
function resolveFixed () {
    let timer
    document.querySelectorAll('input[type=text], textarea').forEach((el) => {
        el.addEventListener('focus', () => {
            clearTimeout(timer)
            document.getElementsByClassName('fixed').forEach((el2)=>{
                el2.style.top = el2.offsetTop + 'px'
            })
        })
    })
    document.querySelectorAll('input[type=text], textarea').forEach((el) => {
        el.addEventListener('blur', () => {
            timer = setTimeout(() => {  // 延迟是等待输入法消失
                document.getElementsByClassName('fixed').forEach((el2)=>{
                    el2.style.top = ''
                })
            }, 200)
        })
    })
}
/**
 * 查找符合选择器条件的最近祖先元素
 * @param el 子元素
 * @param str 选择器
 * @returns {*} html元素或者false
 */
function getParent (el, query) {
    let parent = el.parentNode,
        slt = document.querySelectorAll(query),
        target
    while (parent.tagName.toLowerCase() != 'body'){
        for (let i = 0;i < slt.length;i++) {
            if (parent == slt[i]) {
                target = slt[i]
                return target
            }
        }
        parent = parent.parentNode
    }
    return false
}

export {timeToStr, resolveFixed}
export default base