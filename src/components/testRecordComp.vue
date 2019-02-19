<template>
    <table class="testRecord" cellspacing="1px" cellpadding="0">
        <thead>
        <tr>
            <th class="small">序号</th>
            <th>耗时</th>
            <th>正确率</th>
            <th>成绩</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in testRecordList">
            <td>{{item.sort}}</td>
            <td>{{item.sumExamMinute}}</td>
            <td>{{item.correctRate}}</td>
            <td>{{item.totalScore}}</td>
            <td>
                <router-link class="btn" :to="'/test?testId=' + item.examId">{{item.state == 1 ? '开始' : item.state == 2 ? '继续' : '查阅'}}</router-link>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        props: ['testRecordList']
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .testRecord {
        width: 100%;
        text-align: center;
    }
    .testRecord th {
        background: $cl-b;
        font-size: 1.2rem;
        color: #fff;
        height: 3rem;
        line-height: 3rem;
    }
    .testRecord td {
        font-size: 1.2rem;
        background: $cl-c;
        color: #8e8e8e;
        height: 3.5rem;
        line-height: 3.5rem;
    }
    .testRecord .btn {
        color: $cl-b;
        background: #fff;
        line-height: 1.8rem;
        padding: 0 0.5rem;
        border-radius: 0.4rem;
    }
</style>
