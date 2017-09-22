<template>
  <div class="user-management" v-if="userInfo">
    <div class="w1200">
      <div class="breadcrumb">
        <ul>
          <li>
            <router-link :to="{name:'userCenterDefault'}">用户中心</router-link>
          </li>
          <li>用户信息管理</li>
        </ul>
      </div>
      <div class="main-box">
        <!-- 上传头像 -->
        <form>
          <div class="avatar clearfix"><span class="avatar-text">用户头像</span>
            <div class="user-photo fl">
              <div class="upload-pic preview1">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-change="beforePicUpload"
                  :auto-upload="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <!--<div class="avatar-cover" v-show="!imageUrl">上传头像</div>-->
            </div>
            <div class="upload-box fl">
              <p class="fca9a fs14 mt10">支持300KB以下的jpg、png、gif格式的图片</p>
            </div>
          </div>
        </form>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio :label="true">先生</el-radio>
              <el-radio :label="false">女士</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 职位 -->
          <el-form-item label="您的职位" prop="position">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <!-- 手机号 -->
          <div class="form-group">
            <label>
              <span class="fcred">*</span>
              <span class="fs14 fc5c5">手机号码</span>
            </label>
            <span class="fs14 fc5c5 va-middle">{{userInfo.phone_number}}</span>
            <router-link :to="{name:'userChangePhone'}" class="fs14 revise">修改手机</router-link>
          </div>
          <el-form-item label="固定电话" prop="fixednumber">
            <el-input v-model="ruleForm.fixednumber" placeholder="请输入固定电话 例：021-59167172" style="width: 100%;"></el-input>
          </el-form-item>
          <!-- 登录密码 -->
          <div class="form-group">
            <label>登录密码</label>
            <router-link :to="{name:'userChangepassword'}" class="fs14 revise" style="margin:0">修改密码</router-link>
          </div>
        </el-form>
      </div>
      <div class="btn-box">
        <a class="btn return" @click="backTo">返回</a>
        <a class="btn btn-blue save" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</a>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import dataURItoBlob from 'assets/js/dataUritoBlob'
  import {mapGetters} from 'vuex'

  export default{
    data(){
      //固定电话
      var checkfixNumber = (rule, value, callback) => {
        if (value == '') {
          callback();
        }
        else if (!(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value))) {
          callback(new Error('固定电话格式有误，请重新输入'));
        }
        else {
          callback();
        }
      };
      //职位名称
      var checkPosition = (rule,value,callback) =>{
        if(value!=''&&!(/^[\u4e00-\u9fa5a-zA-Z\-]{2,20}$/.test(value))){
          callback(new Error('职位名称应为2-20个字符，不包含数字'));
        }else{
          callback()
        }
      }
      return {
        fullscreenLoading:false,
        imageUrl: '',
        userInfo: '',
        items:{
          token:'',
          user:''
        },
        ruleForm: {
          name: '',
          position:'',//职位
          resource:'',//性别
          fixednumber:'',//固定电话
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          fixednumber: [
            {validator: checkfixNumber, trigger: 'blur'}
          ],
          position: [
            {validator: checkPosition, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['token'])
    },
    methods: {
      // 保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.fullscreenLoading = true
            var fd = new FormData();
            fd.append('user[name]', this.ruleForm.name)
            fd.append('user[gender]', this.ruleForm.resource)
            fd.append('user[position]', this.ruleForm.position)
            fd.append('user[fixed_phone]', this.ruleForm.fixednumber)
            this.items.token = this.token
            if (!this.isContains(this.imageUrl,'http')&&this.imageUrl!=null){
              var blob = dataURItoBlob(this.imageUrl);
              fd.append("user[avatar]", blob)
              this.$http.put(`${API.url}customer/users`, fd).then((response) => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.userInfo = response.body.user
                this.ruleForm.name = response.body.user.name//姓名
                this.ruleForm.position = response.body.user.position//职位
                this.ruleForm.resource = response.body.user.gender//性别
                this.ruleForm.fixednumber = response.body.user.fixed_phone
                this.items.user = response.body.user
                this.imageUrl = response.body.user.avatar
                this.$store.dispatch('login', this.items)
                // this.fullscreenLoading = false
                //this.$router.push({name: 'userCenterDefault'})
              }),(error) => {
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              }
            }else{
              this.$http.put(`${API.url}customer/users`, fd).then((response) => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.userInfo = response.body.user
                this.ruleForm.name = response.body.user.name//姓名
                this.ruleForm.position = response.body.user.position//职位
                this.ruleForm.resource = response.body.user.gender//性别
                this.ruleForm.fixednumber = response.body.user.fixed_phone
                this.imageUrl = response.body.user.avatar
                this.items.user = response.body.user
                this.$store.dispatch('login', this.items)
                // this.fullscreenLoading = false
                //this.$router.push({name: 'userCenterDefault'})
              }),(error) => {
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              }
            }
          } else {
            return false;
          }
        });
      },
      backTo(){
        this.$router.push({name: 'userCenterDefault'})
      },
      isContains(str, substr){
        return new RegExp(substr).test(str);
      },
      //上传图片
      beforePicUpload(file){
        this.imageUrlName = file.raw.name
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type) && this._uploadPic(file)) {  //type = image 图片进行压缩
          var reader = new FileReader()
          reader.onloadend = () => {
            var img = new Image()
            img.src = reader.result
            img.onload = () => {
              var w = Math.min(800, img.width)
              var h = img.height * (w / img.width)
              var canvas = document.createElement('canvas')
              var ctx = canvas.getContext('2d')
              canvas.width = w
              canvas.height = h
              ctx.drawImage(img, 0, 0, w, h)
              var dataURL = canvas.toDataURL('image/png')
              this.imageUrl = dataURL
            }
          }
          reader.readAsDataURL(file.raw)
        }
      },
      // 上传图片
      _uploadPic(file){
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isGIF = file.raw.type === 'image/gif';
        const isLt6M = file.size / 1024 < 300;
        if (!isJPG && !isPNG && !isGIF) {
          this.$message.error('上传图片只能是 jpg、png、gif格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 300KB!');
          return false
        }else{
          return true
        }
      },
    },
    created(){
      this.$http.get(API.url + 'customer/users'
      ).then((res) => {
        this.userInfo = res.body.user
        this.imageUrl = res.body.user.avatar
        this.ruleForm.name = res.body.user.name//姓名
        this.ruleForm.position = res.body.user.position//职位
        this.ruleForm.resource = res.body.user.gender//性别
        this.ruleForm.fixednumber = res.body.user.fixed_phone
      })
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scope>
  .user-management .form-group .form-error {
    right: -259px;
  }
  .avatar-uploader .el-upload {
    height:80px;
    width:80px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: url('../../../assets/images/userCenter/user-photo.png') 0/cover no-repeat;
    &:before{
      display: none;
    }
  }

  .avatar {
    width: 178px;
    height: 100px;
    display: block;
  }

  .user-management {
    background-color: #f5f5f5;
    position: relative;
    z-index: 1;
    padding-top: 20px;
    .breadcrumb {
      border-bottom: 1px solid #ccc;
    }
    .w1200 {
      background: #FFFFFF;
      padding: 0 20px;
    }
    .main-box {
      width: 515px;
      margin: 40px auto 0 auto;
    }
    .btn-box {
      border-top: 1px solid #eaeaea;
      margin-top: 40px;
      text-align: center;
      padding-bottom: 200px;
    }
  }
</style>
