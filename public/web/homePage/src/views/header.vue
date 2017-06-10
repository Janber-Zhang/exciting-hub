<template>
  <div class="header" flex="main:center">
    <div class="wrap" flex="main:justify cross:center">
      <ul class="nav" flex="main:center cross:center">
        <li @click="switchTab('Index')">首页</li>
        <li @click="switchTab('Chat')">聊天</li>
      </ul>
      <Dropdown trigger="click" @on-click="userHandle($event)">
        <a href="javascript:void(0)">
          <img src="/images/logo.jpg" width="35" class="user_ico" alt="">
          {{userInfo.nickname}}
          <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
          <Dropdown-item name="myProfile">我的信息</Dropdown-item>
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
          case 'Chat':
            this.$router.push({ path: 'chat' });
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
    box-shadow: 0px 0px 6px rgba(0,0,0,.5)
  }
  .wrap{
    width: 900px;
  }
  .user_ico{
    border-radius: 50%;
  }
  .nav li{
    cursor: pointer;
    width: 100px;
    text-align: center;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .nav li:hover{
    background-color: #e5e5e5;
    color: #777;
  }
</style>
