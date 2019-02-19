<template>
    <div class="pwChangePage">
        <header-a :home-btn="false">—修改密码—</header-a>
        <div class="main">
            <div class="input-container">
                <div class="icon-container">
                    <i class="lock-i"></i>
                </div>
                <input placeholder="请输入原密码" type="password" v-model="originalPwd" @change="clearErrorMsg()"/>
            </div>
            <div class="input-container">
                <div class="icon-container">
                    <i class="lock-i"></i>
                </div>
                <input placeholder="请输入新密码" type="password" v-model="newPwd" @change="clearErrorMsg()"/>
            </div>
            <div class="input-container">
                <div class="icon-container">
                    <i class="lock-i"></i>
                </div>
                <input placeholder="请重复输入新密码" type="password" v-model="repetitionNewPwd" @change="clearErrorMsg()"/>
            </div>
            <p class="errorTips">{{errorMsg}}</p>
            <button class="btn-a" @click="submit()">修改密码</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import headerA from '../components/header-a.vue'
    export default {
        data () {
            return {
                originalPwd: '',
                newPwd: '',
                repetitionNewPwd: '',
                errorMsg: ''
            }
        },
        watch: {
            originalPwd: 'clearErrorMsg',
            newPwd: 'clearErrorMsg',
            repetitionNewPwd: 'clearErrorMsg'
        },
        methods: {
            clearErrorMsg () {
                this.errorMsg = ''
            },
            submit () {
                base.ajax({
                    url: 'wap/student/modifyPassWord',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id,
                        originalPwd: this.originalPwd,
                        newPwd: this.newPwd,
                        repetitionNewPwd: this.repetitionNewPwd
                    },
                    success: (data) => {
                        this.$store.commit('showToast', '密码修改成功')
                        this.newPwd = ''
                        this.repetitionNewPwd = ''
                        this.originalPwd = ''
                    },
                    error: (error) => {
                        if (error.status == 302) {
                            this.errorMsg = '密码的格式不正确'
                            return true
                        }
                        if (error.status == 104) {
                            this.errorMsg = '原密码不正确'
                            return true
                        }
                        if (error.status == 104) {
                            this.errorMsg = '两次输入的密码不一致'
                            return true
                        }
                    }
                })
            }
        },
        components: {
            headerA
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../css/_base.scss';
    .pwChangePage {
        .main {
            margin: 0 $padding;
        }
        .input-container {
            display: flex;
            margin: 0 auto;
            padding-top: 2rem;
            .icon-container {
                width: 3.5rem;
                height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: $cl-b;
            }
            input {
                flex: 1;
                height: 3.5rem;
                font-size: 1.3rem;
                padding: 0 1.8rem;
                background-color: #f5f5f5;
            }
        }
        .errorTips {
            font-size: 1.2rem;
            color: $cl-e;
            line-height: 3rem;
            /*padding-left: 53px;*/
            min-height: 3rem;
        }
        .btn-a {
            margin-top: 1rem;
        }
    }
</style>
