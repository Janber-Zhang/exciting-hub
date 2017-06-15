<template>
	<div class="chatRoom" flex="main:justify">
		<div class="userList">
			<ul>
				<li v-for="user in users">{{user}}</li>
			</ul>
		</div>
		<div class="content" flex="dir:top main:justify">
			<ul class="msgBox"><li v-for="msg in msgArr">{{msg}}</li></ul>
			<div class="inputBox">
				<textarea name="msg" v-model="inputMsg" id="inputMsg" @keyup.enter="send()" cols="30" rows="10"></textarea>
				<button>发送</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.chatRoom{
		width: 700px;
		margin-top: 30px;
		border: 1px solid #dedede;
		height: 500px;
	}
	.chatBox{
		width: 700px;
	}
	.userList{
		width: 200px;
		border-right: 1px solid #dedede;
	}
	.content{
		width: 599px;
	}
	.content .msgBox{
		height: 350px;
		overflow-y: auto;
		border-bottom: 1px solid #dedede;
	}
	.content .inputBox{
		height: 150px;
		overflow-y: auto;
		position: relative;
	}
	.content .inputBox #inputMsg{
		width: 100%;
		height: 120px;
		text-indent: 10px;
		color: #333;
		padding: 10px;
		font-size: 14px;
		resize:none;
	}
	.content .inputBox button{
		width: 80px;
		height: 30px;
		position: absolute;
		display: inline-block;
		right: 4px;
		bottom: 4px;
		color: #FFF;
		font-size: 14px;
		background-color: #2d8cf0;
		border-radius: 4px;
	}
	.content .inputBox button:hover{
		background-color: #57a3f3;
	}
</style>
<script>
	export default {
		created(){
			console.log(this.msg)
			// ---------创建连接-----------
			var socket = io();
      // 加入房间
      socket.on('connect', function () {
      	socket.emit('join', userName);
      });
	    },
	    mounted(){
	    	
	    },
	    data(){
	    	return {
	    		SOCKET: null,
	    		users: [2,1],
	    		msgArr: [],
	    		inputMsg: ''
	    	}
	    },
	    methods:{
	    	send: function(){
	    		let msg = 1;
	    		this.msgArr.push(this.inputMsg);
	    		this.inputMsg = '';
	    	}
	    },
	    components:{

	    },
	    computed:{
	    	userInfo(){
	    		return this.$store.getters.getUserInfo
	    	}
	    },
	    deactivated() {
	    	console.log("1");
	    },
	    beforeDestroy() {
	    	console.log("销毁前");
	    },
	  }
	</script>