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
      <el-form :model="ruleFormWf" :rules="rules" ref="ruleFormWf" label-width="100px" class="demo-ruleForm">
      <!-- 审核人员 start ============================================================== -->
        <div class="peo-audit item">
          <div class="left">审核人员</div>
          <div class="right ">

            <!--被审核人视觉-->
            <div class="peo-dowm">
              <div class="icon_people">
                <div class="peo-left">
                  <div class="default" :class="fqzClass">{{operate_name}}</div>
                  <div class="postion">发起者</div>
                </div>
                <div class="peo-right">
                  <img src="../../../assets/images/aduit/arrow.png" alt="">
                </div>
              </div>

              <!--{{steps}}阶段-->
              <div class="icon_people"  v-for="(v,index) in steps" >
                <!--是否是leader-->
                <div v-if="v.category=='leader'">
                  <div class="peo-left">
                    <div class="default" :class="v | personClass(auditsLastOne)" @click="showLeader(index,v.id,v)" >
                      {{v.supplier_name}}<i class="bi"></i>
                    </div>
                    <div class="postion">{{v.audit_type | auditTypeToggle}}</div>
                  </div>
                  <div class="peo-right" v-if="steps.length!==index+1">
                    <img src="../../../assets/images/aduit/arrow.png" alt="">
                  </div>
                </div>
                <!--是否是直属下属-->
                <div v-if="v.category=='underling'">
                  <div class="peo-left">
                    <div class="default" :class="v | personClass(auditsLastOne)" @click="showUnderling(index,v.id,v)">
                      {{v.supplier_name}}<i class="bi"></i>
                    </div>
                    <div class="postion">{{v.audit_type | auditTypeToggle}}</div>
                  </div>
                  <div class="peo-right" v-if="steps.length!==index+1">
                    <img src="../../../assets/images/aduit/arrow.png" alt="">
                  </div>
                </div>
                <!--获取当前登录账号所有下属-->
                <div v-if="v.category=='descendant'">
                  <div class="peo-left">
                    <div class="default" :class="v | personClass(auditsLastOne)" @click="showAllUnderling(index,v.id,v)">
                      {{v.supplier_name}}<i class="bi"></i>
                    </div>
                    <div class="postion">{{v.audit_type | auditTypeToggle}}</div>
                  </div>
                  <div class="peo-right" v-if="steps.length!==index+1">
                    <img src="../../../assets/images/aduit/arrow.png" alt="">
                  </div>
                </div>
                <!--是否是固定角色-->
                <div v-if="v.category=='role'">
                  <div class="peo-left">
                    <div class="default" :class="v | personClass(auditsLastOne)" @click="showRole(v.department_id,v.role_id,v.id,index,v)">
                      {{v.supplier_name}}<i class="bi"></i>
                    </div>
                    <div class="postion">{{v.audit_type | auditTypeToggle}}</div>
                  </div>
                  <div class="peo-right" v-if="steps.length!==index+1">
                    <img src="../../../assets/images/aduit/arrow.png" alt="">
                  </div>
                </div>
                <!--是否是固定人员-->
                <div v-if="v.category=='member'">
                  <div class="peo-left">
                    <div class="default" :class="v | memberClass" >{{v.user}}</div>
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

      <!--审核内容 start ==============================================================-->
      <div class="content-audit-file item" v-if="showAuditAll" >
        <div class="left"> 审核内容 </div>
        <div class="right p20 placetext" v-if="auditsLastOne.status=='wait' && auditsLastOne.supplier_type=='other'" >未发起内审，暂无审核内容</div>
        <div class="right p20" v-else>

          <!--分配者分配-->
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

          <!--发起者上传文件-->
          <div class="upload-module-g"  v-if="auditsLastOne.supplier_type=='sponsor' && (auditsFirstStepsFirst.status=='wait' || auditsLastOne.status=='reject') && canOperation">
            <!--展示文件列表 start ===================-->
            <div class="first"><span>{{fileSupportFormatGol}}</span></div>
            <div class="upload-el sponsor-center-upload">
              <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
            </div>
          </div>

          <!--审核者选择文件-->
          <div class="fpz_distribution" v-if="auditsLastOne.supplier_type=='auditor'">
            <el-checkbox-group v-model="ruleFormWf.shzCheckList">
              <div class="sh_context_list" v-for="v in stageAuditAttachments">
                <el-checkbox :label="v.id" :disabled = "v.disabled">
                  <span class="shz_w1" :title="v.name"> <i class="icon" :class="v | filterPicIco"></i> {{v.name}}</span>
                  <span class="shz_w2 dshico_wait" v-if="v.status=='wait'">待审核</span>
                  <span class="shz_w2 dshico_pass" v-if="v.status=='pass'">已通过</span>
                  <span class="shz_w2 dshico_reject" v-if="v.status=='reject'">需修改</span>
                  <span class="shz_w3">{{v.created_at | formatDate2}}</span>
                  <span class="shz_w4"><a :href="v.download_url" :download="v.name">下载</a></span>
                </el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>

      </div>

      <!--审核结果 start ============================================================== -->
      <div class="res-audit item" v-if="showShenheResult">
        <div class="left" :class="{isnewheight}"> 审核结果 </div>
        <div class="right">
          <!--审核者-->
          <div class="jinggao" v-if="auditsLastOne.supplier_type=='auditor'">文件全部符合要求，请直接通过；有文件不符合要求，<span class="red">拒绝后勾选不符合要求的文件</span>，如存在文件欠缺，请告知补全</div>
          <!-- 审核中的状态 审核者-->
          <div class="auditing">
            <div class="sh_result" v-if="auditsLastOne.supplier_type=='auditor' && canOperation">
              <el-form-item label="审核结果" prop="audit">
                <el-radio-group v-model="ruleFormWf.audit" @change="changeAudit">
                  <el-radio label="pass">通过</el-radio>
                  <el-radio label="reject">拒绝</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="拒绝原因" v-if="showAudio" prop="reason">
                <el-select v-model="ruleFormWf.reason" placeholder="请选择">
                  <el-option label="材料有误" value="材料有误"></el-option>
                  <el-option label="材料欠缺" value="材料欠缺"></el-option>
                  <el-option label="其它原因" value="其它原因"></el-option>
                </el-select>
              </el-form-item>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="ruleFormWf.desc" placeholder="请输入备注信息"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="上传文件" v-if="showAudio">
                <div class="upload-module-g upload-sh">
                  <div class="upload-el adit-reli">
                    <file-upload :listAttachmentsId="listAttachmentsId" :isFileEmpty="isFileEmpty"></file-upload>
                    <span class="upload_text_ab">{{fileSupportFormatGol}}</span>
                  </div>
                </div>
              </el-form-item>
            </div>

            <!-- 审核记录都能看 -->
            <div class="recode" v-if="shenheStatus=='reject'||shenheStatus=='pass' || shenheStatus=='processing'">
              <div v-show="showRecode" class="pt10">
                <div class="recode-item" v-for="v in flashbackAudits">
                  <div v-for="s in v.steps" v-if="s.audit_type=='auditor' && (s.status=='pass' || s.status=='reject')" class="recode_online clearfix">
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
                            <span> 拒绝 </span> <span> | </span> <span>{{s.reason_type}}</span>
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
              <div class="extend" @click="showRecodeItem" v-if="shenheResultRecord"><span> {{shouqi}}审核结果记录 </span> <i :class="{'icon-jiantou':isShowJiantou}"> </i></div>
            </div>
          </div>
        </div>
      </div>

      <!--底部button start ============================================================== -->
        <div class="footer-audit item" v-if="auditsLastOne.status !='pass' && canOperation">
          <el-button @click="goback_wf">返回</el-button>
          <!--发起人-->
            <span v-if="auditsLastOne.supplier_type=='sponsor'">
              <el-button v-if="auditsFirstStepsFirst.status=='wait'" type="primary" :disabled="isFileEmpty.isShow"
                         @click="faqiTrialFirst()" v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中">发起内审</el-button>
              <el-button v-if="auditsLastOne.status=='reject'" type="primary" :disabled="isFileEmpty.isShow"
                         @click="faqiTrial" v-loading.fullscreen="fullscreenLoading" element-loading-text="提交中">重新发起内审</el-button>
            </span>
          <!--分配人-->
          <span v-if="auditsLastOne.supplier_type=='assigner'">
            <el-button type="primary"  @click="assignerSubmit">确认分配</el-button>
          </span>
          <!--审核人提交-->
          <span v-if="auditsLastOne.supplier_type=='auditor'">
            <el-button type="primary"  @click="auditorSubmit('ruleFormWf')" v-loading.fullscreen="fullscreenLoading"
                       :disabled="isFileEmpty.isShow" element-loading-text="提交中">提交</el-button>
          </span>
          <el-button type="primary" v-if="canUpdateUser" @click="assignerSubmitNew">重新分配</el-button>
        </div>
        <!--审核通过后返回-->
        <div class="footer-audit item" v-if="auditsLastOne.status =='pass' || !canOperation">
          <el-button @click="goback_wf">返回</el-button>
        </div>
      </el-form>
    </div>
    <!--人员选择-->
    <el-dialog title="人员选择" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <el-table :data="gridData" max-height="320" highlight-current-row @current-change="handleCurrentPerson">
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="date" label="职能" ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePerson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import fileUpload from 'components/common/fileUpload'
  import {mapGetters} from 'vuex'
  import {formatDate,filterIconClass} from 'assets/js/filter'
  import API from 'API/api'
  export default{
    created(){
      this.$http.get(API.serviceurl + 'service_categories').then((res) => {
        var resBody = res.body;
        this.service_categories = resBody.service_categories;
      }).catch()
      this.fetchData()
    },
    components:{
      fileUpload
    },
    data(){
      return {
        isnewheight:false,
        stage_name:'项目管理',
        isFileEmpty:{isShow:false},
        listAttachmentsId:[],
        allStageAuditId:[],
        stageAuditAttachments:[],
        fullscreenLoading:false,
        canUpdateUser:'',
        stageStatus:'',
        currentRow: '',
        count:'',
        auditStepsPathId:'',
        auditStepsUserId:'',
        auditStepsUserName:'',
        auditsFirst:'',
        auditsFirstSteps:'',
        auditsFirstStepsFirst:'',
        auditsLastOne:'',
        audits:[],
        steps:[],
        operate_name:'',
        status:'',
        shenheStatus:'',
        leaderID:'',
        state_id:'',
        id:'',
        showAudio:false,
        showRecode:true,
        shouqi:'收起',
        isShowJiantou:true,
        fileList: [],
        sponsorFileList: [],
        ruleFormWf:{
          shzCheckList:[],
          audit:'pass',
          reason:'',
          desc:''
        },
        rules:{
          audit: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          reason:[
            { required: true, message: '请选择拒绝原因', trigger: 'change' }
          ]
        },
        dialogVisible:false,
        gridData: [],
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    computed:{
      ...mapGetters(['currentProject']),
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      flashbackAudits(){
        let audits = JSON.parse(JSON.stringify(this.audits));;
        audits.reverse();
        audits.forEach((v)=>{
          v.steps.reverse();
        })
        return audits;
      },
      fqzClass(){
        if(this.status =='processing'){
          return ''
        }else if(this.status =='wait' || this.status =='reject' ){
          return 'new'
        }
      },
      showAuditAll(){
        if(this.stageAuditAttachments=='' && !this.canOperation){
          return false
        }else{
          return true
        }
      },
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
      shenheResultRecord(){
        var isTrue = this.auditsFirst.steps.some((v)=>{
          return (v.reason!=null || v.reason_type!=null || v.status=='reject')
        })
        if(isTrue){
          return true
        }
      }
    },
    methods: {
      goback_wf(){
        let id=this.$route.params.id;
        let state_id=this.$route.params.state_id;
        this.$router.push({
          name: 'serviceApply',
          params:{id,state_id},
          query: {name: this.stage_name}
        })
      },
      fetchData () {
        this.listAttachmentsId = [];
        var params = this.$route.params
        this.id=params.id
        this.state_id=params.state_id
        this.$http.get(API.url+'projects/'+this.id+'/stages/'+this.state_id).then((res) =>{
          var resBody = res.body;
          var stage = resBody.stage
          var audits = stage.audits
          var auditsLastOne = audits.length - 1;

          this.fullscreenLoading = false;
          this.operate_name = stage.operate_name
          this.stageStatus = stage.status;
          this.audits = audits;
          this.auditsFirst = audits[0];
          this.auditsFirstSteps = this.auditsFirst.steps
          this.auditsFirstStepsFirst = audits[0].steps[0];
          this.shenheStatus = audits[0].status
          this.auditsLastOne = audits[auditsLastOne];

          this.status = this.auditsLastOne.status;
          this.steps = this.auditsLastOne.steps;
          this.canUpdateUser = this.steps.some((v)=>{
            return v.can_update_supplier
          })
          this.stageAuditAttachments = stage.stage_audit_attachments
          this.stageAuditAttachments.forEach((v)=>{
            this.allStageAuditId.push(v.id)
          })
        }).catch()
      },
      changeAudit(){
        if(this.ruleFormWf.audit=='pass'){
          this.showAudio =false
          this.stageAuditAttachments.forEach((v)=>{
            v.disabled = true;
          })
          this.ruleFormWf.shzCheckList = []
        }else{
          this.showAudio =true;
          this.stageAuditAttachments.forEach((v)=>{
            v.disabled = false;
          })
        }
      },
      showRecodeItem(){
        this.showRecode = this.showRecode ? false :true
        this.isnewheight = this.isnewheight ? false :true
        this.isShowJiantou = this.isShowJiantou ? false : true
        this.shouqi = !this.showRecode?"展开":'收起'
      },
      showLeader(index,auditStepsPathId,v){
        if(v.status=='wait' && v.show && this.canOperation){
          if(this.auditsLastOne.supplier_type=='assigner' || this.auditsLastOne.supplier_type=='auditor'
            || (this.auditsLastOne.supplier_type=='sponsor'&& this.auditsLastOne.status=='wait')){
            this.dialogVisible = true;
            this.auditStepsPathId = auditStepsPathId;
            this.$http.get(API.url+'users/leaders').then((res)=>{
              var resBody = res.body;
              this.gridData =resBody.leaders
            })
            this.count = index;
          }
        }
      },
      showUnderling(index,auditStepsPathId,v){
        if((v.status=='wait' && v.show && this.canOperation) || (v.can_update_supplier && this.canOperation )){
          if(this.auditsLastOne.supplier_type=='assigner' || this.auditsLastOne.supplier_type=='auditor'
            || (this.auditsLastOne.supplier_type=='sponsor'&& this.auditsLastOne.status=='wait')
            || (this.auditsLastOne.supplier_type=='sponsor'&& v.can_update_supplier)
            || (this.auditsLastOne.supplier_type=='other' && v.can_update_supplier)) {
            this.dialogVisible = true;
            this.auditStepsPathId = auditStepsPathId;
            this.$http.get(API.url + 'users/subordinate').then((res) => {
              var resBody = res.body;
              this.gridData = resBody.subordinates
            }).catch()
            this.count = index;
          }
        }
      },
      showAllUnderling(index,auditStepsPathId,v){
        if((v.status=='wait' && v.show && this.canOperation) || (v.can_update_supplier && this.canOperation )){
          if(this.auditsLastOne.supplier_type=='assigner' || this.auditsLastOne.supplier_type=='auditor'
            || (this.auditsLastOne.supplier_type=='sponsor'&& this.auditsLastOne.status=='wait')
            || (this.auditsLastOne.supplier_type=='sponsor'&& v.can_update_supplier)
            || (this.auditsLastOne.supplier_type=='other' && v.can_update_supplier)) {
            this.dialogVisible = true;
            this.auditStepsPathId = auditStepsPathId;
            this.$http.get(API.url + 'users/descendants').then((res) => {
              var resBody = res.body;
              this.gridData = resBody.descendants
            }).catch()
            this.count = index;
          }
        }
      },
      showRole(department_id,role_id,auditStepsPathId,index,v){
        if((v.status=='wait' && v.show && this.canOperation) || (v.can_update_supplier && this.canOperation )){
          if(this.auditsLastOne.supplier_type=='assigner' || this.auditsLastOne.supplier_type=='auditor'
            || (this.auditsLastOne.supplier_type=='sponsor'&& this.auditsLastOne.status=='wait')
            || (this.auditsLastOne.supplier_type=='sponsor'&& v.can_update_supplier)
            || (this.auditsLastOne.supplier_type=='other' && v.can_update_supplier)) {
            this.dialogVisible = true;
            this.auditStepsPathId = auditStepsPathId;
            this.$http.get(API.url + 'users', {
              params: {
                department: department_id,
                role_id: role_id
              }
            }).then((res) => {
              var resBody = res.body;
              this.gridData = resBody.suppliers;
            }).catch()
            this.count = index;
          }
        }
      },
      handleCurrentPerson(val) {
        this.currentRow = val;
      },
      handleClose(){
        this.dialogVisible = false
      },
      savePerson(){
        if(this.currentRow.id==null){
          this.$message.error('请选择人员');
          return
        }else{
          this.dialogVisible = false
        }
        this.auditStepsUserId = this.currentRow.id
        this.auditStepsUserName = this.currentRow.name
        this.steps[this.count].supplier_name = this.auditStepsUserName
      },
      assignerSubmit(){
        var userId
        var pathId
        var hasMember = this.steps.some((v) => {
          if (v.status == 'wait' && v.show && v.category=='member') {
            return true
          } else {
            return false
          }
        })
        if (hasMember) {
          var getMemberArray = this.steps.filter((v) => {
            return v.status == 'wait' && v.show && v.category == 'member'
          })
          userId = getMemberArray[0]['user_id']
          pathId = getMemberArray[0]['id']
          this.$http.post(API.url + 'audit_steps/' + pathId, {
            supplier_id: userId,
            id: pathId
          }).then((res) => {
            this.$message.success('分配成功');
            this.fetchData()
          }).catch((error)=>{
            var errorBody = error.body;
            if(errorBody.code=='4002'){
              this.$message.error(errorBody.details);
            }
          })
        } else {
          if (this.auditStepsUserId == '') {
            this.$alert('请选择人员', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return
          } else {
            this.$http.post(API.url + 'audit_steps/' + this.auditStepsPathId, {
              supplier_id: this.auditStepsUserId,
              id: this.auditStepsPathId
            }).then((res) => {
              this.$message.success('分配成功');
              this.fetchData()
            }).catch((error)=>{
              var errorBody = error.body;
              if(errorBody.code=='4002'){
                this.$message.error(errorBody.details);
              }
            })
          }
        }
      },
      assignerSubmitNew(){
        this.$http.post(API.url + 'audit_steps/' + this.auditStepsPathId, {
          supplier_id: this.auditStepsUserId,
          id: this.auditStepsPathId
        }).then((res) => {
          this.$message.success('分配成功');
          this.fetchData()
        }).catch((error)=>{
          var errorBody = error.body;
          if(errorBody.code=='4002'){
            this.$message.error(errorBody.details);
          }
        })
      },
      faqiTrialFirst(){
        if (this.listAttachmentsId == '') {
          this.$alert('请上传文件', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return
        }
        if (this.auditsFirstStepsFirst.category == 'member') {
          var supplier_id = this.auditsFirstStepsFirst.user_id;
          var fileFd = new FormData();
          this.listAttachmentsId.forEach((v) => {
            fileFd.append('attachments[][id]', v)
          })
          fileFd.append('supplier_id', supplier_id)
          this.fullscreenLoading = true;
          this.$http.post(API.url + 'projects/' + this.id + '/stages/' + this.state_id + '/audit', fileFd).then((res) => {
            this.fetchData()
          },(error)=>{
            this.fullscreenLoading = false;
            this.$alert('请求失败', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          })
        } else {
          if (this.auditStepsUserId == '') {
            this.$alert('请选择人员', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            });
            return
          } else {
            var fileFd = new FormData();
            this.listAttachmentsId.forEach((v) => {
              fileFd.append('attachments[][id]', v)
            })
            fileFd.append('supplier_id', this.auditStepsUserId)
            this.fullscreenLoading = true;
            this.$http.post(API.url + 'projects/' + this.id + '/stages/' + this.state_id + '/audit', fileFd).then((res) => {
              this.fetchData()
            },(error)=>{
              this.fullscreenLoading = false;
              this.$alert('请求失败', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              });
            })
          }
        }
      },
      faqiTrial(){
        if(this.listAttachmentsId==''){
          this.$alert('请上传文件', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return
        }
        var fileFd = new FormData();
        this.listAttachmentsId.forEach((v)=>{
          fileFd.append('attachments[][id]', v)
        })
        this.fullscreenLoading = true;
        this.$http.post(API.url+'projects/'+this.id+'/stages/'+this.state_id+'/audit',fileFd).then((res)=>{
          this.fullscreenLoading = false;
          this.fetchData()
        },(error)=>{
          this.fullscreenLoading = false;
          this.$alert('请求失败', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        })
      },
      auditorSubmit(formName){
        var hasMember = this.steps.some((v) => {
          if (v.status == 'wait' && v.show && v.category=='member') {
            return true
          } else {
            return false
          }
        })
        var hasNextAuditor = this.steps.some((v) => {
          if (v.status == 'wait' && v.show) {
            return true
          } else {
            return false
          }
        })
        var unselectedId=[];
        this.allStageAuditId.filter((v)=>{
          if(this.ruleFormWf.shzCheckList.indexOf(v)==-1){
            unselectedId.push(v)
          }
        })
        if(hasNextAuditor && this.ruleFormWf.audit=='pass'){
          if(hasMember){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                var fd  = new FormData();
                fd.append('status',this.ruleFormWf.audit)
                fd.append('reason_type',this.ruleFormWf.reason)
                fd.append('reason',this.ruleFormWf.desc)
                this.listAttachmentsId.forEach((v)=>{
                  fd.append('attachments[][id]', v)
                })
                this.ruleFormWf.shzCheckList.forEach((v)=>{
                  fd.append('attachments_status[][id]',v)
                  fd.append('attachments_status[][pass]',false)
                })
                unselectedId.forEach((v)=>{
                  fd.append('attachments_status[][id]',v)
                  fd.append('attachments_status[][pass]',true)
                })
                this.fullscreenLoading = true;
                this.$http.post(API.url + 'projects/' + this.id + '/stages/' + this.state_id + '/audit_process', fd).then((res) => {
                  this.fullscreenLoading = false
                  this.$confirm('提交成功！', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success'
                  }).then(() => {
                    this.assignerSubmit()
                    this.fetchData();
                  })
                }).catch()
              }
            });
          }else{
            this.$refs[formName].validate((valid) => {
              if (valid && this.auditStepsUserId!='') {
                var fd  = new FormData();
                fd.append('status',this.ruleFormWf.audit)
                fd.append('reason_type',this.ruleFormWf.reason)
                fd.append('reason',this.ruleFormWf.desc)
                this.listAttachmentsId.forEach((v)=>{
                  fd.append('attachments[][id]', v)
                })
                this.ruleFormWf.shzCheckList.forEach((v)=>{
                  fd.append('attachments_status[][id]',v)
                  fd.append('attachments_status[][pass]',false)
                })
                unselectedId.forEach((v)=>{
                  fd.append('attachments_status[][id]',v)
                  fd.append('attachments_status[][pass]',true)
                })
                this.fullscreenLoading = true;
                this.$http.post(API.url + 'projects/' + this.id + '/stages/' + this.state_id + '/audit_process', fd).then((res) => {
                  this.fullscreenLoading = false
                  this.$confirm('提交成功！', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success'
                  }).then(() => {
                    this.assignerSubmit()
                    this.fetchData();
                  })
                }).catch()
              } else{
                this.$alert('请选择人员', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                });
                return
              }
            });
          }
        }
        else{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var fd  = new FormData();
              fd.append('status',this.ruleFormWf.audit)
              fd.append('reason_type',this.ruleFormWf.reason)
              fd.append('reason',this.ruleFormWf.desc)
              this.listAttachmentsId.forEach((v)=>{
                fd.append('attachments[][id]', v)
              })
              this.ruleFormWf.shzCheckList.forEach((v)=>{
                fd.append('attachments_status[][id]',v)
                fd.append('attachments_status[][pass]',false)
              })
              unselectedId.forEach((v)=>{
                fd.append('attachments_status[][id]',v)
                fd.append('attachments_status[][pass]',true)
              })
              this.fullscreenLoading = true;
              this.$http.post(API.url + 'projects/' + this.id + '/stages/' + this.state_id + '/audit_process', fd).then((res) => {
                this.fullscreenLoading = false
                this.$confirm('提交成功！', '提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  type: 'success'
                }).then(() => {
                  this.fetchData();
                })
              },(error)=>{
                this.fullscreenLoading = false;
                this.$alert('请求失败', '提示', {
                  confirmButtonText: '确定',
                  type: 'warning'
                });
              }).catch()
            } else {
              return false;
            }
          });
        }
      }
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      },
      formatDate2(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd')
      },
      auditTypeToggle(v){
        if(v == 'assigner'){
          return '分配者'
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
      memberClass(v){
        if(v.status=='reject'){
          return 'no-oper-reject'
        }else if(v.status=='wait' && v.show==false){
          return 'add-no'
        }else if(v.status=='wait' && v.show){
          return 'no-oper'
        }else if(v.status=='processing'){
          return 'new'
        }else if(v.status=='pass'){
          return ''
        }
      },
      personClass(v,auditsLastOne){
        var isSponsor = auditsLastOne.supplier_type == 'sponsor'
        var isAssigner = auditsLastOne.supplier_type == 'assigner';
        var isAuditor = auditsLastOne.supplier_type == 'auditor';
        var isOther = auditsLastOne.supplier_type == 'other';
        var isWaitShow= v.status == 'wait' && v.show && v.supplier_name == null;
        if(v.status=='reject'){
          return 'no-oper-reject'
        }else if(v.status=='wait' && v.show==false && v.supplier_id==null){
          return 'add-no'
        }else if(v.status=='processing' && !v.can_update_supplier){
          return 'new'
        }else if(v.status=='processing' && v.can_update_supplier){
          return 'xz-oper-edit'
        }
        else if (v.status=='pass' || (v.status=='wait' && v.show==false && v.supplier_id!=null)){
          return ''
        }
        else if(isSponsor && auditsLastOne.status == 'wait'){
          if (isWaitShow ) {
            return 'add'
          } else {
            return 'xz-oper-edit'
          }
        }else if((isSponsor && auditsLastOne.status == 'processing') || isOther){
          return 'add-no'
        }
        if(isAuditor && isWaitShow){
          return 'add'
        }
        else if(isAuditor && !isWaitShow){
          return 'xz-oper-edit'
        }
        if(isAssigner && isWaitShow){
          return 'add'
        }else if(isAssigner && !isWaitShow){
          return 'xz-oper-edit'
        }
      }
    },
    watch: {
      '$route': 'fetchData'
    },
  }
</script>

<style scoped="" lang="scss">
  .audit-form {
    .gd-box {
      padding-bottom: 0;
    }
  }
  .file-list{
    li{
      height: 20px;
      line-height: 20px;
      padding-right: 20px;
    }
  }
</style>
<style lang="scss">
  .sponsor-center-upload{
    .upload-demo2{
      .el-upload{ text-align: center; display: block}
    }
  }
</style>
