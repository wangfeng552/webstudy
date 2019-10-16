<template>
	<div class="frameCreate">
	    <!-- 标题 -->
		<el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{name:'serviceRight',params:{id:form_id_zr}}">服务表单</el-breadcrumb-item>
          <span>编辑表单</span>
        </el-breadcrumb>
    	<p class="current_paoviders_g">服务机构<span v-if="current_providers">{{current_providers.name}}</span></p>
        <!-- 上部表单不可编辑 -->
		<el-form ref="createform" :model="formTop" :rules="rules" label-width="80px" v-if="formTop" v-show="editNo">
			  <el-form-item label="表单名称">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="formTop.name"></el-input>
			  </el-form-item>
			  <el-form-item label="表单类型" width="300">
			    <el-input placeholder="请输入表单名称" disabled="disabled" v-if="formTop.category == 'apply'" value="申请表"></el-input>
			    <el-input placeholder="请输入表单名称" disabled="disabled" v-else value="问卷调查"></el-input>
			  </el-form-item>
			  <el-form-item label="服务分类" width="300" v-if="formTop.service_category_name">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="formTop.service_category_name" ></el-input>
			  </el-form-item>

			  <el-form-item label="服务名称" width="300" v-if="formTop.service_name">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="formTop.service_name"></el-input>
			  </el-form-item>
			  <el-form-item label="前置说明">
			    <el-input type="textarea"  v-model="form.summary" placeholder="请输入前置说明文" class="duowenben"></el-input>
			  </el-form-item>
		</el-form>
		<!-- 上部表单可编辑 -->
		<el-form ref="form" :model="form" :rules="rules" label-width="80px" v-show="edit" v-if="form">
	      <el-form-item label="表单名称" prop='name'>
	        <el-input v-model="form.name" placeholder="请输入表单名称" :value="form.name"></el-input>
	      </el-form-item>
	      <el-form-item label="表单类型" width="300" prop="category">
	        <el-select v-model="form.category" placeholder="请选择">
	          <el-option v-for="serviceState in serviceState" :label="serviceState.type" :value="serviceState.category"></el-option>
	        </el-select>
	      </el-form-item>
	      <span class="hongdian" style="color: #ff4949;position: absolute; top: 250px;">*</span>
	      <el-form-item label="服务分类" width="300" v-if="hasFormZr" style="position: relative;">
	        <el-select v-model="form.service_category_id" placeholder="请选择" @change="serviceCont">
	          <el-option v-for="s in service" :label="s.name" :value="s.id"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="服务名称" width="300" v-show="neirong" prop="service_id" v-if="hasFormZr">
	        <el-select v-model="form.service_id" clearable placeholder="请选择">
	          <el-option v-for="v in serviceContent" :label="v.name" :value="v.id"></el-option>
	        </el-select>
	      </el-form-item>
	      <el-form-item label="前置说明">
	        <el-input type="textarea" v-model="form.summary" placeholder="请输入前置说明文" class="duowenben"></el-input>
	      </el-form-item>
	    </el-form>
		<div class="addType" v-show="addTypedetails">
		<img src="../../../assets/images/create/lvsetishi.png" height="15" width="14">
		请从右选择添加表单问题</div>
		<div class="frameCenter">
			<draggable v-model="detailsCont">
				<transition-group name="list-complete" class="showKuang">
					<component v-for="(item,i) in detailsCont" v-bind:key="item.type" v-bind:is="item.type" v-bind:message="item" v-bind:parent="detailsCont" v-bind:index="i" class="list-complete-item"  ref="wf_input"></component>
				</transition-group>
			</draggable>
		</div>
		<div class="lastBtn" ref="btn">
			<el-button type="primary" class="submit" @click="onsubmit2('form')" :disabled="disabled" v-if="editable_zr == true">提交</el-button>
			<el-button type="primary" class="submit" @click="onsubmit('createform')" :disabled="disabled" v-else>提交</el-button>
			<el-button type="primary" class="submit" @click="func1" :disabled="disabled">预览</el-button>
		</div>
		<div class="suspension" ref="yulan">
			<ul>
				<li>添加问题</li>
				<li class="danhang" @click="add('chartinput')">
					<img src="../../../assets/images/create/danhang.png">
					单行文本
				</li>
				<li class="duohang" @click="add('charttextarea')">
					<img src="../../../assets/images/create/duohang.png" height="14" width="15">
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
		<div>{{gerytwo}}</div>
		<div>{{editShow}}</div>
		<!-- {{this.detailsCont}} -->
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
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
  export default {
  	name:'app',
	components:{
	   	whiteHeader , chartinput , chartcheckbox , chartradio , chartdate , charttextarea , chartselect , chartupload  ,headerTwo ,draggable ,charttime
	},
	data(){
		var checkAge = (rule, value, callback) => {
	        if (this.form.service_category_id == '0') {
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
			detailsCont:[],
			id:'',
			detailsId:'',
			submitShow:[],
			loggedEvent:'',
			disabled:false,
			detailshezi:false,
			addTypedetails:false,
			service:[],
			serviceContent:[],
			formTop: {},
	        form:{
	        	name: '',//表单名称
	          	category:'',//表单类型
	          	provider_id:'',//服务商ID
	    	  	service_category_id:'',//服务类别ID
	    	  	service_id:'',//服务内容ID
				summary:'',//前置说明
	        },
	        rules:{
	        	name:[
	        		{required:true,message:"请输入表单名称",trigger:'blur'},
            		{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
	        	],
	        	category:[
	        		{ required: true, message: '请选择表单类型', trigger: 'change' }
	        	],
	        	service_category_id:[
	        		{ required: true, message: '请选择服务分类', trigger: 'change' }
	        	],
	        	service_id:[
	        		// { required: false, message: '请选择服务内容', trigger: 'change' },
	        		{ validator: checkAge, trigger: 'change' }
	        	],
	        },
	        serviceState: [
	          {
	            type: '问卷调查',
	            category:'question'
	          },
	          {
	            type: '申请表',
	            category:'apply'
	          }
	        ],
	        editable:'',//表单头部信息是否可编辑
	        edit:'',//可编辑显示
	        editNo:'',//不可编辑显示
	        id_zr:'',
	        changeNum:false,
		}
	},
	// //根据路由判断显示的数据
	beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.detailsId = to.params.id
        // 从列表页跳转详情页
        if (from.name == 'serviceRight') {
        	vm.$http.get(API.url+'provider_forms/'+vm.detailsId
			).then((res)=>{
			vm.detailsCont = res.body.provider_form.form.content
			vm.editable = res.body.provider_form.editable
			vm.$store.dispatch('editable_zr',vm.editable)//把是否可编辑状态存到vuex
			vm.formTop = res.body.provider_form
			vm.$store.dispatch('getContent',{'content':vm.detailsCont})
			vm.$store.dispatch('getformtop',{'formTop':vm.formTop})//存头部信息的
			vm.form.name = vm.formtop_zr.name
	        vm.form.category = vm.formtop_zr.category
	        vm.form.service_category_id = vm.formtop_zr.service_category_id
	        vm.form.summary = vm.formtop_zr.summary
	        vm.form.service_id = vm.formtop_zr.service_id
	        // 获取服务名称的接口
	        if (vm.formtop_zr.service_category_id !== 0 && !!vm.formtop_zr.service_category_id) {
	        	vm.id_zr = vm.formtop_zr.service_category_id
	          	vm.$http.get(API.serviceurl+'service_categories/'+vm.formtop_zr.service_category_id+'/services'
		         ).then((res)=>{
		            vm.serviceContent = res.body.services
	         	 })
	        }
	        // 判断如果服务分类为0的话服务名称隐藏
	        if (vm.formtop_zr.service_category_id == 0) {
	        	vm.neirong = false
	        }else{
	        	vm.neirong = true
	        }
		})
		// 从预览页面跳转详情页
        }else if(from.name == 'formpreviewTwo'){
        	vm.changeNum = 0
        	vm.detailsCont = vm.details_zr
        	vm.formTop = vm.formtop_zr
        	// 从预览页面回来头部从vuex预览取数据
        	vm.form = vm.formtop_zr
			if (vm.formtop_zr.service_category_id !== 0 && !!vm.formtop_zr.service_category_id) {
	        	vm.id_zr = vm.formtop_zr.service_category_id
	          	vm.$http.get(API.serviceurl+'service_categories/'+vm.formtop_zr.service_category_id+'/services'
		         ).then((res)=>{
		         	vm.neirong = true
		            vm.serviceContent = res.body.services
	         	 })
	        }else{
	        	vm.neirong = false
	        }
        }
      })
    },
    watch: {
      '$route':'detailsShow'
	},
	created(){
		this.leave()
		this.serviceSorts()
		// this.getserviceContent()
	     if(this.$store.state.formzr.formTop){
		    this.detailsCont = this.details_zr
		    this.form.summary = this.formtop_zr.summary
		    this.formTop = this.formtop_zr
		    this.form = this.formtop_zr
	     }
	},
	computed:{
		hasFormZr(){
			 if (this.$store.state.formzr) {
		      return true
		    } else {
		      return false
		    }
		},
		// 判断如果表单内容为空的话 按钮的状态
		gerytwo(){
			if (this.$store.state.formzr.detailsCont.content == '') {
				this.disabled = true
				this.addTypedetails = true
			}else{
				this.addTypedetails = false
				this.disabled = false
			}
		},
		...mapGetters(["current_providers",'form_id_zr','details_zr','formtop_zr','editable_zr','summary_zr']),
		editShow(){
			if (this.editable_zr == true) {
				this.edit = true 
				this.editNo = false
				this.serviceSorts()//调用服务分类接口
			}else{
				this.edit = false
				this.editNo = true
			}
			if (this.formtop_zr.service_category_id !== 0 && !!this.formtop_zr.service_category_id) {
				this.neirong = true
	        	this.id_zr = this.formtop_zr.service_category_id
	          	this.$http.get(API.serviceurl+'service_categories/'+this.formtop_zr.service_category_id+'/services'
		         ).then((res)=>{
		            this.serviceContent = res.body.services
	         	 })
	        }else{
	        	this.neirong = false
	        }
		}
	},
	methods:{
		add(type){
			this.detailsCont.push({
				title: "",
				describe:"",
				type: type,
				rules: [],
				checkList:'',
				value: [""]
			})
			this.disabled = false
		},
		// 预览
		func1(){
			// 判断标题是否填写
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
		    		this.$router.push({name: 'formpreviewTwo',params:{id:this.detailsId}})
		    		this.$store.dispatch('getContent',{'content':this.detailsCont})
					this.$store.dispatch('getQzsm',{'summary':this.formTop.summary})
					this.$store.dispatch('getformtop',{'formTop':this.form})//存头部信息的
		    	}
		},
		// 服务分类
	    serviceSorts(){
	        var s = new Object()
	        s.name = "通用"
	        s.id = 0
	        this.$http.get(API.serviceurl+'service_categories'
	        ).then((res)=>{
	          this.service = res.body.service_categories
	          this.service.push(s)
	        })
	        // this.serviceCont()
	    },
	    // 服务内容
	    serviceCont(){
	        if (this.form.service_category_id !== 0 && !!this.form.service_category_id) {
	        	this.id_zr = this.form.service_category_id
	          	this.$http.get(API.serviceurl+'service_categories/'+this.form.service_category_id+'/services'
		         ).then((res)=>{
		         	this.neirong = true
		            this.serviceContent = res.body.services
		            let arr = []
		            this.serviceContent.forEach((v)=>{
			        	arr.push(v.id)
			    	})
			    	if (arr.indexOf(this.form.service_id) < 0) {
	    				this.form.service_id = ''
	    			}
	         	 })
	        }else{
	        	this.neirong = false
	        }
	        if (this.form.service_category_id == 0 ) {
	        	this.form.service_id = ''
	        }
	    },
		// 不可编辑成功提交
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
			        	this.$http.patch(API.url+'provider_forms/'+this.detailsId,{
								'items':this.detailsCont,
								'summary':this.form.summary
							}
						).then((res)=>{
			            	this.id = res.data.id
			            	this.$router.push({name: 'serviceRight',params:{id:this.form_id_zr}})
			        	})
	                  
	                }, 300);
	              }, 1000);
	            } else {
	              done();
	            }
	        }
	        }).then(action => {

	        });
	    },
	    //可编辑
	    submitEdit(){
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
	                  this.form.provider_id = this.$route.params.id
			        	this.$http.patch(API.url+'provider_forms/'+this.detailsId,{
								  'items':this.detailsCont,
								  'provider_id':this.form_id_zr,
			                      'name':this.form.name,
			                      'category':this.form.category,
			                      'service_category_id':this.form.service_category_id,
			                      'service_id':this.form.service_id,
			                      'summary':this.form.summary
							}
						).then((res)=>{
			            	this.id = res.data.id
			            	this.$router.push({name: 'serviceRight',params:{id:this.form_id_zr}})
			        	})
	                }, 300);
	              }, 1000);
	            } else {
	              done();
	            }
	        }
	        }).then(action => {

	        });
	    },
	    // 不可编辑提交验证
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
	        this.$refs[formName].validate((valid) => {
	          if (valid && validComponent) {
	            this.open4()
	          } else {
	            return false;
	          }
	        });
	    },
	    // 可编辑提交验证
	    onsubmit2(formName) {
	    	var validComponent;
	    	var arr = [];
	    		this.$refs.wf_input.forEach((v)=>{
	    			arr.push(v.inputBlur())
		    	})
		    	// 再循环下arr
		    	validComponent = arr.every((v)=>{
		    		return (v==true)
		    	})
	        this.$refs[formName].validate((valid) => {
	          if (valid && validComponent) {
	            this.submitEdit()
	          } else {
	            return false;
	          }
	        });
	    },
	    //获取详情页展示
	    detailsShow(){
	    	this.detailsId = this.$route.params.id
	    	this.$http.get(API.url+'provider_forms/'+this.detailsId
	    		).then((res)=>{
	    		this.detailsCont = res.body.provider_form.form.content
	    		this.formTop = res.body.provider_form
	    	})
	    },
	    leave(){
			var is_confirm = false
			// 关闭窗口时弹出确认提示
		    $(window).bind('beforeunload', function(){
		        // 只有在标识变量is_confirm不为false时，才弹出确认提示
		        if(window.is_confirm !== false)
		            return '您可能有数据没有保存';
		        // this.detailsShow()
		    })
		    //页面内的跳转操作均不弹出确认窗口
			$(window).bind('mouseover mouseleave', function(event){
			    is_confirm = event.type == 'mouseleave';
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
