<template>
    <div class="testRecordPage">
        <header-a>—考试记录—</header-a>
        <div class="main">
            <test-record-comp :test-record-list="testRecord"></test-record-comp>
        </div>
    </div>
</template>

<script>
    import headerA from '../components/header-a.vue'
    import testRecordComp from '../components/testRecordComp.vue'
    export default {
        computed: {
            testRecord () {
                return this.$store.state.testRecord
            }
        },
        created () {
            this.$store.dispatch('getTestRecord')
        },
        components: {
            headerA: headerA,
            testRecordComp: testRecordComp
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .testRecordPage .main {
        margin: 2rem $padding/2;
    }
</style>
