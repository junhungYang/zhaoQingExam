<template>
    <div class="orderLayout">
        <h3 class="orderLayout-title">{{title}}</h3>
        <button class="linkBtn" @click="emit()" v-if="linkBtnText">{{linkBtnText}}</button>
        <div class="orderLayout-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'linkBtnText'],
        methods: {
            emit () {
                this.$emit('click-btn')
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .orderLayout {
        background: url("../img/top-bg.png") no-repeat;
        background-size: 100%;
        position: relative;
        min-height: 27.5rem;
        & > .linkBtn {
            position: absolute;
            right: $padding/2;
            top: 0.9rem;
            width: 4rem;
            height: 4rem;
            padding: 0.5rem 0.5rem;
            border-radius: 50%;
            color: #fff;
            border: 0.1rem solid #fff;
            font-size: 1.2rem;
            text-align: center;
            line-height: 1.5rem;
        }
    }
    .orderLayout-title {
        text-align: center;
        font-size: 1.8rem;
        line-height: 5.8rem;
        color: #ffffff;
    }
    .orderLayout-content {
        margin: 0 $padding;
    }
</style>
