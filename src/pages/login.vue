<template>
    <div class="loginPage">
        <header>
            <img src="../img/LOGO.png" alt="">
            <p>肇庆市交通技工学校</p>
        </header>
        <div class="form-container">
            <div class="input-container">
                <div class="icon_pic">
                    <img src="../img/user_logo.png" alt="">
                </div>
                <input type="text" placeholder="请输入您的身份证号码" v-model="account" @change="clearErrorMsg()"/>
            </div>
            <div class="input-container">
                <div class="icon_pic">
                    <img src="../img/pwd_logo.png" alt="">
                </div>
                <input type="password" placeholder="请输入密码" v-model="password" @change="clearErrorMsg()"/>
            </div>
            <p class="errorTips">{{errorMsg}}</p>
            <button class="login" @click="login()">登 录</button>
        </div>
        <div class="bottom">
            <!--<img src="../img/login-bottom.png">-->
            <!-- <img class="qrcode" src="../img/qrcode.jpg"> -->
        </div>
        <!-- <background></background> -->
    </div>
</template>

<script>
    import background from '../layouts/background.vue'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        data () {
            return {
                account: '',
                password: '',
                errorMsg: ''
            }
        },
        watch: {
            account: 'clearErrorMsg',
            password: 'clearErrorMsg'
        },
        methods: {
            clearErrorMsg () {
                this.errorMsg = ''
            },
            login () {
                let dataObj = {
                        account: this.account,
                        password: this.password
                    }
               
                base.ajax({
                    url: 'wap/student/login',
                    data: {
                        account: this.account,
                        password: this.password
                    },
                    success: (data) => {
                        this.$store.commit('setLoginInfo', {id: data.studentId, name: data.studentName, token: data.token})
                        this.$router.push('/')
                    },
                    error: (error) => {
                        if (error.status == 302) {
                            this.errorMsg = '用户名或密码的格式不正确, 请重新输入'
                            return true
                        }
                        if (error.status == 100) {
                            this.errorMsg = '用户名或者密码错误, 请重新输入'
                            return true
                        }
                        return false
                    }
                })
            }
        },
        mounted () {
            // 安卓处理输入法框影响background
            document.getElementsByClassName('loginPage')[0].style.minHeight = window.innerHeight + 'px'
        },
        components: {
            background
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .loginPage {
        position: relative;
        background: linear-gradient(#fdefdd,#5ac5f3);
        header {
            img {
                width: 10rem;
                height: 10rem;
                margin: 0 auto;
                display: block;
                padding-top: 4.17rem;
            }
            p {
                margin-top: 1rem;
                text-align: center;
                font-size: 1.67rem;
                color: #fff;
            }
        }
        .logo-container {
            padding: 4.5rem 0 3rem;
            img:first-of-type {
                display: block;
                width: 10rem;
                /*height: 13.8rem;*/
                margin: 0 auto;
                // margin: 1rem auto 2rem;
            }
        
            img:last-of-type {
                width: 10rem;
                display: block;
                margin: 1rem auto 0 auto;
            }
            @media screen and (max-width: 374px) {
                img:first-of-type {
                        width: 7.5rem
                }
                img:last-of-type {
                    width: 7.5rem;
                     margin: 1rem auto 0 auto;
                }
            
            }
        }
        .form-container {
            width: 78%;
            margin: 0 auto;
        }
        .input-container {
            display: flex;
            margin: 2rem auto 0;
            height: 3.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
                  background: #fff;
            input {
                height: 100%;
                flex: 1;
                font-size: 1.3rem;
                line-height: 1;
                padding: 0 1rem;
                box-sizing: border-box;
                color: #555555;
            }
            .icon_pic {
                width: 4.2rem;
                height: 2.4rem;
                border-right: 1px solid  #eee;
                align-self: center;
                position: relative;
                img {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    height: 1.4rem;
                }
            }
        }
        .errorTips {
            font-size: 1.2rem;
            color: #ff4e4e;
            line-height: 3rem;
            min-height: 3rem;
        }
        .login {
            display: block;
            width: 100%;
            color: #fff;
            font-size: 1.5rem;
            height: 3.5rem;
            line-height: 3.5rem;
            border-radius: 0.5rem;
            background: #3db8fe;
            font-size: 1.4rem;
        }
        .bottom {
            width: 100%;
            margin-top: 2rem;
            img {
                width: 100%;
            }
            .qrcode {
                width: 100px;
                margin: 0 auto;
                display: block;
            }
        }
    }
</style>
