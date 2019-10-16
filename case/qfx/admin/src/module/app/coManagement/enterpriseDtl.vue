<template>
  <div class="enterprise-dtl" v-if="corpsDtl">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'coManagement' }">企业管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">
      企业信息
    </div>
    <el-form :model="corpsDtl" :rules="rules" ref="corpsDtl">
      <div class="detail-imf">
        <div class="main-dtl clearfix">
          <ul class="each-item">
            <li><span class="tit">企业名称：</span><span class="content">{{corpsDtl.name}}</span></li>
            <li><span class="tit fl">注册地址：</span><span class="content">{{corpsDtl.address}}</span></li>
            <li>
              <span class="tit fl">办公地址：</span>
              <span class="content">{{corpsDtl.office_address}}</span><span class="cp fc3c8 ml10" @click="dialogVisible = true">修改</span>
              <el-dialog title="办公地址修改" :visible.sync="dialogVisible"  size="tiny">
                <div class="clearfix">
                  <div class="fl mr20">办公地址：</div>
                  <div class="fl choose-box">
                    <v-distpicker :placeholders="placeholders" :province="select.province" :city="select.city"
                                  :area="select.area"
                                  @province="selectProvince" @city="selectCity" @area="selectArea">
                    </v-distpicker>
                    <p v-show="errorShow" class="error-show">请选择省市区</p>
                    <div class="ed-input">
                      <el-form-item prop="office_location">
                        <el-input v-model="corpsDtl.office_location" placeholder="街道  门牌  建筑名  房间号"
                                  class="address"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('corpsDtl')"  v-loading.fullscreen.lock="fullscreenLoading"
                           element-loading-text="保存中">确 定</el-button>
               </span>
              </el-dialog>
            </li>
            <li v-if="corpsDtl.category=='customer'"><span class="tit">企业类型：</span><span class="content">用户注册</span>
            </li>
            <li v-if="corpsDtl.category=='supplier'"><span class="tit">企业类型：</span><span class="content">服务商创建</span>
            </li>
            <li v-if="corpsDtl.category=='admin'"><span class="tit">企业类型：</span><span class="content">平台创建</span></li>
            <li style="height: 20px;">
              <span class="tit">状态：</span>
              <span class="content" v-show="corpsDtl.status!='unclaimed'">{{value}}</span>
              <span class="content" v-show="corpsDtl.status=='unclaimed'">待激活</span>
              <span class="change-state" @click="toggle=!toggle" v-show="corpsDtl.status!='unclaimed'&&!toggle">变更状态</span>
              <span v-show="toggle&&corpsDtl.status!='unclaimed'">
              <el-switch
              v-model="value"
              on-color="#ff4949"
              off-color="#3c8ced"
              on-value="有效"
              off-value="冻结"
              on-text="冻结"
              off-text="有效"
            >
            </el-switch>
              <span class="cancel" @click="cancelState">取消</span>
              <span class="save" @click="saveState">保存</span>
            </span>
            </li>
          </ul>
          <ul class="each-item">
            <li>
              <!--<p><span class="tit">认证文件：</span><i class="icon-download"></i><span class="fc3c8 cp"> 打包下载</span></p>-->
              <ul class="img-box">
                <li v-for="(v,i) in corpsDtl.certifications">
                  <img :src="v.name" alt="" @click="showImg(v,i)" v-if="hasPdf(v,i)">
                  <span class="tag" v-show="v.category=='business'">营业执照</span>
                  <span class="tag" v-show="v.category=='organization'">组织机构代码证</span>
                  <span class="tag" v-show="v.category=='tax'">税务登记证</span>
                  <a :href="v.url" class="pdf-url" v-if="containPdf(v.name)" target="_blank"></a>
                </li>
              </ul>
              <el-dialog v-model="imgVisible">
                <img :src="changeUrl" alt="" width="100%">
              </el-dialog>
            </li>
            <li v-if="corpsDtl.auth_status=='unauthorized'"><span class="tit">认证情况：</span><span class="fc3c8">未认证</span>
            </li>
            <li v-if="corpsDtl.auth_status=='verifying'"><span class="tit">认证情况：</span><span class="fc3c8"> 认证中</span>
            </li>
            <li v-if="corpsDtl.auth_status=='verified'"><span class="tit">认证情况：</span><span class="fc3c8">已认证</span>
            </li>
            <li v-if="corpsDtl.auth_status=='failed'"><span class="tit">认证情况：</span><span class="fc3c8">认证失败</span></li>
            <li><span class="tit">入驻日期：</span><span class="fc3c8">{{corpsDtl.created_at.substring(0,10)}}</span></li>
          </ul>

        </div>

        <p class="pay-imf">用户信息</p>
        <ul class="clearfix">
          <li><span class="tit">姓名：</span><span class="content">{{corpsDtl.owner.name}}</span></li>
          <li><span class="tit">手机号码：</span><span class="content">{{corpsDtl.owner.phone_number}}</span></li>
          <li><span class="tit">性别：</span><span class="content">{{corpsDtl.owner.gender?'男':'女'}}</span></li>
          <li><span class="tit">职务名称：</span><span class="content">{{corpsDtl.owner.position}}</span></li>
          <li><span class="tit">固定电话：</span><span class="content">{{corpsDtl.owner.fixed_phone}}</span></li>
        </ul>
      </div>
    </el-form>
  </div>

