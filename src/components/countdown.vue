<template>
    <span>
        <slot :remain-time-str="remainTimeStr" :now-remain-sec="nowRemainSec">{{remainTimeStr}}</slot>
    </span>
</template>
<script>
    export default {
        /**
         *  remainSec 倒计时秒数
         *  intervalStep 循环秒数
         *  specificRemainSec 定时剩余秒数
         *  pause 暂停
         *  ifShowHour 是否显示小时
         */
        props: {
            remainSec: {
                type: Number,
                required: true
            },
            intervalStep: {
                type: Number
            },
            specificRemainSec: {
                type: Number
            },
            pause: {
                type: Boolean,
                default: false
            },
            ifShowHour: {
                type: Boolean
            }
        },
        data: function () {
            /**
             * @property {number} originRemainSec
             * @property {number} nowRemainSec
             * @property {object} interval  func: 循环执行函数，step: 循环秒数
             * @property {object} specificTimer 定时器  func: 执行函数，remainSeconds: 条件-剩余秒数
             */
            return {
                originRemainSec: 0,
                nowRemainSec: 0,
                timerId: 0,
                remainTimeStr: '',
                running: false
            }
        },
        watch: {
            remainSec: function (val) {
                this.originRemainSec = val
                this.nowRemainSec = val
                this.remainSec > 0 && !this.pause && this.start()
            },
            nowRemainSec: function (val) {
                this.remainTimeStr = this.timeToStr(this.nowRemainSec, this.ifShowHour)
            },
            pause: function (val) {
                if (val) {
                    clearTimeout(this.timerId)
                    this.running = false
                }
            }
        },
        methods: {
            /**
             * 将秒数 转 00:00:00 格式字符串
             * @param {number} seconds
             * @param {boolean} ifHour - 第二个参数，是否显示小时，默认自动根据小时是否大于0决定。
             * @returns {string}
             */
            timeToStr: function (seconds) {
                var ifHourStr = typeof arguments[1] === 'boolean' ? arguments[1] : 'auto'
                if (typeof parseInt(seconds) !== 'number' || parseInt(seconds) < 0) {
                    console.log('error in CountDown.timeToStr: seconds is not a valid number')
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
            },
            start: function () {
                if (this.running) {
                    return
                }
                this.running = true
                var This = this
                var step = this.intervalStep
                var timerFunc = function () {
                    This.timerId = setTimeout(function () {
                        if (This.nowRemainSec > 0) {
                            This.nowRemainSec--
                            timerFunc()
                            This.specificRemainSec && This.specificRemainSec === This.nowRemainSec && This.$emit('specific')
                            if (step) {
                                if (step > 1) {
                                    step--
                                } else {
                                    step = This.intervalStep
                                    This.$emit('interval')
                                }
                            }
                        } else {
                            This.$emit('end')
                        }
                    }, 1000)
                }
                timerFunc()
            }
        },
        created: function () {
            if (this.remainSec > 0) {
                this.originRemainSec = this.remainSec
                this.nowRemainSec = this.remainSec
            }
        },
        mounted: function () {
            this.remainSec > 0 && !this.pause && this.start()
        },
        destroyed () {
            clearTimeout(this.timer)
        }
    }
</script>
