<template>
    <div class="searchPage">
        <div class="lessonSlt-container">
            <div class="left">
                <i class="lattice-i_02"></i>
                <span>课程名称</span>
            </div>
            <div class="right">
                <div class="select">{{subjectList[subjectChecked].subjectName}}</div>
                <select name="lessonSlt" v-model="subjectChecked">
                    <option v-for="item,index in subjectList" :value="index" @click="getSubjectId(item.subjectId)">{{item.subjectName}}</option>
                </select>
            </div>
        </div>
        <div class="searchComp-container">
            <search-comp @search="search" :search-type="searchType"></search-comp>
        </div>
        <div class="result" v-show="list && list.length > 0">
            <div class="table">
                <div class="thead">
                    <span>身份证后6位</span>
                    <span>姓名</span>
                    <span>手机号码</span>
                    <span>课程名称</span>
                </div>
                <div class="tr" v-for="item in list">
                    <span>{{item.idCard | behindSix}}</span>
                    <span>{{item.studentName}}</span>
                    <span>{{item.phone}}</span>
                    <span @click="showPopup($event)">{{item.subjectName}}</span>
                </div>
                <transition name="popup">
                    <div class="popup" v-if="popup.show" :style="popup.pos">
                        {{popup.text}}
                    </div>
                </transition>
            </div>
        </div>
        <div class="pagination-container" v-show="list">
            <pagination ref="pagination" :page-count="pageCount" @page-turn="pageTurn"></pagination>
        </div>
        <div class="noResult" v-show="!list">
            没该搜索信息
        </div>
    </div>
</template>

