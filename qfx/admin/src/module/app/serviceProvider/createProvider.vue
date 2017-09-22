<template>
  <div class="create-provider">

    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{path:'/system/serviceImf/1'}">服务商信息</el-breadcrumb-item>
      <el-breadcrumb-item>新增服务商</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="createnlayout_form">
      <el-form :model="enterprise" :rules="rules" ref="enterpriseForm" label-width="100px">
        <el-form-item label="手机号码" prop="phone_number">
          <el-input v-model="enterprise.phone_number" placeholder="请输入11位手机号码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="enterprise.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="enterprise.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="固定电话" prop="fixtel">
          <el-input v-model="enterprise.fixtel" placeholder="请输入固定电话 例:021-57431234"></el-input>
        </el-form-item>
        <el-form-item label="职位名称">
          <el-input v-model="enterprise.position" placeholder="请输入职位名称"></el-input>
        </el-form-item>
        <el-form-item label="服务商名称" prop="corpname">
          <el-input v-model="enterprise.corpname" placeholder="请填写与工商营业执照中相同的企业全称"></el-input>
        </el-form-item>
        <div class="el-form-item is-required">
          <label class="el-form-item__label" style="width: 100px;">注册地址</label>
          <div class="wf_address" :class="{wf_address_error:showAddressError}">
            <v-distpicker :placeholders="placeholders" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
            <div class="el-form-item__error pf_shen">请选择企业地址</div>
          </div>
        </div>
        <el-form-item label="" prop="location">
          <el-input v-model="enterprise.location" placeholder="街道  门牌  建筑名  房间号"></el-input>
        </el-form-item>

        <el-form-item label="办公地址">
          <el-radio-group v-model="enterprise.bgaddress">
            <el-radio label="与注册地址相同"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="toggleCity">
          <div class="wf_address">
            <v-distpicker :placeholders="placeholders_1" @province="selectProvince_1" @city="selectCity_1" @area="selectArea_1"></v-distpicker>
          </div>
        </el-form-item>
        <el-form-item v-show="toggleCity">
          <el-input v-model="enterprise.address5" placeholder="街道  门牌  建筑名  房间号"></el-input>
        </el-form-item>

        <el-form-item label="发票类型"  class="is-required" prop="checkList">
          <el-checkbox-group v-model="enterprise.checkList">
            <el-checkbox label="common">增值税普通发票</el-checkbox>
            <el-checkbox label="increment">增值税专用发票</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="qyszhy">
          <div class="sz-title">
            <li v-for="(v,i) in yyzz" :class="{active:v.show}" @click="toggleZhizao(i)">{{v.text}}</li>
          </div>
          <div class="sz-main">
            <div v-if="yyzz[0].show">
              <div class="el-form-item">
                <label class="el-form-item__label" style="width: 100px;">营业执照</label>
                <div class="el-form-item__content" style="margin-left: 100px;">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    key="1"
                    :on-change="beforePicUpload"
                    :auto-upload="false">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType=='application/pdf'}" v-else></i>
                  </el-upload>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="el-form-item">
                <label class="el-form-item__label" style="width: 100px;">营业执照</label>
                <div class="el-form-item__content" style="margin-left: 100px;">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    key="2"
                    :on-change="beforePicUpload_1"
                    :auto-upload="false">
                    <img v-if="imageUrl_1" :src="imageUrl_1" class="avatar">
                    <i class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType_1=='application/pdf'}" v-else></i>
                  </el-upload>
                </div>
              </div>

              <div class="el-form-item">
                <label class="el-form-item__label" style="width: 100px;">组织机构代码证</label>
                <div class="el-form-item__content" style="margin-left: 100px;">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="beforePicUpload_2"
                    :auto-upload="false">
                    <img v-if="imageUrl_2" :src="imageUrl_2" class="avatar">
                    <i  class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType_2=='application/pdf'}" v-else></i>
                  </el-upload>
                </div>
              </div>

              <div class="el-form-item">
                <label class="el-form-item__label" style="width: 100px;">税务登记证</label>
                <div class="el-form-item__content" style="margin-left: 100px;">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-change="beforePicUpload_3"
                    :auto-upload="false">
                    <img v-if="imageUrl_3" :src="imageUrl_3" class="avatar">
                    <i class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType_3=='application/pdf'}" v-else></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
          <div class="sz-know">
            <h2>认证须知：</h2>
            <p>1. 请确保认证时需要提供文件的真实、有效、清晰。</p>
            <p>2. 支持6MB以下的jpg、png、pdf格式的图片。</p>
          </div>
        </div>
        <el-form-item>
          <el-button @click="go_negative">返回</el-button>
          <el-button type="primary" @click="onsubmit('enterpriseForm')" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="注册中">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import dataURItoBlob from 'assets/js/dataUritoBlob'
  import adminUrl from 'API/config'
  export default {
    components: {VDistpicker},
    data(){
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误，请输入正确的手机号!'));
          return false
        }
        this.$http.get(adminUrl.url + 'users/valid_phone_number', {
          params: {
            phone_number: this.enterprise.phone_number,
            type: 'Supplier'
          }
        }).then((res)=>{
          var exist = res.body.exist
          if(exist){
            callback(new Error('手机号码已被注册'))
          }
          else{
            callback()
          }
        })
      };
      //固定电话
      var checkfixNumber = (rule,value,callback) => {
        if(value==''){
          callback();
        }
        else if(!(/^0\d{2,3}-\d{5,9}$/.test(value))){
          callback(new Error('固定电话格式有误，请重新输入'));
        }
        else {
          callback();
        }
      }
      //服务商名称
      var checkCorpName = (rule,value,callback) => {
        this.$http.get(adminUrl.url+'providers/valid_name',{
          params:{
            name:this.enterprise.corpname
          }
        }).then((res)=>{
          var exist = res.body.exist
          if(exist){
            callback(new Error('服务商名称已被注册'))
          }
          else{
            callback()
          }
        })
      }
      return {
        fullscreenLoading: false,
        showAddressError:false,
        imageUrl: '',
        imageUrlName:'',
        imageUrl_1: '',
        imageUrlName_1:'',
        imageUrl_2: '',
        imageUrlName_2:'',
        imageUrl_3: '',
        imageUrlName_3:'',
        select: { province: '', city: '', area: '',province_1: '', city_1: '', area_1: '' },
        placeholders: {
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        placeholders_1:{
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        enterprise:{
          phone_number:'',
          name:'',
          gender:'',
          fixtel:'',
          position:'',
          corpname:'',
          location:'',
          bgaddress:'与注册地址相同',
          address5:'',
          checkList:[]
        },
        yyzz:[
          {show:true,text:'企业三证合一',type:'unify'},
          {show:false,text:'普通营业执照',type:'normal'}
        ],
        yyzzlx:'unify',
        rules:{
          phone_number:[
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkTel, trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          gender:[
            {required:true,message:"请选择性别",trigger:'change'}
          ],
          fixtel:[
            { validator: checkfixNumber, trigger: 'blur' }
          ],
          corpname:[
            {required:true,message:"请输入企业名称",trigger:'blur'},
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' },
            { validator: checkCorpName, trigger: 'blur' }
          ],
//          bgaddress:[{required:true,message:"请选择办公地址",trigger:'change'}],
          pid:[
            {required:true,message:"请选择企业地址",trigger:'blur'}
          ],
          location:[
            { required: true, message: '请输入企业地址', trigger: 'blur' }
          ],
          yyzz: [
            {required: true, message: "", trigger: 'change'}
          ],
          checkList: [
            {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
          ],
        },
        //pdf传输通道
        uploadType:'',
        uploadType_1:'',
        uploadType_2:'',
        uploadType_3:'',
        pfdFile:'',
        pfdFile_1:'',
        pfdFile_2:'',
        pfdFile_3:'',
      }
    },
    computed:{
      toggleCity(){
        if(this.enterprise.bgaddress=='与注册地址相同'){
          return false
        }else{
          return true
        }
      },
      usergender(){
        if(this.enterprise.gender=='男'){
          return true
        }else{
          return false
        }
      }
    },
    methods:{
      /*返回*/
      go_negative(){
        this.$router.go(-1)
      },
      /*城市*/
      selectProvince(value) {
        this.select.province = value
        if(this.select.province != '' && this.select.city != '' && this.select.area != ''
        ){
          this.showAddressError = false
        }
      },
      selectCity(value) {
        this.select.city = value
        if(this.select.province != '' && this.select.city != '' && this.select.area != ''
        ){
          this.showAddressError = false
        }
      },
      selectArea(value) {
        this.select.area = value
        if(this.select.province != '' && this.select.city != '' && this.select.area != ''
        ){
          this.showAddressError = false
        }
      },
      /*办公地址*/
      selectProvince_1(value) {
        this.select.province_1 = value
      },
      selectCity_1(value) {
        this.select.city_1 = value
      },
      selectArea_1(value) {
        this.select.area_1 = value
      },
      /*三证合一上传*/
      beforePicUpload(file){
        this.imageUrlName = file.raw.name
        this.uploadType = file.raw.type
        if(this.uploadType=='application/pdf'){
          this.imageUrl=''
          this.pfdFile = file.raw
        }
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isPdf = file.raw.type === 'application/pdf';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG && !isPdf) {
          this.$message.error('上传图片只能是 jpg、png、pdf格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 6MB!');
          return false
        }
        if (file && /^image\//i.test(file.raw.type)) {  //type = image 图片进行压缩
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
        this.uploadType_1 = file.raw.type
        if(this.uploadType_1=='application/pdf'){
          this.imageUrl_1=''
          this.pfdFile_1 = file.raw
        }
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isPdf = file.raw.type === 'application/pdf';

        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG && !isPdf) {
          this.$message.error('上传图片只能是 jpg、png、pdf格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 6MB!');
          return false
        }
        if (file && /^image\//i.test(file.raw.type)) {  //type = image 图片进行压缩
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
        this.uploadType_2 = file.raw.type
        if(this.uploadType_2=='application/pdf'){
          this.imageUrl_2=''
          this.pfdFile_2 = file.raw
        }
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isPdf = file.raw.type === 'application/pdf';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG && !isPdf) {
          this.$message.error('上传图片只能是 jpg、png、pdf格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 6MB!');
          return false
        }
        if (file && /^image\//i.test(file.raw.type)) {  //type = image 图片进行压缩
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
        this.uploadType_3 = file.raw.type
        if(this.uploadType_3=='application/pdf'){
          this.imageUrl_3=''
          this.pfdFile_3 = file.raw
        }
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG = file.raw.type === 'image/png';
        const isPdf = file.raw.type === 'application/pdf';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG && !isPdf) {
          this.$message.error('上传图片只能是 jpg、png、pdf格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传图片大小不能超过 6MB!');
          return false
        }
        if (file && /^image\//i.test(file.raw.type)) {  //type = image 图片进行压缩
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
      // 提交
      onsubmit(formName) {
        var fd = new FormData();
        var blob = dataURItoBlob(this.imageUrl);
        var blob_1 = dataURItoBlob(this.imageUrl_1);
        var blob_2 = dataURItoBlob(this.imageUrl_2);
        var blob_3 = dataURItoBlob(this.imageUrl_3);
        /*用户*/
        fd.append("user[phone_number]", this.enterprise.phone_number)
        fd.append("user[name]", this.enterprise.name)
        fd.append("user[gender]", this.usergender)
        fd.append("user[fixed_phone]", this.enterprise.fixtel)
        fd.append("user[position]", this.enterprise.position)
        /*企业*/
        fd.append("provider[name]", this.enterprise.corpname)
        fd.append("provider[province]", this.select.province)
        fd.append("provider[city]", this.select.city)
        fd.append("provider[district]", this.select.area)
        fd.append("provider[location]", this.enterprise.location)
        fd.append("provider[address_common]", this.toggleCity)
        fd.append("provider[cert_type]", this.yyzzlx)
//        发票
        this.enterprise.checkList.forEach((v)=>{
          fd.append("provider[invoice_type][]",v)
        })
        /*办公地址*/
        if(this.toggleCity==true){
          fd.append("provider[office_province]", this.select.province_1)
          fd.append("provider[office_city]", this.select.city_1)
          fd.append("provider[office_district]", this.select.area_1)
          fd.append("provider[office_location]", this.enterprise.address5)
        }else{
          fd.append("provider[office_province]", this.select.province)
          fd.append("provider[office_city]", this.select.city)
          fd.append("provider[office_district]", this.select.area)
          fd.append("provider[office_location]", this.enterprise.location)
        }
        /*图片*/
        if (this.imageUrlName != '' || (this.imageUrlName_1!='' && this.imageUrlName_2 != '' && this.imageUrlName_3 != '')){
          if(this.yyzzlx=='unify'){
            if(this.uploadType =='application/pdf'){
              fd.append("certifications[][name]", this.imageUrlName)
              fd.append("certifications[][file]", this.pfdFile)
            }else{
              fd.append("certifications[][name]", this.imageUrlName)
              fd.append("certifications[][file]", blob)
            }
          }else{
            if(this.uploadType_1 =='application/pdf'){
              fd.append("certifications[][name]", this.imageUrlName_1)
              fd.append("certifications[][file]", this.pfdFile_1)
              fd.append("certifications[][category]", 'business')
            }else{
              fd.append("certifications[][name]", this.imageUrlName_1)
              fd.append("certifications[][file]", blob_1)
              fd.append("certifications[][category]", 'business')

            }
            if(this.uploadType_2 =='application/pdf'){
              fd.append("certifications[][name]", this.imageUrlName_2)
              fd.append("certifications[][file]", this.pfdFile_2)
              fd.append("certifications[][category]", 'organization')
            }else{
              fd.append("certifications[][name]", this.imageUrlName_2)
              fd.append("certifications[][file]", blob_2)
              fd.append("certifications[][category]", 'organization')

            }
            if(this.uploadType_3 =='application/pdf'){
              fd.append("certifications[][name]", this.imageUrlName_3)
              fd.append("certifications[][file]", this.pfdFile_3)
              fd.append("certifications[][category]", 'tax')
            }else{
              fd.append("certifications[][name]", this.imageUrlName_3)
              fd.append("certifications[][file]", blob_3)
              fd.append("certifications[][category]", 'tax')

            }
          }
        }
        if (this.select.province == '' || this.select.city == '' || this.select.area == '' ||
          this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区'
          ) {
          this.showAddressError = true
        } else {
          this.showAddressError = false
        }
        this.$refs[formName].validate((valid) => {
          if (valid && !this.showAddressError) {
            this.fullscreenLoading = true;
            this.$http.post(adminUrl.url+'providers', fd).then((res) => {
              var fws_id= res.body.provider.id
              this.fullscreenLoading = false;
              this.$confirm('注册成功！', '温馨提示', {
                confirmButtonText: '确定',
                showCancelButton:false,
                type: 'success'
              }).then((res) => {
                this.$router.push({name: 'providerImf',params:{id:fws_id}})
              })
            }).catch((res)=>{
              this.fullscreenLoading = false;
              this.$confirm('注册失败','温馨提示',{
                confirmButtonText: '确定',
                showCancelButton:false,
                type: 'error'
              }).then()
              return false;
            })
          }
        });
      }
    }
  };
</script>
<style lang="scss">
  .el-loading-spinner .el-loading-text{margin: 0!important;}
  .wf_address{
    position: relative;
    select{
      width: 122px;
      border:1px solid #bfcbd9!important;
      font-size: 14px!important;
    }
    .pf_shen{
      left: 100px;
      display: none;
    }
  }
  .wf_address_error{
    select{
      border-color: red!important;
    }
    .pf_shen{
      display: block;
    }
  }
  .createnlayout_form{ margin: 20px auto 0;width: 476px; }
  .qyszhy{
    .sz-title{
      border:1px solid #3c8ced;
      width:380px;
      height:48px;
      line-height: 46px;
      margin-bottom: 20px;
      li{
        width: 50%;
        float: left;
        font-size:14px;
        color:#3c8ced;
        text-align:center;
        cursor: pointer;
        &.active{
          background-color: #3c8ced;
          color: #fff;
        }
      }
    }
    .sz-main{
      position: relative;
      width: 1000px;
    }
    .sz-know{
      font-size:14px;
      color:#a9a9a9;
      padding: 20px 0;
      h2{font-size: 16px;}
    }
  }
  //上传图片
  .yyzz_error{
    position: relative; left: 100px; top: -10px;
  }
  .avatar-uploader{
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
  .el-loading-spinner{
    margin-top: -40px;
    .el-loading-text{
      margin: -13px 0 0;
    }
  }
  //pdf遮罩
  .pdf-upload{
    background: url("../../../assets/images/pdf-cover.png") 0/cover no-repeat;
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
    overflow: hidden;
    height: 100px;
  }
</style>
