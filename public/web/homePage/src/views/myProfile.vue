<template>
  <Form :model="userInfo" :label-width="80" style="width: 600px" v-if="show">
    <Form-item label="代号">
      <Input v-model="userInfo.nickname" placeholder="请输入代号"></Input>
    </Form-item>
    <Form-item label="头像">
      <upload-pic :upload-list="userInfo.avatar"></upload-pic>
    </Form-item>
    <Form-item label="性别">
      <Radio-group v-model="userInfo.sex">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
        <Radio label="unknown">未知</Radio>
      </Radio-group>
    </Form-item>
    <Form-item label="自我介绍">
      <Input v-model="userInfo.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="update_user()">提交</Button>
      <Button type="ghost" style="margin-left: 8px">取消</Button>
    </Form-item>
  </Form>
</template>
<script>
  import uploadPic from '../components/uploadPic'
  import VUE       from 'vue'
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
        this.userInfo = $.extend({}, default_info, res.data);
        this.show = true;
      });
    },
    ready(){

    },
    data(){
      return {
        show: false,
        userInfo: {}
      }
    },
    methods:{
      update_user: function(){
        console.log(this.userInfo)
        let param = {
          serviceUrl: '/user/editUserInfo.excited',
          user: JSON.stringify(this.userInfo)
        }
        var queryUserInfo = util.queryData('post',param,(res)=>{
          if (res.msg = 'success') {
            this.$Message.success('保存成功！');
            this.$store.dispatch('initUserInfo');
            this.$router.push({ path: '/' });
          }
        });
      }
    },
    components:{
      'upload-pic' : uploadPic
    },
    computed:{

    }
  }
</script>
