<template>
  <div class="project-dtl">
    <!--<span class="gd-btn" @click="sywj"><i class="icon sywj-icon"></i>索要文件</span>-->
    <!--<span class="gd-btn" @click="qrwj"><i class="icon qrwj-icon"></i>确认文件</span>-->
    <!--<span class="gd-btn" @click="fswj"><i class="icon fswj-icon"></i>发送文件</span>-->
    <!--<span class="gd-btn" @click="fqht"><i class="icon fqht-icon"></i>发起合同</span>-->
    <!--<span class="gd-btn" @click="fstz"><i class="icon fstz-icon"></i>发送通知</span>-->
    <!--<span class="gd-btn" @click="fsbd"><i class="icon fsbd-icon"></i>发送表单</span>-->
    <!--<span class="gd-btn" @click="fqzf"><i class="icon fqzf-icon"></i>发起支付</span>-->
    <router-view></router-view>
  </div>
</template>
<script>
	export default{
    mounted(){
      var id = this.$route.params.id;

      if(id == 2){
//          this.$router.push()
      }
    },
		methods:{
			sywj(){
				this.$router.push({name:'sywj'})
      },
      qrwj(){
				this.$router.push({name:'qrwj'})
      },
      fswj(){
				this.$router.push({name:'fswj'})
      },
      fqht(){
				this.$router.push({name:'fqht'})
      },
      fstz(){
				this.$router.push({name:'fstz'})
      },
      fsbd(){
				this.$router.push({name:'fsbd'})
      },
      fqzf(){
				this.$router.push({name:'fqzf'})
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .gd-btn{
    display: inline-block;
    border:1px solid #3c8ced;
    border-radius:3px;
    width:96px;
    height:36px;
    line-height:36px;
    text-align: center;
    font-size:14px;
    color:#3c8ced;
    cursor: pointer;
    margin-right:20px;
    .icon{
      display: inline-block;
      vertical-align: middle;
      margin-right:5px;
      margin-top:-3px;
    }
  }
  .sywj-icon{
    width:15px;
    height:16px;
    background:url("../../assets/images/gd_ico/qrwj.png") no-repeat 0/cover;
  }
  .qrwj-icon{
    width:15px;
    height:16px;
    background:url("../../assets/images/gd_ico/sywj.png") no-repeat 0/cover;
  }
  .fswj-icon{
    width:15px;
    height:13px;
    background:url("../../assets/images/gd_ico/fswj.png") no-repeat 0/cover;
  }
   .fqht-icon{
    width:15px;
    height:15px;
    background:url("../../assets/images/gd_ico/fqht.png") no-repeat 0/cover;
  }
   .fstz-icon{
    width:15px;
    height:15px;
    background:url("../../assets/images/gd_ico/fstz.png") no-repeat 0/cover;
  }
   .fsbd-icon{
    width:14px;
    height:16px;
    background:url("../../assets/images/gd_ico/fsbd.png") no-repeat 0/cover;
  }
   .fqzf-icon{
    width:14px;
    height:15px;
    background:url("../../assets/images/gd_ico/fqzf.png") no-repeat 0/cover;
  }

</style>