</template>
<script>
  import VDistpicker from 'v-distpicker'
  import API from 'API/config'
  export default{
    components: {VDistpicker},
    data(){
      return {
        toggle:false,//滑块切换
        dialogVisible:false,//修改企业地址弹框
        fullscreenLoading: false,//保存状态
        select: {province: '', city: '', area: ''},//下拉框选择的值
        placeholders: {//地址默认值
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        showAddressError: false,
        corpsDtl: '',//获取到的公司信息
        corpsId: '',//获取公司id
        enterprise: {
          address: ''//企业地址
        },
        value: '',//滑块的值
        corp: {//待传参数
          status: '',
          office_province: '',
          office_city: '',
          office_district: '',
          office_location: '',
        },
        rules: {
          office_location: [
            {required: true, message: '请填写企业地址', trigger: 'blur'},
          ]
        },
        imgVisible: false,//显示缩略图
        changeUrl: '',
        errorShow: false //省市区没填写返回错误
      }
    },
    created: function () {
      this.gitId()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.corpsId = to.params.id
      })
    },
    methods: {
      /*城市*/
      selectProvince(value) {
        this.select.province = value
      },
      selectCity(value) {
        this.select.city = value
      },
      selectArea(value) {
        this.select.area = value
      },

      //提交修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.showAddressError = true
            this.corp.status = this.corpsDtl.status
            this.corp.office_location = this.corpsDtl.office_location
            if (this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区') {
              this.errorShow = true
            } else {
              this.errorShow = false
              this.corp.office_province = this.select.province
              this.corp.office_city = this.select.city
              this.corp.office_district = this.select.area
              this.$http.patch(API.url + 'corps/' + this.corpsId,
                {'corp': this.corp}
              ).then((res) => {
                this.fullscreenLoading = false;
                this.corpsDtl = res.body.corp
                this.fullscreenLoading = false
                this.dialogVisible = false
                this.$confirm('保存成功！', '温馨提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success'
                })
              }).catch(() => {
                this.fullscreenLoading = false;
                this.$confirm('保存失败', '温馨提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'error'
                }).then()
                return false;
              })
            }
          } else {
            return false;
          }
        });
      },
//返回
      go_negative(){
        this.$router.go(-1)
      },
      gitId(){
        this.corpsId = this.$route.params.id
        this.$http.get(API.url + 'corps/' + this.corpsId
        ).then((res) => {
          var resBody = res.body
          this.corpsDtl = resBody.corp
          this.select.province = this.corpsDtl.office_province
          this.select.city = this.corpsDtl.office_city
          this.select.area = this.corpsDtl.office_district
          if (this.corpsDtl.status == 'effective') {
            this.value = '有效'
          } else {
            this.value = '冻结'
          }
        })

      },
      //判断是否含有pdf
      containPdf(str) {
        return new RegExp('pdf').test(str);
      },
      showImg(v,i){
        if(!this.containPdf(v.name)){
          this.changeUrl = this.corpsDtl.certifications[i].url
          this.imgVisible = true
        }else{
          this.imgVisible = false
        }
      },
      //保存滑块修改
      saveState(){
        if (this.value == "有效") {
          this.corp.status = 'effective'
        } else if (this.value == "冻结") {
          this.corp.status = 'freeze'
        }
        this.corp.office_province = this.select.province
        this.corp.office_city = this.select.city
        this.corp.office_district = this.select.area
        this.corp.office_location = this.corpsDtl.office_location
        this.$http.patch(API.url + 'corps/' + this.corpsId,
          {'corp': this.corp}
        ).then((res) => {
          this.toggle = false
        })
      },
      //取消滑块修改
      cancelState(){
        this.toggle= false
        this.gitId()
      },
      //判断图片是不是pdf
      hasPdf(v,i){
        var hasPdf = new RegExp('pdf').test(v.name);
        if(hasPdf){
          return v.name='http://os8x5i7y1.bkt.clouddn.com/cover-pdf.png'
        }else{
          return v.name = v.url
        }
      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .enterprise-dtl {
    .el-button {
      margin-top: 30px;
      margin-right: 20px;
      border: 1px solid #3c8ced;
      color: #3c8ced;
    }
    .el-button--primary {
      color: #FFFFFF;
      border: none;

    }
    .choose-box {
      select {
        width: 115px;
        height: 40px;
        font-size: 14px;
      }

    }

    .border-red {
      border-color: red;
    }
    .detail-imf .each-item li .address {
      margin-left: 0;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .error-show {
      color: red;
      margin-bottom:10px;
    }
    .cancel {
      color: #ccc;
      margin-left: 20px;
      cursor: pointer;
    }
    .save {
      color: #3c8ced;
      margin-left: 10px;
      cursor: pointer;
    }
    .change-state {
      margin-left: 10px;
      color: #3c8ced;
      font-size: 14px;
      cursor: pointer;
    }
  }
</style>
