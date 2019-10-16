<template>

  <div class="bgfff">

    <!--<p>索要文件</p>-->
    <!--<p>创建</p>-->
    <div class="gd-box" v-if="type== 'zero'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="top-title describe">
        <el-input placeholder="索要文件" v-model="ticket_ji.title" :disabled='isDisabled'></el-input>
        </span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <el-input
              type="textarea"
              :rows="4"
              :disabled='isDisabled'
              placeholder="请输入内容"v-model="ticket_ji.content">
            </el-input>
          </p>
          <p class="grey-border"></p>
          <div class="btn-box">
            <span class="custom-btn">
              <el-button @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button v-if="hasRoot && isNotComplete && canOperation" type="primary" @click="changeEventInRequestFile">发送给企业</el-button>
          </div>

        </div>
      </div>
    </div>

    <!--观察者视角 start=========================-->
    <div class="gd-box" v-if="type=='one' && !hasRoot ">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation " @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">

        <!--蒙版 start ===== -->
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'">
          本项目为线下项目，请线下询问企业索要文件
        </div>
        <p class="not-upload">
          <i class="icon-notup"></i>
          <span>对方暂未上传文件</span>
        </p>
      </div>
    </div>



    <!--观察者视角 end=========================-->

    <!--<p>对方处理中</p>-->
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation " @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-having"></i>
          <span>等待企业操作</span>
        </div>
      </div>
      <div class="content">
        <!--蒙版 start ===== -->
        <div class="mask" v-if="currentProject.source=='offline'">
        </div>
        <div class="mask-text" v-if="currentProject.source=='offline'">
          本项目为线下项目，请线下询问企业索要文件
        </div>
        <span class="tips" :class="ticket.content | filterTicketContent">{{ticket.content}}</span>
        <p class="grey-border"></p>
        <p class="not-upload">
          <i class="icon-notup"></i>
          <span>对方暂未上传文件</span>
        </p>
      </div>
    </div>
    <!--<p>审核文件</p>-->

    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation"  @click="changeStageDelete">撤回当前事项</span>
        <div class="status bgf1b">
          <i class="icon-status icon-wait"></i>
          <span>等待处理</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket.content | filterTicketContent">{{ticket.content}}</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
        <p class="grey-border"></p>
        <div class="examine-box">
          <!--观察人视角需要隐藏-->
          <p class="check-result" v-if="hasRoot">
            <span class="is-required tit">审核结果</span>
            <el-radio class="radio" v-model="support_or_reject" label="pass" :disabled='isDisabled'>通过</el-radio>
            <el-radio class="radio" v-model="support_or_reject" label="reject" :disabled='isDisabled'>拒绝</el-radio>
          </p>
          <!--拒绝展示-->
          <p class="check-result mt10" v-if="support_or_reject == 'reject'">
            <span class="is-required tit">拒绝理由</span>
            <el-select v-model="ticket.reject_type" placeholder="请选择拒绝理由" :disabled='isDisabled'>
              <el-option
                v-for="item in listReject"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>

          </p>
          <p class="note clearfix" v-if="hasRoot">
            <span class="tit">备注</span>
            <el-input
              type="textarea"
              :rows="4"
              :disabled='isDisabled'
              placeholder="请输入内容"
              v-model="ticket.note">
            </el-input>
          </p>
        </div>
        <p class="grey-border" v-if="hasRoot"></p>
        <div class="btn-box">
          <el-button v-if="hasRoot && isNotComplete && canOperation" type="primary" @click="changeEventInRequestFile">发送给企业</el-button>
        </div>

      </div>
    </div>

    <!--<p>审核通过</p>-->

    <div class="gd-box" v-if="type=='three'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已经确认</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket.content | filterTicketContent">{{ticket.content}}</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="deny">
          <i class="icon-pass"></i>
          <span>通过</span>
        </p>
        <p class="detail" v-if="ticket.note && ticket.note.length >0">
          <i class="icon-remarks"></i>
          <span>{{ticket.note}}</span>
        </p>
      </div>
    </div>

    <!--<p>审核拒绝</p>-->
    <div class="gd-box" v-if="type=='four'">
      <div class="title">
        <i class="tit-sywj"></i>
        <span class="describe">{{ticket.title}}</span>
        <div class="status bge65">
          <i class="icon-status icon-refuse"></i>
          <span>文件不符合</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket.content | filterTicketContent">{{ticket.content}}</span>
        <p class="grey-border"></p>
        <div class="file-list">
          <ul>
            <li v-for="(item,index) in ticket.attachments">
              <i class="icon-file" :class="item.name | filterIconClass"></i>
              <a :title="item.name" class="name">{{item.name}}</a>
              <span class="download"><a class="fr" :download="item.name" :href="item.download_url">下载</a></span>
              <!--<span class="size">2.01MB</span>-->
              <!--<span class="date">2017-03-06</span>-->
              <!--<span class="file-preview">预览</span>-->
            </li>
          </ul>
        </div>
        <p class="grey-border"></p>
        <p class="deny">
          <i class="icon-deny"></i>
          <span>拒绝｜{{ticket.reject_type}}</span>
        </p>
        <p class="detail" v-if="ticket.note && ticket.note.length>0">
          <i class="icon-remarks"></i>
          <span>{{ticket.note}}</span>
        </p>
        <p class="grey-border"></p>
        <div class="btn-box" v-if="ticket.responsor == false && hasRoot && isNotComplete && canOperation">
          <el-button v-if="hasRoot && isNotComplete && canOperation" type="primary" @click="changeEventReStart">重新发起</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {filterIconClass} from 'assets/js/filter'

  export default {
    props: ['type','ticket','index'],
    mounted(){
      if(this.isEmpty(this.ticket.reject_type)){
        this.ticket.reject_type = "";
      };
      if(this.isEmpty(this.ticket.note)){
        this.ticket.note = "";
      };
    },
    filters:{
      filterIconClass(fileName){
        return filterIconClass(fileName)
      },
      filterTicketContent(val){
        if(val == undefined || val == null || val.length<1) return 'bg-clear-g'
        else return '';
      }
    },
    data() {
      return {
        support_or_reject:'',
        listReject:[
          "材料有误",
          "材料欠缺",
          "其他原因",
        ],
        reject_value:""
      }
    },
    //计算属性 changeEventInRequestFile
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      ticket_ji(){
        var item = this.ticket;
        if(this.isEmpty(item.content)){
          item.content = "";
        }
        return item;
      },
      //是否可以操作 整个项目 停止 或则 关闭 返回 false
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      }
    },
    methods:{
      isEmpty(item){
        if(item == undefined || item == null){
          return true;
        }else {
          return false;
        }
      },
      changeEventInRequestFile(){
        if(this.support_or_reject.length>0){
          this.ticket.support_or_reject = this.support_or_reject;
        }
        this.$emit('changeEventInRequestFile',this.type,this.index,this.ticket);
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      //重新发起
      changeEventReStart(){
        this.$emit('changeEventReStart',this.type,this.index,this.ticket);
      },
      changeFileContract(file, fileLis) {
        file.isOriginal = false;
        this.ticket.attachments.push(file);
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('changeStageDelete',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

  .content{
    position: relative;
    .mask{
      background-color: black;
      width: calc(100% + 2px);
      height:calc(100% + 10px);
      position:absolute;
      z-index: 100;
      opacity: 0.8;
      left: -1px;
      top: -1px;
      span{
        /*font-family:MicrosoftYaHei;*/
        font-size:14px;
        color:#ffffff;
        display: inline-block;
        width: 100%;
        text-align: center;
        /*line-height: 250px;*/
        height: 100%;
        padding-top: 7%;
      }
    }
    .mask-text{
      width:100%;
      height:100%;
      padding-top:5%;
      font-size:14px;
      position:absolute;
      z-index: 100;
      color: #FFFFFF;
      text-align: center;
    }
  }
</style>
