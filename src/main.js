// require('!style-loader!css-loader!sass-loader!./css/_base2.scss')
require('./css/_base2.scss')

import Vue from 'vue'
import router from './router'
import store from './store.js'
import toastComp from './components/toastComp.vue'
import errorConfirm from './components/errorConfirm.vue'
import './js/baseRun'
import base from './js/base'
import '../Mock/mock'
window.base = base
const app = new Vue({
    router,
    store,
    data () {
        return {

        }
    },
    methods: {
        showToast (bool) {
            this.$store.commit('showToast', false)
        }
    },
    computed: {
        isShowToast () {
            return this.$store.state.isShowToast
        },
        toastText () {
            return this.$store.state.toastText
        }
    },
    components: {
        toastComp,
        errorConfirm
    },
    mounted () {
        document.getElementsByTagName('html')[0].style.fontSize = document.getElementsByTagName('body')[0].offsetWidth/32 + 'px'
    }
}).$mount('#app');
