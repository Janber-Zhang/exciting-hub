<template>
  <div class="header" flex="main:justify">
    <Tabs value="name1">
      <Tab-pane label="标签一" name="name1">标签一的内容</Tab-pane>
      <Tab-pane label="标签二" name="name2">标签二的内容</Tab-pane>
      <Tab-pane label="标签三" name="name3">标签三的内容</Tab-pane>
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
    padding: 0 50px;
  }
</style>
