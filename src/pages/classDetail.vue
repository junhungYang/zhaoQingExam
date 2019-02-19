<template>
    <div class="classDetailPage">
        <h3 class="title">{{classDetail.title}}</h3>
        <p class="date">{{classDetail.createDate}}</p>
        <div class="content" v-html="classDetail.content"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                classDetail: {}
            }
        },
        methods: {
            getClassDetail () {
                base.ajax({
                    url: 'wap/classInfo/getClassInfoById',
                    data: {
                        token: this.$store.state.loginInfo.token,
                        studentId: this.$store.state.loginInfo.id,
                        classInfoId: this.$route.query.classInfoId
                    },
                    success: (data) => {
                        this.classDetail = data
                    }
                })
            }
        },
        created () {
            this.getClassDetail()
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .classDetailPage {
        padding: 0 $padding;
        .title {
            font-size: 1.8rem;
            text-align: center;
            margin: 1rem 0;
        }
        .date {
            font-size: 1.2rem;
            line-height: 1.5rem;
            margin: 0.5rem 0;
            text-align: right;
            color: #8e8e8e;
        }
        .content {
            font-size: 1.2rem;
        }
    }
</style>
