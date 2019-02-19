<template>
    <div v-show="pageCount > 1" class="pagination">
        <a @click="pageNum > 1 && pageNum--" :class="{disabled : pageNum == 1}"> 上一页 </a>
        <span>&nbsp;<em>{{pageNum}}</em><i>/</i>{{pageCount}}&nbsp;</span>
        <a @click="pageNum < pageCount && pageNum++" :class="{disabled : pageNum == pageCount}"> 下一页  </a>
    </div>
</template>
<script>
    /**
     * @module pagination
     */
    export default {
        // 从父组件处获取pageCount 总页码
        props: ['pageCount'],
        data () {
            return {
                pageNum: 1
            }
        },
        watch: {
            /**
             * @fires pagination#pageturn
             */
            pageNum: function(){
                /**
                 * @event pagination#pageturn
                 * @type {number}   this.pageNum
                 */
                this.$emit('page-turn',this.pageNum)
            }
        },
        methods: {
            reset () {
                if (this.pageNum == 1) {
                    this.$emit('page-turn',this.pageNum)
                }
                this.pageNum = 1
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/base.scss";
    .pagination{
        text-align: center;
        font-size: inherit;
        em{
            color: $cl-i;
        }
        i {
            margin: 0 0.1rem;
        }
        a:first-child:before{
            content: "<";
            font-size: 1.25em;
            position: relative;
            /*top: -1px;*/
        }
        a:last-child:after{
            content:">";
            font-size: 1.25em;
            position: relative;
            /*top: -1px;*/
        }
        a:hover{
            cursor: pointer;
        }
        a.disabled{
            color: #8e8e8e;
        }
        a.disabled:hover{
            cursor: default;
        }
    }
</style>
