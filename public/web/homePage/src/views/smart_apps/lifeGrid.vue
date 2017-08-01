<template>
	<div class="lifeGrid" flex="main:center">
		<div class="mainbody">
			<h2>生命格子</h2>
			<p>如果一个月算一个小格子，人生其实只有900个格子。在一张A4纸上画一个30X30的表格，每过一个月就涂掉一格。也许你没有想过，被量化后的人生原来如此短暂...</p>
			<div class="birthday_select" flex="main:center cross:center">
				<span>出生日期</span>
				<Date-picker v-model="birthday" format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择出生年月"></Date-picker>
			</div>
			<div class="tips">
				<span>你已经活了</span><span>{{parseInt(yourlifeGone/12) + '年' + yourlifeGone%12 + '月'}}</span>
			</div>
			<div class="grid">
				<div v-for="i in 900" class="month_grid" v-bind:class="{isGone: i < yourlifeGone}"></div>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.lifeGrid{
		width: 100%;
	}
	.lifeGrid .mainbody{
		width: 900px;
	}
	.lifeGrid .mainbody h2{
		font-size: 18px!important;
		text-align: center;
	}
	.lifeGrid .mainbody p{
		font-size: 13px;
		margin: 10px 200px;
	}
	.lifeGrid .mainbody .birthday_select{
		margin-top: 20px;
	}
	.lifeGrid .mainbody .birthday_select span{
		margin-right: 20px;
	}
	.lifeGrid .mainbody .tips{
		margin-top: 10px;
		text-align: center;
	}
	.grid{
		width: 602px;
		height: 602px;
		margin: 20px auto;
		border-left: 1px solid #dedede;
		border-top: 1px solid #dedede;
	}
	.grid .month_grid{
		float: left;
		width: 20px;
		height: 20px;
		border-right: 1px solid #dedede;
		border-bottom: 1px solid #dedede;
	}
	.grid .month_grid:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}
	.grid .month_grid.isGone{
		background-color: #f90;
	}
</style>
<script>
	export default {
		created(){
			this.birthday = this.userInfo.birthday;
		},
		ready(){

		},
		data(){
			return {
				birthday: ''
			}
		},
		methods:{
			
		},
		components:{

		},
		computed:{
			userInfo(){
				return this.$store.getters.getUserInfo
			},
			shouldSelect(){
				if (this.userInfo.birthday === '') {
					return true
				} else {
					return false
				}
			},
			yourlifeGone(){
				let now_time = new Date(),
				birthday = new Date(this.birthday);
				let months = (now_time.getFullYear() - birthday.getFullYear()) * 12;
				months -= birthday.getMonth() + 1;
				months += now_time.getMonth();
				months = months || 0;
				return months<0? 0: months
			}
		}
	}
</script>