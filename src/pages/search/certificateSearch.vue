<template>
    <div class="certificateSearch">
        <div class="searchComp-container">
            <search-comp @search="getCertificateList" :search-type="searchType" :placeholder="'请输入完整的身份证号码'"></search-comp>
        </div>
        <div class="main">
            <div class="certificate" v-for="item in certificateList">
                <div class="top">
                    <div class="flex">
                        <div class="th">证件名称：</div>
                        <div class="td">{{item.certificatesName}}</div>
                    </div>
                    <div class="flex">
                        <div class="flex">
                            <div class="th">姓名：</div>
                            <div class="td">{{item.studentName}}</div>
                        </div>
                        <div class="flex">
                            <div class="th">性别：</div>
                            <div class="td">{{item.sex == 1 ? '男' : '女' }}</div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="th">身份证号码：</div>
                        <div class="td">{{item.idCard}}</div>
                    </div>
                    <div class="flex">
                        <div class="th">公司名称：</div>
                        <div class="td">{{item.companyName}}</div>
                    </div>
                    <div class="flex">
                        <div class="th">快递单号：</div>
                        <div class="td">{{item.express}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div>
                        <div class="th">考试地点</div>
                        <div class="td">{{item.examAddress}}</div>
                    </div>
                    <div>
                        <div class="th">考试时间</div>
                        <div class="td">{{item.examDate}}</div>
                    </div>
                    <div>
                        <div class="th">考试结果</div>
                        <div class="td">{{item.state == 1 ? '及格' : '不及格' }}</div>
                    </div>
                </div>
            </div>
            <div class="noResult" v-if="!certificateList">
                暂无相关证件
            </div>
        </div>
    </div>
</template>

<script>
    import searchComp from '../../components/searchComp.vue'
    export default {
        data () {
            return {
                idCard: '',
                word: '',
                searchType: [
                    {
                        typeName: '身份证',
                        value: 1
                    }
                ],
                certificateList: []
            }
        },
        methods: {
            getCertificateList (obj) {
                base.ajax({
                    url: 'common/certificates/getCertificatesList',
                    data: {
                        idCard: obj.word
                    },
                    success: (data) => {
                        this.certificateList = data
                    },
                    error: (error) => {
                        if (error.status == 303) {
                            this.certificateList = null
                        }
                    }
                })
            }
        },
        components: {
            searchComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/_base.scss";
    .certificateSearch {
        .searchComp-container {
            padding: 1rem $padding/2;
            border-bottom: 0.1rem solid #e8e8e8;
            box-shadow: 0 0.1rem 0.1rem #e8e8e8;
        }
        .main {
            margin: 0 $padding/2;
            padding-bottom: 2rem;
        }
        .certificate {
            font-size: 1.2rem;
            box-shadow: 0 0.1rem 0.5rem #afafaf;
            margin-top: 1.5rem;
            .top {
                padding: 0.6rem 1rem;
                line-height: 2.1rem;
                .th {
                    color: #8e8e8e;
                    width: 7.5rem;
                }
                .flex > .flex:first-child {
                    width: 58%
                }
            }
            .bottom {
                display: flex;
                background: #ffb0b0;
                padding: 0.6rem 1rem 0.7rem;
                > div {
                    text-align: center;
                }
                > div:first-child {
                    width: 48%;
                }
                > div:nth-child(2) {
                    width: 30%;
                }
                > div:nth-child(3) {
                    width: 22%;
                }
                .th {
                    color: #fff;
                    line-height: 2rem;
                }
                .td {
                    font-size: 1rem;
                    line-height: 1.6rem;
                }
            }
        }
        .noResult {
            margin-top: 8.5rem;
            color: #8e8e8e;
            font-size: 2rem;
            text-align: center;
        }
    }
</style>
