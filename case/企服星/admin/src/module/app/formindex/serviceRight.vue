<template>
      <div class="serviceRight">
        <div class="form-box">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="表单名称">
              <el-input v-model="formInline.name_cont" placeholder="请输入表单名称"></el-input>
            </el-form-item>
            <el-form-item label="表单归属">
              <el-select v-model="formInline.owner_eq" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="服务商" value="provider"></el-option>
                <el-option label="运营" value="operator"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="表单类型">
              <el-select v-model="formInline.category_eq" placeholder="全部">
                <el-option label="全部" value=""></el-option>
                <el-option label="申请表" value="apply"></el-option>
                <el-option label="问卷" value="question"></el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="服务名称" style="margin-right:10px;" class="FWMC">
              <el-select v-model="formInline.service_category_id_eq" placeholder="全部" @change="serviceCont()">
                <el-option :label="v.name" v-for="v in categories" v-if="v.name=='专项资金申报'||v.name=='税收减免'||v.name=='知识产权'||v.name=='通用'||v.name=='全部'" :value="v.id" :key="v.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="!disabled" class="form-service">
              <el-select v-model="formInline.service_id_eq" placeholder="请选择">
                <el-option :label="v.name" :value="v.id" :key="v.id" v-for="v in service"></el-option>
              </el-select>

            </el-form-item>
            <el-form-item v-if="disabled" class="form-service">
              <el-select v-model="formInline.service_id_eq" placeholder="请选择"  disabled>
                <el-option :label="v.name" :value="v.id" :key="v.id" v-for="v in service"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发布日期">
              <template>
                <div class="fl">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    :editable="false"
                    @change = 'datePicker1'
                  >
                  </el-date-picker>
                </div>
              </template>
              <span class="fl date-line"></span>
              <template>
                <div class="fl" style="margin-left: 8px;">
                  <el-date-picker
                    v-model="value2"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions2"
                    :editable="false"
                    @change = 'datePicker2'
                  >
                  </el-date-picker>
                </div>
              </template>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="toSearch()">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="serviceList" style="width: 100%">
          <el-table-column prop="name" label="表单名称" width="140">
            <template scope="scope">
              <!--<router-link :to="{name:'formdetails',params:{id:scope.row.id}}">-->
                <span>{{scope.row.name}}</span>
              <!--</router-link>-->
            </template>
          </el-table-column>
          <el-table-column prop="type" label="表单类型" width="100">
            <template scope="scope">
              <span v-if = "scope.row.category == 'apply'">申请表</span>
              <span v-else>问卷调查</span>
            </template>
          </el-table-column>

          <el-table-column prop="projectName" label="项目名称" width="300">
              <template scope="scope">
                  <div class="tips" v-if="scope.row.service_category_name == '专项资金申报'">
                    <img src="../../../assets/images/create/shenbao.png" height="28" width="28">专项资金申报
                  </div>
                  <div class="tips2" v-else-if="scope.row.service_category_name == '知识产权'">
                    <img src="../../../assets/images/create/chanquan.png">知识产权
                  </div>
                  <div class="tips3" v-else-if="scope.row.service_category_name == '税收减免'">
                    <img src="../../../assets/images/create/shuishou.png">税收减免
                  </div>
                  <div class="" v-else-if="scope.row.service_category_name == '通用'" style="color: #333;font-size: 12px;">
                    通用
                  </div>
                  <div class="proName">{{scope.row.service_name}}</div>
              </template>
          </el-table-column>
          <el-table-column label="发布时间" width="150">
            <template scope="scope">
              <span>{{scope.row.created_at | formatDate}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ascription" label="表单归属" width="90">
            <template scope="scope">
              <span>运营者</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="90">
            <template scope="scope">
              <router-link :to="{name:'formdetails',params:{id:scope.row.id}}">
                <el-button size="small" class="del">编辑</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange"  layout=" total, prev, pager, next, jumper" :total=" total_count" :page-size="10" :current-page.sync="page">
        </el-pagination>
      </div>
      </div>
</template>
<script>
  import API from 'API/config'
  import {mapGetters} from 'vuex'
  import {formatDate,currency} from 'assets/js/filter'
  export default {
    components: { },
    data(){
      return {
        formInline: {
          name_cont: '',
          owner_eq: '',
          category_eq: '',
          service_id_eq: '',
          created_at_gteq: '',
          created_at_lteq: '',
          provider_id_eq:'',
          service_category_id_eq:''
        },
        serviceName:'',//vuex里要存的服务分类名称
        categories:'',
        service:'',
        serviceId:'',
        name:'',
        coverBackground:false,
        delAlert:false,
        id:'',
        leftid:'',
        detailsId:'',
        total_count:1,
        serviceList:[],
        value1: '',
        value2: '',
        page:'',
        disabled:false
      }
    },

    watch: {
      '$route':'toSearch'
    },
    created(id){
//     this.getList()
      this.getService()
      this.page = this.formPage
    },
    computed:{
      ...mapGetters(['form_id_zr','formSearch','formPage','formServiceId'])
    },
    beforeRouteEnter(to,from,next){
      next(vm=>{
        if(to.name=='serviceRight'){
          vm.formInline = vm.formSearch
          vm.formInline.provider_id_eq = to.params.id
          vm.page = vm.formPage
          vm.value1= vm.formInline.created_at_gteq
          vm.value2= vm.formInline.created_at_lteq
          vm.toSearch()
        }
      })
    },
    beforeRouteLeave(to,from,next){
      var mark =false;
      if(to.name=='serviceRight'||to.name=='formdetails'){
        mark = true
      }
      if(!mark){
        this.formInline = {
          name_cont: '',
          owner_eq: '',
          category_eq: '',
          service_id_eq: '',
          created_at_gteq: '',
          created_at_lteq: '',
          provider_id_eq:'',
          service_category_id_eq:''
        },
        this.page = 1
        this.value1= ''
        this.value2= ''
        this.$store.dispatch('formSearch', this.formInline)
        this.$store.dispatch('formPage', this.page)
      }
      next(true)
    },
    methods:{
      handleCurrentChange(val) {
        this.page = val
        this.$http.get(API.url+'provider_forms',{
          params: {
            q: this.clearParams(this.formInline),
            per:10,
            page:this.page
          }
          }
        ).then((res)=>{
          this.serviceList = res.body.provider_forms
          this.total_count = res.body.total_count
          this.$store.dispatch('formPage',this.page)
        })
      },
      // 清空local的必填数据
      clear(){
        localStorage.removeItem('check');
        localStorage.removeItem('check2');
        localStorage.removeItem('check3');
        localStorage.removeItem('check4');
        localStorage.removeItem('check5');
        localStorage.removeItem('check6');
        localStorage.removeItem('check7');
      },
      //获取服务
      getService(){
        var s = new Object()
        s.name = "通用"
        s.id = 0
        var all = new Object()
        all.name = '全部'
        all.id = ''
        this.$http.get(API.serviceurl+'service_categories'
        ).then((res)=>{
          this.categories = res.body.service_categories
          this.categories.push(s)
          this.categories.push(all)
        })
      },
      datePicker1(val){
        this.formInline.created_at_gteq = val
      },
      datePicker2(val){
        this.formInline.created_at_lteq = val
      },
      //获取分类下的所有服务
      serviceCont(){
        if(this.formInline.service_category_id_eq!== ''&&this.formInline.service_category_id_eq!=0&&this.formInline.service_category_id_eq!=-1){
          this.disabled = false
          this.$http.get(API.serviceurl+'service_categories/'+this.formInline.service_category_id_eq+'/services'
          ).then((res)=>{
            this.service = res.body.services
          })
        }else if(this.formInline.service_category_id_eq===0){
         this.disabled = true
          this.formInline.service_id_eq = ''
        }else if(this.formInline.service_category_id_eq==''){
          this.disabled = false
          this.formInline.service_id_eq = ''
        }
        this.$store.dispatch('formServiceId',this.formInline.service_category_id_eq)
      },
      //查询条件
      toSearch(){
        this.formInline.provider_id_eq = this.$route.params.id
        this.$http.get(API.url+'provider_forms', {
          params: {
            q: this.clearParams(this.formInline),
            per:10,
            page:this.page
          }
        }).then((res)=>{
          this.serviceList = res.body.provider_forms
          this.total_count = res.body.total_count
          this.$store.dispatch('formSearch',this.formInline)
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
<style lang="scss" rel="stylesheet/scss">
  .serviceRight{
    .form-service{
      .el-select{
        width:300px;
      }
      .FWMC{
        .el-select{
          .el-input{
            width: 100px;
          }
        }
      }
    }
  }
</style>

