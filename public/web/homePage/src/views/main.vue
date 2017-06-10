<template>
  <div>
    <nav-header></nav-header>
    <div class="main_body" flex="main:center">
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
        let default_info = {
          nickname: '测试',
          avatar: [],
          sex: 'unknown',
          introduction: '这个人很懒，什么也没写...'
        } 
        var userInfo = $.extend({}, default_info, res.data);
        this.$store.dispatch('initUserInfo',userInfo);
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
    padding-top: 30px;
    width: 900px;
    margin: 0 auto;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
