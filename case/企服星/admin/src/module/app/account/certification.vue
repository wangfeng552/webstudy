<template>
  <div class="certification">
  	<el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'certification' }">企业认证审核</el-breadcrumb-item>
    </el-breadcrumb>
  	<div class="blue-tab">
      <ul>
        <li v-for="(v,i) in location" @click="chooseLocation(i)" :class="{active:v.active}">{{v.place}}</li>
      </ul>
    </div>
    <div class="table-box">
      <el-table :data="audit" style="width: 100%" v-bind:status="auth_status">
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column label="申请时间">
          <template scope="scope">
            <span>{{scope.row.updated_at | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="180">
			<template scope="scope">
	            <span v-if="scope.row.auth_status == 'failed'">认证失败</span>
	            <span v-else-if="scope.row.auth_status == 'unauthorized'">未认证</span>
	            <span v-else-if="scope.row.auth_status == 'verifying'">认证中</span>
	            <span v-else>已认证</span>
	         </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <span class="checkDtl"><router-link :to="{name:'certificationdetails',params:{id:scope.row.id,auth_status:scope.row.auth_status}}" @click="">查看</router-link></span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange"  layout="total, prev, pager, next, jumper" :total="total_count" :page-size="10" :current-page.sync="page">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import {formatDate,currency} from 'assets/js/filter'
  import {mapGetters} from 'vuex'
  export default{
		data() {
	      return {
	        activeName: 'first',
	        audit:[],
	        id:'',
	        total_count:1,
	        status:'',
	        trades:'',
	        location: [
	          {
	            active: true,
	            place: '全部',
	            auth_status_in:'verifying,verified,failed'
	          },
	          {
	            active: false,
	            place: '等待审核',
	            auth_status_in:'verifying'
	          },
	          {
	            active: false,
	            place: '审核通过',
	            auth_status_in:'verified'
	          },
	          {
	            active: false,
	            place: '审核拒绝',
	            auth_status_in:'failed'
	          }
	        ],
          page:1
	      };
	    },
    computed:{
      ...mapGetters(["change_tab_v","change_page"])
    },
    beforeRouteLeave(to,from,next){
        var mark =false;
        if ((/certificationdetails/.test(to.fullPath))){
          mark = true;
        }
        if(!mark){
          this.$store.dispatch('get_chnage_tab',0);
          this.$store.dispatch('get_page',1);
        }
        next(true)
    },
    created(){
//      this.$http.get(API.url+'corps?per=10&page='+1+'&'+'q[auth_status_in]=verifying,verified,failed'
//        ).then((res)=>{
//        this.audit = res.body.corps
//        this.total_count = res.body.total_count
//      })
      this.getList()
      this.page = this.change_page;
      if(this.change_tab_v==-100){
        this.chooseLocation(0);
      }else{
        this.chooseLocation(this.change_tab_v);
      }

    },
    methods: {
      chooseLocation(i){
      	if(this.change_tab_v!==i){
      		this.page = 1
        }
        this.$store.dispatch('get_chnage_tab',i);
        this.location.forEach((v) => {
          v.active = false
        })
        this.location[i].active = true
        this.status = this.location[i].auth_status_in
        this.$http.get(API.url+'corps?per=10&page='+ this.page+'&'+'q[auth_status_in]='+this.location[i].auth_status_in
        ).then((res)=>{
        this.audit = res.body.corps
        this.total_count = res.body.total_count
        this.getList()
      })
      },
      getList(){
        this.$http.get(API.url + 'corps/statistics'
      ).then((res) => {
        this.location[0].place = '全部（'+res.body.total_count+'）'
        this.location[1].place = '等待审核（' + res.body.verifying_count + '）'
        this.location[2].place = '审核通过（' + res.body.verified_count+ '）'
        this.location[3].place = '审核拒绝（' + res.body.failed_count + '）'
  //          this.state[0].type ='全部（' +res.body.total_count+'）'
      })
      },
      handleCurrentChange(i) {
        this.$store.dispatch('get_page',i);
        this.$http.get(API.url+'corps?per=10&page='+i+'&'+'q[auth_status_in]='+this.status
        ).then((res)=>{
          this.audit = res.body.corps
        this.total_count = res.body.total_count
        })
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
