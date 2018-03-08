<template>
  <div class="audit-form auditstyle">
    <div class="gd-box">
      <div class="title">
        <i class="tit-fqns"></i>
        <span class="describe">材料内审</span>

        <div class="status bgf1b" v-if="status=='wait' && canOperation">
          <i class="icon-status icon-wait"></i>
          <span>等待处理</span>
        </div>
        <div class="status bgf1b" v-else-if="status=='processing' && canOperation">
          <i  class="icon-status icon-wait"></i>
          <span>审核中</span>
        </div>
        <div class="status bge65" v-else-if="status=='reject' && canOperation">
          <i  class="icon-status icon-refuse"></i>
          <span >审核拒绝</span>
        </div>
        <div class="status bg55b" v-else-if="status=='pass' && canOperation">
          <i class="icon-status icon-yes"></i>
          <span>审核通过</span>
        </div>
        <div class="status bge65" v-else-if="!canOperation">
          <i class="icon-status icon-refuse"></i>
          <span>项目终止</span>
        </div>
      </div>

      <!-- 审核人员 start ============================================================== -->
      <div class="peo-audit item">
        <div class="left">审核人员 </div>
        <div class="right ">

          <!--被审核人视觉-->
          <div class="peo-dowm">
            <div class="icon_people">
              <div class="peo-left">
                <div class="default" :class="fqzClass">{{operate_name}}</div>
                <div class="postion">发起者</div>
              </div>
              <div class="peo-right">
                <img src="./images/arrow.png" alt="">
              </div>
            </div>
            <!--{{steps}}阶段-->
            <div class="icon_people" v-for="(v,index) in steps">
              <div>
                <div class="peo-left">
                  <div class="default" :class="v | personClass(auditsLastOne)" > {{v.supplier_name}}<i class="bi"></i> </div>
                  <div class="postion">{{v.audit_type | auditTypeToggle}}</div>
                </div>
                <div class="peo-right" v-if="steps.length!==index+1">
                  <img src="../../../assets/images/aduit/arrow.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--审核内容 start ============================================================== -->
      <div class="content-audit-file item">
        <div class="left">审核内容</div>
        <div class="right p20 placetext" v-if="auditsLastOne.status=='wait'" >未发起内审，暂无审核内容</div>
        <div class="right p20" v-else>
          <div class="fpz_distribution fpz_mr30" :class="[auditsLastOne.status=='reject' && auditsLastOne.supplier_type=='sponsor' ?'reject_showdata_border':'']"  v-if="auditsLastOne.supplier_type!='auditor'">
            <div class="sh_context_list" v-for="v in stageAuditAttachments">
              <span class="shz_w1" :title="v.name"> <i class="icon" :class="v | filterPicIco"></i> {{v.name}}</span>
              <span class="shz_w2 dshico_wait" v-if="v.status=='wait'">待审核</span>
              <span class="shz_w2 dshico_pass" v-if="v.status=='pass'">已通过</span>
              <span class="shz_w2 dshico_reject" v-if="v.status=='reject'">需修改</span>
              <span class="shz_w3">{{v.created_at | formatDate2}}</span>
              <span class="shz_w4"><a :href="v.download_url" :download="v.name">下载</a></span>
            </div>
          </div>
        </div>
      </div>

      <!--审核结果 start ============================================================== -->
      <div class="res-audit item" v-if="showShenheResult">
        <div class="left" :class="{isnewheight}"> 审核结果 </div>
        <div class="right">

          <!-- 审核中的状态-->
          <div class="auditing">
            <!-- 如果有审核 记录 就显示-->
            <div class="recode">
              <div v-show="showRecode" class="pt10">
                <div class="recode-item" v-for="v in flashbackAudits">
                  <div v-for="s in v.steps" v-if="s.audit_type=='auditor' && (s.status=='pass' || s.status=='reject')" class="recode_online">
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

                          <li class="line" v-if="s.reason">
                            <dl class="layoutlr">
                              <dt><i class="icon icon-bz"></i></dt>
                              <dd><div class="fn-desc">{{s.reason}}</div></dd>
                            </dl>
                          </li>
                        </div>

                        <div v-if="s.status=='reject'">
                          <li class="line" >
                            <i class="icon icon-error"></i>
                            <span> 拒绝 </span> <span> | </span> <span> {{s.reason_type}} </span>
                          </li>
                          <li class="line" v-if="s.reason">
                            <dl class="layoutlr">
                              <dt><i class="icon icon-bz"></i></dt>
                              <dd><div class="fn-desc">{{s.reason}}</div></dd>
                            </dl>
                          </li>
                          <div  class="file-list" v-if="s.status == 'reject'">
                            <ul>
                              <li v-for="yj in v.attachments">
                                <i class="icon-file" :class="yj | filterPicIco"></i>
                                <a :title="yj.name" class="name">{{yj.name}}</a>
                                <span class="download"><a class="fr" :download="yj.name" :href="yj.download_url">下载</a> </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extend" @click="showRecodeItem"><span> {{shouqi}}审核结果记录 </span> <i :class="{'icon-jiantou':isShowJiantou}"> </i></div>
            </div>
          </div>
        </div>
      </div>

      <!--审核通过后返回-->
      <div class="footer-audit item">
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {formatDate} from 'assets/js/filter'
  import API from 'API/config'
  export default{
    computed:{
      //项目是否结束
      ...mapGetters(['projectImf','token']),
      canOperation(){
        if(this.projectImf.status == 'deny' || this.projectImf.status == 'stop'){
          return false;
        }
        return true;
      },
      // 数组排序倒序
      flashbackAudits(){
        let audits = JSON.parse(JSON.stringify(this.audits));
        audits.reverse();
        audits.forEach((v)=>{
          v.steps.reverse();
        })
        return audits;
      },
      //发起者样式
      fqzClass(){
        if(this.status =='processing'){
          return ''
        }else if(this.status =='wait' || this.status =='reject' ){
          return 'new'
        }
      },
      //显示审核结果
      showShenheResult(){
        var stepsOne=this.auditsFirstSteps;
        for(var i=0;i<stepsOne.length;i++){
          if(stepsOne[i].reason!=null || stepsOne[i].reason_type!=null && this.canOperation){
            return true
          }
        }
        if(this.auditsLastOne.supplier_type=='auditor' && this.canOperation){
          return true;
        }else if((this.auditsFirst.status=='reject' || this.auditsFirst.status=='pass') && this.canOperation){
          return true
        }
        else{
          return false
        }
      },
    },
    data(){
      return {
        //文件内审
        isFileEmpty:{isShow:false}, // 上传中禁止按钮提交
        listAttachmentsId:[],  // 上传七牛返回的ID
        allStageAuditId:[],     //所有stage的id
        stageAuditAttachments:[], //提交的内容
        fullscreenLoading:false, //loading
        // 发起内审返回数据
        canUpdateUser:'', //是否可以重新选人
        stageStatus:'',
        currentRow: '',//选中人员值
        count:'',
        auditStepsPathId:'',//内审人员分配path id
        auditStepsUserId:'',//内审人员分配user id
        auditStepsUserName:'',//内审人员分配名字
        auditsFirst:'',
        auditsFirstSteps:'',
        auditsFirstStepsFirst:'',
        auditsLastOne:'',
        audits:[],
        steps:[],
        operate_name:'',
        status:'',//审核状态
        shenheStatus:'',//审核结果第一次状态
        leaderID:'',//领导id
        isnewheight:false,
        showRecode:true,
        shouqi:'收起',
        isShowJiantou:true,
      }
    },
    created(){
      this.getImf()
      this.stageId  = this.$route.params.stage_id
    },
    methods:{
      getImf(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id+'/stages/'+this.$route.params.stage_id
        ).then((res) => {
          var resBody = res.body;
          var stage = resBody.stage
          var audits = stage.audits
          var auditsLastOne = audits.length - 1;

          this.fullscreenLoading = false;
          this.operate_name = stage.operate_name  //发起者
          this.stageStatus = stage.status;  // 当前状态
          this.audits = audits;             // 审核
          this.auditsFirst = audits[0];     // 第一次审核
          this.auditsFirstSteps = this.auditsFirst.steps //第一次发起的阶段
          this.auditsFirstStepsFirst = audits[0].steps[0];// 第一次审核的第一个坑
          this.shenheStatus = audits[0].status//有无审核的状态
          this.auditsLastOne = audits[auditsLastOne]; // 当前审核阶段

          this.status = this.auditsLastOne.status; //最后一步的状态
          this.steps = this.auditsLastOne.steps; //最后一步阶段
//          文件内审
          this.stageAuditAttachments = stage.stage_audit_attachments //提交的内容
          this.stageAuditAttachments.forEach((v)=>{
            this.allStageAuditId.push(v.id)
          })

        })
      },
      //展开审核结果记录
      showRecodeItem(){
        this.showRecode = this.showRecode ? false :true
        this.isnewheight = this.isnewheight ? false :true
        this.isShowJiantou = this.isShowJiantou ? false : true
        this.shouqi = !this.showRecode?"展开":'收起'
      },
      goBack(){
        this.$router.go(-1)
      }
    },
    filters:{
      //时间 2017-05-05 20:35:25
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      },
      //时间 2017-05-05
      formatDate2(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd')
      },
      //分配者还是审核者
      auditTypeToggle(v){
        if(v == 'assigner'){
          return '分配者'
        }else{
          return '审核者'
        }
      },
      //选择人员
      personClass(v){
        if(v.status=='pass'){
          return ''
        }else if(v.status=='wait'){
          return 'add-no'
        }else if(v.status=='processing'){
          return 'new'
        }
      },
      // 图片ico
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
      '$route': 'getImf',
    },
  }
</script>
<style lang="scss">
  .audit-form {
    .gd-box {
      padding-bottom: 0;
    }
  }
  .file-list {
    li {
      height: 20px;
      line-height: 20px;
      padding-right: 20px;
    }
  }
</style>
