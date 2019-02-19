<template>
    <div class="toast-wrap" :id="id">
         <div class="mask_transparent" v-show="isShowMask && show" @click="show = false"></div>
        <transition :name="transition">
            <div class="toast-content" v-show="show">
                <p class="toast-text" v-if="text" v-html="text"></p>
                <slot v-else></slot>
                </div>
            </transition>
        </div>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            time: {
                type: Number,
                default: 1000
            },
            transition: {
                type: String,
                default: 'toast-fade'
            },
            text: String,
            isShowMask: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                show: false,
                id: ''
            }
        },
        watch: {
            show: function (val) {
                if (val) {
                    var This = this
                    document.getElementById(this.id).style.zIndex = window.toastZindex++
                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(function () {
                        This.show = false
                    }, This.time)
                } else {
                    this.$emit('on-hide')
                }
            },
            value: function (val) {
                this.show = val
            }
        },
        created: function () {
            if (this.value) {
                this.show = true
            }
        },
        mounted: function () {
            if (typeof window.toastId === 'undefined') {
                window.toastId = 0 // 控制toast z-index
                window.toastZindex = 5000
            }
            this.id = 'toastId_' + toastId++
            var num = 1
            var str = 'toast_' + num
            while (document.getElementById(str)) {
                num++
                str = 'toast_' + num
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .toast-wrap {
        position: fixed;
        z-index: 5000;
    }
    .mask_transparent {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .toast-content {
        position: fixed;
        top: 30%;
        left: 50%;
        z-index: 2000;
        display: block;
        background: rgba(0,0,0,0.4);
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        padding: 3rem 2rem;
        border-radius: 0.6rem;
        opacity: 1;
        white-space: nowrap;
    }
    .toast-text {
        color: #fff;
        font-size: 1.6rem;
        text-align: center;
    }
    .toast-fade-enter-active,
    .toast-fade-leave-active {
        opacity: 1;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear;
    }
    .toast-fade-enter, .toast-fade-leave-active{
        opacity: 0;
    }

</style>
