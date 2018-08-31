<template>
	<div class="frameCreate">
	    <!-- 标题 -->
		<el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{name:'serviceRight',params:{id:this.form_id_zr}}">服务商表单管理</el-breadcrumb-item>
          <span>新增表单</span>
        </el-breadcrumb>
        <!-- 上部表单 -->
		<el-form ref="createform" :model="form.formTop" :rules="rules" label-width="80px" v-if="form.formTop.name">
			  <el-form-item label="表单名称">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="form.formTop.name"></el-input>
			  </el-form-item>
			  <el-form-item label="表单类型" width="300">
			    <el-input placeholder="请输入表单名称" disabled="disabled" v-if="form.formTop.category == 'apply'" value="申请表"></el-input>
			    <el-input placeholder="请输入表单名称" disabled="disabled" v-else value="问卷调查"></el-input>
			  </el-form-item>
			  <el-form-item label="服务分类" width="300">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="form.formTop.service_category.name"></el-input>
			  </el-form-item>
			  
			  <el-form-item label="服务内容" width="300">
			    <el-input placeholder="请输入表单名称" disabled="disabled" :value="form.formTop.service.name"></el-input>
			  </el-form-item>
			  <el-form-item label="前置说明">
			    <el-input type="textarea"  v-model="form.formTop.summary" placeholder="请输入前置说明文" class="duowenben"></el-input>
			  </el-form-item>
		</el-form>
		<div class="addType" v-show="addTypedetails">
		<img src="../../../assets/images/create/lvsetishi.png" height="15" width="14">
		请从右选择添加表单问题</div>
		<div class="frameCenter" v-show="detailshezi">
			<draggable v-model="detailsCont">
				<transition-group name="list-complete" class="showKuang">
					<component v-for="(item,i) in detailsCont" v-bind:key="item.type" v-bind:is="item.type" v-bind:message="item" v-bind:parent="detailsCont" v-bind:index="i" class="list-complete-item"></component>
				</transition-group>
			</draggable>
		</div>
		<div class="lastBtn" ref="btn">
			<el-button type="primary" class="submit" @click="onsubmit('createform')" :disabled="disabled">提交</el-button>
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
  import draggable from 'vuedraggable'

  import API from 'API/config'
  export default {
  	name:'app',
	components:{
	   	whiteHeader , chartinput , chartcheckbox , chartradio , chartdate , charttextarea , chartselect , chartupload  ,headerTwo ,draggable
	},
	data(){
		return {
			detailsCont:[],
			id:'',
			detailsId:'',
			leftid:'',
			submitShow:[],
			loggedEvent:'',
			disabled:false,
			detailshezi:false,
			addTypedetails:false,
			form: {
			  formTop:{},
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
            		{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
	        	],
	        	typeInfo:[
	        		{ required: true, message: '请选择表单类型', trigger: 'change' }
	        	],
	        	serviceId:[
	        		{ required: true, message: '请选择服务分类', trigger: 'change' }
	        	],
	        	service_id:[
	        		{ required: true, message: '请选择服务内容', trigger: 'change' }
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
      })
    },
    watch: {
      '$route':'open4'
    },
	created(){
		if(JSON.parse(window.localStorage.getItem('detailsCont'))==null || JSON.parse(window.localStorage.getItem('detailsCont')).length == 0){
			this.detailsCont=[]
			this.detailshezi = false
			this.disabled = true
			this.addTypedetails = true

		}else{
			this.detailshezi = true
			this.addTypedetails = false
			this.detailsCont = JSON.parse(window.localStorage.getItem('detailsCont'));
		}
		this.detailsShow()
		this.leave()
	},
	computed:{
		gerytwo(){
			if (this.detailsCont == '') {
				this.detailshezi = false
				this.disabled = true
				this.addTypedetails = true
			}else{
				this.addTypedetails = false
			}
		},
		...mapGetters(['form_id_zr'])
	},
	methods:{
		add(type){
			this.detailsCont.push({
				title: "",
				describe:"",
				type: type,
				rules: [],
				checkList:[],
				value: ['选项值','选项值']
			})
			this.detailshezi = true
			window.localStorage.setItem('detailsCont', JSON.stringify(this.detailsCont))
			this.disabled = false
		},
		// 预览
		func1(){
			if (this.disabled = true) {
				this.$router.push({name: 'formpreviewTwo',params:{id:this.detailsId}})
				window.localStorage.setItem('detailsCont', JSON.stringify(this.detailsCont))
			}
			window.localStorage.setItem('summary', JSON.stringify(this.form.formTop.summary))
		},
		// 成功提交
		open4() {
	        const h = this.$createElement;
	        this.$msgbox({
	          title: '提示',
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
	                  this.$router.push({name: 'serviceRight',params:{id:this.form_id_zr}})
	                }, 300);
	              }, 1000);
	            } else {
	              done();
	            }
	        }
	        }).then(action => {
	        	this.detailsId = this.$route.params.id
	        	this.$http.patch(API.url+'provider_forms/'+this.detailsId,{
						'items':this.detailsCont,
						'summary':this.form.formTop.summary
					}
				).then((res)=>{
	            	this.id = res.data.id
	        	})
	        });
	    },
	      // 提交验证
	    onsubmit(formName) {
	    	this.form.provider_id = this.$route.params.id
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            this.open4()
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
	    		this.form.formTop = res.body.provider_form
	    		// window.localStorage.setItem('detailsCont', JSON.stringify(this.detailsCont))
	    	})
	    },
	    leave(){
			var is_confirm = false
			// 关闭窗口时弹出确认提示
		    $(window).bind('beforeunload', function(){
		        // 只有在标识变量is_confirm不为false时，才弹出确认提示
		        if(window.is_confirm !== false)
		            return '您可能有数据没有保存';
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
