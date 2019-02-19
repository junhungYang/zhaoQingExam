<template>
    <div class="popup-wrap" :class="{noFixed: noFixed}" :id="id">
        <transition name="popup-mask-fade" >
            <div class="popup-mask" v-show="show && isMaskShow" @click="close()" :style="!isMaskShow ? { backgroundColor: 'transparent'} : ''"></div>
        </transition>
        <transition :name="'popup-' + position" >
            <div  class="popup-content fixed" :class="'popup-' + position" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            value: Boolean, // 隐藏,显示
            isMaskShow: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: 'center'
            },
            noFixed: {  // 非fixed 布局
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                show: false,
                id: 0,
                scrollEl: {     // 需滚动的元素
                    el: {},
                    maxScroll: 0,
                    posY: 0,
                    targetIsChild: false
                }
            }
        },
        watch: {
            value: function (val) {
                this.show = val
                this.setScrollable(!val)
            }
        },
        methods: {
            close: function () {
                this.$emit('close')
            },
            touchmove: function (event) {
                var sel = this.scrollEl
                if (typeof sel.el === 'undefined') {
                    this.touchmove = function (event) {
                        event.preventDefault()
                    }
                    return this.touchmove(event)
                }
                if (!sel.targetIsChild) {
                    event.preventDefault()
                    return
                }
                var e = event.touches[0] || event
                var distanceY = e.pageY - sel.posY
                sel.posY = e.pageY
                if (distanceY > 0 && sel.el.scrollTop === 0) {   // 滚动到顶部
                    event.preventDefault()
                    return
                }
                if (distanceY < 0 && (sel.el.scrollTop + 1 >= sel.maxScroll)) { // 滚动到底部
                    event.preventDefault()
                }
            },
            touchstart: function (event) {
                var sel = this.scrollEl
                if (typeof sel.el === 'undefined') {
                    this.touchstart = function () {}
                    return this.touchstart()
                }
                var e = event.touches[0] || event
                sel.posY = e.pageY

                // 判断是否属于滚动元素子元素或滚动元素本身
                sel.targetIsChild = false
                var obj = event.target
                while (!hasClass(obj, 'popup-content')) {
                    if (obj === sel.el) {
                        sel.targetIsChild = 1
                        break
                    }
                    obj = obj.parentNode
                }
            },
            setScrollable (bool) {
                if (!bool) {
                    var sel = this.scrollEl
                    if (sel.el) {
                        this.$nextTick(() => {
                            sel.maxScroll = sel.el.scrollHeight - sel.el.offsetHeight
                        })
                    }
                    this.$nextTick(() => {
                        if (document.getElementById(this.id)) {
                            document.getElementById(this.id).getElementsByClassName('popup-content')[0].addEventListener('touchmove', this.touchmove, false)
                            document.getElementById(this.id).getElementsByClassName('popup-content')[0].addEventListener('touchstart', this.touchstart, false)
                        }
                    })
                } else {
                    if (document.getElementById(this.id)) {
                        document.getElementById(this.id).getElementsByClassName('popup-content')[0].removeEventListener('touchmove', this.touchmove, false)
                        document.getElementById(this.id).getElementsByClassName('popup-content')[0].removeEventListener('touchstart', this.touchstart, false)
                    }
                }

                if (!bool) {
                    document.querySelector('html').style.overflow = 'hidden'
                    document.querySelector('body').style.overflow = 'hidden'
                } else {
                    document.body.style.overflow = ''
                    document.querySelector('html').style.overflow = ''
                }
            }
        },
        mounted: function () {
            if (this.value) {
                this.show = true
                this.setScrollable(false)
            }
            if (typeof window.popupId === 'undefined') {
                window.popupId = 0
            }
            this.id = 'popupId_' + popupId++
            this.$nextTick(() => {
                if (document.getElementById(this.id)) {
                    this.scrollEl.el = document.getElementById(this.id).getElementsByClassName('scrollable')[0]
                    document.querySelector('#' + this.id + ' .popup-mask').addEventListener('touchmove', function (e) {
                        e.preventDefault()
                    }, false)
                }
            })
        },
        destroyed () {
            this.setScrollable(true)
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

    /* popup-wrap */
    .popup-wrap{
        position: fixed;
        z-index: 101;
        max-width: inherit;
        width: 100%;
        margin: 0 auto;
        color: inherit;
    }
    .popup-wrap.noFixed {
        position: relative;
        z-index: 0;
    }

    .popup-mask{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        background:rgba(0,0,0,0.2);
        opacity: 1;
        transition: opacity .3s;
    }
    .popup-mask-fade-enter-active,
    .popup-mask-fade-leave-active {
        opacity: 1;
    }
    .popup-mask-fade-enter,
    .popup-mask-fade-leave-active{
        opacity: 0;
    }
    .popup-content {
        position: fixed;
        z-index: 103;
        max-width: inherit;
        opacity: 1;
        transition-duration: .3s;
        transition-property: transform,-webkit-transform;
    }
    .noFixed .popup-content {
        position: relative;
    }
    .popup-bottom {
        bottom: 0;
        width: 100%;
    }
    .popup-top {
        top: 0;
        width: 100%;
    }
    .popup-left {
        left: 0;
        height: 100%;
        top: 0;
    }
    .popup-right {
        right: 0;
        height: 100%;
        top: 0;
    }
    .popup-center {
        top: 45%;
        left: 50%;
        opacity: 1;
        -webkit-transform: translate3d(-50%, -60%, 0);
        transform: translate3d(-50%, -60%, 0);
        transition-duration: .3s;
        transition-property: opacity;
    }
    .popup-bottom-enter,
    .popup-bottom-leave-active{
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
    }
    .popup-top-enter,
    .popup-top-leave-active{
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }
    .popup-right-enter,
    .popup-right-leave-active{
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }
    .popup-left-enter,
    .popup-left-leave-active{
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
    .popup-center-enter,
    .popup-center-leave-active{
        opacity: 0;
    }
</style>
