<template>
<div class="close-project">
  <h4 class="top-tips">终止后整个项目将终止，同时也无法恢复！请谨慎操作。</h4>
  <div class="audit-form closestyle">
    <div class="gd-box">
      <div class="title">
        <i class="tit-gbxm"></i>
        <span class="describe">项目终止</span>
        <p class="zzms" v-if="projectStopFlowEnabled">审核时无法对项目进行任何操作，如审核全部通过，项目将被完全终止，无法进行任何操作，如中途审核拒绝，可继续操作项目</p>
      </div>

      <!--审核流程-->
      <div class="peo-audit item" v-if="projectStopFlowEnabled">
        <div class="left">审核人员 </div>
        <div class="right ">
          <div class="peo-dowm">
            <div class="icon_people" v-for="(v,i) in stopFlowsSteps">
              <div class="peo-left">
                <div class="default" :class="v | personClass">{{v.supplier_name}}</div>
                <div class="postion">{{v.sponsor | sponsorCategories}}</div>
              </div>
              <div class="peo-right" v-if="stopFlowsSteps.length!==i+1">
                <img src="../../assets/images/aduit/arrow.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--终止原因发起者-->
      <div class="editmination item" v-if="supplier_type=='sponsor' && stopFlowsLastStatus=='wait'">
        <div class="left">终止原因</div>
        <div class="right ptr10">
          <el-form  :model="termination" :rules="rules" ref="termination" label-width="100px">
            <el-form-item label="原因类型" prop="type">
              <el-select v-model="termination.type" placeholder="请选择">
                <el-option label="企业条件欠缺" value="企业条件欠缺"></el-option>
                <el-option label="企业提出终止" value="企业提出终止"></el-option>
                <el-option label="企业未主动配合" value="企业未主动配合"></el-option>
                <el-option label="其他原因" value="其他原因"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="具体原因" prop="desc">
              <el-input type="textarea" v-model="termination.desc"></el-input>
            </el-form-item>
            <el-form-item label="相关附件" class="posfather">
              <div class="first"><span>{{fileSupportFormatGol}}</span></div>
              <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--终止原因审核者-->
      <div class="readmination item" v-if="stopFlowsLastOne.reason_type!=null">
        <div class="left">终止原因</div>
        <div class="right pt20">
          <dl class="stop-item clearfix">
            <dt class="st-l"><i>*</i>原因类型</dt>
            <dd class="st-r">{{stopFlowsLastOne.reason_type}}</dd>
          </dl>
          <dl class="stop-item clearfix">
            <dt class="st-l"><i>*</i>具体原因</dt>
            <dd class="st-r">{{stopFlowsLastOne.reason}}</dd>
          </dl>
          <dl class="stop-item clearfix" v-if="stopFlowsLastOne.attachments.length!=0">
            <dt class="st-l">相关附件</dt>
            <dd class="st-r">
              <div class="accessories">
                <ul>
                  <li class="ico" :class="v | filterPicIco"  v-for="(v,i) in stopFlowsLastOne.attachments">
                    <span :title="v.name">{{v.name}}</span>
                     <a :download="v.name" :href="v.download_url">下载</a>
                  </li>
                </ul>
              </div>
            </dd>
          </dl>
        </div>
      </div>


      <!--审核结果 start ============================================================== -->
      <div class="res-audit item" v-if="stopFlowsFirstStatus!='wait'">
        <div class="left" :class="{isnewheight}"> 审核结果 </div>
        <div class="right">

          <!-- 审核中的状态 -->
          <div class="auditing">
            <el-form v-if="supplier_type=='audit'" :model="ruleFormWf" :rules="rules" ref="ruleFormWf" label-width="100px" class="demo-ruleForm">

              <el-form-item class="pt20" label="审核结果" prop="audit">
                <el-radio-group v-model="ruleFormWf.audit" @change="changeAudit">
                  <el-radio label="pass">通过</el-radio>
                  <el-radio label="reject">拒绝</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-row>
                <el-col :span="22">
                  <el-form-item label="备注">
                    <el-input type="textarea" v-model="ruleFormWf.desc" placeholder="请输入备注信息"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="相关附件" class="posfather" v-if="showAudio">
                <div class="first"><span>{{fileSupportFormatGol}}</span></div>
                <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
              </el-form-item>

            </el-form>

            <!-- 如果有审核 记录 就显示-->
            <div class="recode">
              <div v-show="showRecode" class="pt10">
                <div v-if="projectStopFlowEnabled" class="recode-item" v-for="v in stopFlowsReverse" >
                  <div  class="recode_online clearfix" v-for="s in v.steps" v-if="s.status=='pass' || s.status=='reject'">
                    <div class="recode-item-left">
                      <span class="date"> {{s.updated_at | formatDate}} </span>
                      <span class="name"> {{s.supplier_name}} </span>
                    </div>
                    <div class="recode-item-right">
                      <ul class="recode-item">
                        <div v-if="s.status=='pass'">
                          <li class="line" >
                            <i class="icon icon-yes"></i>
                            <span> 通过 </span>
                          </li>
                          <li class="line" v-if="s.note">
                            <dl class="layoutlr">
                              <dt><i class="icon icon-bz"></i></dt>
                              <dd class="closedd"><div class="fn-desc">{{s.note}}</div></dd>
                            </dl>
                          </li>
                        </div>
                        <div v-if="s.status=='reject'">
                          <li class="line" >
                            <i class="icon icon-error"></i>
                            <span> 拒绝 </span> <span>{{s.reason_type}}</span>
                          </li>
                          <li class="line" v-if="s.note">
                            <dl class="layoutlr">
                              <dt><i class="icon icon-bz"></i></dt>
                              <dd class="closedd"><div class="fn-desc">{{s.note}}</div></dd>
                            </dl>
                          </li>
                          <div  class="file-list" v-if="s.status == 'reject'">
                            <ul>
                              <li v-for="yj in v.attachments">
                                <i class="icon-file" :class="yj | filterPicIco"></i>
                                <a :title="yj.name" class="name name2">{{yj.name}}</a>
                                <a class="fr" :download="yj.name" :href="yj.download_url">下载</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="recode-item" v-else>
                  <div  class="recode_online clearfix">
                    <div class="recode-item-left">
                      <span class="date"> {{stopFlows[0].created_at | formatDate}} </span>
                      <span class="name"> {{stopFlows[0].user_name}} </span>
                    </div>
                    <div class="recode-item-right">
                      <ul class="recode-item">
                        <div>
                          <li class="line" >
                            <i class="icon icon-yes"></i>
                            <span> 通过 </span>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extend" @click="showRecodeItem" v-if="shenheResultRecord"><span> {{shouqi}}审核结果记录 </span> <i :class="{'icon-jiantou':isShowJiantou}"> </i></div>
            </div>
          </div>
        </div>
      </div>

      <!--按钮控制-->
      <div class="footer-audit item">
        <!--发起人-->
        <span v-if="supplier_type=='sponsor'">
          <el-button v-if="projectStopFlowEnabled && stopFlowsLastStatus=='wait'" type="primary" @click="sponsorAuditsSubmit('termination')" :disabled="isFileEmpty.isShow"
                     v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中" >发起审核</el-button>
          <!--没有审核流程-->
          <el-button v-if="!projectStopFlowEnabled && stopFlowsLastStatus=='wait'" type="primary" @click="sponsorSubmit('termination')" :disabled="isFileEmpty.isShow"
                     v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中" >提交</el-button>
          <!--重新发起-->
          <el-button v-if="stopFlowsLastStatus=='reject'" type="primary" @click="getStopFlowsSetting('termination')" :disabled="isFileEmpty.isShow"
                     v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中" >重新发起</el-button>
        </span>
        <!--审核人提交-->
        <span  v-if="supplier_type=='audit'">
          <el-button type="primary" @click="auditorSubmit('ruleFormWf')" :disabled="isFileEmpty.isShow"
                     v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中">提交</el-button>
        </span>
        <el-button @click="goback_wf">返回</el-button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import {formatDate} from 'assets/js/filter'
  import fileUpload from 'components/common/fileUpload'
  export default{
    components:{fileUpload},
    props:{
      project:{
        type:Object,
        default:function () {
          return {}
        }
      }
    },
    data(){
      return {
        projectId:this.project.id,
        projectFirstStageId:this.project.first_stage_id,
        projectProcessStageId:this.project.process_stage_id,
        projectStatus:this.project.status, // 项目状态
        projectStopFlowEnabled:this.project.stop_flow_enabled,
        stage_name:'项目管理',
        fullscreenLoading:false,
        isFileEmpty:{isShow:false},
        shenheResultRecord:true,
        isnewheight:false,
        isFileEmpty:{isShow:false},
        listAttachmentsId:[],
        showAudio:false,
        showRecode:true,
        shouqi:'收起',
        isShowJiantou:true,
        fileList: [],
        termination:{
          type:'',
          desc:''
        },
        ruleFormWf:{
          audit:'pass',
          desc:''
        },
        stopFlows:[],
        stopFlowsLastOne:'',
        stopFlowsSteps:[],
        supplier_type:'',
        stopFlowsFirstStatus:'',
        stopFlowsLastStatus:'',
        rules:{
          type: [{required: true, message: "请选择原因类型", trigger: 'change'}],
          desc: [{required: true, message: '请填写具体原因', trigger: 'blur' }],
        }
      }
    },
    created(){
      this.getStopFlows()
    },
    computed:{
      // 数组排序倒序
      stopFlowsReverse(){
        let audits = JSON.parse(JSON.stringify(this.stopFlows));;
        audits.reverse();
        audits.forEach((v)=>{
          v.steps.reverse();
        })
        return audits;
      },
    },
    methods:{
      //获取数据
      getStopFlows(){
        this.$http.get(API.url+'projects/'+this.projectId+'/stop_flows').then((res)=>{
          var resBody=res.body;
          this.fullscreenLoading=false;
          this.stopFlows = resBody.stop_flows;
          if(this.stopFlows.length==0){
            this.getStopFlowsSetting()
          } else {
            this.stopFlowsLastOne=this.stopFlows[this.stopFlows.length-1];
            this.stopFlowsSteps=this.stopFlowsLastOne.steps;
            this.supplier_type=this.stopFlowsLastOne.supplier_type;
            this.stopFlowsFirstStatus=this.stopFlows[0].status
            this.stopFlowsLastStatus=this.stopFlowsLastOne.status
          }
        })
      },
      getStopFlowsSetting(){
        this.$http.get(API.url+'projects/'+this.projectId+'/stop_flows/setting_flow').then((res)=>{
          var resBody=res.body;
          this.fullscreenLoading=false;
          this.stopFlows.push(resBody.stop_flow)
          this.stopFlowsLastOne=this.stopFlows[this.stopFlows.length-1];
          this.stopFlowsSteps=this.stopFlowsLastOne.steps;
          this.supplier_type=this.stopFlowsLastOne.supplier_type;
          this.stopFlowsFirstStatus=this.stopFlows[0].status
          this.stopFlowsLastStatus=this.stopFlowsLastOne.status
        })
      },
      goback_wf(){
        if(this.projectStatus=='proceeding'){
          this.$router.push({name: 'serviceApply',params :{ id:this.projectId , state_id:this.projectProcessStageId},query:{name:this.stage_name}})
          location.reload()
        }else{
          this.$router.push({name: 'serviceApply',params :{ id:this.projectId , state_id:this.projectFirstStageId},query:{name:this.stage_name}})
          location.reload()
        }
      },
      changeAudit(){
        if(this.ruleFormWf.audit=='pass'){
          this.showAudio =false
        }else{
          this.showAudio =true
        }
      },
      showRecodeItem(){
        this.showRecode = this.showRecode ? false :true
        this.isnewheight = this.isnewheight ? false :true
        this.isShowJiantou = this.isShowJiantou ? false : true
        this.shouqi = !this.showRecode?"展开":'收起'
      },
      sponsorAuditsSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.$http.post(API.url+'projects/'+this.projectId+'/stop_flows',{
              reason_type:this.termination.type,
              reason:this.termination.desc,
              attachments:this.listAttachmentsId,
            }).then((res)=>{
              this.getStopFlows()
              this.$emit('getProjectWf')
            })
          }
        });
      },
      sponsorSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(API.url+'projects/'+this.projectId+'/stop_flows',{
              reason_type:this.termination.type,
              reason:this.termination.desc,
              attachments:this.listAttachmentsId,
            }).then((res)=>{
              this.$confirm('终止后整个项目将终止，同时也无法恢复！ 确定终止项目吗？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '项目终止成功!'
                });
                this.getStopFlows()
                this.$emit('getProjectWf')
              })
            })
          }
        });
      },
      auditorSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading=true;
            this.$http.post(API.url+'projects/'+this.projectId+'/stop_flows/audit',{
              status:this.ruleFormWf.audit,
              note:this.ruleFormWf.desc,
              attachments:this.listAttachmentsId,
            }).then((res)=>{
              this.getStopFlows()
              this.$emit('getProjectWf')
            })
          }
        });
      }
    },
    filters:{
      personClass(v){
        if(v.status=='processing'){
          return 'new'
        }
      },
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      },
      sponsorCategories(v){
        if(v){
          return '发起者'
        }else{
          return '审核者'
        }
      },
      filterPicIco(v){
        if(v.name.toLowerCase().indexOf(".doc") >= 0) {
          return 'icon-doc'
        } else if(v.name.toLowerCase().indexOf(".png") >= 0 || v.name.toLowerCase().indexOf(".jpg") >= 0 || v.name.toLowerCase().indexOf(".jpeg") >= 0) {
          return 'icon-jpg'
        } else if(v.name.toLowerCase().indexOf(".txt") >= 0) {
          return 'icon-txt'
        } else if(v.name.toLowerCase().indexOf(".ppt") >= 0) {
          return 'icon-ppt'
        } else if(v.name.toLowerCase().indexOf(".pdf") >= 0) {
          return 'icon-pdf'
        } else if(v.name.toLowerCase().indexOf(".xls") >= 0) {
          return 'icon-xls'
        }
      },
    },
    watch: {
      '$route': 'getStopFlows'
    }
  }
