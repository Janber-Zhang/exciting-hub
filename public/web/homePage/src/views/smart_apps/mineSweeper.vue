<template>
	<div flex="main:center" class="app_warp">
		<div class="app_body" flex="main:center">
			<!-- <h1>扫雷大战</h1> -->
			<div class="mine_area">
				<div class="option" flex="main:center">
					<i-select v-model="now_level" style="width:80px">
						<i-option v-for="item in level_arr" :value="item.value" :key="item.name">{{ item.name }}</i-option>
					</i-select>
					<i-button type="primary" class="reset" @click="initMineGrids(now_level)">重置</i-button>
				</div>
				<timmer :param="timming"></timmer>
				<table id="mines_table">
					<tbody>
						<tr v-for="xline in grid_array">
							<td class="grid" :grid-index="grid.index" v-for="grid in xline" v-bind:class="{'isOpen':!grid.boom && grid.isShow}" @click="confirmNot(grid)">
								<img src="/images/boom.svg" width="22" v-show="grid.boom && grid.isShow" alt="">
								<img src="/images/flag.svg" width="14" v-show="grid.mark" alt="">
								<span v-show="!grid.boom && grid.isShow">{{grid.near || ''}}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.mine_area .option{
		padding: 20px;
	}
	.mine_area .option .reset{
		margin-left: 20px;
	}
	.mine_area table{
		border: 1px solid #dedede;
		background-color: #69647b;
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
		left: 0;
		right: 0;
	}
	.mine_area table tr td img{
		pointer-events: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.grid:hover{
		background-color: #f5f5f5;
	}
	.isOpen{
		background-color: #8ee094 !important;
	}
</style>
<script>
	import Timmer from '../../components/timmer'
	export default {
		created(){
			
		},
		mounted(){
			this.initMineGrids(this.now_level);   // DOM挂载结束后重写雷区oncontextmenu事件
		},
		data(){
			return {
				level_arr: [               //等级选择列表
				{
					value:'Lower', 
					name:'初级'
				}, 
				{
					value:'Middle',
					name:'中级'
				}, 
				{
					value:'High', 
					name:'高级'
				}
				],
				now_level: 'Lower',		   //当前游戏等级
				config:{                   //等级配置
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
				grid_array: [],       //格点阵列
				now_config: {},       //当前配置
				marked_num: 0,	      //标记数
				opened_num: 0,        //打开数
				timming: {
					timming_stop: true,   //计时停止
					timming: ''           //时间
				}
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
						if (grid_arr_obj[index].isShow) {
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
				if (grid.isShow) {
					return
				} else if (grid.mark) {
					this.$Message.error('has marked!!!');
					return
				}
				grid.isShow = true;
				if (grid.boom) {
					this.timming.timming_stop = true;
					this.$Message.error('BOOM!!!');
					this.openAllBooms();
					return
				} else {
					this.opened_num++;
					// 获取附近的地雷个数
					grid.near = this.getNearBoomNum(grid);
					if (grid.near === 0) {
						this.openAround(grid);
					}
				}
			},
			openAround: function(grid) {
				let vm = this;
				let near_position = this.getAround(grid);
				near_position.forEach(function(item){
					let grid_true = vm.grid_array[item.y-1][item.x-1];
					vm.confirmNot(grid_true);
				});
			},
			openAllBooms: function(){
				this.grid_array.forEach(function(line){
					line.forEach(function(grid){
						if (!grid.isShow && grid.boom) {
							grid.isShow = true;
							grid.mark = false;
						}
					});
				});
			},
			getAround: function(grid){
				let vm = this;
				let x = grid.x;
				let y = grid.y;
				let near_position = [];
				let near_position_pre = [
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
				near_position_pre.forEach(function(pos){
					if (pos.x == 0 || pos.x > vm.now_config.width || pos.y == 0 || pos.y > vm.now_config.length) {
					} else {
						near_position.push(pos);
					}
				});
				return near_position
			},
			getNearBoomNum: function (grid) {
				let vm = this;
				let boom_number = 0;
				let near_position = this.getAround(grid);
				near_position.forEach(function(pos){
					if (pos.x == 0 || pos.x > vm.now_config.width || pos.y == 0 || pos.y > vm.now_config.length) {
					} else {
						if (vm.grid_array[pos.y-1][pos.x-1]['boom']) {
							boom_number++
						}
					}
				});
				return boom_number;
			}
		},
		watch: {
			marked_num: function(val){
				if (this.marked_num === this.now_config.counts && this.opened_num === (this.now_config.length*this.now_config.width-this.now_config.counts)) {
					this.$Message.success('SUCCESS!!!');
				}
			},
			opened_num: function(val){
				if (this.marked_num === this.now_config.counts && this.opened_num === (this.now_config.length*this.now_config.width-this.now_config.counts)) {
					this.$Message.success('SUCCESS!!!');
				}
			}
		},
		components:{
			'timmer' : Timmer
		},
		directives: {

		},
		computed:{
			
		}
	}
</script>