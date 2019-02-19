<template>
  <div id="app">
    <router-view/>
    <v-showModal v-show="Store_modalFlag"></v-showModal>
  </div>
</template>

<script>
import ShowModal from '@/components/ShowModal.vue'
import {mapMutations,mapState} from 'vuex'
export default {
  name: 'App',
  components: {
    'v-showModal': ShowModal
  },
  mounted() {
    // this.Store_showModalInit({
    //   title: 'title',
    //   content: '这是content',
    //   cancelFlag: false, //是否显示取消按钮,默认为true(显示)
    //   successBtn: '确定', //确定按钮文本， 默认为'确定'
    //   cancelBtn: '取消', //取消按钮文本，默认为'取消',
    //   successCB: () => {}, //确定按钮的回调, 
    //   cancelCB: () => {}  //取消按钮的回调
    // })
  },
  methods: {
    // ...mapMutations(['Store_showModalInit'])

  },
  computed: {
    ...mapState(['Store_modalFlag'])
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
