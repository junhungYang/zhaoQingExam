<template>
    <div class="myInfoPage">
        <header-a>—我的资料—</header-a>
        <div class="main">
            <div class="flex">
                <div class="left">
                    <div class="th">
                        姓名:
                    </div>
                    <div class="td">{{studentInfo.studentName}}</div>
                </div>
                <div class="right">
                    <div class="th">
                        性别:
                    </div>
                    <div class="td">{{studentInfo.sex}}</div>
                </div>
            </div>
            <div class="flex">
                <div class="left">
                    <div class="th">
                        登录次数:
                    </div>
                    <div class="td">{{studentInfo.loginFrequency}}</div>
                </div>
                <div class="right">
                    <div class="th">
                        年龄:
                    </div>
                    <div class="td">{{studentInfo.age}}</div>
                </div>
            </div>
            <div class="flex">
                <div class="left">
                    <div class="th">
                        手机号码:
                    </div>
                    <div class="td">{{studentInfo.mobilePhoneNumber}}</div>
                </div>
            </div>
            <div class="flex">
                <div class="left">
                    <div class="th">
                        身份证号码:
                    </div>
                    <div class="td">{{studentInfo.idCard}}</div>
                </div>
            </div>
            <div class="flex">
                <div class="left">
                    <div class="th">
                        报名科目:
                    </div>
                    <div class="td">
                        <ul>
                            <li v-for="item in studentInfo.signUpSubjectList">
                                {{item.subjectName}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="left">
                    <div class="th">
                        所获证件:
                    </div>
                    <div class="td">
                        <ul>
                            <li v-for="item in studentInfo.certificatesList">
                                {{item.certificatesName}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <router-link class="btn-a" to="pwChange">修改密码</router-link>
        </div>
    </div>
</template>

<script>
    import headerA from '../components/header-a.vue'
    export default {
        data () {
            return {
                a: 'b'
            }
        },
        computed: {
            studentInfo () {
                return this.$store.state.studentInfo || {}
            }
        },
        created () {
            this.$store.dispatch('getStudentInfo')
        },
        components: {
            headerA: headerA
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .myInfoPage {
        .main {
            margin: 0 $padding;
            font-size: 1.2rem;
        }
        .th {
            color: #8e8e8e;
        }
        .flex {
            margin-top: 1.8rem;
            .left {
                display: flex;
                flex: 1;
                width: 70%;
                .th {
                    width: 7.5rem;
                }
            }
            .right {
                display: flex;
                width: 30%;
                .th {
                    width: 4rem;
                }
            }
        }
        li {
            margin-bottom: 0.3rem;
        }
        .btn-a {
            margin-top: 10rem;
        }
    }
</style>
