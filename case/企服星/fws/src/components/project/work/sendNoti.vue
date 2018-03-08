<template>
  <div class="bgfff">
    <!--观察者视角 start=========================-->
    <div class="gd-box" v-if="type=='one' && !hasRoot">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="not-upload">
            <i class="icon-notup"></i>
            <span>等待操作者发送通知</span>
          </p>
        </div>
      </div>
    </div>
    <!--观察者视角 end=========================-->
    <div class="gd-box" v-if="type=='zero'">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="top-title describe">
        <el-input  v-if="currentProject.source=='online'" placeholder="发送通知" v-model="ticket.title" :disabled='isDisabled'></el-input>
        <span v-else>{{ticket.title}}</span>
        </span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <span class="tit">内容</span>
            <!--<textareaExtend :content="ticket.content"></textareaExtend>-->
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              :disabled='isDisabled'
              v-model="ticket.content">
            </el-input>
          </p>
          <p class="grey-border"></p>

          <div class="btn-box" v-if="hasRoot && isNotComplete && canOperation">
            <span class="custom-btn">
              <el-button @click='changeEventCancelStage'>取消</el-button>
            </span>
            <el-button type="primary"  @click="changeSendNotiSentOther">发送给企业</el-button>
          </div>

        </div>
      </div>
    </div>
    <!--<p>发送通知</p>-->
    <!--<p>创建</p>-->
    <div class="gd-box" v-if="type=='one' && hasRoot">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">{{ticket.title}}</span>
      </div>
      <div class="content">
        <div class="input-item">
          <p class="clearfix">
            <!--<span class="tit" style="margin-top:8px;">内容</span>-->

            <textareaExtend v-if="hasDateOrNote"
                            ref="textarea_extend"
                            :content="ticket.content"></textareaExtend>

            <el-input v-else
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      :disabled='isDisabled'
                      v-model="ticket.content">
            </el-input>
          </p>
          <p class="grey-border" v-if="hasRoot && isNotComplete && canOperation"></p>
          <div class="btn-box" v-if="hasRoot && isNotComplete && canOperation">
            <el-button type="primary"  @click="changeSendNotiSentOther">发送给企业</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--<p>创建成功</p>-->
    <div class="gd-box" v-if="type=='two'">
      <div class="title">
        <i class="tit-fstz"></i>
        <span class="describe">{{ticket.title}}</span>
        <span class="return" v-if="ticket.temporary && hasRoot && isNotComplete && canOperation" @click="changeStageDelete">撤回当前事项</span>
        <div class="status bg55b">
          <i class="icon-status icon-yes"></i>
          <span>已发送</span>
        </div>
      </div>
      <div class="content">
        <span class="tips" :class="ticket.content | filterTicketContent">
          <span>
            {{ticket.content}}
          </span>
          <!--<span>培训日期：2017-05-26</span><br/>-->
          <!--<span>培训机构：上海豫谦财务咨询事务所</span><br/>-->
          <!--<span>培训地址：上海市徐汇区零陵路599号快易名商1102室</span><br/>-->
        </span>
        <div class="message-box" v-if=false>
          <i class="icon-message"></i>
          <span>如有需要，请短信通知对方（已发送<span class="count"> 0 </span>次）</span><span v-if="hasRoot && isNotComplete && canOperation" class="send-msg" @click="sendMsg">发送短信</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import textareaExtend from 'components/project/work/textareaExtend.vue'
  export default{
    components:{
      textareaExtend
    },
    props: ['type','ticket','index'],
    computed:{
      ...mapGetters(["stepName","currentProject","hasRoot","currentStage"]),
      isDisabled(){
        if(this.hasRoot && this.canOperation && this.isNotComplete) return false
        else return true
      },
      //阶段是否完成  ,如果状态是 complete 那么发送按钮是不显示的
      isNotComplete(){
        if(this.currentStage.status == 'complete'){
          return false;
        }else {
          return true;
        }
      },
      //是否有日期控件，或则 备注
      hasDateOrNote(){
        var mark = false;
        if(!this.isEmpty(this.ticket.content) && this.ticket.content.length>0){
          if(this.ticket.content.indexOf("[日期]") >= 0) mark = true;
          if(this.ticket.content.indexOf("[备注]") >= 0) mark = true;
        }
        return mark;
      },
      canOperation(){
        if(this.currentProject.status == 'deny' || this.currentProject.status == 'stop'){
          return false;
        }
        return true;
      },
    },
    data(){
      return {
        textarea: ''
      }
    },
    filters:{
      filterTicketContent(val){
          if(val == undefined || val == null || val.length<1) return 'bg-clear-g'
          else return '';
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
      sendMsg(){
        this.$confirm('确定发送短信通知对方？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送短信
          this.$emit('changeSendNotiSentMsg',this.type,this.index,this.ticket);
        }).catch(() => {
        });
      },
      // 取消当前工单
      changeEventCancelStage(){
        this.$emit('changeEventCancelStage',this.type,this.index,this.ticket);
      },
      changeSendNotiSentOther(){
        if(this.ticket.status == 'zero'){ //新建的
          this.$emit('changeSendNotiSentOther',this.type,this.index,this.ticket);
        }else {
          if(this.hasDateOrNote){
            // 先调用 子控件的方法 textareaExtend
            var back =  this.$refs.textarea_extend.checkList();
            if(back.mark_error == false){  //没有报错的标识，验证通过
              var content_last =  back.value;
              this.ticket.content_last = content_last;
              this.$emit('changeSendNotiSentOther',this.type,this.index,this.ticket);
            }
          }else {
            this.ticket.content_last =  this.ticket.content;
            this.$emit('changeSendNotiSentOther',this.type,this.index,this.ticket);
          }
        }
      },
      changeStageDelete(){
        this.$confirm('确认是否撤销?', '温馨提示提示', {
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
</style>
