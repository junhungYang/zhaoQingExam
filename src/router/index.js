import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/pages/SignUp.vue'
import DetailInfo from '@/pages/DetailInfo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/DetailInfo',
      name: 'DetailInfo',
      component: DetailInfo
    },
    {
      path: '*',
      redirect(to) {
        return '/signUp'
      }
    }
  ]
})
