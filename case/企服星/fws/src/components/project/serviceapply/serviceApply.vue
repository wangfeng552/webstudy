<template>
  <div>
    <!-- 项目完成阶段 直接展示图片-->
    <div v-if="stage.category == 'finished'" class="finished">
      <div>
        <img src="../../../assets/images/apply/xmwc.png" alt="">
      </div>
    </div>
    <!--其他状态-->
    <div class="service-apply" v-loading.fullscreen="loadingMark" v-else>
      <!--过度页面的 选择人状态 start ====================================================================-->
      <div class="transition" v-if="stage.operate_complete == false">
        <div class="gd-box"   :class="stage | filterClassOperateBottom">
          <div class="title">
            <i class="tit-fsbd"></i>
            <span class="describe">{{stage.name}}</span>
          </div>
        </div>
        <div class="people">
          <div class="header-item">操作人员</div>
          <div class="peo-dowm">
            <div class="icon_people" v-for="(item,index) in stage_operations">
              <div class="peo-left">
                <div v-if="item.isMember">
                  <!--3.wait 的状态 需要选择的那一个-->
                  <!--<div class="default no-oper"-->
                  <!--@click="addPeople(item,index)">-->
                  <!--{{item.supplier_name}}-->
                  <!--</div>-->
                  <div class="default"
                       :class="item | filterClassMember(index,hasRoot)"
                       @click="addPeople(item,index)">
                    {{item.supplier_name}}
                  </div>
                </div>
                <div v-else>
                  <!-- 1.finish 的状态-->
                  <div class="default finsh" v-if="item.status == 'finish'">
                    {{item.supplier_name}}
                  </div>
                  <!--2. 当前操作人 new 深蓝色按钮-->
                  <div class="default new"
                       :class="item | filterClassProcess(index,hasRoot)"
                       @click="addPeople(item,index,true)"
                       v-if="item.status == 'process'">
                    {{item.supplier_name}}
                    <i class="bi" v-show="item.update_supplier"></i>
                  </div>
                  <!--3.wait 的状态 需要选择的那一个-->
                  <!-- :class="[item.supplier_name==null? 'add': 'xz-oper-edit']"-->
                  <div class="default"
                       v-if="item.status == 'wait' && item.isCurrent"
                       :class="item | filterClassWait(index,hasRoot)"
                       @click="addPeople(item,index)">
                    {{item.supplier_name}}
                    <i class="bi" v-show="item.supplier_name==null?false : true"></i>
                  </div>
                  <!--4.wait 的状态 不能选择-->
                  <div class="default add-no" v-if="item.status == 'wait' && item.isCurrent==false">
                    {{item.supplier_name}}
                  </div>
                </div>
                <!--<div class="postion">{{index == stage_operations.length-1 ? '阶段操作者' : '分配者'}}</div>-->
              </div>
              <div class="peo-right" v-if="stage_operations.length!==index+1">
                <img src="../../../assets/images/aduit/arrow.png" alt="">
              </div>
            </div>
          </div>
          <div v-if="showCommitDistribute"
               class="base-btn-blue css_pointer"
               @click="commitDistribute">确定分配</div>
        </div>
      </div>
      <!--过度页面的 选择人状态 end =====================================================================-->
      <div class="main" v-else>
        <!--<div class="main" >-->
        <!-- 根据不同的展示-->
        <div class="gd-box" style="padding-bottom: 0px;border-top: 0px solid #efefef" :class="stage | filterClassBox">
          <div class="title" v-if="stage && stage.category == 'apply'" style="height: 60px">
            <i class="tit-fsbd"></i>
            <span class="describe">{{stage.name}}</span>
          </div>
          <!--显示状态 start ===== -->
          <div class="stage_status" v-if="currentProject.status == 'deny' && hasPresetWork">
            <div class="status bge65">
              <i class="icon-status icon-refuse"></i>
              <span>项目拒绝</span>
            </div>
          </div>

          <div class="stage_status" v-if="currentProject.status == 'stop' && hasPresetWork">
            <div class="status bge65">
              <i class="icon-status icon-wait"></i>
              <span>项目终止</span>
            </div>
          </div>
          <!--显示状态 end   ===== -->
          <div v-if="stage && stage.category == 'apply' && stage.bind_form">
            <div class="fixed" v-if="hasAnswer && canOperation">
              <div class="fixed_button cp" v-if="!fix&&stage.status!='complete'&&hasRoot && canOperation && isAuditsCanOperation">
                <i class="icon icon_fix"></i> <span @click="fixedForm">修改申请表</span>
              </div>
            </div>

            <component v-for="(item,i) in list_form"
                       :key="i"
                       :message="item"
                       :index="i"
                       :is="'p' + item.type"
                       :fix="fix"
                       ref="ref_form"
                       @changeFormDeleteAttchmentsSuccessful="changeFormDeleteAttchmentsSuccessful"
                       :hasAnswer="hasAnswer"></component>
            <div class="view_footer" v-if="showFooter">
              <div class="one" v-if="hasAnswer == false " :class="hasRoot | filterButtonGray">
                <el-button v-if="canOperation"  type="primary" @click="commitForm">提交</el-button>
              </div>
              <div class="two" v-else>
                <span class="form-btn">
                  <el-button v-if="canOperation" type="custom" @click="cancelForm">取消</el-button>
                </span>
                <span class="form-btn-right">
                <el-button v-if="canOperation" type="primary" @click="commitForm">提交</el-button>
              </span>
              </div>
            </div>
          </div>

          <div class="content" style="display: none">
            <p class="fs14 fc5c5">表单名称<span class="fr fc3c8 cp" @click="modify = !modify">修改表单</span></p>
            <p class="grey-border"></p>
            <div class="form-box">
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label="（1）贵公司申请认定前一年内是否发生重大安全、重大质量事故或严重环境违法行为？">
                  <p class="answer" v-show="!modify">
                    否
                  </p>
                  <p class="answer" v-show="modify">
                    <el-radio class="radio" v-model="radio" label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio" label="2">否</el-radio>
                  </p>
                </el-form-item>
                <el-form-item label="（2）贵公司是否建立了开放式的创新创业平台？">
                  <p class="answer" v-show="!modify">
                    是
                  </p>
                  <p class="answer" v-show="modify">
                    <el-radio class="radio" v-model="radio1" label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio1" label="2">否</el-radio>
                  </p>
                </el-form-item>
                <el-form-item label="（3）贵公司是否开展产学研合作，且具备与高校、研究院发生经费往来的凭证？">
                  <p class="answer" v-show="!modify">
                    是
                  </p>
                  <p class="answer" v-show="modify">
                    <el-radio class="radio" v-model="radio2" label="1">是</el-radio>
                    <el-radio class="radio" v-model="radio2" label="2">否</el-radio>
                  </p>
                </el-form-item>
              </el-form>
            </div>

          </div>

        </div>

        <div v-for="(item,index) in tickets">


          <!--发送合同 只有在合同阶段有-->
          <startContract v-if="item.category == 'contract'"
                         :type="item.status"
                         :index="index"
                         :markShowYear="markShowYear"
                         @changeStartContractSendOther="changeStartContractSendOther"
                         @changeStartContractFix="changeStartContractFix"
                         @changeStartContractFixExpress="changeStartContractFixExpress"
                         @changeStartContractFixYear="changeStartContractFixYear"
                         @changeStartContractAddScan="changeStartContractAddScan"
                         @changeStartContractDeleteScan="changeStartContractDeleteScan"
                         @changeStageDelete="changeStageDelete"
                         @changeEventCancelStage="changeEventCancelStage"
                         :ticket="item"></startContract>
          <!--文件确认-->
          <affirmFile v-if="item.category == 'affirm'"
                      :type="item.status"
                      :index="index"
                      @changeAffirmFileSendOther="changeAffirmFileSendOther"
                      @changeStageDelete="changeStageDelete"
                      @changeEventCancelStage="changeEventCancelStage"
                      :ticket="item"></affirmFile>
          <!--&lt;!&ndash;索要文件&ndash;&gt;-->
          <requestFile v-if="item.category == 'demand'"
                       :type="item.status"
                       :index="index"
                       @changeEventInRequestFile="changeEventInRequestFile"
                       @changeEventReStart="changeEventReStart"
                       @changeStageDelete="changeStageDelete"
                       @changeEventCancelStage="changeEventCancelStage"
                       :ticket="item"></requestFile>

          <!--&lt;!&ndash;&lt;!&ndash;发送文件&ndash;&gt;&ndash;&gt;-->
          <sendFile v-if="item.category == 'transmit'"
                    :type="item.status"
                    :ticket="item"
                    :index="index"
                    @changeStageDelete="changeStageDelete"
                    @changeEventCancelStage="changeEventCancelStage"
                    @changeEvent="changeEvent"></sendFile>

          <!--&lt;!&ndash;&lt;!&ndash;通知&ndash;&gt;&ndash;&gt;-->
          <sendNoti v-if="item.category == 'notify'"
                    :type="item.status"
                    :index="index"
                    @changeSendNotiSentOther="changeSendNotiSentOther"
                    @changeStageDelete="changeStageDelete"
                    @changeEventCancelStage="changeEventCancelStage"
                    @changeSendNotiSentMsg="changeSendNotiSentMsg"
                    :ticket="item"></sendNoti>
          <!--&lt;!&ndash;&lt;!&ndash;发送表单&ndash;&gt;&ndash;&gt;-->
          <sendForm v-if="item.category == 'sendform'"
                    :ticket="item"
                    :index="index"
                    :provider_forms="provider_forms"
                    @changeSendFormSentOther="changeSendFormSentOther"
                    @changeSendFormCommit="changeSendFormCommit"
                    @changeStageDelete="changeStageDelete"
                    @changeEventCancelStage="changeEventCancelStage"
                    :type="item.status"></sendForm>
          <!--&lt;!&ndash;支付&ndash;&gt;-->
          <startPay v-if="item.category == 'pay'"
                    :type="item.status"
                    :index="index"
                    @changeStartPaySendOther="changeStartPaySendOther"
                    @changeStageDelete="changeStageDelete"
                    @changeEventCancelStage="changeEventCancelStage"
                    @changeEventPayFix="changeEventPayFix"
                    :ticket="item"></startPay>
        </div>

        <!--没有预设工单的时候展示的提示页面 start==========================   -->
        <div class="no-preset" v-if="!hasPresetWork && stage && stage.tickets">
          <i class="icon_preset"></i>
          <span>本阶段并无预设事项，如果在阶段操作的过程中需要发送事项，你可以通过“创建事项”按钮进行工单类型的选择及事项的创建。</span>
        </div>
        <!--没有预设工单的时候展示的提示页面 end  ==========================   -->

        <div class="operation-apply">
          <div class="item" v-if="showNextStepAll">
            <el-button type="primary" @click="goToAuditFile">开启下一步</el-button>
          </div>

          <!--内审按钮 start ===-->
          <div class="item" style="margin-left: 5px" v-if="showAudit && showAuditApply">
            <!--<div class="item" style="margin-left: 5px">-->
            <el-button type="primary" @click="checkAudit">{{ auditsItem.status | filterNeisheng(stage,userId,canOperation)}}</el-button>
          </div>
          <div class="item" v-if="showAudit && showAuditApply && canOperation ">
            <!--等待发起 -->
            <span class="audit-status" v-if="auditsItem.status == 'wait'">
           <i class="icon icon_ddfq"></i>
          <span>等待发起</span>
        </span>
            <!--审核中 -->


            <span class="audit-status" v-if="auditsItem.status == 'processing'">
           <i class="icon icon_shz"></i>
          <span>审核中</span>
        </span>

            <span class="audit-status" v-if="auditsItem.status == 'reject'">
           <i class="icon icon_jujue"></i>
          <span>审核拒绝</span>
        </span>

            <span class="audit-status" v-if="auditsItem.status == 'pass'">
           <i class="icon icon_pass"></i>
          <span>审核通过</span>
        </span>

          </div>
          <!--内审按钮 end ===-->

          <div class="item" style="float: right" @click="creatPro" v-if="canOperation && hasRoot && showOperationApply">
            <span class="gd-btn"><i class="icon icon_cjsx"></i>创建事项</span>
          </div>
        </div>
        <!--下方展示的 操作人员，下方===========================-->
        <div class="people">
          <div class="header-item">操作人员</div>
          <div class="peo-dowm" v-if="stage_operations_down">
            <div class="icon_people" v-for="(item,index) in stage_operations_down" v-if="stage_operations_down">
              <div class="peo-left">
                <!--3.wait 的状态 需要选择的那一个-->
                <!--<div class="default edit"-->
                <!--:class="[index == stage_operations_down.length -1? 'finsh': 'xz-oper-edit']"-->
                <!--&gt;-->
                <div class="default"
                     :class="item | filterClassOperationDown(index,stage_operations_down,showEditDownOp(item,index))"
                     @click="changeOperationer(item,index)">
                  {{item.supplier_name}}
                  <!--<i class="bi" v-show="index == stage_operations_down.length-1 && stage.operate_leader && stage.status !='complete'"></i>-->
                  <i class="bi" v-show="showEditDownOp(item,index)"></i>
                </div>
                <!--<div class="postion">{{index == stage_operations_down.length -1 ? '阶段操作者' : '分配者'}}</div>-->
              </div>
              <div class="peo-right" v-if="stage_operations_down.length!==index+1">
                <img src="../../../assets/images/aduit/arrow.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="record">
          <div class="header-item">操作记录</div>
          <template v-if="stage.stage_logs && stage.stage_logs.length >0">
            <div class="scroll-beauty " :class="{'scroll-hidden':isScrollHide}" @mouseenter="scrollShow" @mouseleave="scrollHide">
            <div class="cover-box">
            <div v-for="item in stage.stage_logs" class="re-item">
              <div class="text_noaml">{{item.created_at | formatDate}}</div>
              <div class="text_noaml">{{item.operate_name | formatName}}</div>
              <div class="text_noaml">{{item.content}}</div>
            </div>
            </div>
            </div>
          </template>
          <p class="not-upload" v-else>
            <i class="icon-notup"></i>
            <span>暂无操作记录</span>
          </p>
        </div>
        <!--弹窗创建事项 start -->
        <el-dialog
          title="创建事项"
          :visible.sync="dialogCreatPro"
          size="tiny">
          <div class="creat-pro">
            <div class="text-nomal">请选择需要创建的事项类型：</div>
            <span v-if="currentProject.source=='online'" :class="{'gd-btn':!changeClass[0].btnActive,'choose-btn':changeClass[0].btnActive}"
                  @click="addWork(0)">
            <i class="icon" :class="{'sywj-icon':!changeClass[0].btnActive,'sywj-icon2':changeClass[0].btnActive}"></i>索要文件</span>
            <span v-if="currentProject.source=='online'" :class="{'gd-btn':!changeClass[1].btnActive,'choose-btn':changeClass[1].btnActive}"
                  @click="addWork(1)">
            <i class="icon" :class="{'qrwj-icon':!changeClass[1].btnActive,'qrwj-icon2':changeClass[1].btnActive}"></i>确认文件</span>
            <span v-if="currentProject.source=='online'" :class="{'gd-btn':!changeClass[2].btnActive,'choose-btn':changeClass[2].btnActive}"
                  @click="addWork(2)">
            <i class="icon" :class="{'fswj-icon':!changeClass[2].btnActive,'fswj-icon2':changeClass[2].btnActive}"></i>发送文件</span>

            <span v-if="currentProject.source=='online'" :class="{'gd-btn':!changeClass[3].btnActive,'choose-btn':changeClass[3].btnActive}" @click="addWork(3)">
              <i class="icon " :class="{'fqht-icon':!changeClass[3].btnActive,'fqht-icon2':changeClass[3].btnActive}"></i>发起合同</span>

            <span :class="{'gd-btn':!changeClass[4].btnActive,'choose-btn':changeClass[4].btnActive}" @click="addWork(4)">
              <i class="icon " :class="{'fstz-icon':!changeClass[4].btnActive,'fstz-icon2':changeClass[4].btnActive}"></i>{{currentProject | filterTextCreatWork(4)}}</span>
            <span :class="{'gd-btn':!changeClass[5].btnActive,'choose-btn':changeClass[5].btnActive}" @click="addWork(5)">
              <i class="icon " :class="{'fsbd-icon':!changeClass[5].btnActive,'fsbd-icon2':changeClass[5].btnActive}"></i>{{currentProject | filterTextCreatWork(5)}}</span>
            <span :class="{'gd-btn':!changeClass[6].btnActive,'choose-btn':changeClass[6].btnActive}" @click="addWork(6)">
              <i class="icon " :class="{'fqzf-icon':!changeClass[6].btnActive,'fqzf-icon2':changeClass[6].btnActive}"></i>发起支付</span>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogCreatPro = false">取 消</el-button>
    <el-button type="primary" @click="commitCreatPro">确 定</el-button>
  </span>
        </el-dialog>

        <!--弹窗创建事项 end -->
      </div>
      <!--弹框-->
      <!--弹框选人-->
      <!--<div v-if="stage_operations">-->
      <el-dialog title="选择人员" :visible.sync="markChoosePeople">
        <el-table
          ref="singleTable"
          :data="listOpenation"
          highlight-current-row
          height=356
        @current-change="handleCurrentChange"
        @row-click="handleRowChange"
        style="width: 100%">
        <el-table-column
          property="nameShow"
          label="角色或人员">
        </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button @click="markChoosePeople = false">取 消</el-button>
    <el-button type="primary" @click="clickChoosePeople">确 定</el-button>
  </span>
      </el-dialog>
      <!--</div>-->
      <!--弹层的展示 error-->
      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisibleNext"
        size="tiny"
      >
        <template v-if="listErrorNext.length > 0">
          <p v-for="(item,index) in listErrorNext">{{item | filterErrorMsg(errorNextMsg)}}</p>
        </template>
        <!--<p v-if="listErrorNext.length > 0" v-for="(item,index) in listErrorNext">{{item | filterErrorMsg(errorNextMsg)}}</p>-->
        <p v-else>请求失败</p>
        <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="confirmError">确 定</el-button>
  </span>
      </el-dialog>

    </div>

  </div>


