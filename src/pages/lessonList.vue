<template>
    <div class="lessonList">
       <header>
           <span>—课程详解—</span>
           <div @click="navToHomePage">
               <img src="../img/gohome.png">
               <p>首页</p>
           </div>
       </header>
       <div class="bigList-wrap">
           <ul class="big-list">
               <li class="big-list-item" v-for="item,index in chapterBigList" :key="item.id">
                   <div class="big-title"  @click="spread(index)">
                       <span>{{item.chapterName}}</span>
                       <img :class="item.spreadState ? 'down' : 'up'" src="../img/up.png" alt="">
                   </div>
                    <transition name="smListWrap">
                        <div v-show="item.spreadState" class="smList-wrap">
                                <ul class="sm-list">
                                    <li class="sm-list-item" v-for="smItem,smIndex in item.sectionList" :key="smItem.id" @click="navToDetail(item.sectionList,smIndex)">
                                        <div class="left">
                                            {{smItem.name}}
                                        </div>
                                        <div class="right">
                                            <img v-if="smItem.isRead === '1'" src="../img/readed.png" alt="" srcset="">
                                            <img v-else src="../img/unRead.png" alt="" srcset="">
                                        </div>
                                    </li>
                                </ul>
                        </div>
                    </transition>
               </li>
           </ul>
       </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import {mapMutations} from 'vuex'
const REQ_CHAPTER_LIST = '/api/zqjtjx/common/explanation/getChapter'
const REQ_SECTION_LIST = '/api/zqjtjx/common/explanation/getExplanation'
export default {
    data() {
        return {
            chapterBigList: []
        }
    },
    created() {
        this.getChapterList()
    },
    methods: {
        ...mapMutations(['Store_changeActiveLesson']),
        getChapterList(data) {
            axios.post(REQ_CHAPTER_LIST,qs.stringify(data)).then((res) => {
                this.chapterBigList = res.data.data
                this.getSectionList()
            })
        },
        getSectionList() {
            let newChapterList = JSON.parse(JSON.stringify(this.chapterBigList))
            let promiseList = newChapterList.map(item => {
                return axios.post(REQ_SECTION_LIST,qs.stringify({id: item.id})).then(res => {
                    item.sectionList = res.data.data
                    item.spreadState = false
                })
            })
            Promise.all(promiseList).then(() => this.chapterBigList = newChapterList)
        },
        spread(index) {
            if(this.chapterBigList[index].spreadState !== undefined) {
                 this.chapterBigList[index].spreadState = !this.chapterBigList[index].spreadState
            }
        },
        navToHomePage() {
            this.Store_changeActiveLesson()
            this.$router.push('/')
        },
        navToDetail(sectionList,index) {
            const obj = {
                activeList: JSON.parse(JSON.stringify(sectionList)),
                activeIndex: index
            }
            this.Store_changeActiveLesson(obj)
            // this.$router()
        }
    }
}
</script>

<style lang="scss"scoped>
.lessonList {
    min-height: 100vh;
    background: #f5f5f5;
    header {
        height: 5.83rem;
        background: #fff;
        text-align: center;
        position: relative;
        span {
            line-height: 5.83rem;
            font-size: 1.33rem;
            color: #1584da;
        }
        div {
            width: 4.13rem;
            height: 4.13rem;
            border-radius: 50%;
            box-shadow: 0 0px 0.3rem rgba(0,0,0,0.2);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0.83rem;
            img {
                margin-top: 0.5rem;
                width: 1.75rem;
            }
            p {
                font-size: 1rem;
                color: #8e8e8e;
            }
        }
    }
    .bigList-wrap {
        margin-top: 1rem;
        .big-list {
            .big-list-item {
                // background: #fff;
                          overflow: hidden;
                margin-top: 1rem;
                position: relative;
                min-height: 4.17rem;
                &:first-of-type {
                    margin-top: 0;
                }
                .big-title {
                    height: 4.17rem;
                    border-bottom:1px solid #ececec;
                    position: absolute;
                    text-align: center;
                    background: #fff;
                    left: 0;
                    width: 100%;
                    top: 0;
                    z-index: 5;
                    span {
                        line-height: 4.17rem;
                        font-weight: bold;
                        font-size: 1.5rem;
                        color: #353535;
                    }
                    img {
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 1rem;
                        transition: all .3s linear;
                    }
                    .up {
                        transform: translateY(-50%) rotate(0deg);
                    }
                    .down {
                        transform: translateY(-50%) rotate(180deg)
                    }
                }
                .smList-wrap {
                    padding-top: 4.17rem;
                    position: relative;
                    .sm-list {
                        .sm-list-item {
                            padding-left: 1.9rem;
                            height: 4.17rem;
                            border-bottom:1px solid #ececec;
                            display: flex;
                            align-items: center;
                            background: #fff;
                            .left {
                                flex: 1;
                                font-size: 1.25rem;
                                color: #353535;
                            }
                            .right {
                                height: 2.25rem;
                                width: 3.58rem;
                                img {
                                    width: 100%;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
}
.smListWrap-enter,.smListWrap-leave-to {
    margin-top: -100%;
    // transform: translateY(-100%)
}
.smListWrap-leave,.smListWrap-enter-to {
    margin-top: 0;
    // transform: translateY(0)
}
.smListWrap-enter-active,.smListWrap-leave-active {
    transition: all 0.5s ease-in
}
</style>
