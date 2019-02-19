<template>
    <order-layout title="订单列表" :link-btn-text="orderList.length == 0 ? '' : isAdmin ? '返回' : '管理订单'" @click-btn="toggleAdmin()">
        <div class="myOrderPage">
            <div class="noOrder" v-if="orderList.length == 0">
                暂无订单
            </div>
            <ul class="orderList">
                <li v-for="item, index in orderList">
                    <div class="order">
                        <div class="header">
                            <div class="left">
                                {{item.subjectName}}
                            </div>
                            <div class="right" :class="item.state | stateCls">
                                {{item.state | toStateStr}}
                            </div>
                        </div>
                        <div class="bd">
                            <div class="flex-justify">
                                <div>{{item.studentName}}</div>
                                <div class="price"> &yen;{{item.paymentAmount}}</div>
                            </div>
                            <div class="flex-justify" v-if="item.state == 2">
                                <div class="left">支付日期：{{item.completeTime}}</div>
                                <div class="right" v-if="!isAdmin">
                                    <router-link :to="'/signUp/orderDetail?orderCode=' + item.orderCode">详情</router-link>
                                </div>
                                <div class="right" v-else>
                                    <a class="delete" @click="showConfirm(!0, index)"><i class="delete-i"></i>删除订单</a>
                                </div>
                            </div>
                            <div class="flex-justify" v-if="item.state == 1">
                                <div class="left">剩余支付时间：{{item.remainSecond | timeToStr}}</div>
                                <div class="right" v-if="!isAdmin">
                                    <button @click="paySubmit(item.orderCode)">立即支付</button>
                                    <i class="line-s"></i>
                                    <router-link :to="'/signUp/orderDetail?orderCode=' + item.orderCode">详情</router-link>
                                </div>
                                <div class="right" v-else>
                                    <a class="delete" @click="showConfirm(!0, index)"><i class="delete-i"></i>删除订单</a>
                                </div>
                            </div>
                            <div class="flex-justify" v-if="item.state == 3">
                                <div class="left">订单已过期失效</div>
                                <div class="right" v-if="!isAdmin">
                                    <router-link to="/signUp">重新报名</router-link>
                                    <i class="line-s"></i>
                                    <router-link :to="'/signUp/orderDetail?orderCode=' + item.orderCode">详情</router-link>
                                </div>
                                <div class="right" v-else>
                                    <a class="delete" @click="showConfirm(!0, index)"><i class="delete-i"></i>删除订单</a>
                                </div>
                            </div>
                            <div class="flex-justify" v-if="item.state == 4">
                                <div class="left">退款日期：{{item.refundTime}}</div>
                                <div class="right" v-if="!isAdmin">
                                    <router-link to="/signUp">重新报名</router-link>
                                    <i class="line-s"></i>
                                    <router-link :to="'/signUp/orderDetail?orderCode=' + item.orderCode">详情</router-link>
                                </div>
                                <div class="right" v-else>
                                    <a class="delete" @click="showConfirm(!0, index)"><i class="delete-i"></i>删除订单</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <confirm-comp v-model="isShowConfirm" text="删除该订单？" @close="showConfirm(!1)" @ok="deleteOrder(orderList[popupIndex].orderCode)">
            </confirm-comp>
        </div>
    </order-layout>
</template>

<script type="text/ecmascript-6">
    import orderLayout from '../../layouts/orderLayout.vue'
    import confirmComp from '../../components/confirmComp.vue'
    import wechat from '../../js/wechat'
    import {timeToStr} from '../../js/base'
    export default {
        data () {
            return {
                isShowConfirm: false,
                isAdmin: false,
                orderList: [
                    {
                        "remainSecond": -1095,
                        "studentName": "测试",
                        "completeTime": "2017/08/09",
                        "orderCode": "1001",
                        "state": 1,
                        "paymentAmount": 3,
                        "subjectName": "语文"
                    },
                    {
                        "remainSecond": -1095,
                        "studentName": "测试",
                        "completeTime": "2017/08/09",
                        "orderCode": "1001",
                        "state": 2,
                        "paymentAmount": 3,
                        "subjectName": "数学"
                    },
                    {
                        "remainSecond": -1095,
                        "studentName": "测试",
                        "completeTime": "2017/08/09",
                        "orderCode": "1001",
                        "state": 3,
                        "paymentAmount": 3,
                        "subjectName": "法学"
                    },
                    {
                        "remainSecond": -1095,
                        "studentName": "测试",
                        "completeTime": "2017/08/09",
                        "orderCode": "1001",
                        "state": 4,
                        "paymentAmount": 3,
                        "subjectName": "物理",
                        refundTime: '2017/07/01'
                    }
                ],
                popupIndex: -1
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
            stateCls (val) {
                switch (val) {
                    case 1:
                        return 'unpaid'
                    case 2:
                        return ''
                    case 3:
                        return 'expired'
                    case 4:
                        return 'refunded'
                }
            },
            timeToStr (val) {
                return timeToStr(val)
            }
        },
        methods: {
            toggleAdmin (bool) {
                this.isAdmin = !this.isAdmin
            },
            showConfirm (bool, index) {
                this.isShowConfirm = bool
                this.popupIndex = index
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
            },
            deleteOrder (orderCode) {
                wechat.deleteOrder(orderCode, () => {
                    this.showConfirm(!1)
                    this.orderList.splice(this.popupIndex, 1)
                })
            },
            getOrderList () {
                base.ajax({
                    url: 'common/signUp/getOrderList',
                    data: {
                        openid: wechat.openid
                    },
                    success: (data) => {
                        this.orderList = data
                    }
                })
            }
        },
        created () {
            wechat.getOpenid(() => {
                this.getOrderList()
            })
        },
        components: {
            orderLayout,
            confirmComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/base.scss";
    .myOrderPage {
        .noOrder {
            text-align: center;
            color: #8e8e8e;
            font-size: 2.6rem;
            margin-top: 13.76rem;
        }
        .order {
            border-radius: 1rem;
            background: #fff;
            box-shadow: 0 0.1rem 0.5rem #bbb;
            margin-bottom: 1.5rem;
            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                border-bottom: 0.1rem solid #e8e8e8;
                padding: 1.9rem 1.5rem;
                line-height: 1;
                .left {
                    font-size: 1.3rem;
                    width: 70%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .right {
                    /*width: 30%;*/
                    font-size: 1rem;
                    color: #1bb906;
                }
                .unpaid {
                    color: #b90606;
                }
                .expired, .refunded {
                    color: #8e8e8e;
                }
            }
            .bd {
                padding: 1.6rem 1.5rem 1rem;
                .flex-justify {
                    margin-bottom: 1.2rem;
                    font-size: 1.2rem;
                    height: 2rem;
                    align-items: center;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    .right {
                        display: flex;
                        align-items: center;
                    }
                }
            }
            .price {
                color: #ffae3a;
            }
            a {
                color: #8e8e8e;
                font-size: 1.2rem;
            }
            .line-s {
                display: inline-block;
                height: 2rem;
                border-left: 0.1rem solid #e8e8e8;
                margin: 0 0.8rem;
            }
            .delete-i {
                margin-right: 0.2rem;
            }
        }
        .okBtn {
            background: $cl-g !important;
        }
    }
</style>
