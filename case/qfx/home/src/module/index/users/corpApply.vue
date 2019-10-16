<template>
  <div class="bgf5f">
    <div class="w1200">
      <div class="breadcrumb">
        <ul>
          <li>
            <router-link :to="{name:'userCenterDefault'}">用户中心</router-link>
          </li>
          <li>
            <router-link :to="{name:'corp'}">企业信息管理</router-link>
          </li>
          <li>企业认证</li>
        </ul>
      </div>
      <div class="corpmain">
        <div class="corp-apply">
          <div class="u-mian478">
            <el-form :model="corp" :rules="rules" ref="corp" label-width="120px">

              <el-form-item label="企业名称" prop="name">
                <el-input v-model="corp.name" placeholder="请输入企业名称"></el-input>
              </el-form-item>

              <div class="el-form-item is-required">
                <label class="el-form-item__label" style="width: 120px;">注册地址</label>
                <div class="wf_address" :class="{wf_address_error:showAddressError}">
                  <v-distpicker :placeholders="placeholders" :province="select.province" :city="select.city" :area="select.area"
                                @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
                  <div class="el-form-item__error pf_shen">请选择企业地址</div>
                </div>
              </div>

              <el-form-item prop="corpaddress" label-width="120px">
                <el-input v-model="corp.corpaddress" placeholder="街道  门牌  建筑名  房间号"></el-input>
              </el-form-item>

              <div class="qyszhy styleChange">
                <div class="sz-title">
                  <li v-for="(v,i) in yyzz" :class="{active:v.show}" @click="toggleZhizao(i)">{{v.text}}</li>
                </div>
                <div class="sz-main">
                  <div v-if="yyzz[0].show">
                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 120px;">营业执照</label>
                      <div class="el-form-item__content" style="margin-left: 120px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change="beforePicUpload"
                          key="1"
                          :auto-upload="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i class="el-icon-plus wf-upload" v-else></i>
                        </el-upload>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 120px;">营业执照</label>
                      <div class="el-form-item__content" style="margin-left: 120px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          key="2"
                          :on-change="beforePicUpload_1"
                          :auto-upload="false">
                          <img v-if="imageUrl_1" :src="imageUrl_1" class="avatar">
                          <i class="el-icon-plus wf-upload" v-else></i>
                        </el-upload>
                      </div>
                    </div>

                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 120px;">组织机构代码证</label>
                      <div class="el-form-item__content" style="margin-left: 120px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change="beforePicUpload_2"
                          :auto-upload="false">
                          <img v-if="imageUrl_2" :src="imageUrl_2" class="avatar">
                          <i class="el-icon-plus wf-upload" v-else></i>
                        </el-upload>
                      </div>
                    </div>

                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 120px;">税务登记证</label>
                      <div class="el-form-item__content" style="margin-left: 120px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change="beforePicUpload_3"
                          :auto-upload="false">
                          <img v-if="imageUrl_3" :src="imageUrl_3" class="avatar">
                          <i class="el-icon-plus wf-upload" v-else></i>
                        </el-upload>
                      </div>
                    </div>
                  </div>
                  <div v-show="changeWenjian" style="font-size:14px;color: red;margin-left: 120px;">请选择文件</div>
                </div>
                <div class="sz-know">
                  <h2>认证须知：</h2>
                  <p>1. 请确保认证时需要提供文件的真实、有效、清晰。</p>
                  <p>2. 支持6MB以下的jpg、png格式的图片。</p>
                </div>
              </div>

              <el-form-item label-width="120px">
                <el-button type="primary" @click="submitForm('corp')" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="提交申请中">提交申请</el-button>
              </el-form-item>

            </el-form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import VDistpicker from 'v-distpicker'
  import dataURItoBlob from 'assets/js/dataUritoBlob'
  export default{
    components:{VDistpicker},
    created(){
      this.$http.get(API.url+'customer/corps').then((res)=>{
        var resBody = res.body;
        var corp = resBody.corp;
        this.corp.name = corp.name;
        this.select.province = corp.province
        this.select.city = corp.city
        this.select.area = corp.district
        this.corp.corpaddress = corp.location
      }).catch()
    },
    data(){
      return {
        fullscreenLoading: false,
        imageUrl: '',
        imageUrlName: '',
        imageUrl_1: '',
        imageUrlName_1: '',
        imageUrl_2: '',
        imageUrlName_2: '',
        imageUrl_3: '',
        imageUrlName_3: '',
        yyzz: [
          {show: true, text: '企业三证合一', type: 'unify'},
          {show: false, text: '普通营业执照', type: 'normal'}
        ],
        yyzzlx: 'unify',
        //城市地址
        showAddressError: false,
        placeholders: {
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        select: {province: '', city: '', area: ''},
        corp:{
          name:'',
          corpaddress:''
        },
        rules: {
          name:[{required:true,message:'请输入企业名称',trigger:'blur'}],
          corpaddress:[{required:true,message:'请输入街道  门牌  建筑名  房间号',trigger:'blur'}]
        },
        changeWenjian:false,
      }
    },

    methods:{
      /*城市*/
      selectProvince(value) {
        this.select.province = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      selectCity(value) {
        this.select.city = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      selectArea(value) {
        this.select.area = value.value
        if (this.select.province != '' && this.select.city != '' && this.select.area != '') {
          this.showAddressError = false
        }
      },
      /*三证合一上传*/
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
      /*营业执照上传*/
      beforePicUpload_1(file){
        this.imageUrlName_1 = file.raw.name
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type) && this._uploadPic(file)) {
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
              this.imageUrl_1 = dataURL
            }
          }
          reader.readAsDataURL(file.raw)
        }
      },
      /*组织机构代码证*/
      beforePicUpload_2(file){
        this.imageUrlName_2 = file.raw.name
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type) && this._uploadPic(file)) {
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
              this.imageUrl_2 = dataURL
            }
          }
          reader.readAsDataURL(file.raw)
        }
      },
      /*税务登记证*/
      beforePicUpload_3(file){
        this.imageUrlName_3 = file.raw.name
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type) && this._uploadPic(file)) {
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
              this.imageUrl_3 = dataURL
            }
          }
          reader.readAsDataURL(file.raw)
        }
      },
      // 营业执照切换
      toggleZhizao(i){
        this.yyzz.forEach((v) => {
          v.show = false
        })
        this.yyzz[i].show = true;
        this.yyzzlx = this.yyzz[i].type
      },
      // 上传图片
      _uploadPic(file){
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG) {
          this.$message.error('上传图片只能是 jpg、png格式');
          return false
        }
        else if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 6MB!');
          return false
        }else {
          return true
        }
      },
      //提交申请
      submitForm(formName) {
        if (this.select.province == '' || this.select.city == '' || this.select.area == '' ||
          this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区') {
          this.showAddressError = true
        } else {
          this.showAddressError = false
        }
        this.$refs[formName].validate((valid) => {
          if (valid && !this.showAddressError) {
            var fd = new FormData();
            var blob = dataURItoBlob(this.imageUrl);
            var blob_1 = dataURItoBlob(this.imageUrl_1);
            var blob_2 = dataURItoBlob(this.imageUrl_2);
            var blob_3 = dataURItoBlob(this.imageUrl_3);
            fd.append('corp[name]',this.corp.name)
            fd.append('corp[province]',this.select.province)
            fd.append('corp[city]',this.select.city)
            fd.append('corp[district]',this.select.area)
            fd.append('corp[location]',this.corp.corpaddress)
            fd.append("corp[cert_type]", this.yyzzlx)
            /*图片*/
            if (this.imageUrlName != '' || (this.imageUrlName_1 != '' && this.imageUrlName_2 != '' && this.imageUrlName_3 != '')) {
              if (this.yyzzlx == 'unify') {
                fd.append("certifications[][name]", this.imageUrlName)
                fd.append("certifications[][file]", blob)
              } else {
                fd.append("certifications[][name]", this.imageUrlName_1)
                fd.append("certifications[][file]", blob_1)
                fd.append("certifications[][category]", 'business')
                fd.append("certifications[][name]", this.imageUrlName_2)
                fd.append("certifications[][file]", blob_2)
                fd.append("certifications[][category]", 'organization')
                fd.append("certifications[][name]", this.imageUrlName_3)
                fd.append("certifications[][file]", blob_3)
                fd.append("certifications[][category]", 'tax')
              }
              this.changeWenjian = false
              this.fullscreenLoading = true;
              this.$http.patch(
                API.url + 'customer/corps/auth',fd
              ).then(this._submitSuccess).catch(this._submitError)
            }else{
                this.changeWenjian = true
            }
          } else {
            return;
          }
        });
      },
      // 成功审核
      _submitSuccess(res){
        this.fullscreenLoading = false
        this.$confirm('提交审核！', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'success'
        }).then(() => {
          this.$router.push({name:'corpSuccess'})
        })
      },
      // 注册失败
      _submitError(error){
        this.fullscreenLoading = false;
        this.$confirm('提交审核失败', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'error'
        }).then()
        return false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .u-mian478 {
    width: 495px;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .corpmain {
    background-color: #fff;
    padding: 30px;
    .corp-apply {
      font-size: 14px;
      margin-bottom: 40px;
    }
    .tx-center {
      text-align: center;
    }
  }
  .wf_address {
    position: relative;
    select {
      width: 122px;
      border: 1px solid #bfcbd9 !important;
      font-size: 14px !important;
    }
    .pf_shen {
      left: 120px;
      display: none;
    }
  }
  .wf_address_error {
    select {
      border-color: red !important;
    }
    .pf_shen {
      display: block;
    }
  }
  .qyszhy {
    .sz-title {
      border: 1px solid #3c8ced;
      width: 380px;
      height: 48px;
      line-height: 46px;
      margin-bottom: 20px;
      li {
        width: 50%;
        float: left;
        font-size: 14px;
        color: #3c8ced;
        text-align: center;
        cursor: pointer;
        &.active {
          background-color: #3c8ced;
          color: #fff;
        }
      }
    }
    .sz-main {
      position: relative;
      width: 1000px;
    }
    .sz-know {
      font-size: 14px;
      color: #a9a9a9;
      padding: 20px 0;
      h2 {
        font-size: 16px;
      }
    }
  }
  .styleChange{
    .avatar-uploader .el-upload{
      width: 100px;
      height: 100px;
    }
    .avatar{
      width: 100px;
      height: 100px;
    }
  }
  //上传图片
  .yyzz_error {
    position: relative;
    left: 100px;
    top: -10px;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .el-loading-spinner {
    margin-top: -40px;
    .el-loading-text {
      margin: -13px 0 0;
    }
  }
  .wf-upload {
    background: url("./images/upload_pic.jpg") center no-repeat;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #3c8ced;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
  }
  .el-icon-plus:before {
    display: none;
  }
</style>
