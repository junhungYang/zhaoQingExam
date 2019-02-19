<template>
    <div class="questionComp">
        <div class="header">
            <span class="state">{{question.optionType === 1 ? '单选' : question.optionType === 2 ? '多选' : '判断'}} |</span>
            <div class="content">
                <p>{{question.sort}}. {{question.questionContent}}</p>
                <img v-if="question.questionImageUrl" :src="question.questionImageUrl">
            </div>
        </div>
        <ul class="optionList">
            <li v-for="item in question.optionInfoList">
                <input type="checkbox" v-if="question.optionType === 2" :id="'option' + item.optionLetter" v-model="studentAnswer" :value="item.optionLetter" :disabled="!!trueAnswer">
                <input type="radio" v-else v-model="studentAnswer" :id="'option' + item.optionLetter" :value="item.optionLetter" :disabled="!!trueAnswer">
                <label class="option" :for="'option' + item.optionLetter">
                    <i class="icon">{{item.optionLetter}}、</i>
                    <div class="content">
                        <p>{{item.optionContent}}</p>
                        <img v-if="item.optionImageUrl" :src="item.optionImageUrl">
                    </div>
                </label>
            </li>
        </ul>
        <div class="answer" v-if="!isTesting">
            <p v-if="result === 'right'">正确!</p>
            <p v-if="result === 'wrong'" class="wrong">错误，正确答案是 {{trueAnswer}}。</p>
        </div>
        <!--考试-->
        <div class="btnBox" v-if="paperType == 4">
            <a class="btn-b"  @click="turn('prev')">上一题</a>
            <a class="btn-b"  @click="turn('next')">下一题</a>
        </div>
        <!--顺序练习-->
        <div class="btnBox" v-else-if="paperType == 1">
            <a class="btn-b"  @click="turn('prev')">上一题</a>
            <a class="btn-b"  v-if="trueAnswer" @click="turn('next')">下一题</a>
            <a class="btn-b"  v-else @click="submitInPractise()">提交</a>
        </div>
        <!--其他练习-->
        <div class="btnBox_2" v-else>
            <a class="btn-b"  v-if="trueAnswer" @click="turn('next')">下一题</a>
            <a class="btn-b"  v-else @click="submitInPractise()">提&nbsp;交</a>
        </div>
        <toast-comp v-model="isShowToast_1" text="这已经是第一题" @on-hide="showToast_1(!1)"></toast-comp>
        <toast-comp v-model="isShowToast_2" text="这已经是最后一题" @on-hide="showToast_2(!1)"></toast-comp>
        <toast-comp v-model="isShowToast_3" text="请先选择答案" @on-hide="showToast_3(!1)"></toast-comp>
    </div>
</template>

<script>
    import toastComp from '../components/toastComp.vue'
    export default {
        props: {
            isTesting: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                isShowToast_1: false,
                isShowToast_2: false,
                isShowToast_3: false,
                studentAnswer: []
            }
        },
        computed: {
            question () {
                return this.$store.state.question.question || {}
            },
            totalQuestion () {
                return this.$store.state.question.totalQuestion
            },
            result () {
                if (!this.trueAnswer) {
                    return ''
                }
                var studentAnswer = this.studentAnswer.join ? this.studentAnswer.sort().join('') : this.studentAnswer
                return this.trueAnswer === studentAnswer ? 'right' : 'wrong'
            },
            trueAnswer () {
                var trueAnswer = this.question.trueAnswer ? this.question.trueAnswer.slice(0) : ''
                return trueAnswer.join ? trueAnswer.sort().join('') : trueAnswer
            },
            paperType () {
                return this.$store.state.question.paperType
            }
        },
        watch: {
            '$store.state.question.question' () {
                this.studentAnswer = this.question.studentAnswer
                    ? this.question.optionType === 2 ? this.question.studentAnswer.split('') : this.question.studentAnswer
                    : []
//                this.$watch('studentAnswer', (val, oldVal) => {
//                    if (val.length == 0 && oldVal.length == 0) {
//                        return
//                    }
//                    this.$store.commit('setStudentAnswer', this.studentAnswer)
//                })
            },
            studentAnswer (val, oldVal) {
                if (val.length == 0 && oldVal.length == 0) {
                    return
                }
                this.$store.commit('setStudentAnswer', this.studentAnswer)
            }
        },
        methods: {
            showToast_1 (bool) {
                this.isShowToast_1 = bool
            },
            showToast_2 (bool) {
                this.isShowToast_2 = bool
            },
            showToast_3 (bool) {
                this.isShowToast_3 = bool
            },
            turn (type) {
                if (type === 'prev' && this.question.sort === 1) {
                    this.showToast_1(true)
                    return
                }
                if (type === 'next' && this.question.sort === this.totalQuestion) {
                    this.showToast_2(true)
                    return
                }
                if (this.paperType == 4 && this.$store.state.question.testState != 3) {
                    this.$store.dispatch('submitAnswerInTest', () => {
                        this.$store.commit('turn', type)
                    })
                } else {
                    this.$store.commit('turn', type)
                }
            },
            submitInPractise () {
                if (this.studentAnswer.length < 1) {
                    this.showToast_3(true)
                    return
                }
                this.$store.dispatch('submitAnswerInPractise')
            }
        },
        components: {
            toastComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .questionComp {
        &.zoomIn {
            font-size: 2rem;
        }
        font-size: 1.4rem;
        img {
            max-width: 80%;
            margin: 0.5rem 0;
            display: block;
        }
        .header {
            display: flex;
            margin-bottom: 1rem;
        }
        .state {
            min-width: 3.2em;
            color: $cl-a;
        }
        .content {
            line-height: 1.3;
        }
        .optionList {
            /*margin-left: 3.2em;*/
        }
        .option {
            display: flex;
            padding: 0.8rem 0.4rem 0.8rem 3.2em;
            margin-bottom: 0.2rem;
            border: 0.2rem solid transparent;
        }
        input {
            display: none;
        }
        .icon {
            position: relative;
            display: block;
            line-height: 1.3;
        }
        .answer {
            margin: 1rem 3.2em 2rem;
            color: $cl-d;
            height: 1.5em;
            .wrong{
                color: $cl-e;
            }
        }
        .btnBox {
            display: flex;
            justify-content: space-between;
            margin: 1rem 14% 0;
        }
        .btnBox_2 {
            .btn-b {
                width: 60%;
                margin: 0 auto;
                display: block;
            }
        }
    }
    .questionComp input:checked + label {
        border: 0.2rem solid $cl-a;
    }
    .questionComp input:checked + label .content p,
    .questionComp input:checked + label .icon{
        color: $cl-a;
        border-color: $cl-a;
        font-weight: 900;
        /*font-size: 1.1em;*/
    }
    /*
    .questionComp .wrong p,
    .questionComp .wrong .icon {
        color: $cl-e !important;
        border-color: $cl-e !important;
    }
    .questionComp .right p,
    .questionComp .right .icon {
        color: $cl-d !important;
        border-color: $cl-d !important;
    }
    */
</style>
