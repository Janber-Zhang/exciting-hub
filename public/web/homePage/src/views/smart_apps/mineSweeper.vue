<template>
	<div flex="main:center" class="app_warp">
		<div class="app_body" flex="main:center">
			<!-- <h1>扫雷大战</h1> -->
			<div class="mine_area" v-show="record_list">
				<div class="option" flex="main:center cross:center">
					<span>难度：</span>
					<i-select v-model="now_level" style="width:80px">
						<i-option v-for="item in level_arr" :value="item.value" :key="item.name">{{ item.name }}</i-option>
					</i-select>
					<i-button type="primary" class="reset" @click="initMineGrids(now_level)">重置</i-button>
				</div>
				<div class="timmer"><span>计时器：</span><span class="length">{{timming.length | getTimeStr}}</span></div>
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
		<Collapse v-model="show_sort" accordion style="width: 200px;" v-if="record_list">
			<Panel name="1">
				初级-风云榜
				<ul class="record_list" slot="content">
					<li class="head_item">我的排名：{{record_list.Lower.myOrder? record_list.Lower.myOrder: '暂无'}}</li>
					<li class="list_item"><span class="index">排名</span><span class="nickname">昵称</span><span class="record">用时</span></li>
					<li class="list_item" slot="content" v-for="(item,index) in record_list.Lower.dataList">
						<span class="index">{{index+1}}</span>
						<span class="nickname">{{item.nickname}}</span>
						<span class="record">{{item.time_cost | getSeconds}}</span>
					</li>
				</ul>
			</Panel>
			<Panel name="2">
				中级-风云榜
				<ul class="record_list" slot="content">
					<li class="head_item">我的排名：{{record_list.Middle.myOrder? record_list.Middle.myOrder: '暂无'}}</li>
					<li class="list_item"><span class="index">排名</span><span class="nickname">昵称</span><span class="record">用时</span></li>
					<li class="list_item" slot="content" v-for="(item,index) in record_list.Middle.dataList">
						<span class="index">{{index+1}}</span>
						<span class="nickname">{{item.nickname}}</span>
						<span class="record">{{item.time_cost | getSeconds}}</span>
					</li>
				</ul>
			</Panel>
			<Panel name="3">
				高级-风云榜
				<ul class="record_list" slot="content">
					<li class="head_item">我的排名：{{record_list.High.myOrder? record_list.High.myOrder: '暂无'}}</li>
					<li class="list_item"><span class="index">排名</span><span class="nickname">昵称</span><span class="record">用时</span></li>
					<li class="list_item" slot="content" v-for="(item,index) in record_list.High.dataList">
						<span class="index">{{index+1}}</span>
						<span class="nickname">{{item.nickname}}</span>
						<span class="record">{{item.time_cost | getSeconds}}</span>
					</li>
				</ul>
			</Panel>
		</Collapse>
		<Modal v-model="SUCCESS" width="360" :mask-closable="false">
			<p slot="header" style="color:#42b983;text-align:center">
				<Icon type="ios-checkmark"></Icon>
				<span>恭喜你扫雷成功!!!</span>
			</p>
			<div style="text-align:center">
				<p></p>
				<p style="margin-bottom:10px">本次记录为: <span style="color: red">{{timming.length | getTimeStr}}</span>，是否发送本次记录！！！</p>
				<i-input v-model="finish_desc" placeholder="请发表完赛感言..."></i-input>
			</div>
			<div slot="footer">
				<i-button type="success" size="large" long @click="sendRecord">发送</i-button>
			</div>
		</Modal>
	</div>
