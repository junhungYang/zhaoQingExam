<template>
    <div class="testInfoPage">
        <div class="top">
            <div class="info">
                <div class="flex-justify">
                    <span>考试科目</span>
                    <span>{{testInfo.testName}}</span>
                </div>
                <div class="flex-justify">
                    <span>考试规格</span>
                    <span>{{testInfo.spec}}</span>
                </div>
                <div class="flex-justify">
                    <span>剩余次数</span>
                    <span>{{testInfo.remainFrequency}}次</span>
                </div>
                <div class="flex-justify">
                    <span>平均成绩</span>
                    <span>{{testInfo.avgScore}}分</span>
                </div>
            </div>
            <a class="btn-a" @click="goTest()">进入考试</a>
            <p class="tips">{{testInfo.tips}}</p>
        </div>
        <div class="bottom">
            <div class="header">
                <h6>最近考试记录</h6>
                <router-link class="more" to="/testRecord">更多 ></router-link>
            </div>
            <div class="testRecord-container">
                <test-record-comp :test-record-list="testRecordList"></test-record-comp>
            </div>
        </div>
    </div>
</template>

<script>
    import testRecordComp from '../components/testRecordComp.vue'
    export default {
        computed: {
            testInfo () {
                return this.$store.state.testInfo || {}
            },
            testRecordList () {
                return this.$store.state.testRecord ? this.$store.state.testRecord.slice(0,3) : []
            }
        },
        methods: {
            goTest () {
                this.$store.dispatch('createTest')
            }
        },
        created () {
            this.$store.dispatch('getTestInfo')
            this.$store.dispatch('getTestRecord')
        },
        components: {
            testRecordComp: testRecordComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .testInfoPage .top {
        padding: 0 $padding;
        border-bottom: 0.5rem solid #f5f5f5;
    }
    .testInfoPage .info {
        margin: 2rem 0;
        padding: 0 1rem 1rem;
        line-height: 1;
        background: #f5f5f5;
        font-size: 1.3rem;
        color: #8e8e8e;
        border-radius: 0.5rem;
    }
    .testInfoPage .info .flex-justify {
        padding-top: 1rem;
    }
    .testInfoPage .info span:first-child {
        color: #353535;
    }
    .testInfoPage .tips {
        font-size: 1.2rem;
        color: #8e8e8e;
        margin: 2rem 1rem;
        white-space: pre-wrap;
        line-height: 1.5rem;
    }
    .testInfoPage .bottom .header {
        position: relative;
        margin: 1.8rem;
    }
    .testInfoPage .bottom h6 {
        color: #353535;
        font-size: 1.5rem;
        text-align: center;
        line-height: 1;
    }
    .testInfoPage .bottom .more {
        position: absolute;
        display: block;
        bottom: 0;
        right: $padding/2;
        font-size: 1rem;
        color: #8e8e8e;
    }
    .testInfoPage .bottom .testRecord-container {
        margin: 0 $padding/2;
    }
</style>
