<template>
  <div class="bgfff">
    <p>发送表单</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">发送表单</span>
      </div>
      <div class="content">
        <div class="input-item">
          <div class="chooose-file">
            <p class="tit">请选择表单</p>
            <span class="orange-btn">
              <el-button>选择表单</el-button>
            </span>
          </div>
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
    <p>对方处理中</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">企业信息调研</span>
        <span class="return">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">表单名称<span class="fr fc3c8 cp">填写表单</span></p>
        <p class="grey-border"></p>
        <div class="form-box">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="（1）贵公司申请认定前一年内是否发生重大安全、重大质量事故或严重环境违法行为？">
              <p class="answer">
                <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio" label="2">否</el-radio>
              </p>
            </el-form-item>
            <el-form-item label="（2）贵公司是否建立了开放式的创新创业平台？">
              <p class="answer">
                <el-radio class="radio" v-model="radio1" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio1" label="2">否</el-radio>
              </p>
            </el-form-item>
            <el-form-item label="（3）贵公司是否开展产学研合作，且具备与高校、研究院发生经费往来的凭证？">
              <p class="answer">
                <el-radio class="radio" v-model="radio2" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio2" label="2">否</el-radio>
              </p>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>
    <p>已完成</p>
    <div class="gd-box">
      <div class="title">
        <i class="tit-fsbd"></i>
        <span class="describe">企业信息调研</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已完成</span>
        </div>
      </div>
      <div class="content">
        <p class="fs14 fc5c5">表单名称<span class="fr fc3c8 cp" @click="modify = !modify">修改表单</span></p>
        <p class="grey-border"></p>
        <div class="form-box">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="（1）贵公司申请认定前一年内是否发生重大安全、重大质量事故或严重环境违法行为？">
              <p class="answer" v-show="!modify">
                否
              </p>
              <p class="answer" v-show="modify">
                <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio" label="2">否</el-radio>
              </p>
            </el-form-item>
            <el-form-item label="（2）贵公司是否建立了开放式的创新创业平台？">
              <p class="answer" v-show="!modify">
                是
              </p>
              <p class="answer" v-show="modify">
                <el-radio class="radio" v-model="radio1" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio1" label="2">否</el-radio>
              </p>
            </el-form-item>
            <el-form-item label="（3）贵公司是否开展产学研合作，且具备与高校、研究院发生经费往来的凭证？">
              <p class="answer" v-show="!modify">
               是
              </p>
              <p class="answer" v-show="modify">
                <el-radio class="radio" v-model="radio2" label="1">是</el-radio>
                <el-radio class="radio" v-model="radio2" label="2">否</el-radio>
              </p>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        radio: '',
        radio1: '',
        radio2: '',
        modify:false,//修改表单
      };
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
