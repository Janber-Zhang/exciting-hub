<template>
	<div class="chatRoom" flex="main:justify">
		<div class="userList">
			<ul>
				<li>用户列表</li>
				<li v-for="user in users" class="user" @click="showUserInfo(user.user)" flex="main:left corss:cneter">
					<img :src="user.user.avatar" alt="" width="20" height="20">
					<span>{{user.user.nickname}}</span>
				</li>
			</ul>
		</div>
		<div class="content" flex="dir:top main:justify">
			<ul id="msgBox" class="msgBox">
				<li v-for="msg in msgArr">
					<div class="right_" v-if="msg.isMine">
						<img :src="msg.user.user.avatar" class="right" alt="" @click="showUserInfo(msg.user.user)" width="30" height="30">
						<p class="name_right">{{msg.user.user.nickname}}</p>
						<p class="msg">
							<i class="arr_right"></i>
							{{msg.msg}}
						</p>
					</div>
					<div class="left_" v-else>
						<img :src="msg.user.user.avatar" alt="" class="left" @click="showUserInfo(msg.user.user)" width="30" height="30">
						<p>{{msg.user.user.nickname}}</p>
						<p class="msg">
							<i class="arr"></i>
							{{msg.msg}}
						</p>
					</div>
				</li>
			</ul>
			<div class="inputBox">
				<textarea name="msg" v-model="inputMsg" id="inputMsg" @keyup.enter="send()" cols="30" rows="10"></textarea>
				<button @click="send()">发送</button>
			</div>
		</div>
		<Modal
		v-model="showTargetUser"
		title="用户信息"
		width="300">
		<p>姓名：{{targetUser.nickname}}</p>
		<p>性别：{{targetUser.sex | getSexStr}}</p>
		<p>简介：{{targetUser.introduction}}</p>
	</Modal>
</div>
</template>
<style lang='less' scoped>
	.chatRoom{
		width: 700px;
		margin-top: 30px;
		border: 1px solid #dedede;
		height: 500px;
		.userList{
			width: 200px;
			border-right: 1px solid #dedede;
			ul li{
				padding: 5px 10px;
				img{
					margin-right: 10px;
				}
				span{
					line-height: 20px;
				}
			}
			ul li:first-child{
				text-align: center;
			}
			.user{
				cursor: pointer;
				&:hover{
					background-color: #f5f5f5;
				}
			}
		}
		.content{
			width: 599px;
			.msgBox{
				height: 350px;
				overflow-y: auto;
				border-bottom: 1px solid #dedede;
				li {
					position: relative;
					padding: 10px 50px 10px 50px;
					.right_{
						float: right;
					}
					.left{
						position: absolute;
						left: 10px;
						cursor: pointer;
					}
					.right{
						position: absolute;
						right: 10px;
						cursor: pointer;
					}
					.name_right{
						text-align: right;
					}
					.msg{
						display: inline-block;
						font-size: 14px;
						color: #333;
						padding: 5px;
						border: 1px solid #dedede;
						border-radius: 4px;
						max-width: 410px;
						position: relative;
						background-color: #f5f5f5;
						padding: 5px 10px;
						.arr{
							width: 0;
							height: 0;
							border-left: 10px solid transparent;
							border-right: 10px solid transparent;
							border-top: 10px solid #f5f5f5;
							position: absolute;
							top: -1px;
							left: -7px;
							border-width: 6px;
						}
						.arr_right{
							width: 0;
							height: 0;
							border-left: 10px solid transparent;
							border-right: 10px solid transparent;
							border-top: 10px solid #f5f5f5;
							position: absolute;
							top: -1px;
							right: -7px;
							border-width: 6px;
						}
					}
				}
				li:after{
					content: ".";
					visibility: hidden;
					display: block;
					height: 0;
					overflow: hidden;
					clear: both;
				}
			}
			.inputBox{
				height: 150px;
				overflow-y: auto;
				position: relative;
				#inputMsg{
					width: 100%;
					height: 120px;
					text-indent: 10px;
					color: #333;
					padding: 10px;
					font-size: 14px;
					resize:none;
				}
				button{
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
				button:hover{
					background-color: #57a3f3;
				}
			}
		}
	}
	
