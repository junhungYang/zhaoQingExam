<template>
    <popup-comp v-model="value" @close="close()" position="top" :no-fixed="true">
        <div class="questionSlt">
            <div class="list scrollable">
                <span v-for="item in quesStateList"
                      :class="[item.classStr,questionSort == item.sort ? 'on' : '']"
                      @click="turn(item.sort)"
                >
                    {{item.sort}}
                </span>
            </div>
            <div class="turn inputFixed-container">
                <p>请输入所需跳到的题号</p>
                <input type="text" v-model="sort" class="inputFixed" maxlength="4">
                <button class="btn" @click="turn(sort)">确定</button>
            </div>
        </div>
    </popup-comp>
</template>

<script>
    import popupComp from '../components/popupComp.vue'
    import {resolveFixed} from '../js/base'
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isShowSlt: false,
                sort: ''
            }
        },
        computed: {
            quesStateList () {
                return this.$store.state.question.quesStateList || []
            },
            questionSort () {
                return this.$store.getters.questionSort
            }
        },
        methods: {
            close () {
                this.$emit('close')
            },
            turn (sort) {
                if (sort > 0 && sort < this.quesStateList.length + 1) {
                    this.$store.commit('turn', sort)
                    this.$emit('close')
                    this.sort = ''
                }
            }
        },
        mounted () {
            resolveFixed()
        },
        components: {
            popupComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .questionSlt {
        background: #fff;
        .list {
            padding-bottom: 1rem;
            max-height: 18rem;
            overflow: scroll;
            span {
                display: inline-block;
                width: 3.8rem;
                height: 3.8rem;
                border: 0.1rem solid #8e8e8e;
                border-radius: 50%;
                margin-top: 1rem;
                font-size: 1.4rem;
                line-height: 3.8rem;
                color: #8e8e8e;
                text-align: center;
                &:nth-child(n) {
                    margin-left: 1.2rem;
                    margin-left: calc((100% - 6.25% - 4rem * 6) / 5);  // $padding = 6.25%
                }
                &:nth-child(6n - 5) {
                    margin-left: 1.2rem;
                    margin-left: calc((100% - 6.25% - 4rem * 6) / 5);
                }
                &.done {
                    border-color: $cl-a;
                    color: $cl-a;
                }
                &.right {
                    border-color: $cl-d;
                    color: $cl-d;
                }
                &.wrong {
                    border-color: $cl-e;
                    color: $cl-e;
                }
                &.on {
                    border-color: #ffbc2d;
                    color: #ffbc2d;
                }
            }
        }
        .turn {
            display: flex;
            position: relative;
            justify-content: space-between;
            padding: 1rem $padding/2;
            font-size: 1.4rem;
            border-top: 0.1rem solid #e8e8e8;
            background: #fff;
            p {
                color: #8e8e8e;
                line-height: 3rem;
            }
            input {
                display: block;
                width: 27%;
                border: 0.1rem solid #8e8e8e;
                border-radius: 0.6rem;
                height: 3rem;
                padding: 0.8rem 0;
                text-align: center;
                box-sizing: border-box;
                line-height: 1;
            }
            button {
                width: 20%;
                height: 3rem;
                /*line-height: 3rem;*/
                background: $cl-a;
                border-radius: 0.6rem;
                color: #fff;
            }
        }
    }
    /*
    @media screen and (min-width: 321px){
        .questionSlt .list span {
            &:nth-child(n) {
                margin-left: 11.95px;
                margin-left: calc((100% - 6.25% - 40px * 7) / 6);
            }
            &:nth-child(7n - 6) {
                margin-left: 11.95px;
                margin-left: calc((100% - 6.25% - 40px * 7) / 6);
            }
        }
    }
    */
</style>
