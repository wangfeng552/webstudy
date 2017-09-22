<template>
  <div class="projectDtl" v-if="project">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'project' }">项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>上海张江国家自主创新示范区专项发展资金</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="project">
      <!--项目表头-->
      <div class="project-brief">
        <div class="left-box">
          <div class="title">
            <span class="number">项目名称</span>
            <span class="name">项目编号</span>
            <span class="client">项目状态</span>
            <span class="corp">企业负责人</span>
            <span class="source">项目负责人</span>
            <span class="date">项目经办人</span>
          </div>
          <div class="content">
            <span class="apply-year" v-if="project.year!=null">{{project.year}}年申报</span>
            <p class="number">{{project.service}}<br><span class="corp-name">{{project.corp.name}}</span></p>
            <p class="name">
              <span class="online" v-if="project.source == 'online'"><i class="online-ico"></i><i>线上项目</i></span>
              <span class="offline" v-else><i class="offline-ico"></i><i>线下项目</i></span>
              <span class="project-no">{{project.no}}</span>
            </p>
            <p class="client"><span>{{project.process_stage}}</span><span class="audit_status" v-if="project.audit_status!=null">{{project.audit_status}}</span><span class="audit_status" v-if="project.audit_status==null">--</span></p>
            <p class="corp"v-if="project.corp_principal_name!=null">{{project.corp_principal_name}}</p>
            <p class="corp" v-else>{{project.corp_principal_name}}</p>
            <p class="source">{{project.owner_name}}</p>
            <p class="date" v-if="project.agent_name!=null">{{project.agent_name}}</p>
            <p class="date" v-if="project.agent_name==null">--</p>
          </div>
        </div>
        <div class="right-box">
          <p @click="contractVisible = true">
            <i class="contract"></i>
            <span>联系人</span>
          </p>
          <el-dialog title="联系人" :visible.sync="contractVisible">
            <p><i class="icon-location"></i>
              <span class="tit">办公地址：</span><span>{{project.corp.office_address}}</span>
            </p>
            <el-table
              :data="contracts"
              style="width: 100%">
              <el-table-column
                label="联系人"
                width="180">
                <template scope="scope">
                  <span>{{scope.row.name}}</span>
                  <i class="default" v-show="scope.row.is_default">默认</i>
                </template>
              </el-table-column>
              <el-table-column
                prop="position"
                label="职位"
                width="180">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="固定电话">
              </el-table-column>
              <el-table-column
                label="邮箱">
                <template scope="scope">
                  <span v-show="scope.row.email=='unset'">未设置</span>
                  <span v-show="scope.row.email!='unset'">{{scope.row.email}}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-dialog>
          <router-link :to="{name:'fileList',params:{id:this.$route.params.id,stage_id:this.$route.params.stage_id}}">
            <p>
              <i class="person"></i>
              <span>文件库</span>
            </p>
          </router-link>

        </div>
      </div>
      <!--备注功能-->
      <div class="remarks">
          <div class="remarks_top" @click.stop="remarksListShow">
             <div class="remarks_left">
               <img src="../../../assets/images/project/beizhuicon.png" height="30" width="30">
               <span class="remarks_item1">项目备注</span>
               <span class="remarks_item2">用于服务商内部工作沟通，仅服务商工作人员可见</span>
             </div>
             <div class="remarks_right">
               <span class="number_remarks">{{project.notes_count}}条备注</span>
             </div>
          </div>
          <!-- 备注列表 -->
          <ul class="remarks_list" v-show="remarksList">
            <li v-for="v in operationList">
              <p class="listTopInfo">{{v.user_name}} | {{v.created_at | formatDate}}</p>
              <p class="listCont" v-html="wrap(v.content)"></p>
            </li>
            <div class="noneRemarks" v-show="noneShow"><img src="../../../assets/images/project/jinggaocion.png" height="15" width="14">暂无任何留言</div>
          </ul>
          <div class="stopList" v-show="stopListShow" @click.stop="whiteJiantou">
              <div class="sanjiao"></div>
          </div>
      </div>
      <!--项目详情-->
      <div class="project-detail clearfix">
        <div class="tab">
          <!--关闭和超级功能按钮-->
          <i class="close-btn" @click="firstDialog = true" @mouseover="closeTipShow" @mouseleave="closeTipHide" v-show="closeBtn&&project.status!='finished'"></i>
          <transition name="fade">
            <div class="super-tip close-tip" v-show="closeTip"><span>项目终止</span></div>
          </transition>
          <i class="super-btn" @mouseover="superTipShow" @mouseleave="superTipHide" @click.stop="boxShow=true"></i>
          <transition name="fade">
          <div class="super-tip" v-show="superTip"><span>超级功能</span></div>
          </transition>
          <div class="super-box" v-show="boxShow">
            <ul>
              <li v-for="(v,i) in superStage" @click="chooseState(v)" :class="{'forbidden':forbiddenIndex===i||stageCategory=='finished'||openAgain}" >{{v.name}}</li>
            </ul>
          </div>
          <el-tabs v-model="activeName" @tab-click="getFee">
            <el-tab-pane label="项目实施" name="first">
              <div>
                <!--项目详情左侧阶段栏-->
                <div class="project-nav">
                  <ul>
                    <li v-for="(v,i) in project.stages" @click="toggle(i,v.id,v.status)">

                      <router-link :to="{name:'serviceApply',params:{stage_id:v.id}}" active-class="active" v-if="(v.children=='')&&(v.status!='unactive')&&!v.is_lock">{{v.name}}</router-link>
                      <a v-if="v.children!=''&&v.status!='unactive'&&!v.is_lock" class="cp" @click="fixProcess(v,i)">{{v.name}}</a>
                      <a v-if="v.status=='unactive'&&!v.is_lock">{{v.name}}</a>
                      <span class="circle" :class="v.status | chooseState"></span>
                      <ul class="children" v-show="childShow(i)">
                        <li v-for="(child,row) in v.children" @click.stop="chooseChild(row,child.status)">
                          <router-link :to="{name:'serviceApply',params:{stage_id:child.id}}" active-class="active" v-if="child.status!='unactive'">{{child.name}}
                          </router-link>
                          <a v-if="child.status=='unactive'">{{child.name}}</a>
                          <span class="circle" :class="child.status | chooseState"></span>
                        </li>
                      </ul>
                    </li>
                  </ul>


                </div>
                <!--项目详情右侧路由-->
                <div class="project-content">
                  <router-view></router-view>
                </div>
              </div>
            </el-tab-pane>
            <!--费用支付-->
            <el-tab-pane label="费用支付" name="second">
              <div class="xsx_list_none" v-if="!tickets.length"></div>
              <div class="big-gd" v-else>
                <div class="gd-box mt10" v-for="v in tickets" v-if="v.status=='two'&&v.trade!=null">
                  <div class="title">
                    <i class="tit-fqzf"></i>
                    <span class="describe">企业付款</span>
                    <div class="status bgf1b">
                      <i class="icon-status icon-having"></i>
                      <span>等待企业支付</span>
                    </div>
                  </div>
                  <div class="content">
                    <p class="fs14 fc1b1">实际费用<span class="fce65 fs20 ml10">{{v.fee_value}}</span>元
                      <span class="fr mt5" v-if="v.trade!=null&&v.trade.iner_id!=null">支付流水号<span class="ml10">{{v.trade.iner_id}}</span></span>
                    </p>
                    <p class="grey-border"></p>

                    <p class="detail">
                      <i class="icon-remarks"></i>
                      <span>{{v.content}}</span>
                    </p>
                    <p class="fs14 fc5c5 mt20">支付状态<span class="fc3c8 ml10">待支付</span></p>
                    <p class="fs14 fc5c5 mt20">创建时间<span v-if="v.created_at!=null" class="ml10">{{v.created_at|formatDate}}</span></p>
                  </div>
                </div>
                <div class="gd-box" v-if="v.status=='three'&&v.trade!=null" v-for="v in tickets">
                  <div class="title">
                    <i class="tit-fqzf"></i>
                    <span class="describe">企业付款</span>
                    <div class="status bg55b">
                      <i class="icon-status icon-yes"></i>
                      <span>已支付</span>
                    </div>
                  </div>
                  <div class="content">
                    <p class="fs14 fc1b1">实际费用<span class="fce65 fs20 ml10">{{v.fee_value}}</span>元
                      <span class="fr mt5">支付流水号<span v-if="v.trade!=null&&v.trade.iner_id!=null" class="ml10">{{v.trade.iner_id}}</span></span>
                    </p>
                    <p class="grey-border"></p>

                    <p class="detail">
                      <i class="icon-remarks"></i>
                      <span>{{v.content}}</span>
                    </p>
                    <p class="fs14 fc5c5 mt20">
                      <span class="pay-state">支付状态<span class="fc3c8 ml10">付款成功</span></span>
                      <span class="mr10">支付方式</span><span v-if="v.trade.category=='wechatpay'">微信支付</span>
                      <span v-if="v.trade.category=='offline'">银行汇款</span>
                      <span v-if="v.trade.category=='alipay'">支付宝</span>
                    </p>
                    <p class="fs14 fc5c5 mt20">
                      <span class="pay-state">创建时间<span v-if="v.created_at!=null" class="ml10">{{v.created_at|formatDate}}</span></span>
                      <span>支付时间<span v-if="v.trade!=null&&v.trade.pay_at!=null" class="ml10">{{v.trade.pay_at|formatDate}}</span></span>
                    </p>
                  </div>
                </div>
              </div>

            </el-tab-pane>
          </el-tabs>
        </div>
        </div>
      </div>
    <!--关闭确认框-->
    <div class="first-dialog">
      <el-dialog
        title="提示"
        :visible.sync="firstDialog"
        size="tiny"
      >
        <div class="el-message-box__status el-icon-warning"></div>
        <div class="el-message-box__message" style="margin-left: 50px;">
          <p>关闭后整个项目将终止，同时也无法恢复！</p>
          <p>确认关闭项目吗？</p>

        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="firstDialog = false">取 消</el-button>
    <el-button type="primary" @click="closeProject()">确 定</el-button>
  </span>
      </el-dialog>
    </div>
    <!--关闭理由发送框-->
    <div class="close-dialog">
      <el-dialog title="终止项目" :visible.sync="closeDialog" size="tiny" :show-close="false">
        <el-form :model="sendReason" :rules="rules" ref="sendReason" label-width="100px" class="demo-ruleForm">
          <i class="el-icon-close" @click="dialogClose('sendReason')"></i>
          <el-form-item label="原因类型" prop="type">
            <el-select v-model="sendReason.type" placeholder="请选择活动区域">
              <el-option label="企业条件欠缺" value="企业条件欠缺"></el-option>
              <el-option label="企业提出终止" value="企业提出终止"></el-option>
              <el-option label="企业未主动配合" value="企业未主动配合"></el-option>
              <el-option label="项目申报失败" value="项目申报失败"></el-option>
              <el-option label="其他原因" value="其他原因"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体原因" prop="reason">
            <el-input type="textarea" v-model="sendReason.reason" placeholder="请输入具体原因"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogClose('sendReason')">取消</el-button>
            <el-button type="primary" @click="submitReason('sendReason')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--重新开启项目理由发送框-->
    <div class="reopen-dialog">
      <el-dialog title="重新开启项目" :visible.sync="reopenDialog" size="tiny" :show-close="false">
        <el-form :model="reopenReason" :rules="rules" ref="reopenReason" label-width="100px" class="demo-ruleForm">
          <i class="el-icon-close" @click="dialogClose('reopenReason')"></i>
          <el-form-item label="申请者">
            {{project.current_operater}}
          </el-form-item>
          <el-form-item label="原因类型" prop="type">
            <el-select v-model="reopenReason.type" placeholder="请选择">
              <el-option label="服务商人员误操作" value="服务商人员误操作"></el-option>
              <el-option label="服务双方协商重新开启" value="服务双方协商重新开启"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体原因" prop="reason">
            <el-input type="textarea" v-model="reopenReason.reason" placeholder="请输入具体原因"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="dialogClose('reopenReason')">取消</el-button>
            <el-button type="primary" @click="submitReopenReason('reopenReason')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  import {formatDate,wrap} from 'assets/js/filter'

  export default{
    data(){
      return {
        rules: {
          type: [
            {required: true, message: '请填写原因类型', trigger: 'change'},
          ],
          reason: [
            {required: true, message: '请填写具体原因', trigger: 'blur'},
          ],
          remarksContent: [{required: true, message: '请填写备注内容', trigger: 'blur'}]
        },
        activeName: 'first',
        project: '',
        contracts:[],
        router: {},
        slideDown: '',
        currentIndex: '',
        contractVisible: false,//查看联系人
        tickets:'',//获取支付数据
        superTip:false,//超级功能小tip的出现
        closeTip:false,//关闭功能小tip的出现
        boxShow:false,//超级功能选择框的出现
        superStage:[
          {name:'重新开启上一阶段'},
          {name:'重新开启项目内容'},
        ],
        firstDialog:false,
        closeDialog:false, //关闭项目
        sendReason:{      //关闭项目原因
          type:'',
          reason:''
        },
        reopenDialog:false, //重新开启项目
        reopenReason:{
          type:'',
          reason:''
        },
        row: "",
        closeStatus:false,//关闭项目的状态
        closeBtn:true,//关闭按钮的显示
        openAgain:false,
        stageIndex:0,
        remarksList:false,//备注列表
        dialogFormVisible: false,//备注弹框
        form:{
           remarksContent:'',//备注填写的内容
        },
        stopListShow:false,
        noneShow:false,//暂无留言
        addbeizhu:false,//添加是否显示
        current_operater_id:'',//当前操作人ID
        operationList:[],//备注列表
      }
    },
    created(){
      this.getProject()
      this.getContracts()
      this.getFee()
    },

    computed:{
      ...mapGetters(["nextStep","closeState","stageCategory","stageStatus"]),
      forbiddenIndex(){
        if(this.closeState == true){
        	return 0
        }else if(this.closeState == false){
        	return 1
        }
      }
    },
    mounted(){
      document.addEventListener('click',  this.hideOnClickDocument, false);
    },
    methods: {
      //删除已经禁用的lock
      sortLockStage(){
        for (var i=0;i< this.project.stages.length;i++){
          var item_par = this.project.stages[i];
          if(item_par.is_lock){this.project.stages.splice(i, 1);i--;continue}
        }
      },
    	//获取项目详情
      getProject(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id
        ).then((res) => {
          this.project = res.body.project
          this.sortLockStage()
          this.$store.dispatch('projectStatus',this.project.status)
          this.$store.dispatch('projectSource', this.project.source)
          this.$store.dispatch('projectImf', this.project)
          if(this.project.status=="finished"){
            this.$store.dispatch('closeState',  true)
            this.$store.dispatch('stageCategory', 'finished')
          }else{
          	if(this.project.stages[0].status=='process'){
              this.$store.dispatch('closeState',  true)
              this.$store.dispatch('stageCategory', '')
              this.openAgain = true
            }else{
              this.$store.dispatch('closeState',  false)
              this.$store.dispatch('stageCategory', '')
              this.openAgain = false
            }

          }
          if(this.project.status=="stop"||this.project.status=="deny"){
            this.closeBtn=false
            this.$store.dispatch('closeState',  true)
          }
          this.initIndex()
        })
      },
      //获取联系人信息
      getContracts(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id+'/contacts'
        ).then((res) => {
          this.contracts = res.body.contacts
        })
      },
      //初始化 当前阶段的值
      initIndex(){
        var section = -100;
        var row = -100;
        this.project.stages.forEach(function (item,index) {
          if(item.status == 'process'){
            section = index;
            item.children.forEach(function (item_ch,index_ch) {
              if(item_ch.status == 'process'){
                row = index_ch;
              }
            })
          }
        })
        if(section>=0) this.currentIndex = section;
        if(row>=0) this.row = row;
        if(section == -100 && row == -100){
          var item =  this.project.stages[this.project.stages.length-1];
          if(item.category == 'finished' && item.status == 'finished') section = this.project.stages.length-1;
        }
      },

      toggle(i,state_id,status){

        if(status!='unactive'){
          this.currentIndex = i
          this.childShow()
        }
        if(status!='process'){
          if(this.project.status=='stop'){
            this.openAgain = false
          }else{
            this.openAgain = true
          }
        	this.closeStatus = true
          this.$store.dispatch('closeState',this.closeStatus)
        }else{
          this.openAgain = false
          this.closeStatus = false
          this.$store.dispatch('closeState',this.closeStatus)
        }
      },
      // 点击子阶段
      chooseChild(row, status){

        if(status!='unactive'){
          this.row = row;
        }
        if(status!='process'){
          if(this.project.status=='stop'){
            this.openAgain = false
          }else{
            this.openAgain = true
          }
          this.closeStatus = true
          this.$store.dispatch('closeState',this.closeStatus)
        }else{
        	this.openAgain = false
          this.closeStatus = false
          this.$store.dispatch('closeState',this.closeStatus)
        }

      },
      childShow(i){
        return i == this.currentIndex
      },
      //点击侧边栏定位到正在进行中的子阶段
      fixProcess(item,i){
        item.children.forEach((v)=>{
          if(v.status=="process"){
            this.$router.push({name:'serviceApply',params:{stage_id:v.id}})
          }
        })

      },
      //获取支付费用
      getFee(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id+'/pay_tickets'
        ).then((res) => {
          this.tickets = res.body.tickets
        })
      },
      //超级按钮和关闭按钮的hover效果
      superTipShow(){
         this.superTip = true
      },
      superTipHide(){
      	this.superTip = false
      },
      closeTipShow(){
        this.closeTip = true
      },
      closeTipHide(){
        this.closeTip = false
      },

      //超级按钮状态选择
      chooseState(state){
      	if(state.name=="重新开启项目内容"){
          if(this.stageStatus=='stop'||this.stageStatus=='deny'){
            this.$store.dispatch('stageStatus', 'process')
          }
      		this.reopenDialog = true
        }else if(state.name=="重新开启上一阶段"){
          this.$http.patch(API.url + 'projects/'+this.$route.params.id+'/stages/'+this.$route.params.stage_id+'/back',{}
          ).then((res) => {
            this.getProject()
            if(typeof(this.row) != "number" ){
              this.row = -100;
            }
            if(typeof(this.currentIndex) != "number" ){
              this.currentIndex = 0;
            }
            if(this.row>=0){//在子阶段
              var item =  this.project.stages[this.currentIndex];
              if(this.row==0){
                var obj = this.project.stages[this.currentIndex-1];
                this.currentIndex--;
                if(obj.children.length>0){
                  var target = obj.children[obj.children.length-1];
                  this.$router.push({name:'serviceApply',params:{stage_id:target.id}});
                  this.row = obj.children.length-1
                }else{
                  this.row = -100;
                  this.$router.push({name:'serviceApply',params:{stage_id:obj.id}});
                }
              }else{
                this.row--;
                var children = item.children[this.row];
                var stage_id = children.id;
                this.$router.push({name:'serviceApply',params:{stage_id:stage_id}});
              }
            }else{
              var item =  this.project.stages[this.currentIndex-1];
              this.currentIndex --;
              if(item.children !== undefined && item.children.length>0){
                var child = item.children[item.children.length-1];
                this.$router.push({name:'serviceApply',params:{stage_id:child.id}});
                this.row= item.children.length-1;
              }else {
                this.$router.push({name:'serviceApply',params:{stage_id:item.id}});
              }
            }


          },(error)=>{

          })
        }
        this.boxShow = false
      },
      hideOnClickDocument(e){
        this.boxShow = false
      },
      //关闭项目
      closeProject(){
        this.closeDialog = true
        this.sendReason.type = '企业条件欠缺'
        this.sendReason.reason = ''
      },
      handleClose(){
        this.firstDialog  = false
        this.closeDialog  = false
      },
      dialogClose(formName){
        this.closeDialog  = false
        this.firstDialog  = false
        this.reopenDialog = false
        this.$refs[formName].resetFields();
      },
      submitReason(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.patch(API.url + 'projects/' + this.$route.params.id + '/close',
              {close_type: this.sendReason.type, close_reason: this.sendReason.reason}
            ).then((res) => {
              this.$message({
                message: '关闭成功',
                type: 'success'
              });
              this.project = res.body.project;
              //把项目状态存入vuex
              this.$store.dispatch('projectStatus',this.project.status)
              //判断超级按钮是否可以开启上一阶段
              this.closeStatus = true
              this.$store.dispatch('closeState',this.closeStatus)
              this.firstDialog  = false
              this.closeDialog  = false
              //关闭项目后关闭按钮消失
              this.closeBtn = false
              //打开超级按钮限制
              this.openAgain = false
              this.$refs[formName].resetFields();
            }).catch((error) => {
              this.$message({
                message: '关闭失败',
                type: 'warning'
              });

            })
          }
        })
      },
      //重新开启项目
      submitReopenReason(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.patch(API.url + 'projects/' + this.$route.params.id + '/reopen',
              {close_type: this.sendReason.type, close_reason: this.sendReason.reason}
            ).then((res) => {
              this.$message({
                message: '重新开启成功',
                type: 'success'
              });
              this.project = res.body.project;
              //把项目状态存入vuex
              this.$store.dispatch('projectStatus',this.project.status)
              this.sortLockStage()

              this.reopenDialog  = false
              //判断超级按钮是否可以开启上一阶段
              //判断阶段是否进行中，已经完成的，超级按钮失效，进行中的可以返回上一步
              if(this.stageStatus!='process'){
                this.closeStatus = true
                this.openAgain = true
                this.$store.dispatch('closeState',this.closeStatus)
              }else{
                this.closeStatus = false
                if(this.project.stages[0].status=='process'){
                  this.$store.dispatch('closeState',this.closeStatus)
                  this.openAgain = true
                }else{
                  this.$store.dispatch('closeState',this.closeStatus)
                  this.openAgain = false
                }
              }


              //重新开启项目后关闭按钮出现
              this.closeBtn = true
              this.$refs[formName].resetFields();

            }).catch((error) => {
              this.$message({
                message: '重新开启失败',
                type: 'warning'
              });
            })
          }
        })
      },
      //开启下一步
      goToNextStep(){
        this.getProject()
        if(typeof(this.row) != "number" ){
          this.row = -100;
        }
        if(typeof(this.currentIndex) != "number" ){
          this.currentIndex = 0;
        }
        if(this.row>=0){  //在子集中
          var item =  this.project.stages[this.currentIndex];
          if(item.children.length-1 == this.row){ //最后一个
            var obj = this.project.stages[this.currentIndex+1];
            this.currentIndex++;
            if(obj.children.length>0){ // 有子集
              var target = obj.children[0];
              this.row = 0;
              var stageProcess = target.category
              this.$store.dispatch('stageCategory',stageProcess)
              this.$router.push({name:'serviceApply',params:{stage_id:target.id}});
            }else { // 无子集
              this.row = -100;
              var stageProcess = obj.category
              this.$store.dispatch('stageCategory',stageProcess)
              this.$router.push({name:'serviceApply',params:{stage_id:obj.id}});
            }
          }else {
            this.row++;
            var children = item.children[this.row];
            var stage_id = children.id;
            var stageProcess = children.category
            this.$store.dispatch('stageCategory',stageProcess)
            this.$router.push({name:'serviceApply',params:{stage_id:stage_id}});
          }
        }else { // 在主阶段
          var item =  this.project.stages[this.currentIndex+1];
          this.currentIndex ++;
          if(item.children !== undefined && item.children.length>0){
            var child = item.children[0];
            this.$router.push({name:'serviceApply',params:{stage_id:child.id}});
            this.row= 0;
          }else {
            var stageProcess = item.category
            this.$store.dispatch('stageCategory',stageProcess)
            this.$router.push({name:'serviceApply',params:{stage_id:item.id}});
          }
        }
      },
      //缩放备注列表
      remarksListShow(){
        this.remarksList = !this.remarksList
        this.stopListShow = !this.stopListShow
        if (this.remarksList == true) {
          this.getRemarksList()
        }
      },
      whiteJiantou(){
        this.remarksList = false
        this.stopListShow = !this.stopListShow
      },
      //添加 出现弹框
      addRemarks(){
        this.dialogFormVisible = true
        this.form.remarksContent = ''
      },
      //获取备注列表
      getRemarksList() {
        this.$http.get(API.url + 'projects/'+this.$route.params.id+'/notes'
        ).then((res) => {
          this.operationList = res.body.notes
          this.dialogFormVisible = false
          this.dialogVisible = true
          if (res.body.notes == '') {
            this.noneShow = true
          }else{
            this.noneShow = false
          }
        })
      },
      //换行转换
      wrap(val){
        val = val.replace(/\r?\n/g,"<br/>");
        return val;
      }
    },
    filters:{
      chooseState(state){
        if(state=='process'){
          return 'circle-orange'
        }else if(state=='complete'){
          return 'circle-green'
        }else if(state=='deny'||state=='stop'){
          return 'circle-red'
        }else if(state=='unactive'){
          return ''
        }
      },
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      },
      wrap(val){
        return wrap(val)
      }
    },
    watch:{
      'nextStep':'goToNextStep'
    }
  }

