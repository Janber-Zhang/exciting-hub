<template>
	<div class="plus">
		<div class="app_list" flex="main:justify">
			<div v-for="app in appList" class="app_item" @click="show_app(app)" flex="main:center cross:center">
				<span>{{app.name}}</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.plus{
		width: 100%;
		margin-top: 200px;
	}
	.app_list{
		width: 100%;
	}
	.app_list .app_item{
		width: 120px;
		height: 120px;
		border: 1px solid #dedede;
		cursor: pointer;
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
				appList:[
					{
						name: '生命格子',
						value: 'lifeGrid'
					},
					{
						name: '扫雷',
						value: 'lifeGrid'
					},
					{
						name: '代码仓库',
						value: 'lifeGrid'
					},
					{
						name: '人生',
						value: 'lifeGrid'
					}
				]
			}
		},
		methods:{
			show_app: function(app){
				console.log(app);
			}
		},
		components:{

		},
		computed:{
			
		}
	}
</script>