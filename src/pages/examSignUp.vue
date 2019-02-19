<template>
    <div class="examSignUpPage">
        <header-a>—预约考试—</header-a>
        <div class="slt-container">
            <p>请选择所需预约考试科目</p>
            <select name="subject" v-model="subjectChecked">
                <option disabled value="-1">请选择考试科目</option>
                <option v-for="item,index in subjectList" :value="index">{{item.subjectName}}</option>
            </select>
            <p>请选择其考试时间</p>
            <select name="date" v-model="dateChecked">
                <option disabled value="-1">请选择时间</option>
                <option v-for="item,index in subjectInfo" :value="index">{{item.examTime}}</option>
            </select>
        </div>
        <div class="info-container">
            <span>已选择:</span>
            <p>{{subjectName}}</p>
            <p>{{examTime}}</p>
            <div class="tips" v-if="dateChecked >= 0">
                <p class="header">注意事项：</p>
                <p class="content">{{mattersNeedAttention}}</p>
            </div>
        </div>
        <button class="btn-a" :class="{disabled: dateChecked == '-1'}" @click="signUp()">确定预约</button>
    </div>
</template>

<script>
    import headerA from '../components/header-a.vue'
    export default {
        data () {
            return {
                subjectList: [],
                subjectInfo: [],
                dateList: [],
                subjectChecked: '-1',
                dateChecked: '-1'
            }
        },
        computed: {
            checkSubjectId () {
                return this.subjectList[this.subjectChecked].subjectId
            },
            mattersNeedAttention () {
                return this.dateChecked >= 0 ? this.subjectInfo[this.dateChecked].mattersNeedAttention : ''
            },
            examTime () {
                return this.dateChecked >= 0 ? this.subjectInfo[this.dateChecked].examTime : ''
            },
            subjectName () {
                return this.subjectChecked >= 0 ? this.subjectList[this.subjectChecked].subjectName : ''
            }
        },
        watch: {
            subjectChecked () {
                this.dateChecked = '-1'
                this.getSubjectInfo()
            }
        },
        methods: {
            getSubjectList () {
                base.ajax({
                    url: 'wap/bespeakExam/getSubjectList',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id
                    },
                    success: (data) => {
                        this.subjectList = data
                    }
                })
            },
            getSubjectInfo () {
                base.ajax({
                    url: 'wap/bespeakExam/getBespeakInfo',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id,
                        subjectId: this.checkSubjectId
                    },
                    success: (data) => {
                        this.subjectInfo = data
                    }
                })
            },
            signUp () {
                base.ajax({
                    url: 'wap/bespeakExam/save',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id,
                        subjectSetId: this.subjectInfo[this.dateChecked].subjectSetId
                    },
                    success: (data) => {
                        this.$store.commit('setMyExamSignUp', null)   // 设置为空,index可以重新获取记录
                        this.$store.commit('showToast', '成功预约考试')
                    }
                })
            }
        },
        created () {
            this.getSubjectList()
        },
        beforeRouteEnter (to, from, next) {
            addClass(document.body,'bg-f5f5f5')
            next()
        },
        beforeRouteLeave (to, from, next) {
            removeClass(document.body,'bg-f5f5f5')
            next()
        },
        components: {
            headerA
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .examSignUpPage {
        .slt-container {
            margin-top: 1rem;
            padding: 0 $padding/2;
            font-size: 1.2rem;
            background-color: #fff;
            p {
                line-height: 3.2rem;
            }
            select {
                width: 100%;
                line-height: 3.2rem;
                height: 3.2rem;
                padding-left: 1rem;
                color: #8e8e8e;
                font-size: 1.2rem;
                border: 0.1rem solid #e8e8e8;
                box-sizing: border-box;
                margin-bottom: 1rem;
                appearance:none;
                background: url("../img/arrowDown-i_01.png") no-repeat scroll 97% center transparent;
                background-size: 1.5rem;
                padding-right: 1.4rem;
            }
        }
        .info-container {
            border-top: 0.1rem solid #f5f5f5;
            background-color: #fff;
            padding: 1rem $padding/2;
            min-height: 11rem;
            box-sizing: border-box;
            span {
                display: block;
                color: #8e8e8e;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            > p {
                text-align: center;
                font-size: 1.5rem;
                padding: 0.8rem 3rem;
                height: 1.6rem;
            }
            .tips {
                padding: 0 2rem;
                .header {
                    font-size: 1.4rem;
                    margin: 0.5rem 0;
                }
                .content {
                    font-size: 1.2rem;
                    white-space: pre-wrap;
                }
            }
        }
        .btn-a {
            margin: 3rem $padding;
            width: 100% - $padding * 2;
        }
    }
</style>
