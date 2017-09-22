<template>
  <div class="project" v-if="project">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{name:'projectList'}" v-if="this.$route.query.name=='项目管理'">{{this.$route.query.name}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'toDoList'}" v-if="this.$route.query.name=='待办事项'">{{this.$route.query.name}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{project.service}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="project-brief">
      <div class="left-box">
        <div class="title">
          <span class="number">项目名称</span>
          <span class="name">项目编号</span>
          <span class="client">项目状态</span>
          <span class="source">企业负责人</span>
          <span class="source">项目负责人</span>
          <span class="date">项目经办人</span>
        </div>
        <div class="content">
          <div v-if="project.year == null">
            <span class="shenbao" style="display:none;"></span>
          </div>
          <div v-else>
            <span class="shenbao">{{project.year}}年申报</span>
          </div>
          <p class="number">{{project.service}}<br><span class="corp-name">{{project.corp.name}}</span></p>
          <p class="name">
            <span class="online" v-if="project.source == 'online'"><i class="online-ico"></i><i>线上项目</i></span>
            <span class="offline" v-else><i class="offline-ico"></i><i>线下项目</i></span>
            <span class="project-no">{{project.no}}</span>
          </p>
          <p class="client"><span>{{project.process_stage}}</span><span class="audit_status" v-if="project.audit_status!=null">{{project.audit_status}}</span><span class="audit_status" v-if="project.audit_status==null">--</span></p>
          <p class="source">{{project.corp_principal_name}}</p>
          <p class="source">{{project.owner_name}}</p>
          <p class="date" v-if="project.agent_name!=null">{{project.agent_name}}</p>
          <p class="date" v-if="project.agent_name==null">--</p>
        </div>
      </div>
      <div class="right-box">
        <p @click="contractVisible = true" class="cp">
          <i class="contract"></i>
          <span>联系人</span>
        </p>
        <!--联系人弹框-->
        <el-dialog title="联系人" :visible.sync="contractVisible">
          <div class="contract-outer">
            <el-form :model="corps" :rules="rules" ref="corps">
              <div style="margin-bottom:26px;"><i class="icon-location fl"></i>
                <span class="tit fl">办公地址：</span>
                <span class="fl" v-show="revise">{{project.corp.office_address}}</span>
                <div class="choose-box" v-show="!revise" v-bind:class="{'red-box':errorShow}">
                  <v-distpicker :placeholders="placeholders" :province="select.province" :city="select.city"
                                :area="select.area"
                                @province="selectProvince" @city="selectCity" @area="selectArea">
                  </v-distpicker>
                  <p v-show="errorShow" class="error-show">请选择省市区</p>
                  <el-form-item prop="office_location">
                    <el-input v-model="corps.office_location" placeholder="街道  门牌  建筑名  房间号"
                              class="address"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <span class="custom-btn" @click="reviseCancel()">取消</span>
                    <span @click="submitForm('corps')" class="primary-btn">确定</span>
                  </el-form-item>
                </div>
                <span class="revise ml20" @click="reviseAddress" v-show="revise">修改</span>
              </div>
            </el-form>
            <el-form :model="modify" :rules="rules1" ref="modify">
              <el-table
                :data="contracts"
                style="width: 100%">
                <el-table-column
                  label="联系人"
                  width="130">
                  <template scope="scope">
                  <span v-show="completeEdit(scope.$index)||(scope.row.disabled ==true)">
                     <div class="fl">{{scope.row.name}}</div>
                     <i class="default fl" v-show="scope.row.is_default">默认</i>
                  </span>
                    <div v-show="!completeEdit(scope.$index)&&(scope.row.disabled ==false)">
                      <el-form-item prop="name">
                        <el-input v-model="modify.name"></el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="职位"
                  width="130">
                  <template scope="scope">
                    <div v-show="completeEdit(scope.$index)||(scope.row.disabled ==true)" class="fl">{{scope.row.position}}</div>
                    <div v-show="!completeEdit(scope.$index)&&(scope.row.disabled ==false)">
                      <el-form-item>
                        <el-input v-model="modify.position"></el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="手机"
                  width="140"
                >
                  <template scope="scope">
                    <div v-show="completeEdit(scope.$index)||(scope.row.disabled ==true)">{{scope.row.mobile}}</div>
                    <div v-show="!completeEdit(scope.$index)&&(scope.row.disabled ==false)" class="fl">
                      <el-form-item prop="mobile">
                        <el-input v-model="modify.mobile"></el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="固定电话">
                  <template scope="scope">
                    <div v-show="completeEdit(scope.$index)||(scope.row.disabled ==true)"> {{scope.row.phone}}</div>
                    <div v-show="!completeEdit(scope.$index)&&(scope.row.disabled ==false)" class="fl">
                      <el-form-item prop="phone">
                        <el-input v-model="modify.phone"></el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="邮箱">
                  <template scope="scope">
                      <span v-show="completeEdit(scope.$index)">
                        <span v-show="scope.row.email=='unset'">未设置</span>
                      <span v-show="scope.row.email!='unset'">{{scope.row.email}}</span>
                      </span>
                    <div v-show="!completeEdit(scope.$index)" class="fl">
                      <el-form-item>
                        <el-input v-model="modify.email"></el-input>
                      </el-form-item>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="190"
                >
                  <template scope="scope">
                      <span v-show="(scope.row.is_default!=true)&&completeEdit(scope.$index)" class="is-default"
                            @click="setDefault(scope.row.id)">设为默认</span>
                    <span v-show="completeEdit(scope.$index)" class="revise"
                          @click="editContract(scope.$index, scope.row)">修改 </span>
                    <span class="cancel fl" v-show="!completeEdit(scope.$index)" @click="cancelEdit(scope.$index)" style="margin-left:0;margin-top:6px;">取消</span>
                    <span class="el-save">
                  <el-form-item>
                  <span class="on-save" v-show="!completeEdit(scope.$index)"
                        @click="saveEdit(scope.$index,scope.row.id,scope.row,'modify')">保存</span>
                  </el-form-item>
                  </span>
                    <span v-show="(scope.row.disabled!=true)&&completeEdit(scope.$index)" class="delete"
                          @click="deleteContract(scope.row.id)"> 删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>
            <div class="new-contract clearfix" v-show="newContract">
              <el-form :model="contact" :rules="rules1" ref="contact">
                <el-form-item prop="name">
                  <el-input v-model="contact.name" placeholder="请输入姓名" class="contact-name fl"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="contact.position" placeholder="请输入职位" class="contact-position fl"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                  <el-input v-model="contact.mobile" placeholder="请输入手机" class="contact-mobile fl"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                  <el-input v-model="contact.phone" placeholder="请输入固定电话" class="contact-phone fl"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="contact.email" placeholder="请输入邮箱" class="contact-email fl"></el-input>
                </el-form-item>
                <el-form-item>
                  <span class="cancel" @click="cancelAdd">取消</span>
                </el-form-item>
                <el-form-item>
                  <span class="save" @click="addContract('contact')">保存</span>
                </el-form-item>
              </el-form>
            </div>
            <span class="add-contract" @click="newContract = true">+添加联系人</span>
          </div>
        </el-dialog>
        <router-link :to="{name:'fileList',params:{id:this.$route.params.id,stage_id:this.$route.params.state_id},query:{name:this.$route.query.name}}">
          <p>
            <i class="person"></i>
            <span>文件库</span>
          </p>
        </router-link>
      </div>
    </div>
    <div class="project-detail clearfix">
      <!-- 备注功能 -->
      <div class="remarks">
        <div class="remarks_top" @click.stop="remarksListShow">
          <div class="remarks_left">
            <img src="../../assets/images/beizhuicon.png" height="30" width="30">
            <span class="remarks_item1">项目备注</span>
            <span class="remarks_item2">用于服务商内部工作沟通，仅服务商工作人员可见</span>
          </div>
          <div class="remarks_right">
            <span class="number_remarks">{{project.notes_count}}条备注</span>
            <span class="add_remarks" @click.stop="addRemarks" v-show="addbeizhu">添加</span>
          </div>
        </div>
        <!-- 备注列表 -->
        <ul class="remarks_list" v-show="remarksList">
          <li v-for="v in operationList">
            <p class="listTopInfo">{{v.user_name}} | {{v.created_at | formatDate}}</p>
            <p class="listCont" v-html="wrap(v.content)"></p>
          </li>
          <div class="noneRemarks" v-show="noneShow"><img src="../../assets/images/project/jinggaocion.png" height="15" width="14">暂无任何留言</div>
        </ul>
        <div class="stopList" v-show="stopListShow" @click.stop="whiteJiantou">
          <div class="sanjiao"></div>
        </div>
        <el-dialog title="项目备注" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :closeOnClickModal="false"
                   :close-on-click-modal="true" style="text-align: center;margin: 0 auto; " top="40%" size="small">
          <el-form  :model="form" :rules="rules" ref="form">
            <el-form-item prop="remarksContent">
              <el-input type="textarea" v-model="form.remarksContent" auto-complete="off" placeholder="请填写备注"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" @click.stop="resetForm('form')">取 消</el-button>
            <el-button type="primary" @click.stop="submitForm2('form')" v-loading.fullscreen="fullscreenLoading">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!--项目切换-->
      <div class="pro-tab">
        <!--关闭按钮-->
        <div v-if="activeName!='second' && hasRoot" class="close-btn" @click="proCloseShow" @mouseover="closeTipShow" @mouseleave="closeTipHide">
            <a  v-show="closeBtnShow"></a>
        </div>
        <transition name="fade">
          <div class="close-tip" v-show="closeTip"><span>项目终止</span></div>
        </transition>
        <!--审核状态-->
        <span class="audit-state" v-if="project.stop_flow_status=='processing'">{{project.stop_flow_supplier}}审核中</span>
        <ul>
          <li v-for="(v,i) in proTabs" @click="chooseActive(v,i)" :class="{'active':v.isActive}">
            <div :class="{'item-box':i===0}">
              <i class="pro-icon icon-project" :class="{'icon-project-hover':v.isActive}" v-show="i===0"></i>
              <i class="pro-icon icon-payment" :class="{'icon-payment-hover':v.isActive}" v-show="i===1"></i>
              <span class="pro-text">{{v.name}}</span>
            </div>
          </li>
        </ul>
        <span class="bottom-line" ref="bottomLine" v-show="bottomLineShow"></span>
      </div>

      <div v-if="proItem===0">
        <div class="project-nav">
          <ul>
            <li v-for="(v,i) in project.stages" @click="toggle(i,v.id,v.status)">

              <router-link :to="{name:'serviceApply',params:{state_id:v.id},query:{name:query_name}}" active-class="active" v-if="(v.children=='')&&(v.status!='unactive')&&!v.is_lock">{{v.name}}</router-link>
              <a v-if="v.children!=''&&v.status!='unactive'&&!v.is_lock" class="cp" @click="fixProcess(v,i)">{{v.name}}</a>
              <a v-if="v.status=='unactive'&&!v.is_lock">{{v.name}}</a>
              <span class="circle" :class="v.status | chooseState"></span>
              <ul class="children" v-show="childShow(i)">
                <li v-for="(child,row) in v.children" @click="chooseChild(row,child.status)">
                  <router-link :to="{name:'serviceApply',params:{state_id:child.id},query:{name:query_name}}" active-class="active" v-if="child.status!='unactive'">{{child.name}}
                  </router-link>
                  <a v-if="child.status=='unactive'">{{child.name}}</a>
                  <span class="circle" :class="child.status | chooseState"></span>
                </li>
              </ul>
            </li>
          </ul>


        </div>
        <div class="project-content">
          <router-view></router-view>
        </div>
      </div>
      <div v-if="proItem===1">
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
      </div>
      <div v-if="proItem===2">
        <close-project @getProjectWf="getProject" :project="project"></close-project>
      </div>
      <!--关闭弹框-->
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
    </div>
    <div>{{addShow}}</div>
  </div>
</template>

<script>
  import VDistpicker from 'v-distpicker'
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  import {formatDate} from 'assets/js/filter'
  import closeProject from './closeProject.vue'

  export default{
    components: {VDistpicker,closeProject},
    data(){
      //名字
      var checkName = (rule,value,callback) =>{
        if(value!=''&&!(/^[\u4e00-\u9fa5a-zA-Z\-]{2,20}$/.test(value))){
          callback(new Error('姓名格式有误!'));
        }else{
          callback()
        }
      }
      //固定电话
      var checkfixNumber = (rule, value, callback) => {
        if (value == '') {
          callback();
        }
        else if (!(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(value))) {
          callback(new Error('固定电话格式有误!'));
        }
        else {
          callback();
        }
      }
      //手机号
      var checkTel = (rule, value, callback) => {
        if (!(/^1\d{10}$/.test(value))) {
          callback(new Error('手机号码格式有误!'));
          return false
        }else{
          callback();
        }
      };
      //添加备注
      var remarksRules = (rule, value, callback) => {
        if (!this.form.remarksContent.replace(/^ +| +$/g,'') && this.form.remarksContent.indexOf('') !== -1) {
          callback(new Error('请填写备注内容'));
          return false
        }else{
          callback();
        }
      };
      return {
        corpsDtl: {},
        rules: {
          office_location: [
            {required: true, message: '请填写企业地址', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请填写原因类型', trigger: 'change'},
          ],
          reason: [
            {required: true, message: '请填写具体原因', trigger: 'blur'},
          ],
          remarksContent: [{required: true, message: '请填写备注内容', trigger: 'blur'},
                            {validator: remarksRules, trigger: 'blur'}
                          ]

        },
        rules1: {
          phone:[
            {validator: checkfixNumber, trigger: 'blur'}
          ],
          mobile:[
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {validator: checkTel, trigger: 'blur'}
          ],
          name:[
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ]

        },
        select: {province: '', city: '', area: ''},//下拉框选择的值
        placeholders: {//地址默认值
          province: '请选择省',
          city: '请选择市',
          area: '请选择区',
        },
        revise: true,
        errorShow: false,
        activeName: 'first',
        project: '',//项目数据
        corps: '',//企业数据
        contracts: [],//联系人数据
        contractVisible: false,//查看联系人
        newContract: false,
        contact: {
          name: '',
          position: '',
          mobile: '',
          phone: '',
          email: ''
        },
        modify: {//修改联系人
          name: '',
          position: '',
          mobile: '',
          phone: '',
          email: ''
        },
        nav: [
          {name: "服务申请", children: [], id: 5},
          {name: "合同签署", children: [], id: 6},
          {name: "申报阶段", children: [{name: 'eee', id: 10}, {name: 'bbb', id: 2}, {name: 'ccc', id: 3}], id: 1},
          {name: "中期验收", children: [{name: 'eee', id: '4'}], id: '9'},
          {name: "项目验收", children: [], id: 7},
          {name: "项目完成", children: [], id: 8},
        ],
        router: {},
        slideDown: '',
        currentIndex: 'aaa',
        row: "",
        contractIndex: 'aa',//悬案
        editStatus: true,
        corpId: '',//企业id
        corp: {
          office_province: '',
          office_city: '',
          office_district: '',
          office_location: ''
        },
        close: true,//关闭项目
        closeStatus: true,//判断项目是否可以关闭
        tickets:'',//获取支付数据
        query_name:'',//获取目录名称
        closeDialog:false, //关闭项目的弹窗
        sendReason:{
          type:'',
          reason:''
        },
        firstDialog:false,
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
        fullscreenLoading:false,
        addStatus:'',
        proTabs: [
          {name: '项目实施', isActive: true},
          {name: '费用支付', isActive: false},
        ],
        proItem: 2,//显示的tab,初始状态停留在项目详情
        bottomLineShow:true,//项目切换的tab显示
        closeTip:false,//关闭按钮提示显示
      }
    },
    computed:{
      ...mapGetters(["stepName","stageStaus","currentProject","hasRoot",'userId',"yearChange"]),
      closeBtnShow(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        if(this.stageStaus == 'complete'){
          return false;
        }
        if(this.stageStaus == 'process' || this.closeStatus ){
          return true;
        }else {
          return false;
        }
      },
      addShow(){
        // 判断添加按钮是否显示，如果用ID等于当前操作人的ID就显示
        if (this.addStatus == 'deny' || this.addStatus == 'stop' || this.addStatus == 'finished'){
          this.addbeizhu = false
        }else if (this.addStatus == 'proceeding') {
          this.addbeizhu = true
        }
      }
    },


    mounted(){

    },
    created(){
      var that = this;
      this.getProject(function (mark) {
        if(mark)  that.initIndex();
      })
      this.getContracts()
      //获取支付数据
      this.getFee()
      //判断项目关闭跳转
      if(this.$route.query.proItem==2){
      	this.proCloseShow()
      }
    },
    methods:{
      getProject(callBack){
        this.$http.get(API.url + 'projects/' + this.$route.params.id
        ).then((res) => {
          this.query_name = this.$route.query.name
          this.project = res.body.project
          this.sortLockStage();
          this.corps = res.body.project.corp
          this.select.province = res.body.project.corp.office_province  //获取办公地址
          this.select.city = res.body.project.corp.office_city
          this.select.area = res.body.project.corp.office_district
          this.corpId = res.body.project.corp.id //获取企业id
          this.current_operater_id = res.body.project.current_operater_id//获取当前操作人的ID
          this.addStatus = res.body.project.status

          //将所有的peoject 存到 project 中
          this.$store.dispatch('sendCurrentProject', this.project);

          if(typeof callBack === "function" ) callBack(true);

          // 给 index 赋值
//          this.initIndex();

        })
      },
      //删除已经禁用的lock
      sortLockStage(){
        for (var i=0;i< this.project.stages.length;i++){
          var item_par = this.project.stages[i];
          if(item_par.is_lock){this.project.stages.splice(i, 1);i--;continue}
        }
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
      getStage(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id
        ).then((res) => {
          this.project = res.body.project
          this.sortLockStage();
          this.corps = res.body.project.corp
          this.select.province = res.body.project.corp.office_province  //获取办公地址
          this.select.city = res.body.project.corp.office_city
          this.select.area = res.body.project.corp.office_district
          this.corpId = res.body.project.corp.id //获取企业id
          this.$store.dispatch('sendCurrentProject', this.project);
        })

      },
      //获取支付费用
      getFee(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id+'/pay_tickets'
        ).then((res) => {
          this.tickets = res.body.tickets
        })
      },
      nextTep(){
        this.getStage();
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
              this.$router.push({name:'serviceApply',params:{state_id:target.id},query:{name:this.query_name}});
            }else { // 无子集
              this.row = -100;
              this.$router.push({name:'serviceApply',params:{state_id:obj.id},query:{name:this.query_name}});
            }
          }else {
            this.row++;
            var children = item.children[this.row];
            var state_id = children.id;
            this.$router.push({name:'serviceApply',params:{state_id:state_id},query:{name:this.query_name}});
          }
        }else { // 在主阶段
          var item =  this.project.stages[this.currentIndex+1];
          this.currentIndex ++;
          if(item.children !== undefined && item.children.length>0){
            var child = item.children[0];
            this.$router.push({name:'serviceApply',params:{state_id:child.id},query:{name:this.query_name}});
            this.row= 0;
          }else {
            this.$router.push({name:'serviceApply',params:{state_id:item.id},query:{name:this.query_name}});
          }
        }
      },
      toggle(i, state_id, status){
        //        this.row = -100;
        if(status!='unactive'){
          this.currentIndex = i
          this.childShow();
          this.closeStatus = status == 'process'
        }

          //        <!--<router-link :to="{name:'projectDtl',params:{id:child.id}}" active-class="active">{{child.name}}-->
          //        this.$router.push({name:'serviceApply',params:{state_id:state_id}});
      },
      //未开启阶段遮罩
      shadow(i){
        return i ==this.currentIndex
      },
      // 点击子阶段
      chooseChild(row, status){
        if(status!='unactive'){
          this.row = row;
          this.closeStatus = status == 'process'
        }

      },
      childShow(i){
        return i == this.currentIndex
      },
      //获取联系人信息
      getContracts(){
        this.$http.get(API.url + 'projects/' + this.$route.params.id + '/contacts'
        ).then((res) => {
          this.contracts = res.body.contacts
        })
      },
      //修改地址
      reviseAddress(){
        this.revise = false
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
      //提交表单验证
      submitForm(formName) {
        if (this.select.province == '请选择省' || this.select.city == '请选择市' || this.select.area == '请选择区') {
          this.errorShow = true
        } else {
          this.errorShow = false
          this.corp.office_province = this.select.province
          this.corp.office_city = this.select.city
          this.corp.office_district = this.select.area
          this.corp.office_location = this.project.corp.office_location
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.put(API.url + 'corps/' + this.corpId,
                {corp: this.corp}
              ).then((res) => {
                this.select.province = res.body.corp.office_province  //获取办公地址
                this.select.city = res.body.corp.office_city
                this.select.area = res.body.corp.office_district
                this.project.corp.office_location = res.body.corp.office_location
                this.project.corp.office_address = res.body.corp.office_address
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.revise = true
              })
            } else {
              this.$message({
                message: '修改失败',
                type: 'warning'
              });
            }
          });
        }

      },
      reviseCancel(){
        this.revise = true
        this.getProject()
      },
      //增加联系人
      addContract(formName){
        this.$refs[formName].validate((valid =>{
          if (valid){
            this.$http.post(API.url + 'projects/' + this.$route.params.id + '/contacts',
              {contact: this.contact}
            ).then((res) => {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getContracts()
              this.newContract = false
              this.contact.name = ''
              this.contact.position = ''
              this.contact.mobile = ''
              this.contact.phone = ''
              this.contact.email = ''
            }).catch(() => {
              this.$message({
                message: '添加失败',
                type: 'warning'
              });
            })
          }
        }))
      },
      //取消添加联系人
      cancelAdd(){
        this.contact.name = ''
        this.contact.position = ''
        this.contact.mobile = ''
        this.contact.phone = ''
        this.contact.email = ''
        this.newContract = false
      },
      //删除联系人
      deleteContract(id){
        this.$http.delete(API.url + 'projects/' + this.$route.params.id + '/contacts/' + id
        ).then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getContracts()
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'warning'
          });
        })

      },
      //设为默认联系人
      setDefault(id){
        this.$http.patch(API.url + 'projects/' + this.$route.params.id + '/contacts/' + id + '/default'
        ).then((res) => {
          this.$message({
            message: '设置成功',
            type: 'success'
          });
          this.getContracts()
        }).catch(() => {
          this.$message({
            message: '设置失败',
            type: 'warning'
          });
        })

      },
      //修改联系人
      editContract(index, row){
        this.contractIndex = index
        this.editStatus = true
        this.completeEdit()
        //获取原来数据
        this.modify.name = row.name
        this.modify.position = row.position
        this.modify.mobile = row.mobile
        this.modify.phone = row.phone
        if(this.modify.email==''){
          this.modify.email = ''
        }else{
          this.modify.email = row.email
        }
      },
      completeEdit(index){
        //console.log(index,this.contractIndex)
        if (this.editStatus) {
          if (this.contractIndex != index) {
            return true
          } else {
            return false
          }
        } else if (!this.editStatus) {
          if (this.contractIndex == index) {
            return true
          } else {
            return true
          }
        }

      },
      //保存修改联系人
      saveEdit(index, id,row,formName){
        this.$refs[formName].validate((valid =>{
          if(valid){
            this.contractIndex = index
            this.editStatus = false
            console.log(row)
            this.completeEdit()
            if(row.disabled==false){
              this.$http.put(API.url + 'projects/' + this.$route.params.id + '/contacts/' + id,
                {contact: this.modify}
              ).then((res) => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.getContracts()
              }).catch(() => {
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              })
            }else if(row.disabled ==true){
              this.$http.patch(API.url + 'projects/' + this.$route.params.id + '/contacts/disabled_email',
                {email: this.modify.email}
              ).then((res) => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.getContracts()
              }).catch(() => {
                this.$message({
                  message: '修改失败',
                  type: 'warning'
                });
              })
            }

          }
        }))
      },
      //取消修改联系人
      cancelEdit(index){
        this.contractIndex = index
        this.editStatus = false
        this.completeEdit()
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
              this.sortLockStage();
              this.$store.dispatch('sendCurrentProject', this.project);
              this.getContracts()
              this.closeStatus = false
              this.firstDialog  = false
              this.closeDialog  = false
            }).catch(() => {
              this.$message({
                message: '关闭失败',
                type: 'warning'
              });
              this.closeStatus = true
            })
          }
        })
      },
      dialogClose(formName){
        this.closeDialog  = false
        this.firstDialog  = false
        this.$refs[formName].resetFields();
      },

      //点击侧边栏定位到正在进行中的子阶段
      fixProcess(item,i){
        item.children.forEach((v)=>{
          if(v.status=="process"){
            this.$router.push({name:'serviceApply',params:{state_id:v.id},query:{name:this.query_name}})
          }
        })
      },
      //缩放备注列表
      remarksListShow(){
        this.remarksList = !this.remarksList
        this.stopListShow = !this.stopListShow
        if (this.remarksList == true) {
          this.getRemarksList()
        }
      },
      // 点击箭头收缩备注
      whiteJiantou(){
        this.remarksList = false
        this.stopListShow = !this.stopListShow
      },
      //添加 出现弹框、弹框里输入框清空
      addRemarks(){
        this.dialogFormVisible = true
        this.form.remarksContent = ''
      },
      // 确定添加备注
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http.post(API.url + 'projects/'+this.$route.params.id+'/notes', {'content': this.form.remarksContent}
            ).then((res) => {
              this.dialogFormVisible = false
              this.dialogVisible = true
              this.getRemarksList()
              this.fullscreenLoading = false
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      },
      //点击tab切换项目内容
      chooseActive(v, i){
        this.bottomLineShow = true
        this.proItem = i
        this.proTabs.forEach((v) => {
          v.isActive = false
        })
        this.proTabs[i].isActive = true
        if (i == 0) {
          this.$refs.bottomLine.style.transform = 'translateX(0px)'
        } else if (i == 1) {
          this.$refs.bottomLine.style.transform = 'translateX(160px)'
        }
      },
      //关闭项目
      proCloseShow(){
        this.proItem = 2
        this.proTabs.forEach((v) => {
          v.isActive = false
        })
        this.bottomLineShow = false
      },
      //关闭按钮提示显示
      closeTipShow(){
        this.closeTip = true
      },
      closeTipHide(){
        this.closeTip = false
      },
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      },
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
      }
    },
    watch:{
      "stepName": "nextTep",
      '$route': 'getProject',
      'yearChange': 'getProject',
    }
  }


