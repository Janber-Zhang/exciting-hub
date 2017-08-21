<template>
	<div flex="main:center cross:top" class="app_warp">
		<div flex="main:center cross:center">
			<input type="text" class="keyword" v-model="searchKey" @keyup.enter="searchUser" placeholder="请输入github昵称。。。">
		</div>
	</div>
</template>
<style scoped>
	.keyword{
		display: inline-block;
	    width: 100%;
	    height: 32px;
	    line-height: 1.5;
	    padding: 4px 7px;
	    font-size: 12px;
	    border: 1px solid #dddee1;
	    border-radius: 4px;
	    color: #495060;
	    background-color: #fff;
	    background-image: none;
	    position: relative;
	    cursor: text;
	    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
	}
</style>
<script>
	import filters      from './../../js/filters.js';
	import API          from './../../js/service.js';
	export default {
		created(){
			this.getUserList();
		},
		mounted(){

		},
		data(){
			return {
				searchKey  :    ''          //搜索github用户
			}
		},
		methods:{
			getUserList: function() {
				let vm = this;
				API.getAppsRecords({
					app_name: 'codeRepo',
					type: 2
				}, function(res){
					console.log(res)
				});
			},
			searchUser: function() {
				API.getGitHubUserInfo({username: this.searchKey || 'janber-zhang'}, res => {
					console.log(res);
				});
			},
			addWhatchUser: function(param) {
				let vm = this;
				let params = {
					app_name      :    'codeRepo',
					data          :    param.data
				};
				API.addAppRecord(params,function(res){
					vm.SUCCESS = false;
					vm.initRecordList();
				});
			}
		},
		watch: {
			
		},
		components:{
			
		},
		filters: {

		},
		directives: {

		},
		computed:{
			
		}
	}
</script>