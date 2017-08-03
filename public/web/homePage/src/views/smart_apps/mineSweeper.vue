<template>
	<div flex="main:center" class="app_warp">
		<div class="app_body" flex="main:center">
			<!-- <h1>扫雷大战</h1> -->
			<div class="mine_area">
			<h1>标记数：{{marked_num}}</h1>
				<table id="mines_table">
					<tbody>
						<tr v-for="xline in grid_array">
							<td class="grid" :grid-index="grid.index" v-for="grid in xline" @click="confirmNot(grid)">
								<img src="/images/boom.svg" width="22" v-show="grid.boom && grid.isShow" alt="">
								<img src="/images/flag.svg" width="14" v-show="grid.mark" alt="">
								<span v-show="!grid.boom && grid.isShow">{{grid.near}}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.mine_area table{
		border: 1px solid #dedede;
	}
	.mine_area table tr td{
		display: table-cell;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #dedede;
    text-align: center;
    background-color: #dddee1;
    position: relative;
	}
	.mine_area table tr td span{
		font-size: 10px;
		position: absolute;
	}
	.mine_area table tr td img{
		pointer-events: none;
	}
	.grid:hover{
		background-color: #f5f5f5;
	}
</style>
<script>
	export default {
		created(){
			
		},
		mounted(){
			this.initMineGrids('Lower');   // DOM挂载结束后重写雷区oncontextmenu事件
		},
		data(){
			return {
				config:{
					Lower:{
						length  : 9, 
						width   : 9, 
						counts  : 10
					},
					Middle: {
						length  : 16, 
						width   : 16, 
						counts  : 40
					},
					High: {
						length  : 16,
						width   : 30, 
						counts  : 99
					}
				},
				grid_array: [],
				now_config: {},
				marked_num: 0
			}
		},
		methods:{
			initMineGrids: function(type){
				let vm = this;
				let param = this.config[type];
				this.now_config = param;
				let i = 0;
				let grid_arr_obj = {};
				// 生成矩阵
				let grid_array = new Array(param.length).fill('value').map(function(item, index_y) {
					let x_arr = new Array(param.width).fill('value').map(function(item_1,index_x){
						i++;
						return {
							x      : index_x+1,	 //列数
							y      : index_y+1,	 //行数
							index  : i,					 //编号
							boom   : false,			 //是否为雷
							isShow : false,			 //是否被挖开
							near   : '',				 //周围地雷数量
							mark   : false       //标记为雷
						}
					})
					return x_arr
				});
				let grid_array_flat = util.arrayFlat(grid_array);
				grid_array_flat.forEach(function(item){
					grid_arr_obj[item.index] = item;
				});
				// 随机生成地雷位置
				var mine_arr = util.getRandom(1, param.length*param.width, param.counts, true);
				// 埋雷
				mine_arr.forEach(function(item){
					grid_arr_obj[item].boom = true;
				});
				this.grid_array = grid_array;
				// 重写鼠标右键事件
				document.getElementById('mines_table').oncontextmenu = (e)=>{
					if (e.target.tagName == 'TD') {
						let index = $(e.target).attr('grid-index');
						if ((vm.marked_num == vm.now_config.counts && !grid_arr_obj[index].mark) || grid_arr_obj[index].isShow) {
							vm.$Message.error('不可标记');
							return false
						}
						grid_arr_obj[index].mark = !grid_arr_obj[index].mark;
						if (grid_arr_obj[index].mark) {
							vm.marked_num++
						} else {
							vm.marked_num--
						}
					}
					return false
				};
			},
			confirmNot: function(grid){
				grid.isShow = true;
				if (grid.mark) {
					this.$Message.error('has marked!!!');
					return
				}
				if (grid.boom) {
					this.$Message.error('BOOM!!!');
					return
				} else {
					// 获取附近的地雷个数
					grid.near = this.getNearBoomNum(grid);
				}
			},
			getNearBoomNum: function (grid) {
				let vm = this;
				let x = grid.x;
				let y = grid.y;
				let boom_number = 0;
				let near_position = [
					{
						x:x-1,
						y:y-1
					},
					{
						x:x,
						y:y-1
					},
					{
						x:x+1,
						y:y-1
					},
					{
						x:x-1,
						y:y
					},
					{
						x:x+1,
						y:y
					},
					{
						x:x-1,
						y:y+1
					},
					{
						x:x,
						y:y+1
					},
					{
						x:x+1,
						y:y+1
					},
				]; 
				near_position.forEach(function(pos){
					if (pos.x == 0 || pos.x > vm.now_config.width || pos.y == 0 || pos.y > vm.now_config.length) {
						console.log('position not exist')
					} else {
						if (vm.grid_array[pos.y-1][pos.x-1]['boom']) {
							boom_number++
						}
					}
				});
				return boom_number;
			},
			confirmIs: function(grid) {
				console.log(grid);
			}
		},
		components:{

		},
		directives: {

		},
		computed:{
			
		}
	}
</script>