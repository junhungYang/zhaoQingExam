<template>
    <div class="practisePage">
        <header-b
                :questionSlt="paperType == 1"
                :progress="paperType == 1 "
                :title="paperType == 1 ? '顺序练习' : paperType == 2 ? '随机练习' : '错题练习'"
        >
        </header-b>
        <div class="question-container">
            <question-comp></question-comp>
        </div>
        <operate-comp :isPractise="true"></operate-comp>
    </div>
</template>

<script>
    import headerB from '../components/header-b.vue'
    import questionComp from '../components/questionComp.vue'
    import operateComp from '../components/operateComp.vue'
    export default {
        computed: {
            paperType () {
                return this.$store.state.question.paperType
            }
        },
        components: {
            headerB,
            questionComp,
            operateComp
        },
        created: function () {
            this.$store.commit('setPaperType', this.$route.query.type)
            if (this.$route.query.type == 1) {
                this.$store.dispatch('getPractiseQues', {})
            } else {
                this.$store.dispatch('getPractiseQues', {sort: 1})
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .practisePage .question-container {
        padding: 1rem $padding/2 1rem;
    }
</style>