</script>
<style lang="scss" rel="stylesheet/scss">
  .mr10{
    margin-right:10px;
  }
  .ml20{
    margin-left:20px;
  }
  .el-tabs__header{
    width:500px;
  }
  .mt20{
    margin-top:20px;
  }
  .project {
    padding-top: 17px;
    .el-breadcrumb {
      margin-bottom: 0;
    }
    .el-breadcrumb:after {
      height: 0;
    }
    .project-brief {
      min-height:140px;
      border: 1px solid #efefef;
      margin-bottom: 20px;
      .left-box {
        float: left;
        width: 980px;
        border-right: 1px solid #efefef;
        height: 140px;
        margin-right:10px;
        background: #FFFFFF;
        .title {
          height: 40px;
          line-height: 38px;
          background: #e1efff;
        }
        .content {
          min-height:100px;
          padding:27px 0;
          position:relative;
          .number, .name, .client, .type {
            padding-right: 40px;
          }
          .shenbao{
            width: 94px;
            height: 18px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            background:url(../../assets/images/shenbaolanse.png) no-repeat;
            position: absolute;
            left: 0;
            top: 0px;
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
            width: 382px;
            color: #5c5c5c;
            font-size:14px;
            .corp-name{
              color: #999;
              font-size:12px;
              margin-top:2px;
            }
          }
          .name {
            width: 134px;
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
              background: url("../../assets/images/projecticon1.png") no-repeat;
              vertical-align: middle;
              margin-right:3px;
            }
            .offline-ico{
              display: inline-block;
              width:14px;
              height:14px;
              background: url("../../assets/images/projecticon2.png") no-repeat;
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
            width: 160px;
            .audit_status{
              display: inline-block;
              color: #999;
              margin-top:2px;
              margin-top:2px;
              width:100%;
            }
          }
          .source {
            width: 112px;
          }
          .date {
            width: 63px;
          }

        }
      }
      .right-box {
        float: left;
        width: 208px;
        height: 140px;
        padding: 42px 0 0 57px;
        background: #FFFFFF;
        .contract {
          display: inline-block;
          width: 13px;
          height: 15px;
          background: url("../../assets/images/project/pro-people.png") no-repeat 0/cover;
          vertical-align: middle;

        }
        .person {
          display: inline-block;
          width: 14px;
          height: 15px;
          background: url("../../assets/images/project/pro-file.png") no-repeat 0/cover;
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
        .choose-box {
          float: left;
          margin-bottom: 10px;
          select {
            font-size: 14px;
          }
        }
        .el-dialog--small{
          width:960px;
        }
        .el-dialog {
          p {
            cursor: auto;
          }
          .tit {
            color: #1b1b1b;
            margin-left: 0;
          }
          .icon-location {
            display: inline-block;
            height: 21px;
            width: 15px;
            background: url("../../assets/images/project/location.png") no-repeat 0/cover;
            vertical-align: middle;
            margin-right: 5px;
          }
          .default {
            display: inline-block;
            background: #e65c5c;
            border-radius: 100px;
            width: 35px;
            height: 19px;
            text-align: center;
            line-height: 19px;
            font-size: 12px;
            color: #ffffff;
            margin-top:3px;
            margin-left:3px;
          }
          .revise, .is-default, .add-contract, .save, .on-save {
            color: #3c8ced;
            cursor: pointer;
            margin-right:14px;
          }
          .cancel{
            color: #a9a9a9;
            cursor: pointer;
            margin-left: 20px;
            margin-right:14px;
          }
          .add-contract {
            margin-top: 10px;
          }
          .contract-outer{
            width:920px;


            .el-input__icon{
              display: none;
            }
            .el-save{
              .el-form-item{
                margin:0;
                margin-top:0;
                float: left;
                .el-form-item__content{
                }
              }
            }
            .new-contract{
              .el-form-item{
                float: left;
                width:auto;
              }
              .el-form-item__error{
                margin-left:18px;
              }
            }
          }
          .delete {
            cursor: pointer;
            color: #e65c5c;
          }

          .el-form-item {
            margin-top: 10px;
          }
          .el-table .el-form-item{
            width:auto;
          }
          .error-show {
            color: red;
            margin-bottom: 5px;
            margin-top: 5px;
          }
          .custom-btn {
            display: inline-block;
            border: 1px solid #3c8ced;
            border-radius: 2px;
            width: 66px;
            height: 22px;
            line-height: 20px;
            text-align: center;
            color: #3c8ced;
            font-size: 12px;
            cursor: pointer;
          }
          .primary-btn {
            display: inline-block;
            background: #3c8ced;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.10);
            border-radius: 2px;
            width: 68px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #ffffff;;
            font-size: 12px;
            cursor: pointer;
            &:hover {
              background: rgba(#3c8ced, .9);
            }
          }
          //添加联系人的输入框样式
          .new-contract {
            margin-top: 20px;
            line-height:30px;
            .el-input{
              padding:0 18px;
            }
          }
          .contact-name {
            width: 133px;
          }
          .contact-position {
            width: 133px;
          }
          .contact-mobile {
            width: 143px;
          }
          .contact-phone {
            width: 158px;
          }
          .contact-email {
            width: 158px;
          }
        }
      }
    }
    .project-detail {
      position: relative;
      background: #FFFFFF;
      padding: 20px 21px;
      margin-bottom: 50px;
      .close-btn a{
        position: absolute;
        top: 25px;
        right: 0;
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("../../assets/images/project/close-btn.png") no-repeat;
        cursor: pointer;
      }
      .close-tip{
        position: absolute;
        top: -10px;
        right: -28px;
        width:76px;
        height:43px;
        line-height:28px;
        background: url("../../assets/images/project/super-tip.png") no-repeat;
        text-align: center;
        color: #FFFFFF;
        font-size:12px;
        span{
          margin-left:-4px;
        }
      }
      .audit-state{
        /*display: none;*/
        position: absolute;
        top:24px;
        right:28px;
        width:92px;
        height:26px;
        line-height:26px;
        padding-left:8px;
        color: #FFFFFF;
        font-size:12px;
        background:url("../../assets/images/project/i-audit.png") no-repeat;
      }
      .pro-tab {
        position: relative;
        height: 60px;
        border-bottom: 1px solid #efefef;
        margin-bottom: 25px;
        .bottom-line {
          position: absolute;
          bottom: -1px;
          left: 440px;
          display: inline-block;
          height: 2px;
          background: #3c8ced;
          width: 120px;
          transition: transform .3s cubic-bezier(.645, .045, .355, 1);
        }
        ul {
          text-align: center;
          height: 59px;
        }
        li {
          display: inline-block;
          width: 160px;
          font-size: 14px;
          padding: 20px 0;
          cursor: pointer;
          .item-box {
            border-right: 1px solid #efefef;
          }
          .pro-text {
            display: inline-block;
            color: #5c5c5c;
            vertical-align: middle;
            margin-top: -1px;
          }
          .pro-icon {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: middle;
          }
          .icon-project {
            background: url("../../assets/images/project/project.png") no-repeat;
          }
          .icon-project-hover {
            background: url("../../assets/images/project/project_hover.png") no-repeat;
          }
          .icon-payment {
            background: url("../../assets/images/project/payment.png") no-repeat;
          }
          .icon-payment-hover {
            background: url("../../assets/images/project/payment_hover.png") no-repeat;
          }

        }
        li.active {
          .pro-text {
            font-weight: bold;
            color: #3c8ced;
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
            position: relative;
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
      .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 208px;
        height: 49px;
        background: rgba(0, 0, 0, .4);
      }
    }
    .project-content {
      float: left;
      width: 930px;
      margin-top: 10px;

    }
    .el-tabs{
      padding-left:0;
    }
    .close-dialog{
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
  }
  .big-gd{
    .gd-box{
      width:1158px;
      .detail{
        margin-top:20px;
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

</style>