</style>
<script>
	import filters      from './../js/filters.js';
	import API          from './../js/service.js';
	export default {
		created(){

		},
		mounted(){
			this.initChatRoom();
			this.socketInit();
		},
		data(){
			return {
				SOCKET: null,        //保存socket对象
				users: [],			 //当前聊天室用户
				msgArr: [],			 //消息列表
				inputMsg: '',		 //待发送消息
				targetUser: {},    
				showTargetUser: false
			}
		},
		methods:{
			getUserObj: function(){
				let defaultAvatar = '/images/logo.jpg';
				if (this.userInfo.avatar && this.userInfo.avatar[0]) {
					defaultAvatar = this.userInfo.avatar[0].url;
				}
				//封装用户-房间信息
				let userObj = {
					user: {
						nickname     : this.userInfo.nickname,
						avatar       : defaultAvatar,
						_id          : this.userInfo._id,
						introduction : this.userInfo.introduction,
						birthday     : this.userInfo.birthday,
						sex          : this.userInfo.sex
					},
					roomInfo: this.$route.params.roomId
				}
				return userObj
			},
			socketInit: function(){
				let this_ = this;
				let userObj = this.getUserObj();
				// ---------创建连接-----------
				this.SOCKET = io();
				// 加入房间
				this.SOCKET.on('connect', function () {
					this_.SOCKET.emit('join', JSON.stringify(userObj));
				});
				//监听消息
				this.SOCKET.on('msg', function (user, msg) {
					this_.dealMsgInfo(user, msg);
				});
			    // 监听系统消息
			    this.SOCKET.on('sys', function (sysMsg, users, user, type) {
			    	this_.dealSysInfo(sysMsg, users, user, type);
			    });
		    },
		    dealSysInfo: function(sysMsg, users, user, type) {
		    	let this_ = this;
		    	let roomUsers = [];
		    	let roomUsersObj = {}
		    	users.forEach(function(item,index){
		    		if (item.roomInfo === this_.$route.params.roomId && !roomUsersObj[item.user._id]) {
		    			roomUsers.push(item);
		    			roomUsersObj[item.user._id] = true;
		    		}
		    	});
	    	// 判断当前推出人员是否是本房间退出
	    	let isLocal = false;
	    	this.users.forEach(function(item){
	    		if (item.user._id == user.user._id) {
	    			isLocal = true;
	    		}
	    	})
	    	if (type == 'in' && roomUsersObj[user.user._id]) {
	    		this_.$Message.success(sysMsg);
	    	}
	    	if (type == 'out' && !roomUsersObj[user.user._id] && isLocal) {
	    		this_.$Message.success(sysMsg);
	    	}
	    	this.users = roomUsers;
	    	roomUsers = null;
	    },
	    dealMsgInfo: function(user, msg) {
	    	let isMine = false;
	    	if (user.user._id === this.userInfo._id) {
	    		isMine = true;
	    	}
	    	this.msgArr.push({
	    		msg: msg,
	    		user: user,
	    		isMine: isMine
	    	});
	    	setTimeout(function() {
	    		$('#msgBox').scrollTop($('#msgBox')[0].scrollHeight);
	    	}, 10);
	    },
	    send: function(){
	    	if (this.inputMsg.length === 1) {
	    		this.$Message.error('对方不想说话，并且向你抛出了一个异常');
	    		this.inputMsg = '';
	    		return
	    	}
	    	let vm = this;
	    	let userObj = this.getUserObj();
	    	let param = {
	    		room_id   : this.$route.params.roomId,
	    		user      : JSON.stringify(userObj),
	    		msg       : this.inputMsg
	    	}
	    	API.storeChatMsg(param, function(res){
	    		vm.SOCKET.send(vm.inputMsg);
	    		vm.inputMsg = '';
	    	});
	    	
	    },
	    showUserInfo: function(user){
	    	const userInfo = JSON.parse(JSON.stringify(user));
	    	this.targetUser = userInfo;
	    	this.showTargetUser = true;
	    },
	    initChatRoom: function() {
	    	let vm = this;
	    	API.getMsyByRoom({room_id: this.$route.params.roomId},function(res){
	    		res.data.sort(function(left, right){
	    			return left.created<right.created? -1:1
	    		})
	    		vm.msgArr = res.data.map(function(item, index){
	    			if (item.user_id == vm.userInfo._id) {
	    				item.isMine = true;
	    			}
	    			return item
	    		});
	    		setTimeout(function() {
	    			$('#msgBox').scrollTop($('#msgBox')[0].scrollHeight);
	    		}, 10);
	    	})
	    }
	  },
	  components:{

	  },
	  filters: {
	  	getSexStr: filters.getSexStr
	  },
	  computed:{
	  	userInfo(){
	  		return this.$store.getters.getUserInfo
	  	}
	  },
	  beforeDestroy() {
	  	this.SOCKET.emit('leave');
	  }
	}
</script>