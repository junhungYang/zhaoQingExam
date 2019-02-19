<template>
    <div class="header-container">
        <div class="header-b" v-if="!questionSlt">
            <div class="left" v-if="progress">
                <div class="completed" >已完成 {{totalFinished}}/{{totalQuestion}}</div>
            </div>
            <div class="left" v-else>
                <slot name="left">&nbsp;</slot>
            </div>
            <div class="mid">
                <h6 class="midH" v-if="title">{{title}}</h6>
                <slot name="mid" v-else>&nbsp;</slot>
            </div>
            <div class="right">
                <router-link class="btn-c" to="/" v-if="home"><i class="home-i_02"></i>首页</router-link>
                <slot name="right" v-else>&nbsp;</slot>
            </div>
        </div>
        <div class="header-b" v-else>
            <div class="left" v-if="home">
                <router-link class="btn-c" to="/" v-if="!isShowSlt"><i class="home-i_02"></i>首页</router-link>
                <div v-else>&nbsp;</div>
            </div>
            <div class="left" v-if="progress">
                <div class="completed" >已完成 {{totalFinished}}/{{totalQuestion}}</div>
            </div>
            <div class="mid" v-if="title" v-show="!isShowSlt">
                <h6 class="midH">{{title}}</h6>
            </div>
            <div class="mid" v-show="!isShowSlt" v-if="!title">
                <slot name="mid">&nbsp;</slot>
            </div>
            <div class="mid" v-show="isShowSlt">
                <span class="title">选择题号</span>
            </div>
            <div class="right">
                <a v-if="!isShowSlt" class="btn-c"  @click="showSlt(!0)"><i class="lattice-i"></i>选择题号</a>
                <a class="btn-c cancel" v-else  @click="showSlt(!1)">取消</a>
            </div>
        </div>
        <question-slt v-model="isShowSlt" @close="showSlt(!1)"></question-slt>
    </div>
</template>

<script>
    import questionSlt from '../components/questionSlt.vue'
    export default {
        props: ['title', 'home', 'questionSlt', 'progress'],
        data () {
            return {
                isShowSlt: false
            }
        },
        computed: {
            totalFinished () {
                return this.$store.state.question.totalFinished
            },
            totalQuestion () {
                return this.$store.state.question.totalQuestion
            }
        },
        methods: {
            showSlt: function (bool) {
                this.isShowSlt = bool
            }
        },
        components: {
            questionSlt
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .header-container {
        position: relative;
        height: 4.3rem;
        z-index: 10;
    }
    .header-b {
        position: relative;
        height: 4.3rem;
        padding: 0 $padding/2;
        background: $cl-b;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
        .completed {
            font-size: 1.2rem;
            color: #fff;
        }
        .title {
            font-size: 1.4rem;
            color: #fff;
        }
        .cancel {
            width: 5.7rem;
        }
        .mid {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            height: 4.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: -1;
        }
        .midH {
            line-height: 4.3rem;
            font-size: 1.5rem;
            color: #fff;
            font-weight: bold;
        }
    }
    .home-i_02 {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: url("../img/home-i_02.png") center no-repeat;
        background-size: 1.2rem;
        vertical-align: middle;
    }
</style>
