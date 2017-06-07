<template>
  <div class="header">
    <div class="wrap" flex="main:justify">
      <Tabs value="name1">
        <Tab-pane label="首页" name="name1"></Tab-pane>
        <Tab-pane label="聊天" name="name2"></Tab-pane>
        <Tab-pane label="我的" name="name3"></Tab-pane>
      </Tabs>
      <Dropdown trigger="click" @on-click="userHandle($event)">
        <a href="javascript:void(0)">
          <img src="/images/logo.jpg" width="40" alt="">
          {{userInfo.nickname}}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item name="myProfile">我的信息</Dropdown-item>
          <Dropdown-item name="myApp">我的应用</Dropdown-item>
          <Dropdown-item name="logout">注销登录</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    created(){

    },
    ready(){

    },
    data(){
      return {
        msg: 'Welcome to Exciting-hub'
      }
    },
    methods:{
      userHandle: function(key) {
        console.log(key)
        if (key === 'logout') {
          util.logout();
        }
      }
    },
    components:{

    },
    computed:{
      userInfo(){
        return this.$store.getters.getUserInfo
      }
    }
  }
</script>

<style scoped>
  .header{
    height: 40px;
    background-color: #dedede;
  }
  .wrap{
    width: 960px;
    margin: 0 auto;
  }
</style>
