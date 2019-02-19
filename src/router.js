/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/5/20 10:36
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import Cookie from 'js-cookie'
import lessonList from './pages/lessonList.vue'
const index = r => require.ensure([], () => r(require('./pages/index.vue')), 'index')
const myInfo = r => require.ensure([], () => r(require('./pages/myInfo.vue')), 'index')
const pwChange = r => require.ensure([], () => r(require('./pages/pwChange.vue')), 'index')
const myCertificate = r => require.ensure([], () => r(require('./pages/myCertificate.vue')), 'index')
const testInfo = r => require.ensure([], () => r(require('./pages/testInfo.vue')), 'index')
const testRecord = r => require.ensure([], () => r(require('./pages/testRecord.vue')), 'index')
const testEnd = r => require.ensure([], () => r(require('./pages/testEnd.vue')), 'index')
const practise = r => require.ensure([], () => r(require('./pages/practise.vue')), 'index')
const test = r => require.ensure([], () => r(require('./pages/test.vue')), 'index')
const login = r => require.ensure([], () => r(require('./pages/login.vue')), 'index')
const classInfo = r => require.ensure([], () => r(require('./pages/classInfo.vue')), 'index')
const examSignUp = r => require.ensure([], () => r(require('./pages/examSignUp.vue')), 'index')
const classDetail = r => require.ensure([], () => r(require('./pages/classDetail.vue')), 'index')


/*
const signUp = r => require.ensure([], () => r(require('./pages/lessonSignUp/signUp.vue')), 'lessonSignUp')
const myOrder = r => require.ensure([], () => r(require('./pages/lessonSignUp/myOrder.vue')), 'lessonSignUp')
const orderDetail = r => require.ensure([], () => r(require('./pages/lessonSignUp/orderDetail.vue')), 'lessonSignUp')

const search = r => require.ensure([], () => r(require('./pages/search/search.vue')), 'search')
const certificateSearch = r => require.ensure([], () => r(require('./pages/search/certificateSearch.vue')), 'search')
const adminLogin = r => require.ensure([], () => r(require('./pages/search/adminLogin.vue')), 'search')
*/

// VueRoute
Vue.use(VueRouter)
//  定义路由
const routes = [
    {
        path: '/',
        component: index,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/index.html',
        component: index,
        meta: {
            requiresAuth: true
        },
        redirect: '/'
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/myInfo',
        component: myInfo,
        meta: { requiresAuth: true }
    },
    {
        path: '/pwChange',
        component: pwChange,
        meta: { requiresAuth: true }
    },
    {
        path: '/myCertificate',
        component: myCertificate,
        meta: { requiresAuth: true }
    },
    {
        path: '/testInfo',
        component: testInfo,
        meta: {
            requiresAuth: true,
            requiresSubject: true
        }
    },
    {
        path: '/testRecord',
        component: testRecord,
        meta: { requiresAuth: true }
    },
    {
        path: '/testEnd',
        component: testEnd,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/practise',
        component: practise,
        meta: {
            requiresAuth: true,
            requiresSubject: true
        }
    },
    {
        path: '/test',
        component: test,
        meta: {
            requiresAuth: true,
            requiresSubject: true
        }
    },
    {
        path: '/classInfo',
        component: classInfo,
        meta: { requiresAuth: true }
    },
    {
        path: '/classDetail',
        component: classDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/examSignUp',
        component: examSignUp,
        meta: { requiresAuth: true }
    },
    {
        path: '/lessonList',
        component: lessonList,
        meta: {requiresAuth: true}
    },
    /*
    {
        path: '/signUp',
        component: signUp
    },
    {
        path: '/signUp/myOrder',
        component: myOrder
    },
    {
        path: '/signUp/orderDetail',
        component: orderDetail
    },
    {
        path: '/admin/login',
        component: adminLogin
    },
    {
        path: '/admin/search',
        component: search
    },
    {
        path: '/certificateSearch',
        component: certificateSearch
    },
    */
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({ // 创建 router 实例，然后传 `routes` 配置
    // mode: 'history',
    base: '/', //应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
    routes,  // （缩写）相当于 routes: routes,
    scrollBehavior (to, from, savedPosition) {  //控制路由跳转时的滚动行为  注意: 这个功能只在 HTML5 history 模式下可用。
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return { selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    }
})

/*
*   验证是否需要登录，以及是否选择了科目，控制路由跳转
* */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {  // 是否需要登录
        if (logined()) {
            next({
                path: '/login'
            })
        } else {
            if (to.matched.some(record => record.meta.requiresSubject)) {   // 是否需要选择了科目
                if (!isSubjectChecked()) {
                    next('/')
                } else {
                    next()
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
});


/**
 *  检测是否登录，若已登录过，获取cookie中的用户信息
 */
function logined () {
    if (store.state.loginInfo.token) {
        return true
    } else if (Cookie.get('loginInfo')) {
        store.commit('setLoginInfo', JSON.parse(Cookie.get('loginInfo')))
        return true
    }
    return false
}
/**
 *  检查是否选择了科目，或者cookie中是否存在
 */
function isSubjectChecked () {
    if (store.subjectChecked) {
        return true
    } else if (Cookie.get('subjectChecked')) {
        store.commit('setSubjectChecked')
        return true
    }
    return false
}

export default router
