import router from './router'
import store from './store'
import Vue from 'vue'
const questionModule = {
    state: {
        questionList: null,
        quesStateList: null, //{sort: 0,state: 0,classStr: ''}  1:未做，2：正确，3：错误，4:已做（未必提交)
        question: {},
        totalFinished: 0,
        totalQuestion: 0,
        remainSec: -1,
        testTime: -1,
        testId: 0,
        testState: 0, // 1表示未开始，2表示考试中，3表示已交卷
        testResult: null,
        paperType: 0 // 0:未考试或练习，1：顺序，2随机，3错题，4考试
    },
    getters: {
        questionSort: state => state.question.sort
    },
    mutations: {
        setQuestion (state, data) {
            state.question = data
        },
        setTestId (state, id) {
            state.testId = id
        },
        setPaperType (state, type) {
            state.paperType = type
        },
        setQuestionList (state, list) {
            state.questionList = list
        },
        testReset (state) {
            state.testState = 0
            state.remainSec = -1
            state.testTime = -1
            state.totalQuestion = 0
            state.totalFinished = 0
            state.quesStateList = null
            state.questionList = null
            state.question = {}
        },
        testInit (state, testInfo) {
            state.questionList = testInfo.questionInfoList
            state.totalQuestion = testInfo.questionInfoList.length
            state.totalFinished = testInfo.answerNumber
            state.testState = testInfo.state
            state.remainSec = testInfo.remainExamSecond
            state.testTime = testInfo.remainExamSecond
            state.question = state.questionList[0]
            state.quesStateList = new Array(state.totalQuestion)
            state.questionList.forEach((item, index) => {
                state.quesStateList[index] = {
                    sort: item.sort,
                    state: 1,
                    classStr: ''
                }
            })
            state.quesStateList.forEach((item) => {
                store.commit('updateQuesState', {sort: item.sort})
            })
        },
        setIsSubmit (state, bool) {
            state.question.isSubmit = bool
        },
        setTestResult (state, data) {
            state.testResult = data
            state.testResult.id = state.testId
        },
        setTotalFinished (state, num) {
            state.totalFinished = num
        },
        setTotalQuestion (state, num) {
            state.totalQuestion = num
        },
        countdown (state) {
            state.remainSec--
        },
        /**
         * 更新题目状态列表，若有参数按参数设置，无状态码自行检测
         * @param sort  题目序号
         */
        updateQuesState (state, {sort}) {
            let index, classStr, question, quesState
            index = !sort ? state.question.sort - state.quesStateList[0].sort: sort - state.quesStateList[0].sort
            question = !sort ? state.question : state.questionList[index]
            if (question.trueAnswer) {
                quesState = question.trueAnswer == question.studentAnswer ? 2 : 3
            } else {
                quesState = question.studentAnswer ? 4 : 1
            }
            switch (quesState) {
                case 1:
                    classStr = ''
                    break
                case 4:
                    classStr = 'done'
                    break
                case 2:
                    classStr = 'right'
                    break
                case 3:
                    classStr = 'wrong'
                    break
            }
            Vue.set(state.quesStateList[index], 'state', quesState)
            Vue.set(state.quesStateList[index], 'classStr', classStr)
        },
        /**
         * 顺序练习用
         */
        quesStateListInit (state, list) {
            if (!list) {
                state.quesStateList = list
                return
            }
            list.forEach((item) => {
                item.sort = item.menuSort
                switch (item.state) {
                    case 1:
                        item.classStr = ''
                        break
                    case 2:
                        item.classStr = 'right'
                        break
                    case 3:
                        item.classStr = 'wrong'
                        break
                }
            })
            state.quesStateList = list
        },
        setStudentAnswer (state, payload) {
            let answer = payload.join ? payload.slice().sort().join('') : payload
            if (state.paperType == 4) {
                if (!state.question.studentAnswer && answer) {
                    state.totalFinished++
                }
                if (state.question.studentAnswer && !answer) {
                    state.totalFinished--
                }
            }
            Vue.set(state.question, 'studentAnswer', answer)
        },
        setTrueAnswer (state, answer) {
            Vue.set(state.question, 'trueAnswer', answer.join ? answer.slice().sort().join('') : answer)
        },
        turn (state, type) {
            if (state.paperType == 1) { // 顺序练习
                store.commit('updateQuesState', {})
                type == 'next'
                    ? store.dispatch('getPractiseQues', {sort: state.question.sort + 1})
                    : type == 'prev'
                        ? store.dispatch('getPractiseQues', {sort: state.question.sort - 1})
                        : store.dispatch('getPractiseQues', {sort: type})
            } else if (state.paperType == 4) {  // 考试
                store.commit('updateQuesState', {})
                state.question = type == 'next'
                    ? state.questionList[state.question.sort]
                    :  type == 'prev' ? state.questionList[state.question.sort - 2] : state.questionList[type - 1]
            } else {
                type == 'next' && store.dispatch('getPractiseQues', {sort: state.question.sort + 1})
            }
        },
        setIsCollection (state, bool) {
            Vue.set(state.question, 'isCollection', bool)
        }
    },
    actions: {
        createTest ({state, commit, rootState}) {
            base.ajax({
                url: 'wap/exam/createExamPaper',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    subjectId: rootState.subjectChecked
                },
                success: (data) => {
                    router.push('/test?testId=' + data.examId)
                },
                error: (error) => {
                    if (error.status == 202 && state.testId) {
                        router.push('/test?testId=' + state.testId)
                        return true
                    }
                }
            })
        },
        getQuestionList ({state, commit, rootState}, testId) {
            commit('setTestId', testId)
            base.ajax({
                url: 'wap/exam/getExamQuestionInfo',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    examId: testId
                },
                success: (data) => {
                    commit('testInit', data)
                }
            })
        },
        submitAnswerInTest ({state, commit, rootState}, cb) {
            base.ajax({
                url: 'wap/exam/submitQuestion',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    examId: state.testId,
                    sort: state.question.sort,
                    remainExamSecond: state.remainSec,
                    studentAnswer: state.question.studentAnswer,
                    questionId: state.question.questionId
                },
                success: (data) => {
                    commit('setIsSubmit', true)
                    cb && cb()
                }
            })
        },
        submitTest ({state, commit, dispatch, rootState}, cb) {
            dispatch('submitAnswerInTest', () => {  // 提交当前题目答案
                base.ajax({
                    url: 'wap/exam/submitExam',
                    data: {
                        token: rootState.loginInfo.token,
                        studentId: rootState.loginInfo.id,
                        examId: state.testId,
                        subjectId: rootState.subjectChecked
                    },
                    success: (data) => {
                        commit('setTestResult', data)
                        cb && cb()
                    }
                })
            })
        },
        getPractiseQues ({state, commit, rootState}, {sort = ' ', needStateList = 2}) {
            //  needStateList = 2    是否需要获取题目状态List, 1：需要，2：不需要
            if (state.paperType == 1 && !state.quesStateList) {
                needStateList = 1
            }
            base.ajax({
                url: 'wap/exercises/getQuestionInfo',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    subjectId: rootState.subjectChecked,
                    exercisesType: state.paperType,
                    sort: sort,
                    state: needStateList
                },
                success: (data) => {
                    commit('setTotalFinished', data.answerNumber)
                    commit('setQuestion', data.questionInfo)
                    commit('setTotalQuestion', data.sumQuestionNumber)
                    if (data.menuSortInfoList) {
                        commit('quesStateListInit', data.menuSortInfoList)
                    }
                }
            })
        },
        submitAnswerInPractise ({state, commit, dispatch, rootState}) {
            base.ajax({
                url: 'wap/exercises/recordAnswer',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    exercisesType: state.paperType,
                    studentAnswer: state.question.studentAnswer,
                    questionId: state.question.questionId
                },
                success: (data) => {
                    commit('setTotalFinished', state.totalFinished + 1)
                    commit('setTrueAnswer', data.trueAnswer)
                    if (data.trueAnswer != state.question.studentAnswer && state.paperType != 3) {
                        commit('setIsCollection', true)
                    }
                    if (data.trueAnswer == state.question.studentAnswer && state.paperType == 3) {
                        commit('setIsCollection', false)
                    }
                }
            })
        },
        resetPractise ({state, commit, dispatch, rootState}) {
            base.ajax({
                url: 'wap/exercises/reset',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    subjectId: rootState.subjectChecked
                },
                success: (data) => {
                    dispatch('getPractiseQues', {sort: 1, needStateList: 1}) // 跳第一题，并更新stateList
                }
            })
        },
        addWrongClt ({state, commit, rootState}) {
            base.ajax({
                url: 'wap/misCollection/save',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    questionId: state.question.questionId
                },
                success: (data) => {
                    commit('setIsCollection', true)
                }
            })
        },
        removeWrongClt ({state, commit, rootState}) {
            base.ajax({
                url: 'wap/misCollection/delete',
                data: {
                    token: rootState.loginInfo.token,
                    studentId: rootState.loginInfo.id,
                    questionId: state.question.questionId
                },
                success: (data) => {
                    commit('setIsCollection', false)
                }
            })
        }
    }
}

export default questionModule