<template>
    <order-layout title="订单详情" link-btn-text="个人订单" @click-btn="go()">
    <div class="orderDetailPage">
        <div class="order">
            <ul>
                <li>
                    <div class="th">报名课程：</div>
                    <div class="td">{{orderDetail.subjectName}}</div>
                </li>
                <li>
                    <div class="th">姓名：</div>
                    <div class="td">{{orderDetail.studentName}}</div>
                </li>
                <li>
                    <div class="th">性别：</div>
                    <div class="td">{{orderDetail.sex == 1 ? '男' : orderDetail.sex == 2 ? '女' : ''}}</div>
                </li>
                <li>
                    <div class="th">联系方式：</div>
                    <div class="td">{{orderDetail.phone}}</div>
                </li>
                <li>
                    <div class="th">身份证号码：</div>
                    <div class="td">{{orderDetail.idCard}}</div>
                </li>
                <li>
                    <div class="th">订单状态：</div>
                    <div class="td">{{orderDetail.state | toStateStr}}</div>
                </li>
                <li v-if="orderDetail.state == 2">
                    <div class="th">支付时间：</div>
                    <div class="td">{{orderDetail.completeTime}}</div>
                </li>
                <li v-if="orderDetail.state == 1">
                    <div class="th">剩余支付时间：</div>
                    <div class="td">{{orderDetail.remainSecond | timeToStr}}</div>
                </li>
                <li v-if="orderDetail.state == 4">
                    <div class="th">退款时间：</div>
                    <div class="td">{{orderDetail.refundTime}}</div>
                </li>
                <li>
                    <div class="th">支付金额：</div>
                    <div class="td">¥{{orderDetail.paymentAmount}}</div>
                </li>
            </ul>
        </div>
        <router-link v-if="orderDetail.state == 2" to="/signUp" class="btn-d">继续报名</router-link>
        <button v-else-if="orderDetail.state == 1" @click="paySubmit(orderCode)" class="btn-d">立即支付</button>
        <router-link v-else to="/signUp" class="btn-d">重新报名</router-link>
        <button class="btn-d" @click="showPopup(    !0)">查看报到所需</button>
        <popup-comp v-model="isShowPopup" @close="showPopup(!1)">
            <div class="lessonDetail-container">
                <div class="lessonDetail" v-html="orderDetail.subjectDetails">
                </div>
                <button class="close" @click="showPopup(!1)"><i class="close-i"></i></button>
            </div>
        </popup-comp>
    </div>
    </order-layout>
</template>

<script>
    import orderLayout from '../../layouts/orderLayout.vue'
    import popupComp from '../../components/popupComp.vue'
    import wechat from '../../js/wechat'
    import {timeToStr} from '../../js/base'
    export default {
        data () {
            return {
                isShowPopup: false,
                orderCode: this.$route.query.orderCode,
                orderDetail: {
                    "phone": "13035846175",
                    "idCard": "440921199406174232",
                    "studentName": "测试",
                    "sex": 1,
                    "subjectDetails": "<p>水电费胜多负少的<br/></p>",
                    "completeTime": "2017-08-09 10:21:56",
                    "orderCode": "1001",
                    "state": 4,
                    "paymentAmount": 3,
                    "subjectName": "语文",
                    remainSecond: 1010,
                    refundTime: '2017/1/1'
                }
            }
        },
        filters: {
            toStateStr (val) {
                switch (val) {
                    case 1:
                        return '未付款'
                    case 2:
                        return '已付款'
                    case 3:
                        return '已过期'
                    case 4:
                        return '已退款'
                }
            },
            timeToStr (val) {
                return timeToStr(val)
            }
        },
        methods: {
            go () {
                this.$router.push('/signUp/myOrder')
            },
            showPopup (bool) {
                this.isShowPopup = bool
            },
            getOrderDetail () {
                base.ajax({
                    url: 'common/signUp/getOrderDetails',
                    data: {
                        orderCode: this.orderCode
                    },
                    success: (data) => {
                        this.orderDetail = data
                    }
                })
            },
            paySubmit (orderCode) {
                base.ajax({
                    url: 'common/signUp/continuePay',
                    data: {
                        orderCode: orderCode
                    },
                    success: (data) => {
                        wechat.payParam = data
                        wechat.setWxConfig({
                            jsApiList: ['chooseWXPay'],
                            ready: () => {
                                wechat.paySubmit({
                                    success: () => {
                                        this.$router.push('/signUp/orderDetail?orderCode=' + data.orderCode)
                                    }
                                })
                            }
                        })
                    }
                })
            }
        },
        created () {
            if (!this.orderCode) {
                this.$router.replace('/signUp/myOrder')
            }
            this.orderCode && this.getOrderDetail()
        },
        components: {
            orderLayout,
            popupComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/_base.scss";
    .orderDetailPage {
        .order {
            background: #fff;
            width: 100%;
            padding: 1.8rem 1.5rem;
            box-shadow: 0 0.1rem 0.5rem #bbb;
            border-radius: 1rem;
            box-sizing: border-box;
            margin-bottom: 3rem;
            li {
                display: flex;
                justify-content: space-between;
                font-size: 1.2rem;
                line-height: 1.4rem;
                margin-bottom: 1rem;
                &:last-child {
                    margin-bottom: 0;
                }
            }
            .th {
                font-size: 1.3rem;
                color: #8e8e8e;
            }
        }
        .btn-d {
            margin-bottom: 1.5rem;
        }
        .lessonDetail-container {
            position: relative;
        }
        .close-i {
            position: absolute;
            right: -0.7rem;
            top: -0.7rem;
            display: block;
            width: 2rem;
            height: 2rem;
            background: url("../../img/close-i.png");
            background-size: 100%;
        }
        .lessonDetail {
            width: 25.6rem;
            min-height: 14.4rem;
            padding: 1rem;
            background: #fff;
            border-radius: 1.5rem;
        }
    }
</style>
