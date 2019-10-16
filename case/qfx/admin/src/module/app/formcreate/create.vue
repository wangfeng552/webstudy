<template>
  <div class="frameCreate">
    <!-- 标题 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{name:'serviceRight',params:{id:this.leftid}}">服务表单</el-breadcrumb-item>
      <span>新增表单</span>
    </el-breadcrumb>
    <p class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>
    <!-- 上部表单 -->
    <el-form ref="createform" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="表单名称" prop='name'>
        <el-input v-model="form.name" placeholder="请输入表单名称"></el-input>
      </el-form-item>
      <el-form-item label="表单类型" width="300" prop="typeInfo">
        <el-select v-model="form.typeInfo" placeholder="请选择">
          <el-option v-for="serviceState in serviceState" :label="serviceState.type" :value="serviceState.typeInfo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务分类" width="300" prop="serviceId">
        <el-select v-model="form.serviceId" placeholder="请选择" @change="serviceCont">
          <el-option v-for="service in form.service" :label="service.name" :value="service.id.toString()" :key="service.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务名称" width="300" v-show="neirong" prop="serviceContnent">
        <el-select v-model="form.service_id" placeholder="请选择">
          <el-option v-for="serviceContent in form.serviceContent" :label="serviceContent.name" :value="serviceContent.id.toString()" :key="serviceContent.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前置说明">
        <el-input type="textarea" v-model="form.summary" placeholder="请输入前置说明文" class="duowenben"></el-input>
      </el-form-item>
    </el-form>
    <div class="addType" v-show="addType">
      <img src="../../../assets/images/create/lvsetishi.png" height="15" width="14">
      请从右选择添加表单问题</div>
    <div class="frameCenter" v-show="frameCenterShow">
      <draggable v-model="items">
        <transition-group name="list-complete" class="showKuang">
          <component v-for="(item,i) in items" v-bind:key="item.type" v-bind:is="item.type" v-bind:message="item" v-bind:parent="items" v-bind:index="i" class="list-complete-item" ref="wf_input"></component>
        </transition-group>
      </draggable>
    </div>
    <div class="lastBtn" ref="btn">
      <el-button type="primary" class="submit" @click="onsubmit('createform')" :disabled="disabled">提交</el-button>
      <el-button type="primary" class="submit" @click="func1(type)" :disabled="disabled">预览</el-button>
    </div>
    <div class="suspension" ref="yulan">
      <ul>
        <li>添加问题</li>
        <li class="danhang" @click="add('chartinput')">
          <img src="../../../assets/images/create/danhang.png">
          单行文本
        </li>
        <li class="duohang" @click="add('charttextarea')">
          <img src="../../../assets/images/create/duohang.png" height="15" width="15">
          多行文本
        </li>
        <li class="radio" @click="add('chartradio')">
          <img src="../../../assets/images/create/danxuan.png" height="15" width="15">
          单选
        </li>
        <li class="check" @click="add('chartcheckbox')">
          <img src="../../../assets/images/create/fuxuan.png" height="15" width="15">
          复选
        </li>
        <li class="xiala" @click="add('chartupload')">
          <img src="../../../assets/images/create/shangchuan.png">
          上传文件
        </li>
        <li class="date" @click="add('chartdate')">
          <img src="../../../assets/images/create/riqi.png" height="15" width="15">
          日期段
        </li>
        <li class="date" @click="add('charttime')">
          <img src="../../../assets/images/create/riqi.png" height="15" width="15">
          日期
        </li>
        <li class="date" style="text-align: center;" @click="smoothscroll">
          <img src="../../../assets/images/create/jiantou.png" height="5" width="9" class="jiantou">
          TOP
        </li>
      </ul>
    </div>
    <!-- 提交成功弹框 -->
    <div class="cover" v-show="cover">
      提交成功
    </div>
    <div>{{gery}}</div>
    <div>{{serviceshow}}</div>
  </div>
