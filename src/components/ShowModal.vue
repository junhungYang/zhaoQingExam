<template>
    <div class="showModal">
        <div class="showBox">
            <div class="cont-title">
                <p class="title">{{Store_showModal.title}}</p>
                <p class="content">{{Store_showModal.content}}</p>
            </div>
            <div class="btn">
                <span class="cancel" 
                v-if="Store_showModal.cancelFlag"
                @click="cancel">
                {{Store_showModal.cancelBtn}}</span>
                <span class="confirm"
                @click="confirm"
                >{{Store_showModal.successBtn}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    computed: {
        ...mapState(['Store_showModal'])
    },
    methods: {
        ...mapMutations(['Store_delModal']),
        confirm() {
            this.Store_showModal.successCB()
            this.Store_delModal()
        },
        cancel() {
            this.Store_showModal.cancelCB()
            this.Store_delModal()
        }
    }
}
</script>

<style lang="scss" scoped>
.showModal {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.2);
    .showBox {
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .cont-title {
            min-height: 0.55rem;
            padding: 0.14rem 0.24rem;
            width: 1.92rem;
            text-align: center;
            border-bottom:1px solid #e8e8e8;
            .title {
                font-size: 0.14rem;
                line-height: 0.18rem;
            }
            .content {
                font-size: 0.16rem;
                font-weight: bold;
                margin-top: 0.1rem;
            }
        }
        .btn {
            display: flex;
            height: 0.42rem;
            .cancel,.confirm {
                flex: 1;
                line-height: 0.42rem;
                font-size: 0.14rem;
                text-align: center;
            }
            .cancel {
                border-right: 1px solid #e8e8e8;
            }
        }

    }
}
</style>