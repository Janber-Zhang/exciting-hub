<template>
  <div class="header">
    <div class="wrap" flex="main:justify">
      <Tabs value="name1" @on-click="switchTab($event)">
        <Tab-pane label="首页" name="Index"></Tab-pane>
        <Tab-pane label="聊天" name="Chatting"></Tab-pane>
        <Tab-pane label="我的" name="Building"></Tab-pane>
      </Tabs>
      <Dropdown trigger="click" @on-click="userHandle($event)">
        <a href="javascript:void(0)">
          <img src="/images/logo.jpg" width="40" class="user_ico" alt="">
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
        switch (key) {
          case 'myProfile':
            this.$router.push({ path: 'myProfile' });
            break;
          case 'myApp':
            this.$router.push({ path: 'chat' });
            break;
          case 'logout':
            util.logout();
            break;
        }
        if (key === 'logout') {
          
        }
      },
      switchTab: function(key) {
        switch (key) {
          case 'Index':
            this.$router.push({ path: '/' });
            break;
          case 'Chatting':
            this.$router.push({ path: 'chat' });
            break;
          case 'Building':
            this.$router.push({ path: '/' });
            break;
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
    padding: 0 30px;
  }
  .user_ico{
    border-radius: 50%;
  }
</style>
