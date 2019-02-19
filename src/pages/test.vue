<template>
    <div class="testPage">
        <header-b :questionSlt="true" :home="!isTesting" :progress="isTesting">
            <router-link slot="left" class="btn-c" to="/" ><i class="home-i_02"></i>首页</router-link>
            <div class="remainTime" slot="mid" v-if="isTesting">
                剩余时间
                <countdown
                        :if-show-hour="false"
                        :pause="pause"
                        :remain-sec="testTime"
                        :interval-step="1"
                        @end="end"
                        @interval="interval"
                ></countdown>
            </div>
        </header-b>
        <div class="question-container">
            <question-comp :isTesting="isTesting"></question-comp>
        </div>
        <operate-comp :submitBtn="isTesting" :isTesting="isTesting" @submit="showConfirm(!0)"></operate-comp>
        <confirm-comp
                v-if="isTesting"
                v-model="isShowConfirm"
                text="确定提交试卷吗？"
                :okBtnCls="'bg-cl-b'"
                @ok="submit"
                @close="showConfirm(!1)"
                @cancel="showConfirm(!1)"
        ></confirm-comp>
    </div>
</template>

<script>
    import headerB from '../components/header-b.vue'
    import questionComp from '../components/questionComp.vue'
    import popupComp from '../components/popupComp.vue'
    import confirmComp from '../components/confirmComp.vue'
    import countdown from '../components/countdown.vue'
    import operateComp from '../components/operateComp.vue'
    export default {
        data () {
            return {
                isShowSlt: false,
                pause: false,
                isShowConfirm: false
            }
        },
        computed: {
            testTime () {
                return this.$store.state.question.testTime
            },
            isTesting () {
                return this.$store.state.question.testState != 3
            }
        },
        methods: {
            showSlt: function (bool) {
                this.isShowSlt = bool;
            },
            showConfirm: function (bool) {
                this.isShowConfirm = bool
            },
            submit: function () {
                this.$store.dispatch('submitTest', () => {
                    this.$router.replace('/testEnd')
                })
            },
            end: function () {
                this.submit()
            },
            interval: function () {
                this.$store.commit('countdown')
            }
        },
        created () {
            this.$store.commit('setPaperType', 4)
            this.$store.dispatch('getQuestionList', this.$route.query.testId)
        },
        destroyed () {
            this.$store.commit('quesStateListInit', null)
            this.$store.commit('testReset')
            this.$store.commit('setQuestion', {})
        },
        components: {
            headerB,
            questionComp,
            countdown,
            operateComp,
            confirmComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .testPage {
        .question-container {
            padding: 1rem $padding/2 2rem;
        }
        .remainTime {
            font-size: 1.3rem;
        }
    }
</style>