</template>
<script>
  import whiteHeader from 'components/whiteHeader.vue'
  import headerTwo from 'components/headerTwo.vue'
  import chartinput from 'components/form/chartinput.vue'
  import chartcheckbox from 'components/form/chartcheckbox.vue'
  import chartradio from 'components/form/chartradio.vue'
  import chartdate from 'components/form/chartdate.vue'
  import charttextarea from 'components/form/charttextarea.vue'
  import chartselect from 'components/form/chartselect'
  import chartupload from 'components/form/chartupload'
  import charttime from 'components/form/charttime.vue'
  import draggable from 'vuedraggable'

  import API from 'API/config'
  import {mapGetters} from 'vuex'
  export default {
    name:'app',
    components:{
      whiteHeader , chartinput , chartcheckbox , chartradio , chartdate , charttextarea , chartselect , chartupload  , charttime,headerTwo ,draggable
    },
    data(){
      var checkAge = (rule, value, callback) => {
        if (this.form.serviceId == '0') {
          callback();
        }else{
          if (this.form.service_id) {
            callback();
          }else{
            return callback(new Error('请选择服务内容'));
          }
        }
      };
      return {
        items:[],
        id:'',
        titleName:'',
        submitShow:[],
        detailsId:'',
        loggedEvent:'',
        disabled:false,
        frameCenterShow:false,
        addType:false,
        neirong:true,//服务内容
        form: {
          name: '',//表单名称
          typeInfo:'',//表单类型
          service:'',
          serviceContent:'',
          provider_id:'',//服务商ID
          category:'',//表单类型
          serviceId:'',//服务类别ID
          service_id:'',//服务内容ID
          summary:'',//前置说明
        },
        rules:{
          name:[
            {required:true,message:"请输入表单名称",trigger:'blur'},
            { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
          ],
          typeInfo:[
            { required: true, message: '请选择表单类型', trigger: 'change' }
          ],
          serviceId:[
            { required: true, message: '请选择服务分类', trigger: 'change' }
          ],
          serviceContnent:[
            { validator: checkAge, trigger: 'change' }
          ]
        },
        serviceState: [
          {
            type: '问卷调查',
            typeInfo:'question'
          },
          {
            type: '申请表',
            typeInfo:'apply'
          }
        ]

      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.leftid = to.params.id,
          vm.detailsId = to.params.id
        if (from.name == 'formpreview') {
          if (vm.form.serviceId !== '0') {
            vm.$http.get(API.serviceurl+'service_categories/'+vm.form.serviceId+'/services'
            ).then((res)=>{
              vm.neirong = true
              vm.form.serviceContent = res.body.services
            })
          }else{
            vm.neirong = false
          }
        }
      })
    },
    watch: {
      '$route':'open4'
    },
    created(){
      if(JSON.parse(window.localStorage.getItem('items'))==null || JSON.parse(window.localStorage.getItem('items')).length == 0){
        this.items=[]
        this.frameCenterShow = false
        this.disabled = true
        this.addType = true

      }else{
        this.frameCenterShow = true
        this.items = JSON.parse(window.localStorage.getItem('items'));
      }
      this.serviceSorts()
    },
    computed:{
      ...mapGetters(["current_providers"]),
      gery(){
        if (this.items == '') {
          this.frameCenterShow = false
          this.disabled = true
          this.addType = true
        }else{
          this.addType = false
        }
      },
      serviceshow(){
        if (this.form.serviceId == '0') {
          this.neirong = false
        }
      }
    },
    methods:{
      add(type){
        this.items.push({
          title: "",
          describe:"",
          type: type,
          rules: [],
          checkList:'不限',
          value: [""]
        })
        localStorage.removeItem('check');
        this.frameCenterShow = true
        window.localStorage.setItem('items', JSON.stringify(this.items))
        this.disabled = false
      },
      // 预览
      func1(type){
        var validComponent;
        var arr = [];
        this.$refs.wf_input.forEach((v)=>{
          arr.push(v.inputBlur())
        })
        // 再循环下arr
        validComponent = arr.every((v)=>{
          return (v==true)
        })
        if (validComponent) {
          this.$router.push({name: 'formpreview',params:{id:this.detailsId}})
          window.localStorage.setItem('items', JSON.stringify(this.items))
        }
        window.localStorage.setItem('summary', JSON.stringify(this.form.summary))
        window.localStorage.setItem('formname', JSON.stringify(this.form.name))
        window.localStorage.setItem('typeInfo', JSON.stringify(this.form.typeInfo))
        window.localStorage.setItem('serviceId', JSON.stringify(this.form.serviceId))
        window.localStorage.setItem('service_id', JSON.stringify(this.form.service_id))
      },
      // 服务分类
      serviceSorts(){
        var s = new Object()
        s.name = "通用"
        s.id = '0'
        this.$http.get(API.serviceurl+'service_categories'
        ).then((res)=>{
          this.form.service = res.body.service_categories
          this.form.service.push(s)
        })
        this.form.name = JSON.parse(window.localStorage.getItem('formname'));
        this.form.typeInfo = JSON.parse(window.localStorage.getItem('typeInfo'));
        this.form.serviceId = JSON.parse(window.localStorage.getItem('serviceId'));
        this.form.summary = JSON.parse(window.localStorage.getItem('summary'));
        this.form.service_id = JSON.parse(window.localStorage.getItem('service_id'));
        // this.serviceCont()
      },
      // 服务内容
      serviceCont(){
        if (this.form.serviceId !== '0') {
          this.$http.get(API.serviceurl+'service_categories/'+this.form.serviceId+'/services'
          ).then((res)=>{
            this.neirong = true
            this.form.serviceContent = res.body.services
          })
        }else{
          this.neirong = false
        }
        this.form.service_id = ''
      },
      // 成功提交
      open4() {
        const h = this.$createElement;
        this.$msgbox({
          title: '温馨提示',
          message: h('p', null, [
            h('span', null, '确定提交吗？ ')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.detailsId = this.$route.params.id
                  this.$http.post(API.url+'provider_forms/',{
                      'provider_id':this.form.provider_id,
                      'name':this.form.name,
                      'category':this.form.typeInfo,
                      'items':this.items,
                      'service_category_id':this.form.serviceId,
                      'service_id':this.form.service_id,
                      'summary':this.form.summary
                    }
                  ).then((res)=>{
                    this.id = res.data.id
                    this.$router.push({name: 'serviceRight',params:{id:this.leftid}})
                  })
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action => {
          // console.log(this.form.provider_id)

        });
      },
      // 提交验证
      onsubmit(formName) {
        var validComponent;
        var arr = [];
        this.$refs.wf_input.forEach((v)=>{
          arr.push(v.inputBlur())
        })
        // 再循环下arr
        validComponent = arr.every((v)=>{
          return (v==true)
        })
        this.form.provider_id = this.$route.params.id
        this.$refs[formName].validate((valid) => {
          if (valid && validComponent) {
            this.open4()
          } else {
            return false;
          }
        });


      },
      // 返回顶部
      smoothscroll(){
        $("html,body").animate({scrollTop:0}, 500);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .current_paoviders_g{
    margin-left: 20px !important;
    span{
      margin-left: 15px;
    }
  }

</style>
