<template>
    <div class="testEndPage">
        <header-b title="考试结果" home="."></header-b>
        <div class="result">
            提交试卷成功
            <!-- <div class="flex">
                <div>
                    <span class="score">{{testResult.correctRate}}</span>
                    <span>正确率</span>
                </div>
                <div>
                    <span class="score">{{testResult.totalScore}}分</span>
                    <span>答题成绩</span>
                </div>
            </div>
            <p>所用时间: <em>{{testResult.sumExamMinute}}</em></p>
            <p>您的答案正确数为： <em>{{testResult.trueQuestionFrequency}}</em>。</p>
            <div class="btnBox">
                <router-link class="btn-b" to="/testInfo">再考一次</router-link>
                <router-link class="btn-b" :to="'/test?testId=' + testResult.id">查阅试卷</router-link>
            </div>
            <p class="remain">还剩考试次数为：<em>{{testResult.remainFrequency}}</em> 次。</p> -->
        </div>
        <div class="list">
            <router-link class="flex-justify" to="/testRecord">
                <span><i class="testRecord-i"></i>历史考试记录</span>
                <i class="arrowRight-i"></i>
            </router-link>
            <router-link class="flex-justify" to="/practise?type=3">
                <span><i class="wrongReview-i"></i>错题练习</span>
                <i class="arrowRight-i"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import headerB from '../components/header-b.vue'
    export default {
        computed: {
            testResult () {
                return this.$store.state.question.testResult || {}
            }
        },
        created () {
            if (!this.testResult) {
                this.$router.replace('/')
            }
        },
        components: {
            headerB
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .testEndPage .result {
        font-size: 1.2rem;
        padding: 0 $padding;
        border-bottom: 0.5rem solid #f5f5f5;
        text-align: center;
        height: 1.5rem;
        line-height: 1.5rem;
    }
    // .testEndPage .result p {
    //     margin-top: 1.4rem;
    // }
    // .testEndPage .result p em {
    //     color: #8e8e8e;
    // }
    // .testEndPage .result .flex > div {
    //     width: 50%;
    //     margin: 2rem 0 0.6rem;
    // }
    // .testEndPage .result .flex > div:first-child {
    //     border-right: 0.1rem solid #e8e8e8;
    // }
    // .testEndPage .result .flex span {
    //     font-size: 1.2rem;
    //     display: block;
    //     text-align: center;
    // }
    // .testEndPage .result .flex .score {
    //     font-size: 3rem;
    //     color: $cl-a;
    //     font-weight: bold;
    //     margin-bottom: 0.3rem;
    //     height: 3.5rem;
    // }
    .testEndPage .btnBox {
        display: flex;
        justify-content: space-between;
        margin: 2.2rem 10% 0;
    }
    // .testEndPage .result .remain {
    //     margin: 0.8rem 4% 1.4rem;
    // }
    // .testEndPage .result .remain em {
    //     color: $cl-a;
    // }
    .testEndPage .list .flex-justify {
        height: 4rem;
        align-items: center;
        padding: 0 $padding;
        border-bottom: 0.1rem solid #f5f5f5;
        font-size: 1.2rem;
        color: #353535;
    }
    .testEndPage .list span i {
        margin: -0.1rem 1rem 0 0;
    }
</style>
