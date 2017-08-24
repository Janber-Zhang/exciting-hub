<template>
  <div>
    <i-button type="ghost" shape="circle" size="small" @click="handleClick" icon="scissors">
    裁切
    <input 
      type="file" 
      ref="input" 
      @change="handleChange"
      style="display:none">
    </i-button>

  </div> 
  
</template>
<style scoped>
  
</style>
<script>
  export default {
    created(){
      
    },
    mounted(){

    },
    data(){
      return {
        msg: 'cutting'
      }
    },
    methods:{
      handleClick () {
        this.$refs.input.click();
      },
      handleChange (e) {
        let file = e.target.files[0];
        
        console.log(file)
      }
    },
    watch: {
      
    },
    props: [],
    components:{

    },
    directives: {

    },
    computed:{
      
    }
  }
</script>