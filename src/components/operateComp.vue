<template>
    <div class="operate-comp">
        <div class="fixedBottom fixed">
            <div class="left">
                <button :class="{zoomOutBtn: isZoomIn}" @click="scale(!isZoomIn)"><i class="magnifier-i"></i>{{isZoomIn ? '缩小':'放大'}}</button>
                <button :class="{collected: isCollected}" @click="confirmCollect()" v-if="!isTesting"><i class="wrongClt-i"></i>{{isCollected? '已放入':'放入错题'}}</button>
                <button @click="showConfirm_2(!0)" v-if="paperType == 1"><i class="reset-i"></i>重置练习</button>
            </div>
            <div class="right">
                <button v-if="isPractise" class="submit_02" @click="showConfirm_3(!0)"><i class="exit-i"></i>退出练习</button>
                <button v-if="submitBtn" class="submit_02" @click="submit()"><i class="paperPlane-i"></i>提交</button>
            </div>
        </div>
        <confirm-comp v-model="isShowConfirm_2" text="确定重置练习?" @close="showConfirm_2(!1)" @ok="reset()"></confirm-comp>
        <confirm-comp v-model="isShowConfirm" text="取消放入错题集?" @close="showConfirm(!1)" @ok="addWrongClt(false)"></confirm-comp>
        <toast-comp v-model="isShowToast" text="放入错题集成功" @on-hide="showToast(!1)"></toast-comp>
        <confirm-comp v-model="isShowConfirm_3" text="确定退出练习?" @close="showConfirm_3(!1)" @ok="exit()"></confirm-comp>
    </div>
</template>

<script>
    import confirmComp from '../components/confirmComp.vue'
    import toastComp from '../components/toastComp.vue'
    export default {
        props: {
            isPractise: {
                type: Boolean,
                default: false
            },
            isTesting: {
                type: Boolean,
                default: false
            },
            submitBtn: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isZoomIn: false,
                isShowConfirm: false,
                isShowConfirm_2: false,
                isShowConfirm_3: false,
                isShowToast: false
            }
        },
        computed: {
            isCollected () {
                return this.$store.state.question.question.isCollection
            },
            paperType () {
                return this.$store.state.question.paperType
            }
        },
        methods: {
            showToast (bool) {
                this.isShowToast = bool
            },
            showConfirm (bool) {
                this.isShowConfirm = bool
            },
            showConfirm_2 (bool) {
                this.isShowConfirm_2 = bool
            },
            showConfirm_3 (bool) {
                this.isShowConfirm_3 = bool
            },
            scale (bool) {
                if (bool) {
                    addClass(document.getElementsByClassName('questionComp'), 'zoomIn')
                } else {
                    removeClass(document.getElementsByClassName('questionComp'), 'zoomIn')
                }
                this.isZoomIn = bool
            },
            confirmCollect () {
                if (this.isCollected) {   // 取消
                    this.showConfirm(!0)
                } else {    // 放入
                    this.addWrongClt(true)
                }
            },
            addWrongClt (bool) {
                if (bool) {   // 放入
                    this.showToast(!0)
                    this.$store.dispatch('addWrongClt')
                } else {    // 取消
                    this.showConfirm(!1)
                    this.$store.dispatch('removeWrongClt')
                }
            },
            reset () {
                this.$store.dispatch('resetPractise')
                this.isShowConfirm_2 = false
            },
            submit () {
                this.$emit('submit')
            },
            exit () {
                this.$router.push('/')
            }
        },
        components: {
            confirmComp,
            toastComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .operate-comp {
        height: 6rem;
        .fixedBottom {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 5.2rem;
            border-top: 0.1rem solid #8e8e8e;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fff;
            padding: 0 $padding/2;
            button {
                font-size: 1rem;
                color: #8e8e8e;
                width: 4.5rem;
                height: 4.5rem;
                text-align: center;
                margin-left: 1.2rem;
                i {
                    display: block;
                    margin: 0 auto;
                }
            }
            button:first-child {
                margin-left: 0;
            }
            .collected {
                color: $cl-a;
            }
            /*
            .submit_01 {
                width: 55px;
                height: 24px;
                border: 0.1rem solid $cl-a;
                color: $cl-a;
                font-size: 1.2rem;
                border-radius: 1.2rem;
                padding-right: 0.4rem;
            }*/
            .submit_02 {
                color: $cl-a;
            }
            .magnifier-i {
                width: 2.5rem;
                height: 2.5rem;
                background: url("../img/magnifier-i_01.png") no-repeat;
                background-size: 100%;
            }
            .zoomOutBtn .magnifier-i {
                background-image: url("../img/magnifier-i_02.png");
            }
            .wrongClt-i {
                width: 2.5rem;
                height: 2.5rem;
                background: url("../img/wrongClt-i_02.png") no-repeat center;
                background-size: 2rem;
            }
            .collected .wrongClt-i {
                @extend .wrongClt-i;
                background-image: url("../img/wrongClt-i_01.png");
            }
        }
        .left, .right {
            display: flex;
            align-items: center;
        }
    }
</style>