<script>
    import searchComp from '../../components/searchComp.vue'
    import pagination from '../../components/pagination.vue'
    import {mapMutations} from 'vuex'
    export default {
        data () {
            return {
                subjectChecked: 0,
                subjectList: [{
                    signUpSubjectId: '',
                    subjectName: '全部'
                }],
                searchType: [
                    {
                        typeName: '身份证',
                        value: 1
                    },
                    {
                        typeName: '姓名',
                        value: 2
                    },
                    {
                        typeName: '手机号',
                        value: 3
                    }
                ],
                searchWord: {
                    type: '',
                    word: ''
                },
                list: [],
                pageCount: 1,
                popup: {
                    text: '',
                    pos: {
                        top: '0',
                        left: '0'
                    },
                    show: false,
                    timer: 0
                }
            }
        },
        methods: {
            ...mapMutations(['Store_refreshSubjectIdWhenActive']),
            getSubjectId(id) {
                this.Store_refreshSubjectIdWhenActive(id)
            },
            getSubjectList () {
                base.ajax({
                    url: "common/signUp/getSignUpSubjectList",
                    data: {
                        state: 2
                    },
                    success: (data) => {
                        this.subjectList = this.subjectList.concat(data)
                    }
                })
            },
            search (obj) {
                this.searchWord = obj
                this.$refs.pagination.reset()
            },
            pageTurn (pageNo) {
                let studentName, idCard, phone
                switch (this.searchWord.type) {
                    case 1:
                        idCard = this.searchWord.word
                        break
                    case 2:
                        studentName = this.searchWord.word
                        break
                    case 3:
                        phone = this.searchWord.word
                        break
                }
                base.ajax({
                    url: 'web/signUpAdmin/getSignUpStudentList',
                    data: {
                        pageNo: pageNo,
                        pageSize: 2,
                        studentName: studentName,
                        idCard: idCard,
                        phone: phone,
                        signUpSubjectId: this.subjectList[this.subjectChecked].signUpSubjectId
                    },
                    success: (data) => {
                        this.pageCount = data.pageCount
                        this.list = data.signUpStudentList
                    },
                    error: (error) => {
                        if (error.status = 303) {
                            this.list = null
                        }
                    }
                })
            },
            showPopup: function (e) {
                clearTimeout(this.timer)
                if (this.popup.show) {
                    this.popup.show = false;
                    this.$nextTick(() => {
                        this.showPopup(e)
                    })
                } else {
                    this.popup.show = true;
                    this.timer = setTimeout(() => {
                        this.popup.show = false
                    },3000)
                    this.popup.text = e.target.innerText;
                    this.popup.pos.left = e.target.offsetLeft + 'px';
                    this.popup.pos.top = e.target.offsetTop + 'px';
                }
            }
        },
        filters: {
            behindSix (val) {
                return val.slice(-6);
            }
        },
        created () {
            this.getSubjectList()
        },
        components: {
            searchComp,
            pagination
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../css/_base.scss";
    .searchPage {
        padding-bottom: 2rem;
        .lessonSlt-container {
            display: flex;
            height: 3.8rem;
            margin: 1rem $padding/2;
            .left {
                width: 32%;
                height: 100%;
                padding: 0 1.5% 0 3%;
                box-sizing: border-box;
                border: 0.1rem solid #e8e8e8;
                display: flex;
                align-items: center;
                -webkit-box-pack: justify;
                justify-content: space-around;
                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;
            }
            i {
                display: block;
            }
            span {
                font-size: 1.2rem;
                color: #8e8e8e;
                font-weight: bold;
            }
            .right {
                position: relative;
                width: 68%;
                overflow: hidden;
                border: 0.1rem solid #e8e8e8;
                border-left: none;
                border-top-right-radius: 1rem;
                border-bottom-right-radius: 1rem;
            }
            .select {
                display: block;
                box-sizing: border-box;
                position: relative;
                width: 100%;
                height: 3.8rem;
                line-height: 3.8rem;
                font-size: 1.2rem;
                padding: 0 2.5rem 0 1.2rem;
                text-align: center;
                background: url("../../img/arrowDown-i_03.png") no-repeat scroll 94% center transparent;
                background-size: 0.75rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            select {
                @include customSelect("../../img/arrowDown-i_03.png", 0.75rem);
                box-sizing: border-box;
                height: 100%;
                width: 100%;
                line-height: 3.8rem;
                font-size: 1.2rem;
                padding: 0 2rem 0 1.2rem;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
        }
        .searchComp-container {
            margin: 1rem $padding/2 1.5rem;
        }
        .result {
            min-height: 36rem;
            font-size: 1.2rem;
        }
        .pagination-container {
            font-size: 1.4rem;
        }
        .noResult {
            background: #e5f1f8;
            font-size: 2rem;
            line-height: 9.4rem;
            text-align: center;
            color: #8e8e8e;
        }
        .popup {
            /*background: #e5f1f8;*/
            background: #3db8fe;
            border-radius: 0.4rem;
            /*border: 0.1rem solid #3db8fe;*/
            padding: 0.6rem 1rem 0.6rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            white-space: nowrap;
            font-size: 1.4rem;
            text-align: center;
            line-height: 1;
            color: #fff;
            transform: translate3d(-80%, -40%, 0) scale(1);
            transition: opacity,transform .2s linear;
            opacity: 1;
        }
        .popup-enter-active {
            transform: scale(1) translate3d(-80%, -40%, 0);
        }
        .popup-enter {
            transform: scale(0) translate3d(0, 0, 0);
        }
    }
    .table {
        font-size: inherit;
        text-align: center;
        position: relative;
        span {
            border-left: 0.1rem solid #fff;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(1) {
                min-width: 6em;
                width: 6em;
                flex: 1;
                border-left: none;
            }
            &:nth-child(2) {
                min-width: 4em;
                width: 4em;
                flex: 1;
            }
            &:nth-child(3) {
                min-width: 8em;
                width: 8em;
                flex: 1.2;
            }
            &:nth-child(4) {
                flex: 2;
            }
        }
        .thead {
            span {
                background: #71c5f4;
                line-height: 2.9rem;
                color: #101010;
            }
            display: flex;
        }
        .tr {
            display: flex;
            border-top: 0.1rem solid #fff;
            span {
                background: #e5f1f8;
                line-height: 3.1rem;
            }
        }
    }
</style>
