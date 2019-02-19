<template>
    <div class="header-a">
        <h6>
            <slot>&nbsp;</slot>
        </h6>
        <div class="homeBtn-a-container" v-if="homeBtn">
            <router-link class="homeBtn-a" to="/">
                <div>
                    <i class="home-i_01"></i>
                    首页
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            homeBtn: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .header-a {
        background: #fff;
        position: relative;
        border-bottom: 0.1rem solid #e8e8e8;
    }
    .header-a h6 {
        color: $cl-a;
        line-height: 5.5rem;
        padding-top: 0.6rem;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
    }
    .homeBtn-a-container {
        position: absolute;
        top: 0.9rem;
        right: 3.2%;
    }
    .homeBtn-a {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        height: 4.5rem;
        width: 4.5rem;
        box-shadow: 0 0 0.2rem #ccc;
        border-radius: 50%;
        color: #8e8e8e;
    }
    .homeBtn-a .home-i_01 {
        display: block;
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
        background: url("../img/home-i_01.png");
        background-size: 2rem;
    }
</style>
