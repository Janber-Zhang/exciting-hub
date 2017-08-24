<template>
  <div>
    <i-button type="ghost" shape="circle" size="small" @click="handleClick" icon="scissors">
      裁切
      <input type="file" ref="input" @change="handleChange" style="display:none">
    </i-button>
    <div class="crop-panel" v-if="showCropPanel">
      <div class="crop-panel-header">
        <p>图片裁切</p>
      </div>
      <div class="crop-panel-imgbox">
        <div class="crop-panel-choose">
          <div class="crop-panel-default">
            <img :src="imgUrl" class="crop-panel-img" alt="">
            <div class="img"></div>
          </div>
        </div>
        <div class="crop-panel-handle">
          <canvas class="crop-panel-preview"></canvas>
          <i-button type="ghost" shape="circle" size="small" @click="chooseImg" icon="scissors">选择图片</i-button>
        </div>
      </div>
    </div>  
  </div> 
  
</template>
<style scoped>
  .crop-panel{
    position: fixed;
    width: 500px;
    height: 400px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #dedede;
    z-index: 999;
    background: #FFF;
  }
  .crop-panel-header{
    border-bottom: 1px solid #dedede;
    padding-left: 10px;
  }
  .crop-panel-imgbox{
    position: relative;
  }
  .crop-panel-choose{
    margin-top: 20px;
  }
  .crop-panel-img, .crop-panel-default{
    width: 200px;
    height: 200px;
  }
  .crop-panel-default{
    background: #f5f5f5;
    width: 300px;
    height: 240px;
    margin-left: 20px;
    box-shadow: 0 0 4px rgba(0,0,0,0.1) inset;
  }
  .crop-panel-handle{
    position: absolute;
    right: 10px;
    top: 0;
    width: 150px;
    text-align: center;
  }
  .crop-panel-preview{
    width: 100px;
    height: 100px;
    border: 1px solid #dedede;
    display: inline-block;
  }
</style>
<script>
  export default {
    created(){

    },
    mounted(){

    },
    data(){
      return {
        msg              : 'cutting',
        imgUrl           : '',
        showCropPanel    : false
      }
    },
    methods:{
      handleClick () {
        this.showCropPanel = true;
      },
      chooseImg () {
        this.$refs.input.click();
      },
      handleChange (e) {
        let file = e.target.files[0];
        console.log(file)
        if (file.type.indexOf('image') === -1) {
          this.$Message.error('请选择一张图片');
          return 
        }
        this.imgUrl = this.getImgUrl(file);
        this.showCropPanel = true;
      },
      getImgUrl (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file)
        }
        return url
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