<template>
    <div class="adminLoginPage">
        <div class="logo-container">
            <img src="../../img/logo_04.png"/>
        </div>
        <h1>安联后台查询系统</h1>
        <div class="form-container">
            <div class="input-container">
                <div class="icon-container">
                    <i class="user-i_01"></i>
                </div>
                <input type="text" placeholder="请输入后台账号" v-model="account" @change="clearErrorMsg()"/>
            </div>
            <div class="input-container">
                <div class="icon-container">
                    <i class="lock-i"></i>
                </div>
                <input type="password" placeholder="密码" v-model="password" @change="clearErrorMsg()"/>
            </div>
            <p class="errorTips">{{errorMsg}}</p>
            <button class="login" @click="login()">登 录</button>
        </div>
    </div>
</template>

<script>
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
                base.ajax({
                    url: 'web/signUpAdmin/login',
                    data: {
                        account: this.account,
                        password: this.password
                    },
                    success: (data) => {
                        this.$router.push('/admin/search')
                    },
                    error: (error) => {
                        if (error.status == 302) {
                            this.errorMsg = '用户名或密码的格式不正确'
                            return true
                        }
                        if (error.status == 406) {
                            this.errorMsg = '用户名或者密码错误'
                            return true
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/_base.scss";
    .adminLoginPage {
        position: relative;
        height: 100vh;
        background: #71c5f4;
        .logo-container {
            padding: 15vh 0 1rem;
            img {
                display: block;
                width: 9rem;
                height: 9rem;
                margin: 0 auto;
            }
        }
        h1 {
            text-align: center;
            font-size: 2rem;
            color: #ffffff;
            line-height: 4rem;
        }
        .form-container {
            width: 78%;
            margin: 0 auto;
        }
        .input-container {
            display: flex;
            margin: 1rem auto 0;
            height: 3.5rem;
            input {
                background: #fff;
                height: 100%;
                flex: 1;
                font-size: 1.3rem;
                line-height: 1;
                padding: 0 1rem;
                box-sizing: border-box;
            }
            .icon-container {
                width: 3.5rem;
                height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $cl-i;
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
            background: $cl-i;
        }
    }
</style>
