import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
import questionModule from './questionModule'
import router from './router'
Vue.use(Vuex);

const debug = process.env.NODE_ENV == 'development'

const store = new Vuex.Store({
    modules: {
      question: questionModule
    },
    state: {
        loginInfo: {
            id: '',
            name: '',
            token: ''
        },
        studentInfo: null,
        subjectList: null,
        subjectChecked: null,
        certificateList: null,
        classInfoList: null,
        testInfo: null,
        testRecord: null,
        myExamSignUp: null,
        isShowToast: false,
        toastText: '',
        errorConfirm: {
            isShow: false,
            text: '',
            ok: null
        },
        Store_actionLesson: {}
    },
    mutations: {
        Store_changeActiveLesson(state,payload) {
            if (payload.activeIndex >= 0) state.Store_actionLesson.activeIndex = payload.activeIndex
            if (payload.activeList) state.Store_actionLesson.activeList = payload.activeList
            console.log(state.Store_actionLesson)
        },
        setLoginInfo (state, {id, name, token}) {
            state.loginInfo.id = id
            state.loginInfo.name = name
            state.loginInfo.token = token
            Cookie.set('loginInfo', JSON.stringify(state.loginInfo))
        },
        clearLoginInfo (state) {
            state.loginInfo.id = ''
            state.loginInfo.name = ''
            state.loginInfo.token = ''
            Cookie.remove('loginInfo')
        },
        setStudentInfo (state, stuInfo) {
            state.studentInfo = stuInfo
        },
        setSubjectList (state, subjectList) {
            state.subjectList = subjectList
        },
        setSubjectChecked (state, subjectId) {
            state.subjectChecked = subjectId || Cookie.get('subjectChecked') || state.subjectList[0].subjectId
            // 处理cookie中的值无效时
            let isValid = true
            if (state.subjectList && state.subjectList.length) {
                isValid = state.subjectList.some((item) => {
                    return item.subjectId == state.subjectChecked
                })
                if (!isValid) {
                    state.subjectChecked = state.subjectList[0].subjectId
                }
            }

            Cookie.set('subjectChecked', '' + state.subjectChecked, {expires: 365})
        },
        setMyExamSignUp (state, list) {
            state.myExamSignUp = list
        },
        removeExamSignUpById (state, id) {
            state.myExamSignUp = state.myExamSignUp.filter((item) => {
                return item.bespeakExamId != id
            })
        },
        addExamSignUp (state, payload) {
            state.myExamSignUp.push(payload)
        },
        setCertificateList (state, list) {
            state.certificateList = list
        },
        setClassInfoList (state, list) {
            state.classInfoList = list
        },
        setTestInfo (state, examInfo) {
            var info = {}
            info.avgScore = examInfo.avgScore
            info.testName = examInfo.examName
            info.spec = examInfo.examSpec
            info.tips = examInfo.mattersNeedAttention
            info.remainFrequency = examInfo.remainFrequency
            state.testInfo = info
        },
        setTestRecord (state, list) {
            state.testRecord = list
            if (list[0].state != 3) {   // 若第一条记录未交卷，则设置当前考试id
                state.question.testId = list[0].examId
            }
        },
        showToast (state, text) {
            if (text) {
                state.toastText = text
            }
            state.isShowToast = Boolean(text)
        },
        showConfirm (state, {text, ok}) {
            if (text) {
                state.errorConfirm.text = text
            }
            state.errorConfirm.ok = ok
            state.errorConfirm.isShow = Boolean(text)
        },
        confirmOk (state) {
            state.errorConfirm.ok && state.errorConfirm.ok()
            store.commit('showConfirm', {text: ''})
        }
    },
    actions: {
        getStudentInfo ({state, commit}) {
            if (state.studentInfo) {
                return
            } else {
                base.ajax({
                    url: 'wap/student/getStudentInfo',
                    data: {
                        token: state.loginInfo.token,
                        studentId: state.loginInfo.id
                    },
                    success: (data) => {
                        commit('setStudentInfo', data)
                    }
                })
            }
        },
        getSubjectList ({state, commit}) {
            if (state.subjectList) {
                return
            } else {
                base.ajax({
                    url: 'wap/subject/getSubjectList',
                    data: {
                        token: state.loginInfo.token,
                        studentId: state.loginInfo.id
                    },
                    success: (data) => {
                        commit('setSubjectList', data)
                        commit('setSubjectChecked')
                    }
                })
            }
        },
        getMyExamSignUp ({state, commit}) {
            if (state.myExamSignUp) {
                return
            } else {
                base.ajax({
                    url: 'wap/bespeakExam/getBespeakSubjectList',
                    data: {
                        token: state.loginInfo.token,
                        studentId: state.loginInfo.id
                    },
                    success: (data) => {
                        commit('setMyExamSignUp', data)
                    }
                })
            }
        },
        cancelBespeak ({state, commit}, id) {
            base.ajax({
                url: 'wap/bespeakExam/cancelBespeak',
                data: {
                    token: state.loginInfo.token,
                    studentId: state.loginInfo.id,
                    bespeakExamId: id
                },
                success: (data) => {
                    commit('removeExamSignUpById', id)
                    commit('showToast', '已成功取消考试预约')
                }
            })
        },
        getClassInfoList ({state, commit}) {
            if (state.classInfoList) {
                return
            } else {
                base.ajax({
                    url: 'wap/classInfo/getClassInfoList',
                    data: {
                        token: state.loginInfo.token,
                        studentId: state.loginInfo.id
                    },
                    success: (data) => {
                        commit('setClassInfoList', data)
                    }
                })
            }
        },
        getTestInfo ({state, commit}) {
            base.ajax({
                url: 'wap/exam/getExamInfo',
                data: {
                    token: state.loginInfo.token,
                    studentId: state.loginInfo.id,
                    subjectId: state.subjectChecked
                },
                success: (data) => {
                    commit('setTestInfo', data)
                }
            })
        },
        getTestRecord ({state, commit}) {
            base.ajax({
                url: 'wap/exam/getExamList',
                data: {
                    token: state.loginInfo.token,
                    studentId: state.loginInfo.id,
                    subjectId: state.subjectChecked
                },
                success: (data) => {
                    commit('setTestRecord', data)
                }
            })
        }
    },
    strict: debug
});

// // 添加热重载
// if (module.hot) {
//     console.log('module.hot = true from store.js');
//     module.hot.accept();
//     module.hot.dispose(function() {});
// }
//

if (module.hot) {
    module.hot.accept([
            './questionModule'
        ]
        , () => {
            // 获取更新后的模块
            // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
            const newModuleA = require('./questionModule').default;
            store.hotUpdate({
                modules: {
                    // a: require('./moduleA')
                    question: newModuleA
                }
            })
        }
    )
}
export default store;