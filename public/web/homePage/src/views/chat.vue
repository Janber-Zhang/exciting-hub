<template>
	<div class="chat">
		<ul class="roomList" flex="main:center">
			<li @click="selectRoom('html5')">
				<Icon class="pointer" type="social-html5-outline" size="50"></Icon>
			</li>
			<li @click="selectRoom('angular')">
				<Icon class="pointer" type="social-angular-outline" size="50"></Icon>
			</li>
			<li @click="selectRoom('nodejs')">
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
		margin:0 30px;
	}
	.pointer{
		cursor: pointer;
	}
</style>
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
			selectRoom: function(key){
				let this_ = this;
				let path_room = `/chat/${key}`;
				let path_root = `/chat`;
				this.$router.push({ path: path_root });
				setTimeout(function(){
					this_.$router.push({ path: path_room })
				},0);
			}
		},
		components:{

		},
		computed:{
			
		}
	}
</script>