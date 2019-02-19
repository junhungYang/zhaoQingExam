<template>
    <div class="errorConfirm">
        <confirm-comp
                v-model="isShowConfirm"
                :text="confirmText"
                cancel-text=""
                @close="showConfirm(!1)"
                @ok="ok()">
        </confirm-comp>
    </div>
</template>

<script>
    import confirmComp from './confirmComp.vue'
    export default {
        computed: {
            confirmText () {
                return this.$store.state.errorConfirm.text
            },
            isShowConfirm () {
                return this.$store.state.errorConfirm.isShow
            }
        },
        methods: {
            showConfirm (bool) {
                this.$store.commit('showConfirm', {})
            },
            ok () {
                this.$store.commit('confirmOk')
            }
        },
        components: {
            confirmComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .errorConfirm .btnBox a {
        background: #fff;
        color: #353535;
        font-size: 1.3rem;
    }
</style>
