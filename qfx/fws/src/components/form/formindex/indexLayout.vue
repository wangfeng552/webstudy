<template>
    <div class="fromContent">
      <div class="from-main">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>表单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
          <router-link  :to="{name:'formcreate'}">
            <span class="new" @click="clear">新建表单</span>
          </router-link>  
        </div>
        <div class="serviceCont">
          <div class="serviceRight">
            <el-table :data="serviceList" style="width: 100%">
              <el-table-column prop="name" label="表单名称" width="140">
                <template scope="scope">
                  <router-link :to="{name:'formdetails',params:{id:scope.row.id}}">
                    <span>{{scope.row.name}}</span>
                  </router-link>
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
                      <div class="tips" v-if="scope.row.service_category.name == '工商注册'">
                        <img src="../../../assets/images/create/shenbao.png" height="28" width="28">工商注册
                      </div>
                      <div class="tips2" v-else-if="scope.row.service_category.name == '知识产权'">
                        <img src="../../../assets/images/create/chanquan.png">知识产权
                      </div>
                      <div class="tips3" v-else-if="scope.row.service_category.name == '税收减免'">
                        <img src="../../../assets/images/create/shuishou.png">税收减免
                      </div>
                      <div class="proName">{{scope.row.service.name}}</div>
                  </template>
              </el-table-column>
              <el-table-column label="发布时间" width="150">
                <template scope="scope">
                  <span>{{scope.row.created_at.substring(0,10)}}</span>
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
            <el-pagination @current-change="handleCurrentChange"  layout=" total, prev, pager, next, jumper" :total=" total_count" :page-size="10">
            </el-pagination>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div> 
</template>
<script>
  import API from 'API/api'
  export default {
    components: { },
    data(){
      return {
        serviceList:[],
        leftid:'',
        total_count:1
      }
    },
    created(){
      // this.getLeftService()
    },
    methods:{
      // 创建表单时清除localstorage的值
      clear(){
        localStorage.removeItem('items');
      },
      //左侧服务商列表
      getLeftService(){
          this.$http.get(API.url+'admin/providers'
        ).then((res)=>{
          this.serviceList = res.body.providers
        }) 
      },
      leftClick(id){
        this.$store.dispatch('get_fws_id',{'aaa':id})
      },
      handleCurrentChange(val) {
        this.$http.get(API.url+'provider_forms?per=10&page='+val+'&'+'q[provider_id_eq]='+this.leftid
        ).then((res)=>{
          this.serviceList = res.body.provider_forms
          this.total_count = res.body.total_count
        })
      }
    }
  }
</script>