<template>
  <div class="bgfff">
    <p>发送通知</p>
    <p>创建</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">发送通知</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button>取消</el-button>
            </span>
            <el-button type="primary">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <p>创建成功</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">培训通知</span>
        <span class="return">撤回当前事项</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips">
          <span>培训日期：2017-05-26</span><br/>
          <span>培训机构：上海豫谦财务咨询事务所</span><br/>
          <span>培训地址：上海市徐汇区零陵路599号快易名商1102室</span><br/>
        </span>
        <div class="message-box">
          <i class="icon-message"></i>
          <span>如有需要，请短信通知对方（已发送<span class="count"> 0 </span>次）</span><span class="send-msg" @click="sendMsg">发送短信</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        textarea: ''
      }
    },
    methods:{
    	sendMsg(){
        this.$confirm('确定发送短信通知对方？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已发送!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '发送失败'
          });
        });
      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
