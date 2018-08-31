<template>
  <div class="typeline">
    <div class="leftshouru">({{index+1}})&nbsp;{{message.title}}</div>
    <select class="selectName">
      <option value="a"  v-for="(option,index) in message.value">{{message.value[index]}}</option>
    </select>
  </div>
</template>
<script>
  export default{
    name: 'select2',
    props:['message','index'],
    methods:{
      reSet(){
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped="">

  .typeline{
    margin-top: 20px;
    position: relative;
    .block{
      margin-top: 20px;
    }
    .yuandian{
      position: absolute;
      left: -11px;
    }
    /*.beizhu{*/
    /*font-size: 12px;*/
    /*color: #999;*/
    /*margin:5px 0;*/
    /*text-indent: 20px;*/
    /*}*/
    .upload-demo{
      width: 100%;
      .el-upload{
        width: 100%;
      }
      .el-upload-dragger{
        width: 59%;
        height: 130px;
      }
    }
  }

</style>
