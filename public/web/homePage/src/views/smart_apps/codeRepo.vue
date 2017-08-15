<template>
	<h1>github repo</h1>
</template>
<style scoped>
	
</style>
<script>
	import filters      from './../../js/filters.js';
	import API          from './../../js/service.js';
	export default {
		created(){
			API.getGitHubUserInfo({username:'janber-zhang'}, res => {
				console.log(res)
			})
		},
		mounted(){

		},
		data(){
			return {
				
			}
		},
		methods:{
			
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