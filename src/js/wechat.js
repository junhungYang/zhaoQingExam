import base from './base'
import Cookie from 'js-cookie'
let wechat = {
    payParam: {
        appid: Cookie.get('appid'),
        timeStamp: '',
        nonceStr: '',
        package: '',
        signType: '',
        paySign: '',
        orderCode: '' // 订单号
    },
    authCode: base.getUrlQuery('code'),
    // openid: Cookie.get('openid'),
    // openid: 'oom5uwWs4kRQQkZ8z_8E9TLtLX0s',
    openid: process.env.NODE_ENV == 'production'
        ? Cookie.get('openid')
        : 'oom5uwWs4kRQQkZ8z_8E9TLtLX0s',
    appid: Cookie.get('appid'),
    accessToken: '',
    isWechat () {
        let ua = navigator.userAgent.toLowerCase()
        return Boolean(ua.match(/MicroMessenger/i))
    },
    getAppid (callback) {
        if (this.appid) {
            return
        }
        base.ajax({
            url: 'common/weChat/getAppId',
            success: (data) => {
                this.payParam.appid = data.appId
                Cookie.set('appid', data.appId)
                callback()
            }
        })
    },
    /**
     * 重定向至 获取微信验证授权的url 并 重定向至reUrl，reUrl带code
     * reUrl默认为当前页
     * @param reUrl
     */
    wechatAuth (reUrl) {
        if (this.authCode) {
            return
        }
        let redirect = () => {
            let currentUrl = encodeURIComponent(reUrl ? reUrl : window.location.href);
            // let currentUrl = encodeURIComponent('http://16535j5e29.51mypc.cn/anlianExam/mobile/index.html#/signUp');
            let getCodeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.payParam.appid +
                '&redirect_uri=' + currentUrl +
                '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
            window.location = getCodeUrl;
        }
        if (this.payParam.appid) {
            redirect()
        } else {
            this.getAppid(redirect)
        }
    },
    getOpenid (cb) {
        if (this.openid) {
            cb && cb()
            return
        }
        this.wechatAuth()
        base.ajax({
            url: 'common/weChat/getOpenid',
            data: {
                code: this.authCode
            },
            success: (data) => {
                this.openid = data.openid
                Cookie.set('openid', data.openid)
                this.accessToken = data.accessToken
                Cookie.set('accessToken', data.accessToken)
                cb && cb()
            }
        })
    },
    paySubmit ({success, error}) {
        var This = this
        wx.chooseWXPay({
            timestamp: This.payParam.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: This.payParam.nonceStr, // 支付签名随机串，不长于 32 位
            package: This.payParam.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: This.payParam.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: This.payParam.paySign, // 支付签名
            success: function (res) {
                if (res.errMsg == 'chooseWXPay:ok') {
                    success && success()
                }
            },
            fail: function () {
                error && error()
            },
            cancel: function () {
                error && error()
            }
        })
    },
    deleteOrder (orderCode, cb) {
        base.ajax({
            url: 'common/signUp/cancelPayMent',
            data: {
                orderCode: orderCode
            },
            success: () => {
                cb && cb()
            }
        })
    },
    /**
     *
     * @param jsApiList 需要使用的JS接口列表
     * @param ready config完毕后的回调
     * @param error config出错后的回调
     */
    setWxConfig ({jsApiList, ready, error}) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.payParam.appId, // 必填，公众号的唯一标识
            timestamp: this.payParam.timeStamp, // 必填，生成签名的时间戳
            nonceStr: this.payParam.nonceStr, // 必填，生成签名的随机串
            signature: this.payParam.paySign,// 必填，签名，见附录1
            // jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            jsApiList: jsApiList
        })
        ready && wx.ready(ready)
        error && wx.fail()
    }
}
export default wechat
