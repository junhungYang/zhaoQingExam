<template>
    <div class="signUpPage">
        <background></background>
        <div class="logo-container">
            <img src="../../img/logo_03.png" class="logo">
        </div>
        <h3 class="company">安联安全生产培训有限公司</h3>
        <div class="notice" v-html="notice"></div>
        <div class="lesson-container">
            <div class="header">
                <div class="lessonSlt-container">
                    <div class="left">报名课程:</div>
                    <select name="lesson" v-model="subjectChecked" :class="{unSelected: subjectChecked == -1}">
                        <option  :value="-1" disabled>-----请选择-----</option>
                        <option v-for="item,index in subjectList" :value="index">{{item.subjectName}}</option>
                    </select>
                </div>
                <div class="info">
                    <div>剩余名额：<span v-if="typeof subjectInfo.remainSignUpQuantity != 'undefined'">{{subjectInfo.remainSignUpQuantity}}人</span></div>
                    <div>报名费用：<span v-if="typeof subjectInfo.price != 'undefined'">{{subjectInfo.price}}元</span></div>
                </div>
            </div>
            <div class="detail">
                <div class="content" v-html="subjectInfo.subjectDetails"></div>
            </div>
        </div>
        <div class="form">
            <h3>请填写相关信息</h3>
            <div class="input-container">
                <div class="left">
                    姓名:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人姓名" v-model="form.studentName">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    性别:
                </div>
                <div class="right">
                    <label>
                        <input type="radio" name="sex" value="1" class="checkbox" v-model="form.sex">
                        <i class="checkbox-i"></i>
                        <span>男</span>
                    </label>
                    <label>
                        <input type="radio" name="sex" value="2" class="checkbox" v-model="form.sex">
                        <i class="checkbox-i"></i>
                        <span>女</span>
                    </label>
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    身份证号码:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人身份证号码" v-model="form.idCard">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    手机号码:
                </div>
                <div class="right">
                    <input type="text" placeholder="报名人手机号码" v-model="form.phone">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    发票形式:
                </div>
                <div class="right">
                    <label @click.prevent="invoiceTypeC(1)">
                        <input type="radio" name="invoiceType" :value="1" class="checkbox" v-model="form.invoiceType">
                        <i class="checkbox-i"></i>
                        <span>电子发票</span>
                    </label>
                    <label @click.prevent="invoiceTypeC(2)">
                        <input type="radio" name="invoiceType" :value="2" class="checkbox" v-model="form.invoiceType">
                        <i class="checkbox-i"></i>
                        <span>纸质发票</span>
                    </label>
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    企业名称:
                </div>
                <div class="right">
                    <input type="text" placeholder="公司名称" v-model="form.companyName">
                </div>
            </div>
            <div class="input-container">
                <div class="left">
                    纳税登记号:
                </div>
                <div class="right">
                    <input type="text" placeholder="请确认无误" v-model="form.invoice">
                </div>
            </div>
            <p class="errorTips">{{errorMsg}}</p>
            <button class="btn-a" @click="signUp()">确定报名</button>
        </div>
        <confirm-comp v-model="isShowConfirm_1" okText="确认报名" cancelText="" @ok="pay()" @close="showConfirm_1(!1)">
            <section v-if="subjectChecked >= 0" class="infoConfirm">
                <h3>请确认所填信息</h3>
                <ul>
                    <li>
                        <div class="left">
                            报名课程:
                        </div>
                        <div class="right">
                            {{subjectList[subjectChecked].signUpSubjectId}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            姓名:
                        </div>
                        <div class="right">
                            {{form.studentName}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            性别:
                        </div>
                        <div class="right">
                            {{form.sex == 1 ? '男' : '女'}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            身份证号码:
                        </div>
                        <div class="right">
                            {{form.idCard}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            手机号码:
                        </div>
                        <div class="right">
                            {{form.phone}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            发票形式:
                        </div>
                        <div class="right">
                            {{form.invoiceType == 1 ? '电子发票' : form.invoiceType == 2  ?　'纸质发票'　: ''}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            企业名称:
                        </div>
                        <div class="right">
                            {{form.companyName}}
                        </div>
                    </li>
                    <li>
                        <div class="left">
                            纳税登记号:
                        </div>
                        <div class="right">
                            {{form.invoice}}
                        </div>
                    </li>
                </ul>
            </section>
        </confirm-comp>
    </div>
</template>

<script type="text/ecmascript-6">
    import background from '../../layouts/background.vue'
    import wechat from '../../js/wechat'
    import confirmComp from '../../components/confirmComp.vue'
    export default {
        data () {
            return {
                subjectChecked: -1,
                subjectList: [],
                subjectInfo: {},
                notice: '',
                form: {
                    signUpSubjectId: 1,
                    studentName: '',
                    sex: '',
                    idCard: '',
                    phone: '',
                    companyName: '',
                    invoice: '',
                    invoiceType: -1,
                },
                errorMsg: '',
                isShowConfirm_1: false,
                isShowConfirm_2: false
            }
        },
        watch: {
            subjectChecked (val) {
                if (val >= 0) {
                    this.form.signUpSubjectId = this.subjectList[val].signUpSubjectId
                    this.getSubjectInfo()
                }
            },
            form: {
                handler () {
                    this.clearErrorMsg()
                },
                deep: true
            }
        },
        methods: {
            showConfirm_1 (bool) {
                this.isShowConfirm_1 = bool
            },
            showConfirm_2 (bool) {
                this.isShowConfirm_2 = bool
            },
            clearErrorMsg () {
                this.errorMsg = ''
            },
            getSubjectList () {
                base.ajax({
                    url: "common/signUp/getSignUpSubjectList",
                    data: {
                        state: 1
                    },
                    success: (data) => {
                        this.subjectList = data
                    }
                })
            },
            getSubjectInfo () {
                base.ajax({
                    url: "common/signUp/getSignUpSubjectInfo",
                    data: {
                        signUpSubjectId: this.form.signUpSubjectId
                    },
                    success: (data) => {
                        this.subjectInfo = data
                    }
                })
            },
            getNotice () {
                base.ajax({
                    url: "common/signUp/getNoticeInfo",
                    success: (data) => {
                        this.notice = data.noticeContent
                    }
                })
            },
            invoiceTypeC (val) {
                this.form.invoiceType = this.form.invoiceType == val ? -1 : val
            },
            signUp () {
                for (let key in this.form) { // 非空验证
                    if (this.form.hasOwnProperty(key)){
                        if (!this.form[key]){
                            if (key == 'signUpSubjectId') {
                                this.$store.commit('showConfirm',{text: '请先选择科目'})
                            } else {
                                if (['invoice', 'invoiceType', 'companyName'].indexOf(key) >= 0 && this.form.invoiceType < 0) continue
                                this.$store.commit('showConfirm',{text: '请先填完报名人信息'})
                            }
                            return
                        }
                    }
                }

                this.showConfirm_1(true)
            },
            pay () {
                this.showConfirm_1(false)
                base.ajax({
                    url: "common/signUp/paySignUp",
                    data: {
                        openid: wechat.openid,
                        ...this.form
                    },
                    success: (data) => {
                        wechat.payParam = data
                        wechat.setWxConfig({
                            jsApiList: ['chooseWXPay'],
                            ready: () => {
                                wechat.paySubmit({
                                    success: () => {
                                        this.$store.commit('showConfirm',{
                                            text: '您已预约报名成功，具体通知请留意短信或我司来电。',
                                            ok: () => {
                                                this.$router.push('/signUp/orderDetail?orderCode=' + data.orderCode)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    },
                    error: (error) => {
                        if (error.status == 304 || error.status == 308) {
                            this.errorMsg = error.message
                        }
                    }
                })
            }
        },
        created () {
            wechat.getOpenid()
            this.getNotice()
            this.getSubjectList()
        },
        components: {
            background,
            confirmComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/base.scss";
    .signUpPage {
        position: relative;
        padding-bottom: 8.5rem;
        .logo {
            display: block;
            width: 7.9rem;
            margin: 0 auto;
            padding: 2rem 0 1.3rem;
        }
        .company {
            font-size: 2rem;
            color: #fff;
            text-shadow: 0.2rem 0.2rem 0.2rem #434e84;
            text-align: center;
            margin-bottom: 1.8rem;
        }
        .notice {
            padding: 1rem 2rem;
            font-size: 1.2rem;
            background: rgba(255,255,255,0.8);
            line-height: 2rem;
            /*white-space: pre-wrap;*/
            margin: 0 $padding;
        }
        .lesson-container {
            margin: 2.3rem $padding 0;
            background: #fff;
            box-shadow: 0 0.2rem 0.5rem #ddd;
            border-radius: 2rem;
            border: 0.1rem solid #e8e8e8;
            .header {
                padding: 1.2rem 2rem 0;
            }
            .info {
                display: flex;
                line-height: 2rem;
                div {
                    width: 50%;
                    padding-left: 10%;
                    font-size: 1rem;
                    color: #8e8e8e;
                }
            }
            .detail {
                min-height: 5rem;
                border-top: 0.1rem solid #e8e8e8;
                padding: 2rem;
            }
        }
        .lessonSlt-container {
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            height: 1.6rem;
            line-height: 1.6rem;
            .left {
                width: 25%;
            }
            select {
                width: 72%;
                font-size: 1.2rem;
                box-sizing: border-box;
                appearance: none;
                border: none;
                background: url("../../img/arrowDown-i_02.png") no-repeat scroll 97% center transparent;
                background-size: 1.5rem;
                padding-right: 1.4rem;
                height: 1.6rem;
                line-height: 1.6rem;
                &.unSelected {
                    color: #8e8e8e;
                }
            }
            option {
                color: #353535;
            }
            option[disabled] {
                color: #8e8e8e;
            }
        }
        .form {
            margin: 0 $padding;
            padding: 0 1.5rem;
            h3 {
                font-size: 1.5rem;
                padding: 1.8rem 0 0.8rem;
            }
            .input-container {
                display: flex;
                font-size: 1.2rem;
                padding: 1rem 0;
                border-bottom: 0.1rem solid #e8e8e8;
                .left {
                    width: 35%;
                }
                .right {
                    width: 70%;
                }
                label {
                    margin-right: 1rem;
                }
            }
            .btn-a {
                margin-top: 2rem;
            }
            .errorTips {
                font-size: 1.2rem;
                margin-top: 1rem;
                margin-left: 10%;
                height: 1.4rem;
                color: $cl-e;
            }
        }
        .infoConfirm {
            width: 80vw;
            font-size: 1.2rem;
            h3 {
                font-size: 1.6rem;
                text-align: center;
                line-height: 2;
                font-weight: bold;
            }
            li {
                display: flex;
                margin: 1rem 2rem;
            }
            .left {
                width: 40%;
                min-width: 40%;
            }
        }
    }
</style>
