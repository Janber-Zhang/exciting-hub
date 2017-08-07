<template>
  <div class="timmer">
    {{time_rel}}
  </div>    
</template>
<style scoped>
  .timmer{
    display: inline-block;
  }
</style>
<script>
  export default {
    created(){
      if (this.param.stop) {
        // 传入参数为false时，默认不开始计时
      } else {
        this.start();
      }

    },
    mounted(){

    },
    data(){
      return {
        hour       : 0,
        min        : 0,
        sec        : 0,
        intervalId : ''
      }
    },
    methods:{
      start: function(){
        let vm = this;
        this.intervalId = setInterval(function(){
          if (vm.sec<59) {
            vm.sec++
          } else {
            vm.sec = 0;
            if (vm.min<59) {
              vm.min++
            } else{
              vm.min = 0;
              vm.hour++
            }
          }
          let H = vm.hour>9?vm.hour:'0'+vm.hour;
          let M = vm.min>9?vm.min:'0'+vm.min;
          let S = vm.sec>9?vm.sec:'0'+vm.sec;
          vm.value = H + ' : ' + M + ' : ' + S
        }, 1000);
      }
    },
    watch: {
      'param.stop': function(val){       //param['stop']
        if (this.param.stop) {
          clearInterval(this.intervalId);
        } else {
          this.start();
        }
      },
      'time_rel': function(val){
        this.param.timming = this.time_rel;
      }

    },
    props: ['param'],
    components:{

    },
    directives: {

    },
    computed:{
      'time_rel': function(){
        let H = this.hour>9?this.hour:'0'+this.hour;
        let M = this.min>9?this.min:'0'+this.min;
        let S = this.sec>9?this.sec:'0'+this.sec;
        return H + ' : ' + M + ' : ' + S
      }
    }
  }
</script>