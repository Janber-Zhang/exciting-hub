<template>
  <div v-if="isready">
    <nav-header></nav-header>
    <div class="main_body" flex="main:center">
      <router-view></router-view>
    </div>
    <copy-footer></copy-footer>
  </div>
</template>

<script>
import header from './header.vue'
import footer from './footer.vue'
export default {
  created(){
    this.$store.dispatch('initUserInfo');
  },
  ready(){

  },
  data(){
    return {
      
    }
  },
  method:{

  },
  components:{
    'nav-header': header,
    'copy-footer': footer
  },
  computed:{
    isready(){
        return this.$store.getters.getReadyState
      }
  }
}
</script>

<style scoped>
  .main_body{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 30px 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
