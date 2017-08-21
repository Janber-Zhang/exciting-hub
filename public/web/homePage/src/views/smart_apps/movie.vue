<template>
	<div class="app_warp">
		<div flex="main:center cross:center">
			<input type="text" class="keyword" v-model="searchKey" @keyup.enter="search" placeholder="搜索关键字">
		</div>
		<ul class="movie-list" v-if="searchMovieList.length">
			<li class="movie-list-item" v-for="item in searchMovieList">
				<img class="movie-list-item-img" :src="item.images.large" alt="">
				<p class="movie-list-item-name">{{item.original_title + '  '}}<span class="movie-list-item-year">{{'(' + item.year + ')'}}</span></p>
				<p>标签：<span class="movie-list-item-casts"v-for="u in item.genres">{{u + '  '}}</span></p>
				<p flex="cross:center">评分：<Rate disabled v-model="item.rating.average" :allow-half="true" :count="10"></Rate></p>
				<p>导演：<span class="movie-list-item-casts" @click="openUrl(u.alt)" v-for="u in item.directors">{{u.name + '  '}}</span></p>
				<p>演员：<span class="movie-list-item-casts" @click="openUrl(u.alt)" v-for="u in item.casts">{{u.name + '  '}}</span></p>
			</li>
		</ul>
	</div>
</template>
<style scoped>
	.keyword{
		display: inline-block;
	    width: 200px;
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
	    text-align: center;
	    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
	}
	.movie-list{
		width: 700px;
		margin:  40px auto;
	}
	.movie-list-item{
		position: relative;
		padding: 10px 20px 10px 150px;
		min-height: 160px;
		border-radius: 4px;
		margin: 10px 0;
	}
	.movie-list-item:hover{
		border: 1px solid #dedede;
	}
	.movie-list-item-name{
		font-size: 20px;
	}
	.movie-list-item-year{
		font-size: 16px;
	}
	.movie-list-item-img{
		width: 100px;
		height: 140px;
		position: absolute;
		left: 10px;
		border-radius: 4px;
	}
	.movie-list-item-casts{
		cursor: pointer;
	}
	.movie-list-item-casts:hover{
		color: #345a83;
	}
</style>
<script>
	import filters      from './../../js/filters.js';
	import API          from './../../js/service.js';
	export default {
		created(){
			this.initList();
		},
		mounted(){

		},
		data(){
			return {
				searchKey       :    '',          //搜索关键字
				searchMovieList :    [],          //搜索结果
			}
		},
		methods:{
			search: function() {
				API.searchMovie({key: this.searchKey || '哈哈'}, res => {
					this.searchMovieList = res.subjects;
				});
			},
			initList: function() {
				API.getNewMovieList({}, res => {
					this.searchMovieList = res.subjects;
				})
			},
			openUrl: function(url) {
				window.open(url);
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