</script>
<style lang="scss" rel="stylesheet/scss">
  .close-dialog, .reopen-dialog{
    .el-icon-close{
      position: absolute;
      top:20px;
      right:20px;
      color: #bfcbd9;
      cursor: pointer;
      font-size:16px;
      &:hover{
        color: #20a0ff;
      }
    }
  }
  .first-dialog{
    .el-dialog--tiny{
      width:450px;
    }
    .el-message-box__status{
      top:44%;
    }
  }
  .project-detail{
    position: relative;

    .el-tabs__item{
      width:150px;
      height:57px;
      line-height:57px;
      font-size:16px;
      text-align: center;
      color:#1b1b1b;
    }
    .el-tabs__active-bar{
      height: 2px;
      background-color: #3c8ced;
    }
    .el-tabs__item.is-active{
      color:#3c8ced;
    }
    .el-tabs__header{
      width:1000px;
    }
    a.close-btn {
      position: absolute;
      top: 25px;
      right: 20px;
      display: inline-block;
      width: 102px;
      height: 33px;
      line-height: 29px;
      padding-left: 12px;
      border: 1px solid #e65c5c;
      border-radius: 2px;
      font-size: 14px;
      color: #e65c5c;
      cursor: pointer;
    }
    i.close {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("../../../assets/images/project/close.png") no-repeat 0/cover;
      vertical-align: middle;
      margin-right: 3px;
      margin-top: -2px;
    }
    i.close-btn{
      position: absolute;
      top: 25px;
      right: 0;
      display: inline-block;
      width:24px;
      height:24px;
      background: url("../../../assets/images/project/close-btn.png") no-repeat;
      cursor: pointer;
    }
     i.super-btn{
      position: absolute;
      top: 25px;
      right: 40px;
      display: inline-block;
      width:24px;
      height:24px;
      background: url("../../../assets/images/project/super-btn.png") no-repeat;
      cursor: pointer;
    }
    .super-tip{
      position: absolute;
      top: -10px;
      right: 12px;
      width:76px;
      height:43px;
      line-height:28px;
      background: url("../../../assets/images/project/super-tip.png") no-repeat;
      text-align: center;
      color: #FFFFFF;
      font-size:12px;
      span{
        margin-left:-4px;
      }
    }
    .close-tip{
      right: -28px;
    }
    .super-box{
      position: absolute;
      top:50px;
      right:18px;
      width:134px;
      height:75px;
      padding: 11px 0 0 5px;
      background: url("../../../assets/images/project/super-box.png") no-repeat;
      z-index:1;
      ul{
        li{
          width:120px;
          height:25px;
          line-height:25px;
          text-align: center;
          font-size:12px;
          cursor: pointer;
          color: #5c5c5c;
          &:hover{
            background: #D8E8FB;
          }
        }
        li.forbidden{
          color: #ccc;
          pointer-events: none;
          cursor: default;
        }
      }
    }

  }
  .project {
    padding-top: 17px;
    padding-left: 20px;
    .el-breadcrumb {
      margin-bottom: 0;
    }
    .el-breadcrumb:after {
      height: 0;
    }
    .project-brief {
      min-height:140px;
      margin-bottom: 20px;
      .left-box {
        float: left;
        width: 980px;
        border-right: 1px solid #efefef;
        height: 138px;
        border: 1px solid #efefef;
        box-shadow: 2px 2px 6px #ccc;

        /*margin-right:10px;*/
        background: #FFFFFF;
        .title {
          height: 40px;
          line-height: 38px;
          background: #e1efff;
        }
        .content {
          min-height:100px;
          position: relative;
          padding-top:30px;
          .apply-year{
            position: absolute;
            top:0;
            left:0;
            display: inline-block;
            height:18px;
            width:94px;
            text-align: center;
            line-height:18px;
            color: #FFFFFF;
            font-size:12px;
            background:url("../../../assets/images/project/apply-year.png") no-repeat;
          }
          .number, .name, .client, .type {
            padding-right: 40px;
          }
        }
        .title, .content {
          p {
            float: left;
            color: #1b1b1b;
            font-size: 12px;
            color: #5c5c5c;

          }
          span {
            float: left;
            display: inline-block;
            color: #1b1b1b;
            font-size: 12px;
            text-align: left;
          }
          .number {
            padding-left: 20px;
            width: 327px;
            color: #5c5c5c;
            font-size:14px;
            .corp-name{
              color: #999;
              font-size:12px;
              margin-top:2px;
            }
          }
          .name {
            width: 152px;
            i{
              vertical-align: middle;
            }
            .online{
              color: #5c5c5c;
            }
            .offline{
              color: #5c5c5c;
            }
            .online-ico{
              display: inline-block;
              width:14px;
              height:11px;
              background: url("../../../assets/images/project/projecticon1.png") no-repeat;
              vertical-align: middle;
              margin-right:3px;
            }
            .offline-ico{
              display: inline-block;
              width:14px;
              height:14px;
              background: url("../../../assets/images/project/projecticon2.png") no-repeat;
              vertical-align: middle;
              margin-right:3px;
            }
            .project-no{
              color: #999;
              width:100%;
              margin-top:2px;
            }
          }
          .client {
            width: 210px;
            .audit_status{
              display: inline-block;
              color: #999;
              margin-top:2px;
              margin-top:2px;
              width:100%;
            }
          }
          .corp{
            width:100px;
          }
          .source {
            width: 100px;
          }
          .date {
            width: 89px;
          }

        }
      }
      .right-box {
        float: right;
        width: 170px;
        height: 138px;
        padding: 40px 0 0 54px;
        background: #FFFFFF;
        border: 1px solid #efefef;
        box-shadow: -1px 2px 6px #ccc;

        .contract {
          display: inline-block;
          width: 13px;
          height: 15px;
          background: url("../../../assets/images/project/pro-people.png") no-repeat 0/cover;
          vertical-align: middle;

        }
        .person {
          display: inline-block;
          width: 14px;
          height: 15px;
          background: url("../../../assets/images/project/pro-file.png") no-repeat 0/cover;
          vertical-align: middle;

        }
        p {
          margin-bottom: 10px;
        }
        span {
          font-size: 14px;
          color: #5c5c5c;
        }
        //地址报错的时候给select添加样式
        .red-box {
          select {
            border: 1px solid red;
          }
        }
      }

    }
    .project-nav {
      margin-top: 10px;
      float: left;
      background: #ffffff;
      box-shadow: 2px 2px 9px 3px rgba(236, 236, 236, 0.50);
      width: 208px;
      margin-right: 18px;
      .circle {
        position: absolute;
        top: 22px;
        right: 20px;
        width: 8px;
        height: 8px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
      .circle-orange {
        border: 1px solid #ffffff;
        background: rgba(255, 170, 1, 1.00);
      }
      .circle-red {
        border: 1px solid #ffffff;
        background: #e65c5c;
      }
      .circle-green {
        border: 1px solid #ffffff;
        background: #4bad6b;
      }

      li {
        position: relative;
        line-height: 48px;
        padding: 0;
        background: #FFFFFF;
        a {
          height: 48px;
          display: inline-block;
          padding-left: 44px;
          font-size: 14px;
          color: #5c5c5c;
          height: 100%;
          width: 100%;
          border-bottom: 1px solid #f5f5f5;
          &.active {
            transition: background-color .3s, color .3s;
            background: #3c8ced;
            color: #FFFFFF;
          }
        }
        .children {
          li {
            height: 48px;
            line-height: 48px;
            padding: 0;
            background: #FFFFFF;
            a {
              display: inline-block;
              padding-left: 64px;
              font-size: 14px;
              color: #5c5c5c;
              height: 100%;
              width: 100%;
              border-bottom: 1px solid #f5f5f5;
              &.active {
                transition: background-color .3s, color .3s;
                background: #3c8ced;
                color: #FFFFFF;
              }
            }
          }
        }
      }
    }
    .remarks{
      min-height: 60px;
      border: 1px solid #e2e2e2;
      box-shadow: 0 0px 4px 1px rgba(0, 0, 0, 0.1);
      background:#fff;
      margin-bottom: 20px;
      cursor: pointer;
      position:relative;
      .el-dialog__header{
        height: 48px;
        background: #e6e6e6;
        line-height: 48px;
        padding:0;
        border-radius:3px 3px 0 0;
        border-bottom: 1px solid #ccc;
        .el-icon-close{
          display: none;
        }
        .el-dialog__title{
          color: #666;
        }
      }
      .el-dialog--small{
        width: 458px;
        border-radius:3px;
        border: 1px solid #ccc;
      }
      .remarks_top{
        padding: 15px 20px 15px;
        overflow: hidden;
        zoom:1;
      }
      .remarks_left{
        float: left;
        .remarks_item1{
          font-size: 14px;
          color: #5c5c5c;
          margin-left: 10px;
        }
        .remarks_item2{
          font-size: 12px;
          color: #999999;
          margin-left: 8px;
        }
      }
      .remarks_right{
          float: right;
          position:relative;
          top: 3px;
          .number_remarks{
            font-size: 14px;
            color: #999;
            margin-right: 15px;
          }
          .add_remarks{
            font-size: 14px;
            color: #3C8CED;
            cursor: pointer;
          }
      }
      .stopList{
        width: 60px;
        height: 10px;
        background:#3C8CED;
        position:absolute;
        left: 50%;
        bottom: 0;
        margin-left: -30px;
        border-radius: 3px 3px 0 0;
        .sanjiao{
          width: 0;
          height: 0;
          border-left: 3px solid transparent;
          border-right: 3px solid transparent;
          border-bottom: 6px solid #fff;
          margin: 2px auto;
        }
      }
      .remarks_list{
        max-height: 500px;
        min-height:80px;
        border-top: 1px solid #ccc;
        margin: 0 0 20px;
        overflow: auto;
        position: relative;
        .noneRemarks{
          text-align:center;
          font-size: 14px;
          color: #5C5C5C;
          margin-top: 36px;
          img{
            vertical-align:sub;
            margin-right: 5px;
          }
        }
        li{
          padding: 10px 28px;
        }
        li:nth-of-type(even){
          background:#fafafa;
          border-top: 1px solid #f0f0f0;
          border-bottom: 1px solid #f0f0f0;
        }
        .listTopInfo{
          font-size: 12px;
          color: #999;
        }
        .listCont{
          font-size:12px;
          color: #5c5c5c;
          margin-top: 10px;
          line-height: 20px;
        }
      }
    }
    .project-content {
      float: left;
      width: 930px;
      margin-top: 10px;
    }

  }

</style>
