<template>
	<div class="plus">
		<div v-if="!nowSmartApp" class="app_list" flex="main:center">
			<div v-for="app in appList" class="app_item animated" v-bind:class="app.class" @click="show_app(app)" flex="main:center cross:center">
				<span>{{app.name}}</span>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<style scoped>
	.plus{
		width: 100%;
		overflow:  auto;
	}
	.app_list{
		width: 100%;
		padding: 100px 0;
	}
	.app_list .app_item{
		width: 120px;
		height: 120px;
		border: 1px solid #dedede;
		cursor: pointer;
		margin: 0 40px;
	}
	.app_list .app_item span{
		font-size: 14px;
		font-weight: bold;
	}
	.app_list .app_item:hover{
		animation: swing 1s;
		-moz-animation: swing 1s;
		-webkit-animation: swing 1s;
		-o-animation: swing 1s;
		animation-fill-mode: both;
		background-color: #f5f5f5;
	}
</style>
<script>
	export default {
		created(){
			this.init_smart_app();
		},
		ready(){

		},
		watch: {
    		// 如果路由有变化，会再次执行该方法
    		'$route': 'init_smart_app'
    	},
    	data(){
    		return {
    			appList:[
    			{
    				name: '生命格子',
    				value: 'lifeGrid',
    				class: {'tada':true}
    			},
    			{
    				name: '扫雷',
    				value: 'mineSweeper',
    				class: {'jello':true}
    			},
    			{
    				name: '影视人生',
    				value: 'movie',
    				class: {'shake':true}
    			},
    			{
    				name: '人生',
    				value: 'lifeGrid',
    				class: {'jello':true}
    			}
    			]
    		}
    	},
    	methods:{
    		show_app: function(app){
    			let path_smart_app = `/plus/${app.value}`;
    			this.$router.push({ path: path_smart_app })

    		},
    		init_smart_app: function(){
    			let now_route = this.$route.name;
    			let app_name = false;
    			if (now_route !== 'plus'){
    				app_name = now_route
    			}
    			this.$store.dispatch('initSmartApp', app_name);
    		}
    	},
    	components:{

    	},
    	computed:{
    		nowSmartApp(){
    			return this.$store.getters.getSmartApp
    		}
    	}
    }
</script>