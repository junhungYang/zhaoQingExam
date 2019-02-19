<template>
    <div class="classInfoPage">
        <header-a>—开班信息—</header-a>
        <ul class="infoList">
            <li v-for="item in classInfoList">
                <router-link :to="'/classDetail?classInfoId=' + item.classInfoId">
                    <p class="title">{{item.title}}</p>
                    <p class="date">{{item.createDate}}</p>
                </router-link>
            </li>
        </ul>
        <router-link to="/signUp" class="btn-a">前往报名</router-link>
    </div>
</template>

<script>
    import headerA from '../components/header-a.vue'
    export default {
        data () {
            return {
                infoList: []
            }
        },
        computed: {
            classInfoList () {
                return this.$store.state.classInfoList
            }
        },
        beforeRouteEnter (to, from, next) {
            addClass(document.body,'bg-f5f5f5')
            next()
        },
        beforeRouteLeave (to, from, next) {
            removeClass(document.body,'bg-f5f5f5')
            next()
        },
        created () {
            this.$store.dispatch('getClassInfoList')
        },
        components: {
            headerA
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .classInfoPage {
        .infoList {
            margin-top: 1rem;
            min-height: 60vh;
            li {
                a {
                    padding: 1.5rem $padding/2;
                    margin-bottom: 0.6rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1.2rem;
                    line-height: 1;
                    border-bottom: 0.1rem solid #e8e8e8;
                    background: #fff;
                    color: #353535;
                }
            }
            .date {
                margin-left: 2rem;
                color: #8e8e8e;
            }
        }
        .btn-a {
            margin: 2rem $padding;
            width: 100 - $padding * 2;
        }
    }
</style>
