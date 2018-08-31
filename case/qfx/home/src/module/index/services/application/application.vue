<template>
  <div class="application" v-loading.body="loading">
    <div class="mainpart">
      <div class="min-width">
        <div class="breadcrumb">
          <ul>
            <li>
              <router-link :to="{name:'category',params:{ id:categoryId }}">
                {{products.service_category}}
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'proIndex',params:{ id:serviceId }}">{{products.service}}
              </router-link>
            </li>
            <li>服务申请</li>
          </ul>
        </div>
        <div class="sa-apply" v-if="formDtl">
          <div class="sa-success">
            <h3 class="fs16 fc1b1 fw-bold">{{products.service}}</h3>
          </div>
          <div class="editmen">
            <div class="mention ma" v-if="formDtl.summary">
              {{formDtl.summary}}
            </div>
          </div>
          <div class="fill-box bgfff">
            <component v-for="(item,i) in list_form" :key="i" v-bind:message="item" v-bind:index="i"
                       :is="'p' + item.type" ref="wf_input"></component>
            <div class="imf-box" v-if="corpStatus=='unauthorized'||corpStatus=='failed'">
              <p class="title">信息核对</p>
              <div class="imf-dtl">
                <i class="ico-apply"></i>
                <p class="mention">以上信息提交后，服务机构可能将通过电话的方式与您取得联系。
                  请核对以下信息，确保沟通顺畅。如有变动，请至<router-link :to="{name:'userCenterDefault'}">用户中心</router-link>修改。</p>
                <ul>
                  <li><span class="title">姓名</span><span class="content">{{user.name}}</span></li>
                  <li><span class="title">性别</span><span class="content">{{user.gender?'男':'女'}}</span></li>
                  <li><span class="title">座机</span><span class="content">{{user.fixed_phone}}</span></li>
                  <li><span class="title">手机</span><span class="content">{{user.phone_number}}</span></li>
                </ul>
              </div>
            </div>
            <div class="imf-box" v-if="corpStatus=='unauthorized'||corpStatus=='failed'">
              <p class="title">企业认证</p>
              <div class="qyszhy">
                <div class="sz-title">
                  <li v-for="(v,i) in yyzz" :class="{active:v.show}" @click="toggleZhizao(i)">{{v.text}}</li>
                </div>
                <div class="sz-main">
                  <div v-if="yyzz[0].show" class="clearfix">
                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 110px;">营业执照</label>
                      <div class="el-form-item__content" style="margin-left: 110px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change="beforePicUpload"
                          key="1"
                          :auto-upload="false">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType=='application/pdf'}" v-else></i>
                        </el-upload>
                        <!--<span class="pdf-cover"></span>-->
                      </div>
                    </div>
                  </div>
                  <div v-else class="clearfix">
                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 110px;">营业执照</label>
                      <div class="el-form-item__content" style="margin-left: 110px;margin-right:25px;">
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
                      <label class="el-form-item__label" style="width: 110px;">组织机构代码证</label>
                      <div class="el-form-item__content" style="margin-left: 110px;">
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-change="beforePicUpload_2"
                          :auto-upload="false">
                          <img v-if="imageUrl_2" :src="imageUrl_2" class="avatar">
                          <i class="el-icon-plus wf-upload" :class="{'pdf-upload':uploadType_2=='application/pdf'}" v-else></i>
                        </el-upload>
                      </div>
                    </div>

                    <div class="el-form-item">
                      <label class="el-form-item__label" style="width: 110px;">税务登记证</label>
                      <div class="el-form-item__content" style="margin-left: 110px;">
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

            </div>

            <div class="btn-box">
              <el-button type="primary" @click="onTest">提交</el-button>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="corp-dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        size="tiny">
        <i @click="dialogVisible = false" class="el-icon-close"></i>
        <p><i class="icon-warn"></i></p>
        <p><span class="mention">本项服务需要对企业用户的真实性进行验证，请按照要求提供认证材料。</span></p>
        <el-button type="primary" @click="dialogVisible = false">知道了</el-button>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import API from 'API/config'
  import pchartinput  from './form/input.vue'     // 单行文本
  import pcharttextarea  from './form/textarea.vue'  // 多行文本
  import pchartradio  from './form/radio.vue'     // 单选
  import pchartcheckbox  from './form/checkbox.vue'  // 复选
  import pchartupload  from './form/upload.vue'    // 上传文件
  import pchartdate  from './form/date.vue'      // 时间段
  import pcharttime  from './form/time.vue'      // 时间 (单点)
  import {mapGetters} from 'vuex'
  import dataURItoBlob from 'assets/js/dataUritoBlob'

  export default{
    components: {
      pchartinput, pcharttextarea, pchartradio, pchartcheckbox, pchartupload, pchartdate, pcharttime
    },
    data(){
      return {
        dialogVisible:false,//材料未上传提示框
        products: '',
        stage_id: '',//获取阶段id
        formDtl: '',//获取表单数据
        list_form: '',
        loading: false,//
        //企业认证审核
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
        corpStatus:'',//企业是否注册
        uploadType:'',
        uploadType_1:'',
        uploadType_2:'',
        uploadType_3:'',
        pfdFile:'',
        pfdFile_1:'',
        pfdFile_2:'',
        pfdFile_3:'',
        categoryId:this.$route.params.category_id,//获取分类id
        serviceId:this.$route.params.id//获取服务id
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    created(){
      this.getImf()
      this.getCorp()
    },
    methods: {
      getImf(){
        this.$http.get(API.url + 'services/' + this.$route.params.id + '/products/online').then((res) =>
        {
          this.products = res.body.products[this.$route.params.products_id]
          this.stage_id = this.products.stages[0].id
          this.categoryId = this.$route.params.category_id
          this.serviceId = this.$route.params.id
          console.log('--------')
          console.log(this.categoryId)
          console.log(this.serviceId)
          this.getForm()
        }
      )
      },
      //获取企业是否注册
      getCorp(){
        this.$http.get(API.url + '/customer/corps').then((res) =>
          {
            this.corpStatus = res.body.corp.auth_status
          }
        )
      },
      getForm(){
        this.$http.get(API.url + 'customer/product_forms/?stage_id=' + this.stage_id).then((res) => {
          this.formDtl = res.body.product_form
        if (this.formDtl != null) {
          this.list_form = res.body.product_form.form.content;
          this.list_form.forEach(function (item, index) {
            var valueLength = item.value.length;
            item.answer = {
              input_value: "",
              textarea_value: "",
              radio_value: "",
              check_value: [],
              date_value1: "",
              date_value2: "",
              time_value: ""
            }
//              if(item.type == "chartupload"){
            item.value.forEach(function (item1, index1) {
//                  item.answer.check_value.push(false);
            })
//              }
            item.answer.attachments = []
            item.error = false
          })
        }

      })
      },
      isEmpty(item){
        if (item == undefined || item == null) {
          return true;
        } else {
          return false;
        }
      },
      /*三证合一上传*/
      beforePicUpload(file){
        this.imageUrlName = file.raw.name
        this.uploadType = file.raw.type
        if(this.uploadType=='application/pdf'){
        	this.imageUrl=''
          this.pfdFile = file.raw
        }
        this._uploadPic(file)
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
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type)) {
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
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type)) {
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
        this._uploadPic(file)
        if (file && /^image\//i.test(file.raw.type)) {
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
        const isPDF = file.raw.type === 'application/pdf';
        const isLt6M = file.size / 1024 / 1024 < 6;
        if (!isJPG && !isPNG && !isPDF) {
          this.$message.error('上传文件只能是 jpg、png、pdf格式');
          return false
        }
        if (!isLt6M) {
          this.$message.error('上传文件大小不能超过 6MB!');
          return false
        }
      },
      //提交表单
      onTest(){
      	//判断表单验证过了没
        var validComponent;
        var arr = [];
          this.$refs.wf_input.forEach((v)=>{
            arr.push(v.showError())
          })
          // 再循环下arr
          validComponent = arr.every((v)=>{
            return (v == true)
          })
        var arra = []
        this.list_form.forEach(function (item, index) {
          arra.push(item.error)
        })
        var str = arra.join('')
        var isPass = str.indexOf("true")
        //判断未认证企业上传图片了没
        var isUpload = true
        if(this.corpStatus=='unauthorized'||this.corpStatus=='failed'){
          if(this.imageUrlName != '' || (this.imageUrlName_1 != '' && this.imageUrlName_2 != '' && this.imageUrlName_3 != '')){
            isUpload = true
          }else{
            isUpload = false
            this.dialogVisible = true
          }
        }else{
          isUpload = true
        }

        if(isPass<0&&isUpload){
          	this.postAnswer()
        }
      },
      postAnswer(){
        this.loading = true
        console.log(this.list_form)
        var fd = new FormData();
        fd.append("project[product_id]", this.products.id);
        var that = this;
        this.list_form.forEach(function (item, index) {
          fd.append("project[items][][title]", item.title);
          fd.append("project[items][][type]", item.type);
          fd.append("project[items][][describe]", item.describe);

          item.value.forEach(function (val, mark) {
            fd.append("project[items][][value][]", val); // array
          })
          item.rules.forEach(function (val, mark) {
            fd.append("project[items][][rules][]", val); // array
          })
          item.values.forEach(function (val, mark) {
            fd.append("project[items][][values][]", val); // array
          })

          // 问题的答案 answer
          fd.append("project[items][][answer][input_value]", item.answer.input_value);  // array
          fd.append("project[items][][answer][textarea_value]", item.answer.textarea_value);
          fd.append("project[items][][answer][radio_value]", item.answer.radio_value);
          fd.append("project[items][][answer][date_value1]", item.answer.date_value1);
          fd.append("project[items][][answer][date_value2]", item.answer.date_value2);
          fd.append("project[items][][answer][time_value]", item.answer.time_value);

          if (!that.isEmpty(item.answer.check_value)) {
            item.answer.check_value.forEach(function (obj6, index6) {
              fd.append("project[items][][answer][check_value][]", obj6);
            })
          }

          if (!that.isEmpty(item.answer.attachments)) {
            item.answer.attachments.forEach(function (obj, index1) {

              console.log(item.attachments);
              if (obj.id != undefined && obj.id != null && obj.id > 0) {
                fd.append("project[attachments][][id]", obj.id);
              } else {
                fd.append("project[attachments][][file]", obj.raw);
              }
              console.log("mingzi ===============");
              console.log(obj);
              if (obj.name != undefined && obj.name != null && obj.name.length > 0) {
                fd.append("project[attachments][][name]", obj.name);
              }
              fd.append("project[attachments][][index]", index);
            })
          }

        })

        /*图片*/
        var blob = dataURItoBlob(this.imageUrl);
        var blob_1 = dataURItoBlob(this.imageUrl_1);
        var blob_2 = dataURItoBlob(this.imageUrl_2);
        var blob_3 = dataURItoBlob(this.imageUrl_3);
        if (this.imageUrlName != '' || (this.imageUrlName_1 != '' && this.imageUrlName_2 != '' && this.imageUrlName_3 != '')) {
          if (this.yyzzlx == 'unify') {
            if(this.uploadType =='application/pdf'){
              fd.append("certifications[][name]", this.imageUrlName)
              fd.append("certifications[][file]", this.pfdFile)
            }else{
              fd.append("certifications[][name]", this.imageUrlName)
              fd.append("certifications[][file]", blob)
            }

          } else {
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

        this.$http.post(API.url + 'customer/projects', fd
        ).then((res) => {
//          this.log( res.body);
          this.loading = false
        this.$router.push({
          name: 'applySuccess',
          params: {
            category_id: this.$route.params.category_id,
            id: this.$route.params.id,
            products_id: this.$route.params.products_id
          }
        })

      },
        (error) =>{}
      )
      },
    },
    watch:{
     'route':'getImf'
  }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .btn-box {
    text-align: center;
    .el-button {
      width: 100px;
    }
  }
  .application{
    .imf-box{
      margin-top:40px;
      margin-bottom:40px;
      position: relative;
      font-size:14px;
      color: #5c5c5c;
      .title{
        color: #1b1b1b;
        font-weight:bold;
      }
      .imf-dtl{
        background:#efefef;
        margin-top:20px;
        padding:28px 0 28px 200px;
        .mention{
          width:410px;
        }
        li{
          margin-top:20px;
          .title{
            display: inline-block;
            width:50px;
          }
        }
      }
      .ico-apply{
        position: absolute;
        top:50%;
        margin-top:-30px;
        left:100px;
        width:65px;
        height:65px;
        background: url("../../../../assets/images/ico-apply.png") no-repeat 0/cover;
      }
    }
    .corp-dialog{
      text-align: center;
      .mention{
        display: inline-block;
        width:290px;
        text-align: center;
        margin-bottom:45px;
      }
      .icon-warn{
        display: inline-block;
        margin-bottom:28px;
        height:95px;
        width:95px;
        background: url("../../../../assets/images/ico-warn.png") no-repeat 0/cover;
      }
      .el-icon-close{
        cursor: pointer;
        position: absolute;
        top:10px;
        right:10px;
      }
    }

    .close-btn{
      font-size:14px;
      color: #ccc;
      &:before{
        content: "\E60C";
      }
    }
  }
  .qyszhy {
    margin-top:20px;
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
    .el-form-item{
      float: left;
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
    background: url("../../../../assets/images/upload_pic.jpg") center no-repeat;
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
  //pdf遮罩
  .pdf-upload{
    background: url("../../../../assets/images/pdf-cover.png") 0/cover no-repeat;
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
  .el-icon-plus:before {
    display: none;
  }


</style>