</template>
<style scoped>
	.mine_area .option{
		padding: 20px;
	}
	.mine_area .option span{
		font-size: 14px;
	}
	.mine_area .option .reset{
		margin-left: 20px;
	}
	.mine_area .timmer{
		text-align: center;
		margin-bottom: 10px;
	}
	.mine_area .timmer .length{
		color: #e07474;
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
	.record_list .head_item{
		text-align: center;
    background-color: #f9f9f9;
	}
	.record_list .list_item{
		padding: 3px 0
	}
	.record_list .list_item span{
		display: inline-block;
		text-align: center;
	}
	.record_list .list_item .index{
		width: 38px;
	}
	.record_list .list_item .nickname{
		width: 80px;
	}
	.record_list .list_item .record{
		width: 40px;
		float: right
	}
</style>
<script>
	import filters      from './../../js/filters.js';
	import API          from './../../js/service.js';
	export default {
		created(){
			this.initRecordList();
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
				config:{                 //等级配置
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
				grid_array    : [],       //格点阵列
				now_config    : {},       //当前配置
				marked_num    : 0,	      //标记数
				opened_num    : 0,        //打开数
				timming: {
					start : '',       //计时
					length: 0,        //计数(ms)
				  interval:''         //IntervalId
				},
				isDisabled: false,    //是否可操作
				SUCCESS   : false,    //是否已成功
				finish_desc:'',       //完赛感言
				show_sort : '1',      //历史记录
				record_list: false
			}
		},
		methods:{
			initMineGrids: function(type){
				this.initState();     //初始化各状态信息
				this.timmingStop();   //停止计时
				this.timmingInit();   //初始化计时器
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
					if (vm.isDisabled) {
						return false
					}
					if (e.target.tagName == 'TD') {
						// 第一次点击，开始计时
						if (!vm.marked_num && !vm.opened_num) {
							vm.timmingStart();
						}
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
					return false   //阻止默认事件
				};
			},
			confirmNot: function(grid){
				if (this.isDisabled) {
					return
				}
				// 第一次点击，开始计时
				if (!this.marked_num && !this.opened_num) {
					this.timmingStart();
				}
				if (grid.isShow) {
					return
				} else if (grid.mark) {
					this.$Message.error('has marked!!!');
					return
				}
				grid.isShow = true;
				if (grid.boom) {
					this.isDisabled = true;
					this.timmingStop();
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
			},
			initState: function(){
				this.marked_num = 0;   //标记数&打开数重置
				this.opened_num = 0;
				this.isDisabled = false;
				this.SUCCESS = false;
				this.finish_desc = '';
			},
			timmingStart: function(){   //开始计时
				this.timmingStop();
				let vm = this;
				this.timming.start = new Date();
				this.timming.interval = setInterval(function(){
					vm.timming.length = new Date() - vm.timming.start;
				}, 1000);
			},
			timmingStop: function(){    //停止计时
				if (this.timming.interval) {
					clearInterval(this.timming.interval);
				}
			},
			timmingInit: function(){    //初始化计时器
				this.timming = {
					start : '',       //计时
					length: 0,        //计数(ms)
				  interval:'',      //IntervalId
				}
			},
			sendRecord: function(){
				let vm = this;
				if (!this.timming.length) {
					this.$Message.error('参数错误！！！');
					// return
				}
				let param = {
					app_name      :    'mineSweeper',
					mine_record   :    this.timming.length,
					type          :    this.now_level,
					descr         :    this.finish_desc
				}
				API.addAppRecord(param,function(res){
					vm.SUCCESS = false;
					vm.initRecordList();
				});
			},
			initRecordList: function(){
				let vm = this;
				API.getAppsRecords({
					app_name: 'mineSweeper',
					type: 2
				}, function(res){
					vm.record_list = res.data;
				});
			}
		},
		watch: {
			marked_num: function(val){
				if (this.marked_num === this.now_config.counts && this.opened_num === (this.now_config.length*this.now_config.width-this.now_config.counts)) {
					this.isDisabled = true;
					this.timmingStop();
					this.SUCCESS = true;
					this.$Message.success('SUCCESS!!!');
				}
			},
			opened_num: function(val){
				if (this.marked_num === this.now_config.counts && this.opened_num === (this.now_config.length*this.now_config.width-this.now_config.counts)) {
					this.isDisabled = true;
					this.timmingStop();
					this.SUCCESS = true;
					this.$Message.success('SUCCESS!!!');
				}
			}
		},
		components:{
			
		},
		filters: {
			getTimeStr: filters.getTimeStr,
			getSeconds: filters.getSeconds
		},
		directives: {

		},
		computed:{
			
		}
	}
</script>