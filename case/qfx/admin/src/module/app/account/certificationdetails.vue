<template>
  <div class="certification" v-if="cerdetails">
	<el-breadcrumb separator=">">
	      <el-breadcrumb-item :to="{ name:'certification' }">企业认证审核>查看详情</el-breadcrumb-item>
	</el-breadcrumb>
  	<div class="details">
  		<div class="detailsTitle">企业申请信息</div>
	  	<div class="enterpriseInfo">
	  		<div class="left">
	  			<p class="name">企业名称：{{cerdetails.name}}</p>
	  			<p class="name">企业地址：{{cerdetails.address}}</p>
	  			<div v-if="cerdetails.owner !== null || ''" style="margin-top:10px;">
	  				<p class="name" v-if="cerdetails.owner.fixed_phone !== null || ''">固定电话：{{cerdetails.owner.fixed_phone}}</p>
		  			<p class="name" v-if="cerdetails.owner.name !== null || ''">姓名：{{cerdetails.owner.name}}</p>
		  			<p class="name" v-if="cerdetails.owner.phone_number !== null || ''">手机号码：{{cerdetails.owner.phone_number}}</p>
	  			</div>
	  			<div class="wrapper" v-show="wrapper">
				    <el-button type="danger"  @click="open3" class="btndetails">拒绝</el-button>
	   				<el-button type="info" class="btndetails" @click="pass">通过</el-button>
				</div>
	  		</div>
	  		<ul class="each-item">
	          <li>
	            <ul class="img-box">
	              <li v-for="(cerdetails,i) in cerdetails.certifications">
	                <img :src="cerdetails.url" alt="" @click="showImg(i)" v-if="hasPdf(cerdetails,i)">
                  	<span class="tag" v-if="cerdetails.category=='business'">营业执照</span>
	                <span class="tag" v-else-if="cerdetails.category=='organization'">组织机构代码证</span>
	                <span class="tag" v-else-if="cerdetails.category=='tax'">税务登记证</span>
	                <span class="tag" v-else="cerdetails.category== null ">营业执照</span>
	              </li>
                <el-dialog :visible.sync="dialogVisible">
                  <img :src="changeUrl" alt="" width="100%">
                </el-dialog>
	            </ul>

	          </li>
	        </ul>
	  	</div>
	  	<div class="detailsTitle">操作记录</div>
	  	<div class="enterpriseInfo2">
	  		<table v-for="operationList in operationList">
	  			<tr>
	  				<td>{{operationList.created_at | formatDate}}</td>
	  				<td>{{operationList.corp.name}}</td>
	  				<td class="last">{{operationList.content}}</td>
	  			</tr>
	  		</table>
	  		<p style="text-align: center;" v-show="noneshuju">暂无数据</p>
	  	</div>
  	</div>
  	<!-- 审核拒绝的弹框 -->
  	<div class="cover"></div>
  	<el-button type="text"></el-button>
  	<div>{{panduan}}</div>
  	<div>{{panduan2}}</div>
  </div>
</template>
<script>
  import API from 'API/config'
  import {formatDate,currency} from 'assets/js/filter'
	export default{
		props:['status'],
		data(){
			return {
				id:'',
				auth_status:'',
				audit:'',
				cerdetails:'',
				operationList:'',
				noneshuju:false,
				dialogVisible: false,//显示缩略图
        changeUrl:'',
				wrapper:false
			}
		},
		beforeRouteEnter (to, from, next) {
	      next(vm => {
	        vm.id = to.params.id
	        vm.auth_status = to.params.auth_status
	      })
	    },
	    watch: {
	      '$route':'cerdetails'
	    },
	    created(){
	    	// 获取详情页数据
	    	this.id = this.$route.params.id
	      	this.$http.get(API.url+'corps/'+this.id
	    		).then((res)=>{
	    		this.cerdetails = res.body.corp
	    	})
	    	this.auth_status = this.$route.params.auth_status
	    	this.operation()
	    },
	    computed:{
	    	// 判断是否是等待审核
	    	panduan(){
	    		if (this.auth_status == 'verifying') {
		    		this.wrapper = true
		    	}else{
		    		this.wrapper = false
		    	}
	    	},
	    	panduan2(){
	    		if (this.operationList.length == 0) {
	    			this.noneshuju = true
	    		}else{
	    			this.noneshuju = false
	    		}
	    	}
	    },
		methods: {
			// 拒绝
		    open3() {
		        this.$prompt('请输入拒绝理由', '审核拒绝', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消'
		        }).then(({ value }) => {
		          this.$message({
		            type: 'success',
		            message: '拒绝理由是: ' + value
		          });
              this.id = this.$route.params.id
			      	this.auth_status = this.$route.params.auth_status
			      	this.$http.patch(API.url+'corps/'+this.id+'/check',{
			      		'auth_status':'failed',
			      		'reject_reason':value
			      		}
			    		).then((res)=>{
			    		this.audit = res.body
			    		this.total_count = res.body.total_count
              this.$router.push({name: 'certification'})
        })
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消输入'
		          });
		        });
		    },
		    // 通过
		    pass() {
			   	this.$confirm('是否通过?', '温馨提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {

		          this.$http.patch(API.url+'corps/'+this.id+'/check',{
			      		'auth_status':'verified'
			      		}
			    		).then((res)=>{
			    		this.audit = res.body
			    		this.total_count = res.body.total_count
              this.$message({
                type: 'success',
                message: '已通过!'
              });
              this.wrapper = false
              this.$router.push({name: 'certification'})
			    	})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消通过'
		          });
		        });
		    },
		    // 操作记录
		    operation(){
		    	this.$http.get(API.url+'corp_logs?'+'q[corp_id_eq]='+this.id+'&'+'page='+1+'&'+'per='+50
			    		).then((res)=>{
			    		this.operationList = res.body.corp_logs
			    		// console.log(this.operationList)
			    		this.total_count = res.body.total_count
			    	})
		    },
	      showImg(i){
	        this.changeUrl = this.cerdetails.certifications[i].url
	        this.dialogVisible = true
	      },
        //判断图片是不是pdf
        hasPdf(v,i){
          var hasPdf = new RegExp('pdf').test(v.name);
          if(hasPdf){
            return v.url='http://os8x5i7y1.bkt.clouddn.com/cover-pdf.png'
          }else{
            return v.url
          }
        }
	    },
	    filters:{
	      formatDate(time){
	        let date=new Date(time);
	        return formatDate(date,'yyyy-MM-dd hh:mm')
	      },
	      currency(val){
	        return currency(val)
	      }

	    }
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
</style>
