<template>
    <popup-comp position="center" v-model="value" @close="emit('close')">
        <div class="confirm-wrap">
            <div class="confirm-content" :style="{width: width}" v-if="text">{{text}}</div>
            <slot v-else></slot>
            <div class="btnBox">
                <a v-if="cancelText" @click="emit('close')" class="cancelBtn" :class="cancelBtnCls">{{cancelText}}</a>
                <a v-if="okText" @click="emit('ok')" class="okBtn" :class="okBtnCls">{{okText}}</a>
            </div>
        </div>
    </popup-comp>
</template>

<script>
    import popupComp from './popupComp.vue'
    export default {
        props: {
            value: Boolean,
            text: String,
            cancelText: {
                type: String,
                default: '取消'
            },
            okText: {
                type: String,
                default: '确定'
            },
            width: {
                type: String
            },
            okBtnCls: {
                type: String
            },
            cancelBtnCls: {
                type: String
            }
        },
        methods: {
            emit: function (event) {
                this.$emit(event)
            }
        },
        components: {
            popupComp: popupComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .confirm-wrap {
        background: #fff;
        border-radius: 1rem;
        overflow: hidden;
        color: inherit;
    }
    .confirm-content {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        font-size: 1.6rem;
        text-align: center;
        padding: 1.2rem 2rem;
        width: 22rem;
        min-height: 6.5rem;
        box-sizing: border-box;
    }
    .confirm-wrap .btnBox {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        border-top: 0.1rem solid #e8e8e8;
    }
    .confirm-wrap .btnBox a {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        line-height: 3.8rem;
        font-size: 1.3rem;
        text-align: center;
    }
    .confirm-wrap .okBtn {
        background: $cl-a;
        color: #fff;
    }
    .confirm-wrap .btnBox button:first-child {
        border-right: 0.1rem solid #e8e8e8;
    }
</style>
