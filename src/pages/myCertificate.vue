<template>
    <div class="myCertificatePage">
        <header-a>—我的证件—</header-a>
        <div class="main">
            <ul class="certificateList">
                <li v-for="item,index in certificateList">
                    <div class="certificate">
                        <div class="header" @click="show(index)">
                            <div class="name">{{item.certificatesName}} <em>({{item.state == 1 ? '已发证' : '未通过'}})</em> </div>
                            <div class="serialNum">编号：{{item.serialNumber}}</div>
                            <div>下次复审时间：{{item.nextReviewDate}}</div>
                            <div class="flex-justify">
                                <div>证件到期时间：{{item.certificatesExpireDate}}</div>
                                <button>
                                    查看成绩情况
                                    <i class="arrow-i" :class="{down: !item.isShow }"></i>
                                </button>
                            </div>
                            <div class="remark">备注：{{item.remake}}</div>
                        </div>
                        <!--<transition name="tan">-->
                            <!--<div class="content" v-show="isShowList[index]">-->
                                <div class="content" v-show="item.isShow">
                                <div class="subject" v-for="subItem in item.gradeInfoList">
                                    <div class="name">{{subItem.subjectName}}</div>
                                    <div class="flex-justify">
                                        <div class="left">
                                            <div class="th">
                                                模拟考次数:
                                            </div>
                                            <div class="td">
                                                {{subItem.examFrequency}}次
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="th">
                                                平均分:
                                            </div>
                                            <div class="td">
                                                {{subItem.avgScore}}分
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex-justify">
                                        <div class="left">
                                            <div class="th">
                                                最高分:
                                            </div>
                                            <div class="td">
                                                {{subItem.maxScore}}分
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="th">
                                                最低分:
                                            </div>
                                            <div class="td">
                                                {{subItem.minScore}}分
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!--</transition>-->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import headerA from '../components/header-a.vue'
    export default {
        data () {
            return {
                certificateList: [],
                isShowList: []
            }
        },
        methods: {
            show (index) {
                this.certificateList[index].isShow = !this.certificateList[index].isShow
                this.$set(this.certificateList, index, this.certificateList[index])
            },
            getCertificateList () {
                base.ajax({
                    url: 'wap/student/getCertificatesInfoList',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id
                    },
                    success: (data) => {
                        this.certificateList = data
                        this.certificateList.forEach((item) => {
                            item.isShow = true
                        })
                    }
                })
            }
        },
//        watch: {
//            certificateList () {
//                document.querySelectorAll('.certificate .content').forEach(function (item) {
//                    item.style.height = item.offsetHeight + 'px';
//                })
//            }
//        },
        created () {
            this.getCertificateList()
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
            headerA: headerA
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../css/_base.scss';

    .myCertificatePage {
        .main {
            padding-top: 2rem;
        }
        .certificateList li {
            margin-bottom: 1rem;
        }
        .certificate {
            width: 30rem;
            margin: 0 auto;
            overflow: hidden;
            .header {
                padding: 0.6rem 0.9rem 0.5rem;
                background: $cl-a;
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
                color: #fff;
                font-size: 1.2rem;
                position: relative;
                z-index: 1;
                line-height: 2.1rem;
                .name {
                    font-size: 1.5rem;
                    text-align: center;
                    em {
                        font-size: 1.2rem;
                    }
                }
            }
            .serialNum {
                text-align: center;
            }
            button {
                color: #fff;
                font-size: 1rem;
            }
            .arrow-i {
                display: inline-block;
                vertical-align: middle;
                margin: -0.4rem 0 0 0.5rem;
                width: 1.5rem;
                height: 1.5rem;
                background: url("../img/arrowUp-i.png") no-repeat;
                background-size: 1.5rem;
                &.down {
                    background-image: url("../img/arrowDown-i.png");
                }
            }
            .content {
                background: #fff;
                font-size: 1.2rem;
                line-height: 2rem;
                box-sizing: border-box;
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                .left {
                    display: flex;
                    justify-content: space-between;
                    width: 40%;
                }
                .right {
                    display: flex;
                    justify-content: space-between;
                    width: 33%;
                    margin-right: 2rem;
                }
            }
            .subject {
                padding: 0 0.9rem;
                &:last-child {
                    padding-bottom: 0.5rem;
                }
                .name {
                    text-align: center;
                    padding-top: 0.5rem;
                }
            }
            .th {
                white-space: nowrap;
            }
            .td {
                color: #8e8e8e;
            }
        }
    }
    .tan-enter-active, .tan-leave-active {
        transition: height 5s ease-out;
    }
    .tan-enter, .tan-leave-to {
        height: 0 !important;
    }
</style>
