<template>
	<div class="chat">
		<ul class="roomList" v-bind:class="{roomList_middle: !room_name}" flex="main:center">
			<li @click="selectRoom('html5')" class="animated bounceIn" :class="{'active':room_name == 'html5'}">
				<Icon class="pointer" type="social-html5-outline" size="50"></Icon>
			</li>
			<li @click="selectRoom('angular')" class="animated bounceIn" :class="{'active':room_name == 'angular'}">
				<Icon class="pointer" type="social-angular-outline" size="50"></Icon>
			</li>
			<li @click="selectRoom('nodejs')" class="animated bounceIn" :class="{'active':room_name == 'nodejs'}">
				<Icon class="pointer" type="social-nodejs" size="50"></Icon>
			</li>
		</ul>
		<router-view></router-view>
	</div>
	
</template>
<style scoped>
	.chat{
		width: 700px;
	}
	.roomList{
		width: 700px;
		margin: 0 auto;
	}
	.roomList li{
		padding: 0 20px;
		margin: 0 10px;
	}
	.roomList li:hover{
		background-color: #f5f5f5;
	}
	.active{
		background-color: #dedede !important;
	}
	.pointer{
		cursor: pointer;
	}
	.roomList_middle{
		position: absolute;
		transform: scaleY(-50%);
		top: 40%;
	}
</style>
<script>
	export default {
		created(){
			this.init_room_name()
		},
		ready(){

		},
		data(){
			return {
				msg: 'Welcome to Exciting-hub',
				room_name: ''
			}
		},
		watch: {
    		// 如果路由有变化，会再次执行该方法
    		'$route' : 'init_room_name'
    	},
		methods:{
			selectRoom: function(key){
				let this_ = this;
				if (this.room_name == key) {
					return
				}
				this.room_name = key;
				let path_room = `/chat/${key}`;
				let path_root = `/chat`;
				this.$router.push({ path: path_root });
				setTimeout(function(){
					this_.$router.push({ path: path_room })
				},0);
			},
			init_room_name: function(){
				this.room_name = this.$route.params.roomId;
			}
		},
		components:{
			
		},
		computed:{
			
		}
	}
</script>