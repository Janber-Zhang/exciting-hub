<template>
  <div>
    <nav-header></nav-header>
    <div class="main_body" flex="main:center cross:center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import header from './header.vue'
export default {
  created(){
    let this_ = this,
        param = {
          serviceUrl: '/user/getUserInfo.excited'
        }
    var queryUserInfo = util.queryData('get',param,(res)=>{
        this.$store.dispatch('initUserInfo',res.data);
        var aa = this.$store.getters.getUserInfo;
    });
    
  },
  ready(){

  },
  data(){
    return {
      msg: 'Welcome to Exciting-hub'
    }
  },
  method:{

  },
  components:{
    'nav-header': header
  },
  computed:{

  }
}
</script>

<style scoped>
  .main_body{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
</style>