</template>
<script>
  import API from 'API/api'
  import requestFile from 'components/project/work/requestFile.vue'
  import affirmFile from 'components/project/work/affirmFile.vue'
  import sendFile from 'components/project/work/sendFile.vue'
  import startContract from 'components/project/work/startContract.vue'
  import sendNoti from 'components/project/work/sendNoti.vue'
  import sendForm from 'components/project/work/sendForm.vue'
  import startPay  from 'components/project/work/startPay.vue'


  import pchartinput  from 'components/project/form/input.vue'     // 单行文本
  import pcharttextarea  from 'components/project/form/textarea.vue'  // 多行文本
  import pchartradio  from 'components/project/form/radio.vue'     // 单选
  import pchartcheckbox  from 'components/project/form/checkbox.vue'  // 复选
  import pchartupload  from 'components/project/form/upload.vue'    // 上传文件
  import pchartdate  from 'components/project/form/date.vue'      // 时间段
  import pcharttime  from 'components/project/form/time.vue'      // 时间 (单点)





  import {mapGetters} from 'vuex'
  import {formatDate,currency,filterButtonGray} from 'assets/js/filter'

  export default{
    components:{
      requestFile,affirmFile,sendFile,startContract,sendNoti,sendForm,startPay,pchartinput,pcharttextarea,pchartradio,pchartcheckbox,pchartupload,pchartdate,pcharttime
    },
    created(){
      this.$http.get(API.serviceurl+'service_categories').then((res)=>{
        var resBody=res.body;
        this.service_categories = resBody.service_categories
      }).catch()
    },
    watch: {
      "$route": "fetchDate",
      currentProject(old_value,new_value){
        if(new_value.status == 'deny' || new_value.status == 'stop'){
          this.fix = false;
        }
      }
    },
    computed:{
      ...mapGetters(["stepName","currentProject","userId","currentUser","hasJumpInApply","yearChange"]),
      markShowYear(){
        if(!this.isEmpty(this.stage.op_settings) && !this.isEmpty(this.stage.op_settings.year)&&this.stage.op_settings.year) return true;
        return false;
      },
      //此阶段是否有预设工单  有 true 没有 false
      hasPresetWork(){
        var mark = true; // 默认是有的
        if(this.stage.category != 'apply'){
          if(this.tickets.length<1) mark = false;
        }
        return mark;
      },
      hasRoot(){
        if(this.userId == this.stage.operate_id){
          this.$store.dispatch('sendHasRoot',true);
          return true;
        }else {
          this.$store.dispatch('sendHasRoot',false);
          return false;
        }
      },
      // 显示下一步 ，只有在第一个项目中会做判断
      showNextStep(){
        if(this.stage.category == 'apply'){
          if(this.fix == false && this.hasAnswer){
            return true;
          }else {
            return false;
          }
        }else {
          return true
        }
      },
      //显示下一步判断，总的
      showNextStepAll(){
        if(this.showOperationApply && this.showNextStep && this.canOperation && this.hasRoot && this.showContract && this.payFinished && this.auditControlNextStep && this.hasYear) return true;
        return false;
      },
      //显示 确认分配
      showCommitDistribute(){
        var mark = false;
        if(this.hasRoot) return true;
        this.stage.stage_operations.forEach(function (item,index) {
          if(item.update_supplier) mark = true;
        })
        return mark;
      },
      // 通过内审的状态，判断申请表是否可以修改 true 可以修改，false 不可以修改
      isAuditsCanOperation(){
        if(this.auditsItem.status == 'pass' || this.auditsItem.status == 'processing') return false;
        else  return true;
      },
      //当前操作人是否是主管
      //1.如果是主管，那么就不用管审核，直接显示下一步，不用考虑审核是否通过
//      isSupervisor(){
//        var mark = false;
//        if(this.currentUser.position.indexOf('主管') >= 0)  mark = true;
//        return mark;
//      },
      // 控制是否 显示内省
      showAudit(){
        var mark = false;
//        if(this.isSupervisor) return false; //如果是主管，那么直接不用显示
        if(!this.isEmpty(this.stage.op_settings) && !this.isEmpty(this.stage.op_settings.audit) && this.stage.op_settings.audit) { // 有内省
          mark = true;
        }
        return mark;
      },
      //只是在服务申请里面加了 内审
      showAuditApply(){
        if(this.stage.category == 'apply') { //服务申请
          if(!this.hasAnswer) return false;
        }
        return true;
      },
      //内审方面 控制 下一步的显示逻辑
      //1. 如果是 主管，直接显示
      //2. 如果没有内省，直接显示
      //3. 如果有内省，必须是完成之后 才显示下一步
      auditControlNextStep(){
        // 1. 是主管
//        if(this.currentUser.position.indexOf('主管') >= 0)  return true;
        // 2. 有没有内省
        if(!this.isEmpty(this.stage.op_settings) && !this.isEmpty(this.stage.op_settings.audit) && this.stage.op_settings.audit) { // 有内省
          if(this.auditsItem.status == 'pass'){
            return true;
          }else {
            return false;
          }
        }else { // 没有内审
          return true;
        }
      },
      // 人员分配
      stage_operations(){
        var item = undefined;
        if(!this.isEmpty(this.stage.stage_operations)&&this.stage.stage_operations.length>0 ){
          item = this.stage.stage_operations;
          for(var i=0;i<item.length;i++){
            var obj = item[i];
            //1. 配置 isCurrent
            obj.isCurrent = false;
            if(i>0){
              var last_obj = item[i-1];//上一个
              if(last_obj.status == 'process')obj.isCurrent = true;
            }
            //2.配置 supplier_id 和 supplier_name 只有在 固定人员的时候  是否是 member
            obj.isMember = false;

//            if(!this.isEmpty(obj.operation_setting)){
//              if(obj.operation_setting.category == 'member'){
//                obj.supplier_id = obj.operation_setting.user_id;
//                obj.supplier_name = obj.operation_setting.user;
//                obj.isMember = true;
//              }
//            }

            // 修改结构之后的
            if(obj.category == 'member'){
              obj.supplier_id = obj.user_id;
              obj.supplier_name = obj.user;
              obj.isMember = true;
            }

          }
        }
        return item;
      },
      stage_operations_down(){
        var item = undefined;
        if(!this.isEmpty(this.stage.stage_operations)&&this.stage.stage_operations.length>0 ){
          item = this.stage.stage_operations;
          for(var i=0;i<item.length;i++){
            var obj = item[i];
            //1. 配置 isCurrent
            obj.isCurrent = false;
            if(i>0){
              var last_obj = item[i-1];//上一个
              if(last_obj.status == 'process')obj.isCurrent = true;
            }
            //2.配置 supplier_id 和 supplier_name 只有在 固定人员的时候  是否是 member
            obj.isMember = false;

//            if(!this.isEmpty(obj.operation_setting)){
//              if(obj.operation_setting.category == 'member'){
//                obj.supplier_id = obj.operation_setting.user_id;
//                obj.supplier_name = obj.operation_setting.user;
//                obj.isMember = true;
//              }
//            }
            // 修改结构之后的
            if(obj.category == 'member'){
              obj.supplier_id = obj.user_id;
              obj.supplier_name = obj.user;
              obj.isMember = true;
            }
            // 如果是最后一个 那么就将 最后一个的名字换掉
            if(i == item.length-1){
              obj.supplier_name = this.stage.operate_name;
            }
          }
        }

        //只有一个的情况下
        if(!this.isEmpty(this.stage.stage_operations) &&this.stage.stage_operations.length==0  ){
          item = [];
          var obj = {};
          obj.supplier_name = this.stage.operate_name;
          item.push(obj);
        }
        return item;
      },
      //内省
      auditsItem(){
        if(!this.isEmpty(this.stage.audits)&& this.stage.audits.length>0){
          //有内省
          var lastMark = this.stage.audits[this.stage.audits.length-1];
          return  lastMark;
        }else {
          return{status:"hh"};
        }
      },
      cancelFix(){
        this.fix = false;
      },
      //显示 下面的 button
      showFooter(){
        if(this.hasAnswer){ //有答案
          if(this.fix){ //修改中
            return true;
          }else {
            return false;
          }
        }else { //没有答案
          return true;
        }
      },
      // 控制 创建事项 与 开启下一步是否显示
      showOperationApply(){
        // 分服务申请 与 其他
        if(this.stage.category == 'apply'){ //服务申请
          //在审核状态 并且 fix == false
          if(this.stage.status == 'process' && this.fix == false && this.hasAnswer){
            return true;
          }else {
            return false;
          }
        }else { //不是服务申请
          if(this.stage.status == 'process'){
            return true;
          }else {
            return false;
          }
        }
      },
      //是否可以操作
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      // 如果是合同阶段 (需要判断，所有的合同都要是 完成才能返回true )
      showContract(){
        // 如果是线下项目 直接返回 true
        if(this.currentProject.source=='offline'){
          return true;
        }

        if(this.stage.category == 'contract'){
          var mark = true;
          this.stage.tickets.forEach(function (item,index) {
            if(item.category == 'contract'){
              if(item.status != 'three'){
                mark = false;
              }
            }
          })
          if(mark == false){
            return false;
          }
        }
        return true;
      },
      // 开启下个阶段 必须 检查里面所有的 支付是否是 完成状态
      payFinished(){
        var mark = true;
        this.stage.tickets.forEach(function (item,index) {
          if(item.category == 'pay'){
            if(item.status != 'three'){
              mark = false;
            }
          }
        });
        return mark;
      }
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      filterButtonGray(hasRoot){
        return filterButtonGray(hasRoot)
      },
      formatName(name){
        var str = '--';
        if(name != undefined && name != null && name.length>0) str = name;
        return str;
      },
      filterNeisheng(val,stage,userId,canOperation){
        // 如果项目关闭(不包括结束，只有关闭) ==> 查看内审
        if(!canOperation) return '查看内审';
        if(val == 'pass'){
          return '查看内审';
        }else { // 内审在进行中
          // 1. 如果是当前操作人 == 当前登录的用户  ==> 发起内审
          // 2. 如果 下一个需要 操作人员  == 当前登录的用户  ===> 进行内审
          // 3.   出了以上的情况  === > 查看内审
          var str = '';
          var current_audit = null;
          if(stage == undefined || stage == null) return '';
          //下一步需要操作的内审 人员 为：
          var item =  stage.audits[stage.audits.length-1];
          item.steps.forEach(function (item_st,index_st) {
            if(item_st.status == 'processing') current_audit = item_st;
          })
          if(current_audit == undefined && current_audit == null){ // 如果不存在，那么说明 还没有开启,
            // 如果登录人与当前操作人 一致
            if(stage.operate_id == userId){
              str = '发起内审';
            }else {
              str = '查看内审';
            }
          }else {
            // 查看当前 内审的人是不是 当前登录的人
            if(current_audit.supplier_id == userId){
              str = '进行内审';
            }else {
              str = '查看内审';
            }
          }
          return str;
        }
      },
      filterOperation(val){
        if(val == undefined && val == null){
          return "选择人员";
        }else {
          return val.operation_setting.user_or_role_name;
        }
      },
      filterOperationName(val){
        // 固定人员 自己填上去
        if(val.operation_setting.category == "member"){
          return val.operation_setting.user_or_role_name;
        }else {
          if(val.supplier_name != null){
            return val.supplier_name;
          }else {
            return "";
          }
        }
      },
      filterOperationPostion(index,array){
      },
      filterState(state){
        if(state.status == 'deny'){
          return '项目拒绝';
        }else {
          return '已经完成'
        }
      },
      // 样式
      filterClassOperationDown(val,index,list,isShowPointer){
        if(list.length == 0  && index == 0){  return 'edit';}
        else {
          var css_ = '';
          if(index == list.length-1){
            css_ = 'edit';
          }else {
            css_ = 'finsh';
          }
          if(isShowPointer) css_ += ' css_pointer';
          return css_;
        }
      },
      filterClassWait(val,index,hasRoot){
        if(!hasRoot){
          return 'add-no';
        }
        var cal = val.supplier_name==null? 'add': 'xz-oper-edit';
        return cal;
      },
      filterClassProcess(val,index,hasRoot){
        if(val.update_supplier) return 'css_pointer';
        return '';
      },
      filterClassMember(val,index,hasRoot){
        if(val.status == 'process'){
          return 'new'
        }else {
          return 'finsh'
        }
      },
      filterClassOperateBottom(val){
        if(val.operate_complete == false) return 'operation-complete-false';
        else return  '';
      },
      // gd-box 在合同阶段 上部样式的变化
      filterClassBox(stage){
        var cal ='';
        if(stage.category == 'apply'){

        }else {
          cal= 'gd-box-contract'
        }
        return cal;
      },
      filterErrorMsg(val,errorNextMsg){
        if(errorNextMsg == undefined || errorNextMsg == null || errorNextMsg.length<1)errorNextMsg = '请先上传合同扫描件';
        return val + ' - '+ errorNextMsg;
      },
      filterTextCreatWork(val,type){
        switch (type){
          case 4:{
            if(val.source=='online') return '发送通知';
            else return '通知企业'
          }
            break;
          case 5:{
            if(val.source=='online') return '发送表单';
            else return '填写申请表'
          }
            break;
        }
      },
    },
    mounted(){
      // 观察传进来的值是哪个  项目id 阶段的 id
      this.project_id = this.$route.params.id;
      this.state_id = this.$route.params.state_id;
      this.getRightDetail(this.project_id,this.state_id);
      var that = this;
      this.netFormList();
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if(from.name == 'toDoList' || from.name == 'messageList') vm.$store.dispatch('sendHasJumpInApply',false);
        else vm.$store.dispatch('sendHasJumpInApply',true);

        if(from.name == 'auditForm' || from.name == 'auditFile') vm.$store.dispatch('sendHasJumpInApply',true);
      })
    },
    // 只要视图更新，那么便会执行方法
    updated(){
      if( this.hasJumpInApply) return;
      // 若 内审展示 && 当前人 可以在内审中操作，那么直接进入内审
      if(this.showAudit && this.showAuditApply && this.canOperation && !this.isEmpty(this.stage)){ // 内审展示出来了
        if(this.auditsItem.status != 'pass'){ //内省没有结束
          // 1. 下一步内审的操作人员为
          var current_audit = null;
          var item =  this.stage.audits[this.stage.audits.length-1];
          item.steps.forEach(function (item_st,index_st) {
            if(item_st.status == 'processing') current_audit = item_st;
          })
          if(!this.isEmpty(current_audit)){ // 只有进行内审才会 自己进入
            if(current_audit.supplier_id == this.userId){ //进行内审
              this.checkAudit();
            }
          }
        }
      }
    },
    data(){
      return {
        // 文件上传的 ids
        changeCurrentPeople:false,//点击变更当前操作人
        dialogVisibleNext:false,
        listErrorNext:[],
        errorNextMsg:'',
        form_answer_copy:null,
        currentPeopleIndex:-100,
        listOpenation:[],
        currentOperation:null,
        currentRow: null,
        markChoosePeople:false,
        hasAnswer:false, // 有没有答案 默认是没有答案的
        strSheng:"",
        hasYear:true,
        fix:false,
        loadingMark:false,
        project_id:-100, // 项目id
        state_id:-100,   // 阶段id
        // 右侧初始化值
        stage:{
        },
        list_form:[],
        labelPosition: 'top',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        radio: '',
        radio1: '',
        radio2: '',
        modify:false,//修改表单
        dialogCreatPro:false,
        currentWork:"",
        currentWorkTitle:"",
        // 所有的工单,包括之前 网络请求来的 和 新加的
        tickets: [],
        //样式切换
        changeClass:[
          {btnActive:false},
          {btnActive:false},
          {btnActive:false},
          {btnActive:false},
          {btnActive:false},
          {btnActive:false},
          {btnActive:false},
        ],
        provider_forms:[],
        isScrollHide:true,//操作记录的滚动条
      };
    },
    methods:{
      //计算是否有年份
      dealWithHasYear(){
        var mark_back = true;
        if(this.stage.category == 'contract' && this.markShowYear){
          var item_ticket = null;
          if(this.stage.tickets.length>0) item_ticket = this.stage.tickets[0];
          if(!this.isEmpty(item_ticket)) {
            if(!this.isEmpty(item_ticket.year) && item_ticket.year>0) mark_back = true;
            else mark_back = false;
          }
        }
        return mark_back;
      },

      //操作人员 下面部分 是否显示 笔
      showEditDownOp(item,index){
        if(this.stage.status != 'process') return false;
        if(this.stage_operations_down.length-1 != index) return false;
        if(this.stage.update_operate) return true;
        return false;
      },
      confirmError(){
        this.dialogVisibleNext = false;
        this.listErrorNext = [];
        this.errorNextMsg = '';
      },
      // 监听 子组件的 事件
      // sendForm 点击提交
      changeSendFormCommit(type,index,ticket,list_form){
        //网络请求 发送文件
        this.netSendFormCommitAnswer(ticket,list_form);
      },
      // 发送表单
      changeSendFormSentOther(type,index,ticket){
        if(!this.isEmpty(ticket.is_new) && ticket.is_new){
          this.netCreatTicket(ticket);
        }else{
          this.netSendForm(ticket);
        }
        //网络请求 发送文件
      },
      // 支付---发送给对方
      changeStartPaySendOther(type,index,ticket){
        if(ticket.status == 'zero'){ //新的创建的
          this.netCreatTicket(ticket);
        }else {
          //网络请求 发送文件
          this.netSendPay(ticket);
        }
      },
      // 支付，修改金额
      changeEventPayFix(type,index,ticket){
        this.netFixPay(ticket);
      },

      // 发送文件 分为新建 和 预设
      changeEvent(type,index,ticket){
        //网络请求 发送文件
        if(ticket.status == 'zero'){ //创建索要文件，进入netCreat
          this.netCreatTicket(ticket);
        }else {
          this.sendFileInTicket(ticket);
        }
      },
      //索要文件 发送给对方
      changeEventInRequestFile(type,index,ticket){
        if(ticket.status == 'zero'){ //创建索要文件，进入netCreat
          this.netCreatTicket(ticket);
        }else {
          this.requestFileSupporOrReject(ticket);
        }
      },
      //创建新的 发送文件，发送给对方
      changeAffirmFileSendOther(type,index,ticket){

        if(ticket.status == 'zero'){
          this.netCreatTicket(ticket);  // 新建的
        }else {
          this.netAffirmFileSendOther(ticket);
        }
      },
      // 发起合同草案
      changeStartContractSendOther(type,index,ticket){
        if(!this.isEmpty(ticket.is_new) && ticket.is_new){
          this.netCreatTicket(ticket);
        }else {
          //此处逻辑：
          // 1. 第一次为发送给对方 （type = one ,需要 做两个请求 1.发附件 2.发起合同草案的接口）
          // 2. 如果type 为 two 那么只需要调用 附件的接口
          if(ticket.status == 'one'){ //预设工单
            //需要判断 有没有文件
            if(ticket.contract_attachments.length <1 && ticket.listAttachmentsId<1){
              this.showMessage("warning","请添加您要上传的附件");
              return;
            }
            if(ticket.listAttachmentsId.length > 0){ //有新上传的
              //预设的工单需要判断有没有新传的
              this.netSendContrac(ticket);  //此请求里面包含 netFixContrac (在one的请求下)
            }else {
              this.netFixContrac(ticket);  //预设的直接发送就好了
            }
          }
          else if(ticket.status == 'two'){
            this.netSendContrac(ticket);
          }
        }
      },
      // 修改合同草案
      changeStartContractFix(type,index,ticket){
        this.netFixContrac(ticket);
      },
      // 修改 与 增加 快递信息
      changeStartContractFixExpress(type,index,ticket){
        this.netFixContracExpress(ticket);
      },
      //fix year of message
      changeStartContractFixYear(type,index,ticket){
        this.netFixContracYear(ticket);
      },

      // 增加合同的扫描件(上传)
      changeStartContractAddScan(type,index,ticket){
        var parm = {};
        parm.attachments = [];
        parm.category = 'scan_contract';
        if(this.isEmpty(ticket.listScanId) ||ticket.listScanId.length<1){
          this.showMessage("warning","请选择上传的扫描件");
          return;
        }
        ticket.listScanId.forEach(function (item,index) {parm.attachments.push({id:item}); })
        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/contract_file",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        });
      },

      //删除当前 新建的 工单
      changeEventCancelStage(type,index,ticket){
        this.tickets.splice(index,1);
      },
      //删除 扫描件
      changeStartContractDeleteScan(type,index,ticket,file){
        if(this.isEmpty(file) || this.isEmpty(file.id) || file.id <0 ){
          this.showMessage("warning","需要删除的附件不存在");
          return;
        }
        this.netDeleteAttachments(file.id);
      },
      //删除附件，包括工单中的所有的 附件 和 扫描件
      // DELETE /v1/supplier/attachments/{id} 删除附件
      netDeleteAttachments(file_id){
        if(this.isEmpty(file_id) || file_id <0 ){
          this.showMessage("warning","需要删除的附件不存在");
          return;
        }

        this.showLoading();
        this.$http.delete(API.serviceurl + 'supplier/attachments/'+file_id,
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        });
      },
      // 文件删除成功，需要把copy的重新复制一遍
      changeFormDeleteAttchmentsSuccessful(file){
        if(this.fix){
          var mark = -100;
          this.stage.bind_form.form_answer.attachments.forEach(function (item,index) {
            if(item.id == file.id) mark = index;
          })
          if (mark >= 0) {
            this.stage.bind_form.form_answer.attachments.splice(mark,1);
          }
          var content =  this.form_answer_copy[file.index];
          mark = -100;
          content.answer.attachments.forEach(function (item,index) {
            if(item.id == file.id) mark = index;
          })
          if (mark >= 0) {
            content.answer.attachments.splice(mark,1);
          }
        }
      },
      //删除表单 附件 DELETE /v1/supplier/form_answers_attachments/{id}
      netDeleteFormAnswersAttachments(file_id){
        if(this.isEmpty(file_id) || file_id <0 ){
          this.showMessage("warning","需要删除的附件不存在");
          return;
        }
        this.$http.delete(API.serviceurl + 'supplier/form_answers_attachments/'+file_id,
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        });
      },

      // 通知 发送给对方
      changeSendNotiSentOther(type,index,ticket){
        if(ticket.status == 'zero'){ //如果是创建新的话，那么就创建
          this.netCreatTicket(ticket);
        }else{
          this.sendToOtherInSendNoti(ticket);
        }
      },
      // 通知，发送短信给对方
      // POST /v1/supplier/stages/{stage_id}/tickets/{id}/message 发送通知给企业
      changeSendNotiSentMsg(type,index,ticket){
        if(this.isEmpty(ticket.id) || ticket.id<0){
          this.showMessage("warning","该工单不存在");
          return;
        }
        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/message"
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      // 撤销当前事项
      changeStageDelete(type,index,ticket){
        this.netDeleteCurrentStage(ticket);
      },
      // 工单中，删除当前事项

      //重新发起工单
      changeEventReStart(type,index,ticket){
        this.reCreatTicketOfRequestFile(ticket);
      },
      // 点击增加换人员
      addPeople(item,index,changeCurrentPeople){
        this.changeCurrentPeople = false;
        if(!this.isEmpty(changeCurrentPeople)  && changeCurrentPeople){ //点击选择当前的操作者
          if(!item.update_supplier) return ;
        }else {
          if(!this.hasRoot) return ;
        }
        if(!this.isEmpty(changeCurrentPeople)) this.changeCurrentPeople = changeCurrentPeople;
        this.currentPeopleIndex = index;
        //修改之后，结构有变化
        if(item.category == 'member'){
          //弹框
        }else if(item.category == 'leader'){ //领导
          this.currentPeopleIndex = index;
          this.markChoosePeople = true;
          this.listOpenation = [];
          this.getLeaders();
        }else if(item.category == 'underling'){ //下属
          this.currentPeopleIndex = index;
          this.listOpenation = [];
          this.getUnderling();
        }else if(item.category == 'descendant'){ //下属(全部)
          this.currentPeopleIndex = index;
          this.listOpenation = [];
          this.getUnderlingAll();
        }else if(item.category == 'role'){ //角色
          this.currentPeopleIndex = index;
          this.listOpenation = [];
          var department_id = item.department_id;
          var role_id = item.role_id;
          this.getRole(department_id,role_id);
        }
      },
      handleCurrentChange(currentRow, oldCurrentRow){
      },
      clickChoosePeople(){
        this.markChoosePeople = false;
        if(this.stage.operate_complete){ //阶段操作人选择已经完成，下面的操作
          this.netChangeOpeartioner(this.currentOperation.id);
        }else { //阶段操作人 选择的过程中
          var item = this.stage_operations[this.currentPeopleIndex];
          if(!item.hasOwnProperty('supplier_id_or')) item.supplier_id_or = item.supplier_id
          item.supplier_id = this.currentOperation.id;
          item.supplier_name = this.currentOperation.name;
        }
      },
      handleRowChange(row, event, column){
        this.currentOperation = row;
      },
      fetchDate(){
        this.project_id = this.$route.params.id;
        this.state_id = this.$route.params.state_id;
        this.getRightDetail(this.project_id,this.state_id);
      },
      //网络请求 start ====================================================================================

      // GET /v1/supplier/stages/{stage_id}/tickets/precreate_pay 判断是否可以临时支付工单
      netPrecreatePay(){
        this.listErrorNext = [];
        this.errorNextMsg = '';
//        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/precreate_pay",
        ).then((res) => {
          this.hiddenLoading();
          this.creatNewWork();
//          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
//          this.showMessage("warning","请求失败");
          this.hiddenLoading();
          if(!this.isEmpty(error.body.data)){
            this.listErrorNext = error.body.data;
          }
          if(!this.isEmpty(error.body.details)){
            this.errorNextMsg = error.body.details;
          }
          this.dialogVisibleNext = true;
        })
      },
      // 创建一个新的工单(分不同的工单类型)  不是重新发起,而是全新的
      // POST /v1/supplier/stages/{stage_id}/tickets
      netCreatTicket(ticket){
        this.listErrorNext = [];
        this.errorNextMsg = '';
        if(this.isEmpty(ticket.title) ||this.isEmpty(ticket.content) || ticket.title.length<1){
          this.showMessage("warning","请检查标题或内容");
          return;
        }
        // 发送通知的时候，需要验证content
        if(ticket.content.length<1 && ticket.category == "notify"){
          this.showMessage("warning","请检查标题或内容");
          return;
        }

        var parm = {ticket:{}};
        parm.ticket.category = ticket.category


        if(!this.isEmpty(ticket.is_new) && ticket.is_new){parm.ticket.temporary = true;}
        else {parm.ticket.temporary = false;}

        parm.ticket.title = ticket.title;
        parm.ticket.content = ticket.content;
        parm.ticket.attachments = [];
        if(ticket.category == "affirm"){ //索要文件
          parm.ticket.affirm_file_type = ticket.affirm_file_type;
          if(ticket.affirm_file_type == 'folder'){
            ticket.attachments.forEach(function (item,index) {
              parm.ticket.attachments.push({id:item.id})
            })
          }else if(ticket.affirm_file_type == 'upload'){
            ticket.listAttachmentsId.forEach(function (item,index) {
              parm.ticket.attachments.push({id:item})
            })
          }else {
            this.showMessage("warning","请检查上传的文件");
          }
        }
        else if(ticket.category == "pay"){ //发起支付，创建工单
          parm.ticket.fee_type = ticket.fee_type;
          if(!this.isNumberIntGol(ticket.fee_value)){
            this.showMessage("warning","请检查实际费用，具体金额用数字填写");
            return;
          }
          parm.ticket.fee_value = ticket.fee_value;
        }
        else if(ticket.category == "transmit"){ //发送文件
          if(ticket.listAttachmentsId.length<1){
            this.showMessage("warning","请上传文件");
            return;
          }
          ticket.listAttachmentsId.forEach(function (item,index) {
            parm.ticket.attachments.push({id:item})
          })
        }
        else if(ticket.category == "contract"){ //创建合同
          if(ticket.listAttachmentsId.length<1){
            this.showMessage("warning","请上传文件");
            return;
          }
          ticket.listAttachmentsId.forEach(function (item,index) {
            parm.ticket.attachments.push({id:item})
          })
        }
        else if(ticket.category == "sendform"){ //发送文件
          if(this.isEmpty(ticket.bind_form) || this.isEmpty(ticket.bind_form.provider_form_id) || ticket.bind_form.provider_form_id <0){
            this.showMessage("warning","请检查您的附件");
            return;
          }else {
            parm.ticket.provider_form_id = ticket.bind_form.provider_form_id;
          }
        }
        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.hiddenLoading();
          if(ticket.category == 'pay'){
            if(!this.isEmpty(error.body.data)){
              this.listErrorNext = error.body.data;
            }
            if(!this.isEmpty(error.body.details)){
              this.errorNextMsg = error.body.details;
            }
            this.dialogVisibleNext = true;
          }else {
            this.showMessage("warning","请求失败");
          }
        })
      },

      // 重新发起 索要文件请求 (重新发起)
      // POST /v1/supplier/stages/{stage_id}/tickets
      reCreatTicketOfRequestFile(ticket){
        if(this.isEmpty(ticket.title) ||ticket.title.length<1){
          this.showMessage("warning","标题不存在");
          return;
        }
        var parm = {ticket:{}};
        parm.ticket.category = 'demand';
        parm.ticket.temporary = true;
        if(!this.isEmpty(ticket.temporary) && ticket.temporary == false)  parm.ticket.temporary = false;
        parm.ticket.title = ticket.title;
        parm.ticket.content = ticket.content;
        parm.ticket.ticket_id = ticket.id;

        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // 索要文件 通过决绝 接口  PUT /v1/supplier/stages/{stage_id}/tickets/{id}/demand
      requestFileSupporOrReject(ticket){
        if(this.isEmpty(ticket.support_or_reject) ||ticket.support_or_reject.length <1 ){
          this.showMessage("warning","请选择通过或拒绝");
          return;
        }

        if(ticket.support_or_reject == 'reject'){
          if(this.isEmpty(ticket.reject_type) ||ticket.reject_type.length <1 ){
            this.showMessage("warning","请选择拒绝理由");
            return;
          }
        }
        var parm = {};
        parm.type = ticket.support_or_reject;
        parm.reject_type = ticket.reject_type;
        parm.note = ticket.note;

        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/demand",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      // 文件确认 ================= 发送给对方
      // PUT /v1/supplier/stages/{stage_id}/tickets/{id}/affirm 文件确认工单-发送给对方
      netAffirmFileSendOther(ticket){
        if(this.isEmpty(ticket.title) ||this.isEmpty(ticket.content)){
          this.showMessage("warning","标题和内容不存在");
          return;
        }
        var parm = {};
        parm.affirm_file_type = ticket.affirm_file_type;
        parm.attachments = [];
        if(ticket.affirm_file_type == 'folder'){
          if( ticket.attachments.length<1) { this.showMessage("warning","请检查上传的文件"); return;}
          ticket.attachments.forEach(function (item,index) {
            parm.attachments.push({id:item.id});
          })
        }else if(ticket.affirm_file_type == 'upload'){
          if( ticket.listAttachmentsId.length<1) { this.showMessage("warning","请检查上传的文件"); return;}
          ticket.listAttachmentsId.forEach(function (item,index) {
            parm.attachments.push({id:item});
          })
        }else {
          this.showMessage("warning","请检查上传的文件");
        }
        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/affirm",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      //工单中发送网络 sendForm 组件中 发送表单
      //patch /v1/supplier/stages/{stage_id}/tickets/{id}/start_form    发起表单
      netSendForm(ticket){
        var parm = {};
        if(this.isEmpty(ticket.bind_form) || this.isEmpty( ticket.bind_form.provider_form_id) || ticket.bind_form.provider_form_id<0){
          this.showMessage("warning","您未绑定表单");
          return;
        }
        parm.provider_form_id = ticket.bind_form.provider_form_id;
        this.showLoading();
        this.$http.patch(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/start_form",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      // 支付中  发送给对方的网络请求
      // PATCH /v1/supplier/stages/{stage_id}/tickets/{id}/start_pay 发起支付 附带金额填写和注释
      netSendPay(ticket){
        this.listErrorNext = [];
        this.errorNextMsg = '';
        var parm = {};

        if(!this.isNumberIntGol(ticket.fee_value)){
          this.showMessage("warning","请检查实际费用，具体金额用数字填写");
          return;
        }

//        if(this.isEmpty(ticket.fee_value) || ticket.fee_value <0 ){
//          this.showMessage("warning","请检查实际费用，具体金额用数字填写");
//          return;
//        }

        parm.content = ticket.content; //内容
        parm.fee_value = ticket.fee_value; //金额
        this.showLoading();

        this.$http.patch(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/start_pay",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.hiddenLoading();
          if(!this.isEmpty(error.body.data)){
            this.listErrorNext = error.body.data;
          }
          if(!this.isEmpty(error.body.details)){
            this.errorNextMsg = error.body.details;
          }
          this.dialogVisibleNext = true;
        })
      },
      // 支付中 修改金额
      // PATCH /v1/supplier/stages/{stage_id}/tickets/{id}/pay 修改支付金额和注释
      netFixPay(ticket){
        var parm = {};

        if(!this.isNumberIntGol(ticket.fee_value)){
          this.showMessage("warning","请检查实际费用，具体金额用数字填写");
          return;
        }

//        if(this.isEmpty(ticket.fee_value) || ticket.fee_value <0 ){
//          this.showMessage("warning","请检查填写的金额");
//          return;
//        }
        parm.fee_value = ticket.fee_value; //金额
        this.showLoading();
        this.$http.patch(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/pay",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.getRightDetail(this.project_id,this.state_id);
          this.hiddenLoading();
        })

      },
      netSendContrac(ticket){
        var pram = {};
        pram.category = 'contract';
        if(ticket.listAttachmentsId.length < 1){
          if(ticket.contract_attachments.length>0) return; //修改合同，不需要提示

          this.showMessage("warning","请添加您要上传的附件");
          return;
        }
        pram.attachments = [];
        ticket.listAttachmentsId.forEach(function (item,index) {
          pram.attachments.push({id:item});
        })
        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/contract_file",pram
        ).then((res) => {
          this.hiddenLoading();
          if(ticket.status == 'one'){ //如果是 one 需要调用两次接口
            this.netFixContrac(ticket);
          }else{
            this.getRightDetail(this.project_id,this.state_id);
          }
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // 修改合同草案  发起合同草案
      // PATCH /v1/supplier/stages/{stage_id}/tickets/{id}/start_contract 发起合同草案
      netFixContrac(ticket){
        this.showLoading();
        this.$http.patch(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/start_contract",
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // 修改合同里面的 快递信息
      // POST /v1/supplier/stages/{stage_id}/tickets/{id}/expressage 添加/修改快递信息
      netFixContracExpress(ticket){
        if(this.isEmpty(ticket.expressage) || this.isEmpty(ticket.expressage.no) || this.isEmpty(ticket.expressage.category || ticket.expressage.no.length < 1 || ticket.expressage.category.length < 1)){
          this.showMessage("warning","请检查填写的快单信息");
          return;
        }
        var parm = {expressage:{}};
        parm.expressage.no = ticket.expressage.no;
        parm.expressage.category = ticket.expressage.category;
        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/expressage",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // PATCH /v1/supplier/projects/{id}/year 项目申报年份
      netFixContracYear(ticket){
        if(this.isEmpty(ticket.year)  || ticket.year.length < 1 ){ this.showMessage("warning","请检查填写的年份信息"); return;}
        if(this.isEmpty(this.currentProject.id)  || this.currentProject.id.length < 1 ){ this.showMessage("warning","当前项目不存在"); return;}
        var parm = {year:''};
        parm.year = ticket.year;
        this.showLoading();
        this.$http.patch(API.serviceurl + 'supplier/projects/'+this.currentProject.id+"/year",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
          // 通知project 页面 页面跟新
          this.$store.dispatch('sendYearChange', !this.yearChange);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      // 获取选择表单的列表 GET /v1/supplier/provider_forms //选择表单
      netFormList(){
        var parm = {q:{}};
        // q[category_eq]  0 申请表  1 问卷
        this.$http.get(API.serviceurl + 'supplier/provider_forms?q[category_eq]=0', parm
        ).then((res) => {
          this.hiddenLoading();
          this.provider_forms = res.body.provider_forms;
        }, (error) => {
          this.showMessage("warning", "请求失败");
          this.hiddenLoading();
        })
      },

      netSendFormCommitAnswer(ticket,list_form){
        if(this.verifyFormAnswer(list_form) == false){
          return;
        }
        var parm  = this.getPostAnsWerPrams(ticket,list_form)
        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/form", parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        }, (error) => {
          this.showMessage("warning", "请求失败");
          this.hiddenLoading();
        })
      },
      //工单中发送网络 sendfile 组件中 发送文件
      //PUT /v1/supplier/stages/{stage_id}/tickets/{id}/transmit     发送文件工单-发送给对方
      sendFileInTicket(ticket){
        var parm = {};
        parm.attachments = [];
        parm.content = ticket.content;
        // 如果没有文件,直接返回
        if(this.isEmpty(ticket.attachments) || ticket.attachments.length < 1){
          if(this.isEmpty(ticket.listAttachmentsId) || ticket.listAttachmentsId.length<1){
            this.showMessage("warning","请选择文件");
            return
          }
        }
        ticket.listAttachmentsId.forEach(function (item,index) {
          parm.attachments.push({id:item});
        })
        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/transmit",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },

      //通知工单中  sendfile 发送给对方
      //PUT /v1/supplier/stages/{stage_id}/tickets/{id}/notify  发送通知工单-发送给对方
      sendToOtherInSendNoti(ticket){
        if(this.isEmpty(ticket.content_last) || ticket.content.length<1){
          this.showMessage("warning","请检查您填写的内容");
          return;
        }
        var parm = {};
        parm.content= ticket.content_last;
        this.showLoading();
        this.$http.put(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id+"/notify",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      //删除工单 (对应撤销当前事项)，字段临时的都有撤当前事项
      //DELETE /v1/supplier/stages/{stage_id}/tickets/{id}撤回当前事项  撤回当前事项
      netDeleteCurrentStage(ticket){
        if(this.isEmpty(ticket.id) || ticket.content.id<0){
          this.showMessage("warning","撤销的当前事项不存在，请检查");
          return;
        }
        this.showLoading();
        this.$http.delete(API.serviceurl + 'supplier/stages/'+this.stage.id+"/tickets/"+ticket.id,
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      //确定分配
      commitDistribute(){
        // 如果是固定人员
        var currentItem = null; //需要传递那一个
        if(this.changeCurrentPeople){ //更换当前的人员
          var that = this;
          var mark_error = false;
          this.stage_operations.forEach(function (item ,index) {
            if(item.update_supplier){
              if(!that.isEmpty(item.supplier_id_or) && item.supplier_id_or == item.supplier_id)  mark_error = true;
              if(that.isEmpty(item.supplier_id_or)) mark_error = true;
              currentItem = item;
              if(currentItem.category == 'member'){ currentItem.supplier_id = currentItem.user_id;}
            }
          });
          if(mark_error){ that.showMessage("warning","请选择不同的人员");  return;}
        }else { //选择下一个人
          this.stage_operations.forEach(function (item ,index) {
            if(item.isCurrent){
              currentItem = item;
              //修改结构之后的
              if(currentItem.category == 'member'){
                currentItem.supplier_id = currentItem.user_id;
              }
            }
          });
        }

        if(this.isEmpty(currentItem)){
          this.showMessage("warning","请选择人员");
          return;
        }
        if(this.isEmpty(currentItem.supplier_id)){
          this.showMessage("warning","请选择人员");
          return;
        }
        this.patchAssign(currentItem.supplier_id,currentItem.id);
      },
      // PATCH /v1/supplier/projects/{project_id}/stages/{id}/assign     // 确认分配
      // 确定分配   阶段操作人 stage_operation_id 当前分配步骤ID  project_id
      patchAssign(supplier_id,stage_operation_id){
        this.showLoading();
        var parm = {};
        parm.supplier_id = supplier_id;
        parm.stage_operation_id = stage_operation_id;
        this.$http.patch(API.serviceurl + 'supplier/projects/'+this.project_id+"/stages/"+this.state_id+"/assign",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // PATCH /v1/supplier/projects/{project_id}/stages/{id}/operate  // 项目转交
      // 下方 操作人员 当有领导进来 可以更改阶段操作人 的接口
      netChangeOpeartioner(supplier_id){
        this.showLoading();
        var parm = {};
        parm.supplier_id = supplier_id;
        this.$http.patch(API.serviceurl + 'supplier/projects/'+this.project_id+"/stages/"+this.state_id+"/operate",parm
        ).then((res) => {
          this.hiddenLoading();
          this.getRightDetail(this.project_id,this.state_id);
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // 请求领导 GET /v1/supplier/users/leaders      // 查领导             （当前是领导）
      getLeaders(){
        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/users/leaders'
        ).then((res) => {
          this.hiddenLoading();
          // 此处需要介入数据 leaders
          this.listOpenation = res.body.leaders;
          this.listOpenation.forEach(function (item,index) {
            item.nameShow =  item.name +" | "+item.position;
            item.operation_setting ={};
            item.operation_setting.category = 'underling';
          });
          //是否要添加自己
          if(this.stage.has_subordinate){
            var item = {
              id:this.currentUser.id,
              name:this.currentUser.name,
              position:this.currentUser.position,
              nameShow: this.currentUser.name +" | "+this.currentUser.position,
            }
            this.listOpenation.push(item);
          }
          this.markChoosePeople = true;

        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // GET /v1/supplier/users/subordinate   // 查下属          （当前是 下属）
      getUnderling(){
        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/users/subordinate'
        ).then((res) => {
          this.hiddenLoading();
          this.listOpenation = res.body.subordinates;
          this.listOpenation.forEach(function (item,index) {
            item.nameShow =  item.name +" | "+item.position;
            item.operation_setting ={};
            item.operation_setting.category = 'underling';
          });
          //是否要添加自己
          if(this.stage.has_subordinate){
            var item = {
              id:this.currentUser.id,
              name:this.currentUser.name,
              position:this.currentUser.position,
              nameShow: this.currentUser.name +" | "+this.currentUser.position,
            }
            this.listOpenation.push(item);
          }
          this.markChoosePeople = true;
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // GET /v1/supplier/users/descendants 获取当前登录账号所有下属
      getUnderlingAll(){
        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/users/descendants'
        ).then((res) => {
          this.hiddenLoading();
          this.listOpenation = res.body.descendants;
          this.listOpenation.forEach(function (item,index) {
            item.nameShow =  item.name +" | "+item.position;
            item.operation_setting ={};
            item.operation_setting.category = 'descendant';
          });
          //是否要添加自己
          if(this.stage.has_subordinate){
            var item = {
              id:this.currentUser.id,
              name:this.currentUser.name,
              position:this.currentUser.position,
              nameShow: this.currentUser.name +" | "+this.currentUser.position,
            }
            this.listOpenation.push(item);
          }
          this.markChoosePeople = true;
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      //GET /v1/supplier/users              // 查角色             （role） department role_id
      getRole(department_id,role_id){
        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/users'+"?department_id="+department_id+"&role_id="+role_id
        ).then((res) => {
          this.hiddenLoading();
          this.listOpenation = res.body.suppliers;
          this.listOpenation.forEach(function (item,index) {
            item.nameShow =  item.name +" | "+item.position;
            item.operation_setting ={};
            item.operation_setting.category = 'role';
          });

          //是否要添加自己
          if(this.stage.has_subordinate){
            var item = {
              id:this.currentUser.id,
              name:this.currentUser.name,
              position:this.currentUser.position,
              nameShow: this.currentUser.name +" | "+this.currentUser.position,
            }
            this.listOpenation.push(item);
          }

          this.markChoosePeople = true;
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      // api == 右侧详情的请求 GET /v1/supplier/projects/{project_id}/stages/{id}  #阶段详情
      getRightDetail(project_id,state_id){

        this.showLoading();
        this.$http.get(API.serviceurl + 'supplier/'+"projects/"+project_id+"/stages/"+state_id
        ).then((res) => {
          this.hiddenLoading();
          this.stage = res.body.stage;
          //传递vux 的值
          this.$store.dispatch('sendStaus',this.stage.status);
          this.$store.dispatch('sendCurrentStage',this.stage);
          this.dealDataForm();
          this.dealDataTickets();
          this.dealDataBase();
          this.clearData();
        },(error)=>{
          this.showMessage("warning","请求失败");
          this.hiddenLoading();
        })
      },
      //清除数据
      clearData(){
        this.fix = false;
        this.changeCurrentPeople = false;
        this.currentPeopleIndex = -100;
        if(!this.isEmpty(this.currentOperation)){
          this.currentOperation.id = null
          this.currentOperation.name = null
        }
      },
      //验证回答的表单 ,如果有未填写的并且是 必须要填写的，那么 提示： 返回 false  验证通过 返回true
      verifyFormAnswer(list_form_v){
        //需要验证 必须要填写的
        var markError = false;
        for (var i=0;i<list_form_v.length;i++){
          var item = list_form_v[i];
          // 检查是否有文件正在上传
          if(!this.isEmpty(item.answer.isFileEmpty) && item.answer.isFileEmpty.isShow){
            this.showMessage("warning","您有文件正在上传，请检查");
            markError = true;
            break;
          }

          if(!this.isEmpty(item.rules) && item.rules.length>0){
            var str = item.rules[0];
            if(str == 'required'){  //说明是必填的
              if(item.type == 'chartinput'){
                if(this.isEmpty(item.answer.input_value) || item.answer.input_value.length<1){
                  this.showMessage("warning","请检查必填选项，单行输入您未输入文字");
                  markError = true;
                  break;
                }
              }else if(item.type == 'charttextarea'){
                if(this.isEmpty(item.answer.textarea_value) || item.answer.textarea_value.length<1){
                  this.showMessage("warning","请检查必填选项，多行输入您未输入文字");
                  markError = true;
                  break;
                }
              } else if(item.type == 'chartradio'){
                if(this.isEmpty(item.answer.radio_value) || item.answer.radio_value.length<1){
                  this.showMessage("warning","请检查必填选项，单选框您未选择");
                  markError = true;
                  break;
                }
              }else if(item.type == 'chartcheckbox'){
                if(this.isEmpty(item.answer.check_value) || item.answer.check_value.length<1){
                  this.showMessage("warning","请检查必填选项，多选框您未选择");
                  markError = true;
                  break;
                }
              }else if(item.type == 'chartupload'){
//                if(this.isEmpty(item.answer.attachments) || item.answer.attachments.length<1){
//                  this.showMessage("warning","请检查必填选项，上传文件您未选择");
//                  markError = true;
//                  break;
//                }
                //检查是否正在上传
                if(!this.isEmpty(item.answer.isFileEmpty) && item.answer.isFileEmpty.isShow){
                  this.showMessage("warning","您有文件正在上传，请检查");
                  markError = true;
                  break;
                }

                if(this.isEmpty(item.answer.listAttachmentsId) || item.answer.listAttachmentsId.length<1){
                  if(this.isEmpty(item.answer.attachments)  ||item.answer.attachments.length <1){
                    this.showMessage("warning","请检查必填选项，上传文件您未选择");
                    markError = true;
                    break;
                  }
                }

              }else if(item.type == 'chartdate'){
                if(this.isEmpty(item.answer.date_value1) || item.answer.date_value1.length<1){
                  this.showMessage("warning","请检查必填选项，时间您未选择");
                  markError = true;
                  break;
                }
                if(this.isEmpty(item.answer.date_value2) || item.answer.date_value2.length<1){
                  this.showMessage("warning","请检查必填选项，时间您未选择");
                  markError = true;
                  break;
                }
              }else if(item.type == 'charttime'){
                if(this.isEmpty(item.answer.time_value) || item.answer.time_value.length<1){
                  this.showMessage("warning","请检查必填选项，时间您未选择");
                  markError = true;
                  break;
                }
              }
            }

          }
        }
        if(markError)return false
        else return true;
      },
      getPostAnsWerPrams(ticket,list_form){
        var parm = {};
        if(!this.isEmpty(ticket))parm.bind_form_id = ticket.bind_form.id;
        parm.items = [];
        parm.attachments = [];
        var that = this;
        list_form.forEach(function (item,index){
          var obj = {};
          parm.items.push(obj);
          obj.title = item.title;
          obj.type = item.type;
          obj.describe = item.describe;
          obj.value = [];
          obj.rules = [];
          obj.values = [];
          obj.answer = {};
          item.value.forEach(function (val,mark) {  obj.value.push(val); })
          item.rules.forEach(function (val,mark) { obj.rules.push(val);  })
          item.values.forEach(function (val,mark) { obj.values.push(val);  })
          obj.answer.input_value = item.answer.input_value;
          obj.answer.textarea_value = item.answer.textarea_value;
          obj.answer.radio_value = item.answer.radio_value;
          obj.answer.date_value1 = item.answer.date_value1;
          obj.answer.date_value2 = item.answer.date_value2;
          obj.answer.time_value = item.answer.time_value;
          obj.answer.check_value = [];
          if(!that.isEmpty(item.answer.check_value)){
            item.answer.check_value.forEach(function (obj6,index6) {
              obj.answer.check_value.push(obj6);
            })
          }
          if(!that.isEmpty(item.answer.listAttachmentsId)){
            item.answer.listAttachmentsId.forEach(function (obj,index1) {   parm.attachments.push({id:obj,index:index}) });
          }
        })
        return parm;
      },


      postAnswer(){
        if(this.verifyFormAnswer(this.list_form) == false){
          return;
        }
        var parm  = this.getPostAnsWerPrams(null,this.list_form)
        parm.bind_form_id = this.stage.bind_form.id;

        this.showLoading();
        this.$http.post(API.serviceurl + 'supplier/'+"form_answers/",parm
        ).then((res) => {
          this.getRightDetail(this.project_id,this.state_id);
          this.hiddenLoading()
        },(error)=>{
          this.hiddenLoading()
        })
      },
      // 开启下一步  PATCH /v1/supplier/projects/{project_id}/stages/{id}/open
      openStepNext(){
        this.listErrorNext = [];
        this.errorNextMsg = '';
        this.$http.patch(API.serviceurl +"supplier/"+'projects/'+this.project_id+"/stages/"+this.state_id+"/open",{}
        ).then((res) => {
          var item = true;
          item = !this.stepName
          this.$store.dispatch('nextStep', item);
          this.hiddenLoading();
        },(error)=>{
          if(!this.isEmpty(error.body.data)){
            this.listErrorNext = error.body.data;
          }
          if(!this.isEmpty(error.body.details)){
            this.errorNextMsg = error.body.details;
          }
//    this.showMessage("warning","请求失败");
          this.hiddenLoading();
          this.dialogVisibleNext = true;
        })
      },
      // 选择下一个人 弹框显示
      choosePepple(){
        this.markChoosePeople = true;
      },
      //操作人员 下方，若是领导，可以更换阶段操作人 ，显示弹框
      changeOperationer(item,index){
        if(this.showEditDownOp(item,index)){
          this.markChoosePeople = true;
          if(item.category == 'descendant')  this.getUnderlingAll();
          else this.getUnderling();
        }
      },

      //网络请求 end ====================================================================================
      log(item){
        console.log(item);
      },
      // base method start ===
      showLoading(){
        this.loadingMark = true;
      },
      hiddenLoading(){
        this.loadingMark = false;
      },
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      commitForm(){
        if(!this.hasRoot) return;
        //提交答案
        if(this.canOperation){
          this.postAnswer();
          this.form_answer_copy = null;
        }
      },
      checkIsUploadingInForm(list_form_v){
        var markError = false;
        for (var i=0;i<list_form_v.length;i++) {
          var item = list_form_v[i];
          if (!this.isEmpty(item.answer.isFileEmpty) && item.answer.isFileEmpty.isShow) {
            this.showMessage("warning", "您有文件正在上传，请检查");
            markError = true;
            break;
          }
        }
        return markError;
      },
      //取消答案
      cancelForm(){
        //检查表单是否有正在上传
        if(this.checkIsUploadingInForm(this.list_form)) return;
        this.fix = false;
        if(!this.isEmpty(this.form_answer_copy)){
          this.list_form = this.clearParams(this.form_answer_copy);
          // 调用组建里面的方法，自己清空
          var that = this;
          this.$refs.ref_form.forEach((form,index)=>{
            form.reSet(that.list_form[index].answer);
          })
        }
        this.form_answer_copy = null;
      },
      // 提示框 总汇
      showMessage(type,str){
        if(type == null || type == undefined || type.length<1){
          this.$message(str);
        }else {
          if(type == "success"){
            this.$message({
              message: str,
              type: 'success'
            });
          }else if(type == "warning"){
            this.$message({
              message: str,
              type: 'warning'
            });
          }else if(type == "error"){
            this.$message.error(str);
          }else {
            this.$message(str);
          }
        }
      },
      fixedForm(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        this.fix = !this.fix;
        // 如果需要修改 ，说明有答案了。1.复制 答案的内容 2.如果点击取消，那么就把之前复制的原始答案的内容，再次放进去
        this.form_answer_copy = this.clearParams(this.list_form);
      },
      goToAuditFile(){
        this.openStepNext();
//        if(this.strSheng == "开启下一步"){
//          this.openStepNext();
//        }else {
//          var state_id = this.$route.params.state_id;
//          if(this.stage.category == 'apply'){
//            this.$router.push({ name: 'auditForm', params: { state_id: state_id }});
//          }else{
//            this.$router.push({ name: 'auditFile', params: { state_id: state_id }});
//          }
//        }
      },
      checkAudit(){
        var state_id = this.$route.params.state_id;
        if(this.stage.category == 'apply'){
          this.$router.push({ name: 'auditForm', params: { state_id: state_id },query:{name:this.$route.query.name}});
        }else{
          this.$router.push({ name: 'auditFile', params: { state_id: state_id },query:{name:this.$route.query.name}});
        }
      },
      creatPro(){
        this.dialogCreatPro = true;
        this.currentWork="";
        this.currentWorkTitle="";
        this.changeClass.forEach(function (item,index) {
          item.btnActive = false;
        });
      },
      //弹出框 选中 点击确定
      commitCreatPro(){
        this.dialogCreatPro = false;
        // 做网络请求 只有返回 才会
        if(this.isEmpty(this.currentWork) || this.currentWork.length <1) return;
        if(this.currentWork == 'pay'){ //做网络请求
          this.netPrecreatePay();
        }else {
          this.creatNewWork();
        }
      },
      creatNewWork(){
        if(this.currentWork.length > 0){
          var work = {};
          work.category = this.currentWork;
          work.status = 'one';
          work.title = '';
          work.is_new = true;
          work.temporary = true; // 临时的，可以撤销
          if( work.category == 'demand' || work.category == 'notify' || work.category == 'pay' || work.category == 'contract' || work.category == 'sendform' || work.category == 'transmit' || work.category == 'affirm'){
            work.status = 'zero';
            work.attachments = [];
          }
          if(work.category == 'contract'){
            work.contract_attachments = [];
          }
          if(work.category == 'sendform'){
            work.bind_form = {};
          }
          //若是线下，创建的时候 默认给名字
          if(this.currentProject.source=='offline'){
            switch (work.category){
              case 'notify': work.title = '通知企业';
                break;
              case 'sendform': work.title = '填写申请表';
                break;
              case 'pay': work.title = '发起支付';
                break;
            }

          }
          this.tickets.push(work);
        }
      },
      dealDataForm(){
        //判断是否有答案
        this.hasAnswer = false;
        if(this.isEmpty(this.stage.bind_form)){
          return;
        }
        // 如果有答案
        if(!this.isEmpty(this.stage.bind_form.form_answer)) {
          this.list_form = this.stage.bind_form.form_answer.content;
          // 将附件全部赋值给里面的
          if(!this.isEmpty(this.stage.bind_form.form_answer.attachments)){
            this.hasAnswer = true;
            // 有附件
            var that = this;
            this.stage.bind_form.form_answer.attachments.forEach(function (item9,index9) {
              // 检查 index 放到对应的里面
              var att = that.list_form[item9.index];
              if(that.isEmpty(att.answer.attachments)){
                att.answer.attachments = [];
              }
              att.answer.attachments.push(item9);
            })
          }else {
            // 没有附件 ,检查里面的 item 当type = chartupload 加att
            this.list_form.forEach(function (obj8,index8) {
//                if(obj8.type == 'chartupload '){
              obj8.answer.attachments = [];
//                }
            })
          }
          // 所有的answer 全部加附件
          this.list_form.forEach(function (obj3,index8) {
            if(obj3.answer.attachments == undefined || obj3.answer.attachments == null){
              obj3.answer.attachments = [];
            }
            if(obj3.answer.check_value == undefined || obj3.answer.check_value == null){
              obj3.answer.check_value = [];
            }
          })

        }else {  // 没有答案
          this.hasAnswer = false; //没有答案
          this.list_form = this.stage.bind_form.provider_form.form.content;
          //　加上　ａｎｓｗｅｒ的处理
          if(this.isEmpty(this.list_form.answer)){
            this.list_form.forEach(function (item,index) {
              var valueLength =  item.value.length;
              item.answer={
                input_value:"",
                textarea_value:"",
                radio_value:"",
                check_value:[],
                date_value1:"",
                date_value2:"",
                time_value:""
              }
//              if(item.type == "chartupload"){
              item.value.forEach(function (item1,index1) {
//                  item.answer.check_value.push(false);
              })
//              }
              item.answer.attachments=[]
            })
          }
        }
        // 判断是否有答案

        for(var i=0;i<this.list_form.length;i++){
          var item = this.list_form[i];

          if(!this.isEmpty(item.answer)){
            if(!this.isEmpty(item.answer.attachments) && item.answer.attachments.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.input_value) && item.answer.input_value.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.textarea_value) && item.answer.textarea_value.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.radio_value) && item.answer.radio_value.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.check_value) && item.answer.check_value.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.date_value1) && item.answer.date_value1.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.date_value2) && item.answer.date_value2.length>0){
              this.hasAnswer = true;
              break;
            }
            if(!this.isEmpty(item.answer.time_value) && item.answer.time_value.length>0){
              this.hasAnswer = true;
              break;
            }
          }
        }
      },

      // 处理工单 的情况
      dealDataTickets(){
        this.tickets = this.stage.tickets;
      },
      // 处理基本数据
      dealDataBase(){
        //内省
        if(!this.isEmpty(this.stage.op_settings) && !this.isEmpty(this.stage.op_settings.audit) && this.stage.op_settings.audit){
          this.strSheng ="发起内审";
          if(this.auditsItem.status == 'pass'){
            this.strSheng = "开启下一步";
          }
        }else {
          this.strSheng ="开启下一步";
        }
        this.hasYear =  this.dealWithHasYear();
      },
      addWork(index){
        this.changeClass.forEach((v,i) => {
          v.btnActive = false
        })
        var str = "";
        var title = "";
        switch(index)
        {
          case 0:
            str = "demand";
            title = "索要文件"
            this.changeClass[0].btnActive = true
            break;
          case 1:
            str = "affirm";
            title = "确认文件"
            this.changeClass[1].btnActive = true
            break;
          case 2:
            str = "transmit";
            title = "发送文件"
            this.changeClass[2].btnActive = true
            break;
          case 3:
            str = "contract";
            title = "发起合同"
            this.changeClass[3].btnActive = true
            break;
          case 4:
            str = "notify";
            title = "发送通知"
            this.changeClass[4].btnActive = true
            break;
          case 5:
            str = "sendform";
            title = "发送文件"
            this.changeClass[5].btnActive = true
            break;
          case 6:
            str = "pay";
            title = "发起支付"
            this.changeClass[6].btnActive = true
            break;
          default:
            str = "";
        }
        if(str.length>0){
          this.currentWork = str;
          this.currentWorkTitle = title;
        }
      },
      //显示隐藏操作记录滚动条
      scrollShow(){
      	this.isScrollHide = false
      },
      scrollHide(){
        this.isScrollHide = true
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">

  .operation-complete-false{
    padding-bottom: 0px !important;
  }

  .gd-box-contract{
    margin-bottom: 0px;
  }

  .gd-box{
    position: relative;
    .stage_status{
      z-index: 100;
      position: absolute;
      right: -1px;
      top: 0px;
      .status{
        height: 60px;
      }
      .icon-status {
        display: inline-block;
        height: 16px;
        width: 16px;
        vertical-align: middle;
      }
      .icon-having {
        background: url("../../../assets/images/gd_ico/having.png") no-repeat 0/cover;
      }
      .icon-wait {
        background: url("../../../assets/images/gd_ico/wait.png") no-repeat 0/cover;
      }
      .icon-refuse {
        background: url("../../../assets/images/gd_ico/refuse.png") no-repeat 0/cover;
      }
      .icon-yes {
        background: url("../../../assets/images/gd_ico/yes.png") no-repeat 0/cover;
      }
    }
  }

  .choose-btn {
    margin-top: 10px;
    display: inline-block;
    border: 1px solid transparent;
    border-radius: 3px;
    width: 96px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    margin-right: 20px;
    background: #3c8ced;
  }

  .default {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border-radius: 30px;
    text-align: center;
    vertical-align: middle;
    line-height: 60px;
    color: #1b1b1b;
  }
  .add {
    cursor: pointer;
    border:1px dashed #a9a9a9;
    background-color: transparent;
    background: url("../images/add_person.png") center no-repeat;
  }
  .add-no {
    border:1px dashed #a9a9a9;
    background-color: transparent;
    background: url("../images/add_no.png") center no-repeat;
  }
  .finsh{
    border:1px solid #a9a9a9 !important;
    background-color: transparent;
    color: black;
  }


  .xz-oper-edit{
    background:#fff !important;
    border:1px solid #d1d1d1;
    color: black !important;
    /*background: url("../images/add_no.png") center no-repeat;*/
  }
  .no-oper{
    background:#efefef;
    border:1px solid #d1d1d1;
  }
  .edit{
    background-color: #4688da;
    color: #fff;
  }
  .bi{
    cursor: pointer;
    width: 11px;
    height:11px;
    position: absolute;
    right: -15px;
    top: 40px;
    background: url("../images/bi.jpg") 0 0 no-repeat;
    z-index: 5;
  }

  .finished {
    /*width: 100px;*/
    /*margin: 0 auto;*/
    div{
      width: 267px;
      height: 311px;
      margin: auto;
    }
  }

  .add {
    cursor: pointer;
    border:1px dashed #a9a9a9;
    background-color: transparent;
    background: url("../images/add_person.png") center no-repeat;
    background-color: white !important;
  }
  .icon_cjsx{
    width: 20px;
    height: 20px;
    background: url("../../../assets/images/apply/add_y.png") center no-repeat;
  }
  .not-upload {
    margin: 30px 0;
    text-align: center;
    .icon-notup {
      display: inline-block;
      width: 14px;
      height: 15px;
      background: url("../../../assets/images/gd_ico/not_upload.png") no-repeat 0/cover;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      font-size: 14px;
      color: #5c5c5c;

    }
  }

  .service-apply {
    .main{
      .no-preset {
        display: inline-block;
        height: 64px;
        vertical-align: middle;
        display:table-cell;
        background-color: #f5f5f5;
        width: 930px;
        padding-left: 20px;
        .icon_preset {
          display: inline-block;
          height:24px;
          width:24px;
          background: url("../../../assets/images/apply/icon_waring.png") no-repeat 0/cover;
          cursor: pointer;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          font-size: 12px;
          color: #5c5c5c;
          vertical-align: middle;
        }
      }
    }

    .icon_fix {
      background: url("../../../assets/images/apply/fixed.png") no-repeat 0/cover;
      display: inline-block;
      width: 16px;
      height: 15px;
    }
    .fixed{
      .fixed_button{
        margin-right: 30px;
        margin-top: 10px;
      }
    }
    .fixed_button {
      span{
        display: inline-block;
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#3c8ced;
      }
    }

    /*基本按钮的样式*/
    .base-btn-blue {
      width: 98px;
      height: 38px;
      background:#3c8ced;
      border-radius:2px;
      font-size:14px;
      color:#ffffff;
      text-align: center;
      vertical-align: middle;
      line-height: 38px;
    }
    /*  i 标签的图标*/
    .icon{
      display: inline-block;
      vertical-align: middle;
      margin-right:5px;
      margin-top:-3px;
    }
    /*常规字体颜色*/
    .text-nomal {
      /*font-family:MicrosoftYaHei;*/
      font-size:14px;
      color:#666666;
    }
    .status {
      width: 140px;
      height: 58px;
      line-height: 58px;
      text-align: center;
      color: #FFFFFF;
      font-size: 14px;
      span {
        vertical-align: middle;
      }
    }
    .icon-yes {
      background: url("../../../assets/images/gd_ico/yes.png") no-repeat 0/cover;
    }

    .operation-apply {
      margin-top: 14px;
      margin-bottom: 30px;
      overflow: hidden;
      .item{
        float: left;
      }
    }
    // 公共头部的样式
    .header-item {
      height: 40px;
      border-left: 4px solid #3c8ced;
      background-color: #f5f5f5;
      vertical-align: middle;
      line-height: 40px;
      padding-left: 10px;
      font-size: 14px;
    }
    .record {
      .cover-box{
        height: 140px;
        width: 100%;
        overflow-y: auto;
      }
      .nothing{
        width: 100%;
        height: 100px;
        text-align: center;
        line-height: 100px;
        .icon-nothing {
          width:15px;
          height:16px;
          background:url("../../../assets/images/gd_ico/qrwj.png") no-repeat 0/cover;
        }
      }
      .re-item{
        overflow: hidden;
        margin-top: 12px;
        margin-bottom: 12px;
        div{
          float: left;
          display: inline-block;
          &:first-child{
            margin-left: 20px;
            width: 20%;
          }
          &:nth-child(2){
            width: 30%;
          }
          &:last-child{
            margin-left: 10px;
            width:46%;
          }
        }
      }
    }
    .peo-dowm {
      overflow: hidden;
      .icon_people {
        overflow: hidden;
        float: left;

        width: 120px;
        /*height: 100px;*/

        .peo-left {
          float: left;
          width: 60px;
          height: 75px;
          float: left;
          font-size: 14px;
          margin-left: 20px;
          margin-top: 10px;
          margin-bottom: 10px;
          position: relative;
          .default {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            border-radius: 30px;
            text-align: center;
            vertical-align: middle;
            line-height: 60px;
            color: #1b1b1b;

          }
          .new {
            background-color: #4688da;
            color: #fff;
          }
          .add {
            cursor: pointer;
            border:1px dashed #a9a9a9;
            background-color: transparent;
            background: url("../images/add_person.png") center no-repeat;
          }
          .add-no {
            border:1px dashed #a9a9a9;
            background-color: transparent;
            background: url("../images/add_no.png") center no-repeat;
          }
          .xz-oper-edit{
            background:#fff;
            border:1px solid #d1d1d1;
          }
          .no-oper{
            background:#efefef;
            border:1px solid #d1d1d1;
          }
          .edit{
            background-color: #4688da;
            color: #fff;
          }
          .bi{
            cursor: pointer;
            width: 11px;
            height:11px;
            position: absolute;
            right: -15px;
            top: 40px;
            background: url("../images/bi.jpg") 0 0 no-repeat;
            z-index: 5;
          }
          .postion {
            width: 70px;
            text-align: center;
            color: #8e8e8e;
            margin-top: 5px;
            margin-left: -7px;
          }
        }
        .peo-right {
          float: left;
          margin-top: 25%;
          margin-left: 13px;
        }
      }
    }
    .text_noaml{
      float: left;
      font-size:14px;
      color:#5c5c5c;
      line-height:14px;
    }

    .gd-btn{
      display: inline-block;
      border:1px solid #3c8ced;
      border-radius:3px;
      width:96px;
      height:36px;
      line-height:36px;
      text-align: center;
      font-size:14px;
      color:#3c8ced;
      cursor: pointer;
      margin-right:20px;
      .icon{
        display: inline-block;
        vertical-align: middle;
        margin-right:5px;
        margin-top:-3px;
      }
    }
    .fqzf-icon{
      width:16px;
      height:16px;
      background:url("../../../assets/images/gd_ico/fqzf.png") no-repeat 0/cover;
    }
    // 等待发起
    .icon_ddfq{
      width:16px;
      height:16px;
      background:url("../../../assets/images/apply/ddfq.png") no-repeat 0/cover;
    }

    // 审核中 process
    .icon_shz{
      width:16px;
      height:17px;
      background:url("../../../assets/images/apply/shz.png") no-repeat 0/cover;
    }
    .icon_jujue{
      width:16px;
      height:17px;
      background:url("../../../assets/images/apply/jujue.png") no-repeat 0/cover;
    }
    .icon_pass{
      width:16px;
      height:16px;
      background:url("../../../assets/images/gd_ico/state5.png") no-repeat 0/cover;
    }

    // 审核状态
    .audit-status {
      display: inline-block;
      /*border:1px solid #3c8ced;*/
      border-radius:3px;
      width:96px;
      height:36px;
      line-height:36px;
      text-align: center;
      font-size:14px;
      /*color:#3c8ced;*/
      cursor: pointer;
      margin-right:20px;
      .icon{
        display: inline-block;
        vertical-align: middle;
        margin-right:5px;
        margin-top: -5px;
      }
    }

    .creat-pro{
      .gd-btn{
        margin-top: 10px;
        display: inline-block;
        border:1px solid #3c8ced;
        border-radius:3px;
        width:96px;
        height:36px;
        line-height:36px;
        text-align: center;
        font-size:14px;
        color:#3c8ced;
        cursor: pointer;
        margin-right:20px;
        .icon{
          display: inline-block;
          vertical-align: middle;
          margin-right:5px;
          margin-top:-3px;
        }
      }

      .sywj-icon {
        width: 15px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/qrwj.png") no-repeat 0/cover;
      }
      .sywj-icon2 {
        width: 15px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/qrwj2.png") no-repeat 0/cover;
      }

      .qrwj-icon {
        width: 15px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/sywj.png") no-repeat 0/cover;
      }
      .qrwj-icon2 {
        width: 15px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/sywj2.png") no-repeat 0/cover;
      }

      .fswj-icon {
        width: 15px;
        height: 13px;
        background: url("../../../assets/images/gd_ico/fswj.png") no-repeat 0/cover;
      }
      .fswj-icon2 {
        width: 15px;
        height: 13px;
        background: url("../../../assets/images/gd_ico/fswj2.png") no-repeat 0/cover;
      }

      .fqht-icon {
        width: 15px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fqht.png") no-repeat 0/cover;
      }
      .fqht-icon2 {
        width: 15px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fqht2.png") no-repeat 0/cover;
      }

      .fstz-icon {
        width: 15px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fstz.png") no-repeat 0/cover;
      }
      .fstz-icon2 {
        width: 15px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fstz2.png") no-repeat 0/cover;
      }

      .fsbd-icon {
        width: 14px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/fsbd.png") no-repeat 0/cover;
      }
      .fsbd-icon2 {
        width: 14px;
        height: 16px;
        background: url("../../../assets/images/gd_ico/fsbd2.png") no-repeat 0/cover;
      }

      .fqzf-icon {
        width: 14px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fqzf.png") no-repeat 0/cover;
      }
      .fqzf-icon2 {
        width: 14px;
        height: 15px;
        background: url("../../../assets/images/gd_ico/fqzf2.png") no-repeat 0/cover;
      }

    }
    // 修改的样式
    .fixed {
      overflow: hidden;
      .fixed_button {
        float: right;
      }
    }
    .view_footer{
      border-top: 1px solid #efefef;
      padding-bottom: 10px;
      padding-top: 10px;
      min-height: 44px;

      .one {
        margin: 0 auto;
        width: 100px;
        margin-top: 5px;
        // ele 取消按钮的改造
        .el-button{
          /*color: #4096ff;*/
          /*border-color: #4096ff;*/
          /*height:33px;*/
          width:97px;
        }
      }
      .two{
        overflow: hidden;
        margin: 0 auto;
        text-align: center;
        margin-top: 5px;
        // ele button的改造
        .form-btn {
          .el-button{
            color: #4096ff;
            border-color: #4096ff;
            height:38px;
            width:97px;
          }
        }
        .form-btn-right{
          .el-button{
            /*color: #4096ff;*/
            /*border-color: #4096ff;*/
            /*height:38px;*/
            width:97px;
          }
        }

        /*background-color: red;*/
        >div{
          float: left;
          &:last-child{
            float: right;
            /*background-color: red;*/
          }
        }
      }
    }
  }



</style>
<style lang="scss" rel="stylesheet/scss">
  .form-btn{
    .el-button{
      color: #4096ff;
      border-color: #4096ff;
      margin-right:30px;
    }
  }
</style>
