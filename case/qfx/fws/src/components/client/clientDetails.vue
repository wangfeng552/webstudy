<template>
  <div class="enterprise-dtl" v-if="corpsDtl">

    <!--<div v-if="iflogin"><div v-if="userId==principal_id">{{userId}}</div></div>-->


    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'clientList' }">客户管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="blue-title">
      企业信息
      <span v-if="iflogin">
        <span class="fs14 fr mr20" v-if="corpsDtl.status=='unclaimed' && userId==principal_id">
          <router-link :to="{name:'editEnterprise',params:{id:this.$route.params.id}}">编辑</router-link>
        </span>
      </span>
    </div>
    <el-form :model="corpsDtl" :rules="rules" ref="corpsDtl">
      <div class="detail-imf">
        <div class="main-dtl clearfix">
          <ul class="each-item">
            <li><span class="tit">企业名称：</span><span class="content">{{corpsDtl.name}}</span></li>
            <li><span class="tit fl">注册地址：</span><span class="content">{{corpsDtl.address}}</span></li>
            <li v-if="iflogin">
              <span class="tit fl">办公地址：</span>
              <span class="content">{{corpsDtl.office_address}}</span><span class="cp fc3c8 ml10" @click="dialogVisible = true" v-if="userId==principal_id">修改</span>
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
                <el-button type="primary" @click="submitForm('corpsDtl')"  v-loading.fullscreen="fullscreenLoading"
                           element-loading-text="保存中">确 定</el-button>
               </span>
              </el-dialog>
            </li>
            <!--<li>-->

            <!--</li>-->
            <li v-if="corpsDtl.auth_status=='unauthorized'"><span class="tit">认证情况：</span><span class="content">未认证</span>
            </li>
            <li v-if="corpsDtl.auth_status=='verifying'"><span class="tit">认证情况：</span><span class="content"> 认证中</span>
            </li>
            <li v-if="corpsDtl.auth_status=='verified'"><span class="tit">认证情况：</span><span class="content">已认证</span>
            </li>
            <li v-if="corpsDtl.auth_status=='failed'"><span class="tit">认证情况：</span><span class="content">认证失败</span></li>
            <li><span class="tit">入驻日期：</span><span class="content">{{corpsDtl.created_at.substring(0,10)}}</span></li>
            <li style="height: 20px;">
              <span class="tit">状态：</span>
              <span class="content" v-show="corpsDtl.status!='unclaimed'">{{value}}</span>
              <span class="content" v-show="corpsDtl.status=='unclaimed'">待激活</span>
              <!--<span class="change-state" @click="toggle=!toggle" v-show="corpsDtl.status!='unclaimed'&&!toggle">变更状态</span>-->
            <!--<span v-show="toggle&&corpsDtl.status!='unclaimed'">-->
              <!--<el-switch-->
                <!--v-model="value"-->
                <!--on-color="#ff4949"-->
                <!--off-color="#3c8ced"-->
                <!--on-value="有效"-->
                <!--off-value="冻结"-->
                <!--on-text="冻结"-->
                <!--off-text="有效"-->
              <!--&gt;-->
              <!--</el-switch>-->
              <!--<span class="cancel" @click="cancelState">取消</span>-->
              <!--<span class="save" @click="saveState">保存</span>-->
            <!--</span>-->
            </li>
            <li v-if="corpPrincipal">
              <span class="tit">企业负责人：</span>
              <span v-if="corpsDtl.principal_id!=null||corpsDtl.principal_name!=null">
                <span class="content">{{corpsDtl.principal_name}}</span>
                <span class="cp fc3c8 ml10" @click="getAllDepartmentPerson" v-if="corpsDtl.is_leader">变更</span>
              </span>
              <span v-else>
               <span class="content">--</span>
              </span>
            </li>
            <li v-else>
              <span class="tit">企业负责人：</span>
              <span v-if="corpsDtl.principal_id!=null||corpsDtl.principal_name!=null">
              <span class="content">{{corpsDtl.principal_name}}</span>
              <span class="cp fc3c8 ml10" @click="openSub" v-if="corpsDtl.is_leader">变更</span>
              <el-dialog
                title="企业负责人变更"
                :visible.sync="dialogSub"
                size="tiny"
              >
                <div class="staff-list">
                  <div class="tit">全部下属</div>
                  <ul class="content">
                    <li v-for="(v,i) in subordinates" @click="chooseSub(v.id,i)" :class="{'active':isActive(i)}">{{v.name}}</li>
                  </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSub = false">取 消</el-button>
                <el-button type="primary" @click="saveSub" v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中">确 定</el-button>
                </span>
              </el-dialog>
              </span>
              <span v-else>
               <span class="content">--</span>
              </span>
            </li>
            <!--corp_principal 权限的人可以修改-->
            <el-dialog title="企业负责人变更" :visible.sync="dialogTableVisible" :before-close="handleClose">
              <div class="treelayout-wf clearfix">
                <div class="tree-l">
                  <el-tree :data="listDepartmentsTree"
                           :props="defaultProps"
                           :highlight-current=true
                           @node-click="handleNodeClick">
                  </el-tree>
                </div>
                <div class="tree-r">
                  <ul>
                    <li :class="{'act':isAct_wf(i)}" v-for="(v,i) in relevantPerson" @click="mapClassAct(v.id,i)">{{v.name}}</li>
                  </ul>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelDeparmentPerson">取 消</el-button>
                <el-button type="primary" @click="saveDeparmentPerson" v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中">确 定</el-button>
                </span>
            </el-dialog>
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
                  <span class="tag" v-show="v.category== null">营业执照</span>
                  <a :href="v.url" class="pdf-url" v-if="containPdf(v.name)" target="_blank"></a>
                </li>
              </ul>
              <el-dialog v-model="imgVisible">
                <img :src="changeUrl" alt="" width="100%">
              </el-dialog>
            </li>

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
  import {mapGetters} from 'vuex'
  import VDistpicker from 'v-distpicker'
  import API from 'API/api'
  export default{
    components: {VDistpicker},
    data(){
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        operatorIndex_wf:'',
        listDepartmentsTree:[],//部门树
        relevantPerson:[],//部门请求回来的值
        personId_wf:'', //修改人员ID
        dialogTableVisible:false,
        principal_id:'',
        dialogSub:false,//打开操作人员修改框
        dialogVisible:false,//打开地址修改
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
          office_province: '',
          office_city: '',
          office_district: '',
          office_location: '',
          status:''
        },
        rules: {
          office_location: [
            {required: true, message: '请填写企业地址', trigger: 'blur'},
          ]
        },
        imgVisible: false,//显示缩略图
        changeUrl: '',
        errorShow: false, //省市区没填写返回错误
        value: '',//滑块的值
        toggle: false,//服务商信息状态变更
        subordinates:'',//获取下属人员的信息
        operatorId:'aa',//操作人员id
        operatorIndex:'',//操作人序号
        pdfUrl:'',//pdf文件链接
        principal_id:'',
        canEdit:true //可修改
      }
    },
    computed:{
      iflogin(){
        if (this.$store.state.admin.admin) {
          return true
        } else {
          return false
        }
      },
      ...mapGetters(['userId','currentUser']),
      //是否有权限
      corpPrincipal(){
        if(this.currentUser.role == undefined){
          return false
        }else{
          return this.currentUser.role.ability.includes('corp_principal')
        }

      }
    },
    created(){
      this.gitId()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.corpsId = to.params.id
      })
    },
    methods: {
      //点击高亮
      mapClassAct(id,i){
        this.personId_wf = id; //获取用户ID
        this.operatorIndex_wf = i;
        this.isAct_wf(i);
      },
      isAct_wf(i){
        return i===this.operatorIndex_wf
      },
      // 获取所有人员
      getAllDepartmentPerson(){
        this.dialogTableVisible = true;
        this.$http.get(API.url+'departments/tree').then((res)=>{
          var resBody=res.body;
          this.listDepartmentsTree = resBody.departments
        })
      },
      //相关部门人员获取
      handleNodeClick(data){
        this.$http.get(API.url+'accounts',{
          params:{
            department_id:data.id,
            per:50,
            not_freeze:true
          }
        }).then((res)=>{
          var resBody=res.body;
          this.relevantPerson = resBody.suppliers;

        })
      },
      //保存人员
      saveDeparmentPerson(){
        if(this.personId_wf==''){
          this.$message({
            message: '请选择一位操作人',
            type: 'warning'
          });
        }else{
          this.fullscreenLoading = true;
          this.$http.patch(API.url+'customers/'+this.$route.params.id+'/set_principal',
            {principal_id:this.personId_wf}
          ).then((res) =>{
            this.$message({
              message: '变更成功',
              type: 'success'
            });
            this.fullscreenLoading = false;
            this.dialogTableVisible=false
            this.gitId();
            this.relevantPerson = [];
          })
        }
      },
      //取消
      cancelDeparmentPerson(){
        this.dialogTableVisible = false;
        this.relevantPerson = [];
      },
      // X关闭
      handleClose(){
        this.dialogTableVisible = false;
        this.relevantPerson = [];
      },
      /*城市*/
      selectProvince(value) {
        this.select.province = value
        console.log(value)
      },
      selectCity(value) {
        this.select.city = value
      },
      selectArea(value) {
        this.select.area = value
      },
      //滑块修改激活冻结状态
      changeState(){
        if (this.value == "有效") {
          this.corpsDtl.status = 'freeze'
        } else if (this.value == "冻结") {
          this.corpsDtl.status = 'effective'

        }
      },
      //提交修改
      submitForm(formName) {
        if (this.value == "有效") {
          this.corp.status = 'effective'
        } else if (this.value == "冻结") {
          this.corp.status = 'freeze'
        }
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
              this.$http.patch(API.url + 'customers/' + this.corpsId,
                {'corp': this.corp}
              ).then((res) => {
                this.fullscreenLoading = false;
                this.corpsDtl = res.body.corp
                this.fullscreenLoading = false
                this.$confirm('保存成功！', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success'
                }).then((res)=>{
                  this.dialogVisible = false
//                  this.$router.push({name:'clientList'})
                })
              }).catch(() => {
                this.fullscreenLoading = false;
                this.$confirm('保存失败', '提示', {
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
        this.$http.patch(API.url + 'customers/' + this.corpsId,
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
      gitId(){
        this.corpsId = this.$route.params.id
        this.$http.get(API.url + 'customers/' + this.corpsId
        ).then((res) => {
          var resBody = res.body
          this.corpsDtl = resBody.customer
          this.select.province = this.corpsDtl.office_province
          this.select.city = this.corpsDtl.office_city
          this.select.area = this.corpsDtl.office_district
          this.principal_id= this.corpsDtl.principal_id
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
      //更换操作人员
      openSub(){
      	this.dialogSub = true
        this.checkSub()
      },
      checkSub(){
        this.$http.get(API.url+'users/descendants').then((res) =>{
          this.subordinates = res.body.descendants
          this.subordinates.forEach((v)=>{
          	if(this.corpsDtl.principal_name!=null){
              if(v.name==this.corpsDtl.principal_name){
                this.operatorId = v.id
              }
            }

          })
        })
      },

      //选择操作人员
      chooseSub(id,i){
        this.operatorId = id
        this.operatorIndex = i
        this.isActive(i)
      },
      isActive(i){
      return i===this.operatorIndex
      },
      saveSub(){
        if(this.operatorId=='aa'){
          this.$message({
            message: '请选择一位操作人',
            type: 'warning'
          });
        }else{
          this.fullscreenLoading = true;
          this.$http.patch(API.url+'customers/'+this.$route.params.id+'/set_principal',
            {principal_id:this.operatorId}
          ).then((res) =>{
            this.$message({
              message: '变更成功',
              type: 'success'
            });
            this.fullscreenLoading = false;
            this.dialogSub=false
            this.gitId()
          })
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
      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .enterprise-dtl {
    .el-tree{
      border:none;
    }
    .el-button {
      margin-right: 10px;
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
    .error-show {
      color: red;
    }
    .border-red {
      border-color: red;
    }
    .detail-imf .each-item li .address {
      margin-left: 0;
      margin-top: 0;
      margin-bottom: 10px;
    }
    /*.ed-input {*/
      /*margin-left: 69px;*/
    /*}*/
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
    .staff-list{
      height: 180px;
      border:1px solid #efefef;
      .tit{
        float: left;
        width:30%;
        height:100%;
        border-right:1px solid #efefef;
        color: #666;
        text-align: center;
        padding-top:70px;
        font-size:14px;
      }
      .content{
        width:70%;
        height:100%;
        float: left;
        overflow: auto;
        li{
          text-align: center;
          margin:0;
          padding:10px 0;
          cursor: pointer;

        }
        .active{
          background: #3c8ced;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
<style lang="scss">
  .treelayout-wf{
    border:1px solid #d1dbe5;
    .tree-l{ width: 50%; float: left;border-right: 1px solid #d1dbe5}
    .tree-r{ width: 50%; float: left;border-left: 1px solid #d1dbe5; position: relative;left: -1px;
      li{
        height: 36px;
        line-height: 36px;
        margin-bottom: 0;
        text-align: center;
        cursor: pointer;
      }
      .act{
        background-color: #3c8ced;
        color: #fff;
      }
    }
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
      background-color: #3c8ced;
      .el-tree-node__label{ color: #fff;}
    }
  }
</style>

