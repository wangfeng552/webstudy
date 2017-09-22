<template>
  <div class="provider-imf" v-if="providersDtl">
    <div class="blue-title">
      服务商信息
      <span class="fc3c8 fr cp mr20"><a :href="providersIdUrl" target="_blank">登录该服务商后台</a></span>
    </div>
    <div class="detail-imf">
      <div class="main-dtl clearfix">
        <ul class="each-item">
          <li><span class="tit">服务商名称：</span><span class="content">{{providersDtl.name}}</span></li>
          <li><span class="tit">注册地址：</span><span class="content">{{providersDtl.address}}</span></li>
          <li><span class="tit">办公地址：</span><span class="content">{{providersDtl.office_address}}</span><span
            class="revise" @click="dialogFormVisible = true">修改</span></li>
          <li><span class="tit">入驻日期：</span><span class="content">{{providersDtl.created_at.substring(0,10)}}</span>
          </li>

          <li style="height: 20px;">
            <span class="tit">状态：</span>
            <span class="content" v-show="providersDtl.status!='unclaimed'">{{value}}</span>
            <span class="content" v-show="providersDtl.status=='unclaimed'">待激活</span>
            <span class="change-state" @click="toggle=!toggle" v-show="providersDtl.status!='unclaimed'&&!toggle">变更状态</span>
            <span v-show="toggle&&providersDtl.status!='unclaimed'">
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
          <li><span class="tit">发票类型：</span>
            <span class="content">{{checkInvoice()}}</span>
          </li>
        </ul>
        <ul class="each-item">
          <li>
            <!--<p><span class="tit">认证文件：</span><i class="icon-download"></i><span class="fc3c8 cp"> 打包下载</span></p>-->
            <ul class="img-box">
              <li v-for="(v,i) in providersDtl.certifications">
                <img :src="v.name" alt="" @click="showImg(v,i)" v-if="hasPdf(v,i)">
                <span class="tag" v-if="v.category=='business'">营业执照</span>
                <span class="tag" v-else-if="v.category=='organization'">组织机构代码证</span>
                <span class="tag" v-else-if="v.category=='tax'">税务登记证</span>
                <span class="tag" v-else="v.category== null ">营业执照</span>
                <a :href="v.url" class="pdf-url" v-if="containPdf(v.name)" target="_blank"></a>

              </li>
              <el-dialog :visible.sync="imgVisible">
                <img :src="changeUrl" alt="" width="100%">
              </el-dialog>
            </ul>

          </li>
        </ul>
      </div>
    </div>
    <div class="blue-title">
      用户信息
    </div>
    <div class="detail-imf">
      <ul class="clearfix">
        <li><span class="tit">姓名：</span><span class="content">{{providersDtl.owner.name}}</span></li>
        <li><span class="tit">性别：</span><span class="content">{{providersDtl.owner.gender?'男':'女'}}</span></li>
        <li><span class="tit">手机号码：</span><span class="content">{{providersDtl.owner.phone_number}}</span></li>
        <li><span class="tit">职务名称：</span><span class="content">{{providersDtl.owner.position}}</span></li>
        <li><span class="tit">固定电话：</span><span class="content">{{providersDtl.owner.fixed_phone}}</span></li>
      </ul>
     <div class="grey-border"></div>
      <!--<el-button type="primary">修改服务商信息</el-button>-->
      <el-button type="primary" @click="watchProject">项目查看</el-button>
    </div>
    <!--<div class="blue-title">-->
      <!--项目信息-->
    <!--</div>-->
    <!--<div class="form-box">-->
      <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
        <!--<el-form-item label="项目">-->
          <!--<el-input v-model="formInline.user1" placeholder="项目编号或项目名称"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="服务分类">-->
          <!--<el-select v-model="formInline.region1" placeholder="全部">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<br/>-->
        <!--<el-form-item label="项目状态">-->
          <!--<el-select v-model="formInline.region2" placeholder="全部">-->
            <!--<el-option label="区域一" value="shanghai"></el-option>-->
            <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="创建日期">-->
          <!--<template>-->
            <!--<div class="fl">-->
              <!--<el-date-picker-->
                <!--v-model="value1"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--:picker-options="pickerOptions1">-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</template>-->
          <!--<span class="fl date-line"></span>-->
          <!--<template>-->
            <!--<div class="fl">-->
              <!--<el-date-picker-->
                <!--v-model="value2"-->
                <!--type="date"-->
                <!--placeholder="选择日期"-->
                <!--:picker-options="pickerOptions2">-->
              <!--</el-date-picker>-->
            <!--</div>-->
          <!--</template>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--<el-button type="primary">查询</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->
    <!--<div class="table-box">-->
      <!--<el-table-->
        <!--:data="projects"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--label="创建日期"-->
          <!--width="120"-->
        <!--&gt;-->
          <!--<template scope="scope">-->
            <!--<span>{{scope.row.updated_at.substring(0,10)}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="no"-->
          <!--label="项目编号"-->
          <!--width="180"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="service_category"-->
          <!--label="服务分类"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="service"-->
          <!--label="项目名称"-->
          <!--width="220"-->
        <!--&gt;-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="项目状态"-->
          <!--width="120"-->
        <!--&gt;-->
          <!--<template scope="scope">-->
            <!--<span v-if="scope.row.status=='proceeding'">项目进行中</span>-->
            <!--<span v-if="scope.row.status=='deny'">项目已拒绝</span>-->
            <!--<span v-if="scope.row.status=='stop'">项目已终止</span>-->
            <!--<span v-if="scope.row.status=='finished'">项目已完成</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--label="操作"-->
          <!--width="80">-->
          <!--<template scope="scope">-->
            <!--<span class="checkDtl" @click="checkDtl(scope.row.id)">-->
              <!--查看-->
            <!--</span>-->
              <!--&lt;!&ndash;<router-link :to="{name:'projectDtl',params:{id:scope.row.id}}"></router-link></span>&ndash;&gt;-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->
    <!--<div class="pagination">-->
      <!--<div class="block">-->
        <!--<el-pagination-->
          <!--:current-page.sync="currentPage1"-->
          <!--:page-size="10"-->
          <!--layout="total, prev, pager, next"-->
          <!--:total="count"-->
          <!--@current-change="handleCurrentChange"-->
        <!--&gt;-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->
    <el-dialog title="办公地址修改" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="provider" :rules="rules" ref="providersDtl">
        <ul class="modify-location">
          <li><span class="fl">办公地址</span>
            <div style="padding-left: 67px;">

              <v-distpicker :placeholders="placeholders" @province="selectProvince" @city="selectCity" :province="select.province" :city="select.city"
                            :area="select.area"
                            @area="selectArea">
              </v-distpicker>
            </div>
            <p v-show="errorShow" class="error-show">请选择省市区</p>
          </li>
          <li>
            <div class="input-box">
              <el-form-item prop="office_location">
                <el-input v-model="provider.office_location" placeholder="街道  门牌  建筑名  房间号"></el-input>
              </el-form-item>
            </div>
          </li>
        </ul>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('providersDtl')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import VDistpicker from 'v-distpicker'
  import API from 'API/config'
  export default{
    components: {VDistpicker},
    data(){
      return {
        select: {province: '', city: '', area: ''},
        placeholders: {
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        errorShow: false,
        providersId: '',
        providersDtl: '',
        value: '',//滑块的值
        toggle: false,//服务商信息状态变更
        dialogTableVisible: false,//服务商地址修改弹框
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: true,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        provider: {//待传参数
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
        projects:[], //获取项目列表
        count:0,//项目数,
        stage_id:'',
        formInline: {
          no_or_product_service_name_cont: '',
          owner_name_cont:'',
          agent_name_cont:'',
          corp_name_cont: '',
          status_eq: '',
          source_eq: '',
          provider_name_cont: '',
          created_at_gteq: '',
          created_at_lteq: '',
        },
      }
    },
    created: function () {
      this.gitId()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.providersId = to.params.id
      })
    },
    methods: {
      //修改地址
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.select.province == '' || this.select.city == '' || this.select.area == '' || (this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区')
            ) {
//              this.provider.office_province = this.placeholders.province
//              this.provider.office_city = this.placeholders.city
//              this.provider.office_district = this.placeholders.area
              this.errorShow = true
            } else {
              this.errorShow = false
              this.provider.office_location
              this.provider.office_province = this.select.province
              this.provider.office_city = this.select.city
              this.provider.office_district = this.select.area
              this.$http.patch(API.url + 'providers/' + this.providersId + '/office_address',
                {'provider': this.provider}
              ).then((res) => {
                this.dialogFormVisible = false
                this.providersDtl = res.body.provider
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //滑块修改激活冻结状态
//      changeState(){
//        if (this.value == "有效") {
//          this.providersDtl.status = 'freeze'
//        } else if (this.value == "冻结") {
//          this.providersDtl.status = 'effective'
//
//        }
//      },
      //保存滑块修改
      saveState(){
        if (this.value == "有效") {
          this.providersDtl.status = 'effective'
        } else if (this.value == "冻结") {
          this.providersDtl.status = 'freeze'
        }
        this.$http.patch(API.url + 'providers/' + this.$route.params.id + '/freeze',
          {status: this.providersDtl.status}
        ).then((res) => {
          this.providers = res.body.providers
          this.toggle = false
        })
      },
      //取消滑块修改
      cancelState(){
      	this.toggle=false
        this.gitId()
      },
      //获取服务商信息
      gitId(){

        this.providersId = this.$route.params.id
        this.toggle = false
        this.$http.get(API.url + 'providers/' + this.providersId
        ).then((res) => {
          var resBody=res.body;
          this.providersDtl = resBody.provider
          this.select.province = this.providersDtl.office_province
          this.select.city = this.providersDtl.office_city
          this.select.area = this.providersDtl.office_district
          this.checkInvoice()
          if (this.providersDtl.status == 'effective') {
            this.value = '有效'
          } else {
            this.value = '冻结'
          }
        })
        //获取项目信息
        this.$http.get(API.url + 'projects?provider_id=' + this.$route.params.id
        ).then((res) => {
          this.projects = res.body.projects
          this.count = res.body.total_count
        })
      },

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
      //判断增值税发票
      checkInvoice(){
        if (this.providersDtl.invoice_type != null) {
          if (this.providersDtl.invoice_type.length == 2) {
            return ('增值税普通发票，增值税专用发票')
          }
          if (this.providersDtl.invoice_type.length == 1 && this.providersDtl.invoice_type[0] == 'common') {
            return ('增值税普通发票')
          }
          if (this.providersDtl.invoice_type.length == 1 && this.providersDtl.invoice_type[0] == 'increment') {
            return ('增值税专用发票')
          }

        }

      },
      //判断是否含有pdf
      containPdf(str) {
        return new RegExp('pdf').test(str);
      },
      showImg(v,i){
        if(!this.containPdf(v.name)){
          this.changeUrl = this.providersDtl.certifications[i].url
          this.imgVisible = true
        }else{
          this.imgVisible = false
        }
      },
      //判断图片是不是pdf
      hasPdf(v,i){
        var hasPdf = new RegExp('pdf').test(v.name);
        if(hasPdf){
          return v.name='http://os8x5i7y1.bkt.clouddn.com/cover-pdf.png'
        }else{
          return v.name = v.url
        }
      },
      //分页
      handleCurrentChange(val){
        this.$http.get(API.url + 'projects?provider_id='+this.$route.params.id + '&page='+val
        ).then((res) => {
          this.projects = res.body.projects
        })
      },
      //查看项目详情
      checkDtl(id){
        this.$http.get(API.url + 'projects/' + id
        ).then((res) => {
          this.stage_id = res.body.project.stages[0].id
          this.$router.push({name:'projectCon',params:{id:id,stage_id:this.stage_id}})
        })
      },
      watchProject(){
      	this.$router.push({name:'project'})
        this.formInline.provider_name_cont = this.providersDtl.name
        this.$store.dispatch('projectSearch', this.formInline)
      }
    },
    watch: {
      '$route': 'gitId',
//      providersDtl(val){
//        if (val) {
//          this.placeholders.province = this.providersDtl.office_province
//          this.placeholders.city = this.providersDtl.office_city
//          this.placeholders.area = this.providersDtl.office_district
//          if (this.providersDtl.office_province == null) {
//            this.placeholders.province = '请选择省'
//          }
//          if (this.providersDtl.office_city == null) {
//            this.placeholders.city = '请选择市'
//          }
//          if (this.providersDtl.office_district == null) {
//            this.placeholders.area = '请选择区'
//          }
//        }
//      }

    },
    computed:{
      providersIdUrl(){
        return API.fwsurl+this.providersId+'&token='+this.$store.state.admin.admin.token //环境
//        return 'http://localhost:8082/?providersId='+this.providersId+'&token='+this.$store.state.admin.admin.token //本地
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .provider-imf {
    .blue-title {
      margin-top: 0;
    }
    .revise, .change-state {
      margin-left: 10px;
      color: #3c8ced;
      font-size: 14px;
      cursor: pointer;
    }
    .detail-imf {
      margin-bottom: 0;
      .el-button{
        margin-top:18px;
      }
    }
    .detail-imf .main-dtl {
      border: none;
    }
    .form-box {
      margin: 20px 19px 0 21px;
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
    .each-item {
      li:last-child {
        line-height: 24px;
      }
    }
    .address-box {
      .el-input {
        padding: 0 66px;
      }

    }
    .modify-location {
      li {
        margin-bottom: 10px;
        .error-show {
          color: red;
          margin-left: 65px;
        }
      }
    }
    select {
      width: 130px;
      height: 40px;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .input-box {
      padding: 0 66px;
    }

  }
</style>