</script>

<style lang="scss">
.close-project{
  .recode-item{
    .recode-item-right{
      width: 720px;
    }
  }
  .ptr10{ padding: 20px 20px 0 0;}
  .pt20{ padding: 20px 0 0;}
  .top-tips{
    font-size: 14px;
    color: #5C5C5C;
    background: url("../../assets/images/tishizhipai.png") 0 4px no-repeat;
    background-size: 14px;
    padding-left: 20px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .closestyle{
    .gd-box{
      width: 100%;
      padding-bottom: 0;
    }
  }
  .posfather{
    position: relative;
    .first{
      font-size: 12px;
      color: #a9a9a9;
      position: absolute;
      top: 0;
      left: 107px;
    }
  }
  .readmination{
    .stop-item{
      margin-bottom: 10px;
      .st-l{
        width: 100px;
        padding-right: 12px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #48576a;
        i{ color: #ff4949; margin-right: 4px;}
      }
      .st-r{
        width: 900px;
        float: left;
        word-wrap:break-word;
        text-align: justify;
        .accessories{
          .ico{
            height: 20px;
            line-height: 20px;
            margin-bottom: 10px;
            padding-left: 25px;
            a{ float: right}
          }
        }
      }
    }
  }
  .close-file-list{
    li{
      margin: 0;
      .name2{
      }
    }
  }
}
</style>
