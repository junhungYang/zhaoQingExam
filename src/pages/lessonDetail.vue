<template>
    <div class="lessonDetail-wrap">
        <div class="top">
            <router-link to="/lessonList" tag="div" class="nav list">
                <img src="../img/list.png" alt="" class="back">
                <p>返回目录</p>
            </router-link>
            <p class="title">{{lessonInfo.name}}</p>
            <div class="nav prev" @click="prev">
                <img src="../img/prev.png" alt="" class="prev-i">
                <p>前往上一节</p>
            </div>
        </div>
        <div class="content" v-html="lessonInfo.content"></div>
        <div class="next" @click="next">
            <img src="../img/arrowDown-i_04.png" alt="">
            <p>点击前往下一章节</p>
            <img src="../img/arrowDown-i_04.png" alt="">
        </div>
        <transition name="fade">
            <div class="mask" v-if="showMask">您已成功阅读所有章节</div>
        </transition>
    </div>
</template>

<script>
	import axios from 'axios'
	import qs from 'qs'
	import { mapState } from 'vuex'

	const REQ_LESSON_DETAIL = 'http://zqjtjx.yukedaonline.com/zqjtjx/common/explanation/getExplanationContent'
	export default {
		data() {
			return {
				lessonInfo: {},
				showMask: false,
				activeIndex: 0
			}
		},
		created() {
			if (!this.subjectChecked) return this.$router.replace('/')
			this.activeIndex = this.$store.state.Store_actionLesson.activeIndex
			this.getLessonDetail()
		},
		computed: {
			...mapState(['subjectChecked']),
			studentId() {
				return this.$store.state.loginInfo.id || false
			},
			activeList() {
				return this.$store.state.Store_actionLesson.activeList || []
			},
		},
		methods: {
			getLessonDetail() {
				let data = {
					studentId: this.studentId,
					explanationId: this.activeList[this.activeIndex].explanationId
				}
				axios.post(REQ_LESSON_DETAIL, qs.stringify(data)).then((res) => {
					this.lessonInfo = res.data.data
				})
			},
			prev() {
				if (this.activeIndex === 0) {
					this.$store.commit('showConfirm', {text: '当前已经是第一节'})
					return false
				}
				this.activeIndex -= 1
				let payload = {
					activeIndex: this.activeIndex
				}
				this.$store.commit('Store_changeActiveLesson', payload)
				this.getLessonDetail()
			},
			next() {
				let isRead = this.activeList.every(item => {
					return parseInt(item.isRead) === 1
				})
				if (this.activeIndex >= this.activeList.length - 1) {
					if (isRead) {
						this.showMask = true
						setTimeout(() => {
							this.showMask = false
							this.$router.push('/lessonList')
						}, 1000)
						return false
					} else {
						this.$store.commit('showConfirm', {text: '当前已经是最后一节'})
						return false
					}
					return false
				}
				this.activeIndex += 1
				let payload = {
					activeIndex: this.activeIndex
				}
				this.$store.commit('Store_changeActiveLesson', payload)
				this.getLessonDetail()
			}
		}
	}
</script>

<style lang="scss" scoped>
    .lessonDetail-wrap {
        width: 100%;
        position: relative;

        .top {
            width: 100%;
            height: 6rem;
            display: flex;
            border-bottom: 1px solid #e8e8e8;

            .nav {
                width: 6rem;
                height: 6rem;
                text-align: center;
                font-size: 1rem;
                color: #8e8e8e;

                & > img {
                    margin: 1.3rem 0 0.5rem;
                }

                .back {
                    width: 1.6rem;
                }

                .prev-i {
                    width: 2rem;
                }
            }

            .list {
                border-right: 1px solid #e8e8e8;
            }

            .prev {
                border-left: 1px solid #e8e8e8;
            }

            .title {
                flex: 1;
                padding: 0 0.5rem;
                margin-top: 1.5rem;
                font-size: 1.5rem;
                font-weight: bold;
                height: 4rem;
                line-height: 2rem;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }

        .content {
            width: 100%;
            min-height: calc(100vh - 10rem);
            overflow: hidden;

            img {
                max-width: 100%;
            }
        }

        .next {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 4rem;
            box-shadow: 0 -1px 3px #ededed;
            background: linear-gradient(to top, #d8d8d8 0%, #ededed 50%, #ffffff 100%);

            & > p {
                margin: 0 1rem;
                font-size: 1.2rem;
                font-weight: bold;
                color: #8e8e8e;
            }
        }

        .mask {
            width: 20.9rem;
            height: 10.3rem;
            background: rgba(0, 0, 0, .4);
            line-height: 10.3rem;
            text-align: center;
            font-size: 1.8rem;
            color: #ffffff;
            position: absolute;
            top: 17rem;
            left: calc(50% - 10.45rem);
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
