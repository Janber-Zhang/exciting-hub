<template>
  <div class="header" flex="main:center">
    <div class="wrap" flex="main:justify cross:center">
      <ul class="nav" flex="main:center cross:center">
        <li @click="switchTab('Index')">首页</li>
        <li @click="switchTab('Chat')">聊天</li>
        <li @click="switchTab('Plus')">拓展</li>
      </ul>
      <Dropdown @on-click="userHandle($event)">
        <a href="javascript:void(0)">
          <img :src="userInfo.avatar[0]?userInfo.avatar[0].url:'/images/logo.jpg'" width="35" class="user_ico" alt="">
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
      let users = JSON.parse(JSON.stringify(this.userInfo));
      
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
        console.log('213123123')
        switch (key) {
          case 'myProfile':
            this.$router.push({ path: '/myProfile' });
            break;
          case 'logout':
            util.logout();
            break;
        }
      },
      switchTab: function(key) {
        switch (key) {
          case 'Index':
            this.$router.push({ path: '/' });
            break;
          case 'Chat':
            this.$router.push({ path: '/chat' });
            break;
          case 'Plus':
            this.$router.push({ path: '/plus' });
            break;
          default:
            this.$router.push({ path: '/' });
            break
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
