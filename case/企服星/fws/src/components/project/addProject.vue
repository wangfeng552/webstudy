<template>
  <div class="create-role">
    <el-breadcrumb separator=">" class="mb20">
      <el-breadcrumb-item :to="{ name: 'projectList' }">项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增项目</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="addprojectForm">
      <el-row>
        <el-col :span="18">
          <el-form ref="ruleForm" :model="project" label-width="100px" :rules="rules">
            <el-form-item label="企业搜索" prop="qy_name">
              <el-select
                v-model="project.qy_name"
                filterable
                remote
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in searchName"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id.toString()">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="服务分类" prop="corp_id" v-if="service_categories">
              <el-select v-model="project.corp_id" placeholder="服务分类" @change="getFenleiId()">
                <el-option :key="v.id" :label="v.name" :value="v.id.toString()"
                           v-for="v in service_categories"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="服务名称" prop="product_id">
              <el-select v-model="project.product_id" placeholder="服务名称">
                <el-option :key="v.id" :label="v.service" :value="v.id.toString()" v-for="v in products"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button @click="goback()">返回</el-button>
              <el-button type="primary" @click="addProject('ruleForm')" :loading="txtLoad">确认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :pull="5" class="pl20 addqy">
          <router-link :to="{name:'createEnterprise'}">新增企业</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import API from 'API/api'
  import {mapGetters} from 'vuex'
  export default{
    created(){
      // 获取服务分类
      this.$http.get(API.serviceurl + 'service_categories').then((res) => {
        var resBody = res.body;
        this.service_categories = resBody.service_categories
      }).catch()
    },
    data(){
      var isPrincipal = (rule, value, callBack) => {
        this.$http.get(API.url+'customers/'+value+'/is_principal',{
          params:{
            id:value
          }
        }).then((res)=>{

          if (!res.body.is_principal) {
            callBack(new Error('你不是该企业的企业负责人，无法为该企业新增项目'))
          } else {
            callBack()
          }
        })
      }
      return {
        searchName: [],
        service_categories: [],
        loading: false,
        products: '',
        project: {
          qy_name: '',
          corp_id: '',
          product_id: ''
        },
        rules: {
          qy_name: [
            {required: true, message: '请选择', trigger: 'change'},
            {validator: isPrincipal, trigger: 'change'}
            ],
          corp_id: [{required: true, message: '请选择', trigger: 'change'}],
          product_id: [{required: true, message: '请选择', trigger: 'change'}]
        },
        stage_name: '项目管理',
        xmid:'',
        jdid:'',
        txtLoad:false//判断是否提交
      }
    },
    computed: {...mapGetters(['provider_id'])},
    methods: {
      // 搜索企业名称
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          this.$http.get(API.url + 'corps?keyword=' + query).then((res) => {
            this.loading = false;
            this.searchName = res.body.corps;
          })
        } else {
          this.searchName = [];
        }
      },
      // 返回
      goback(){
        this.$router.go(-1)
      },
      // 获取服务分类id
      getFenleiId(){
        this.$http.get(API.serviceurl + 'service_categories/' + this.project.corp_id + '/products', {
          params: {
            provider_id: this.provider_id
          }
        }).then(this._getFenleiId)
      },
      // 提交
      addProject(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.txtLoad = true
            this.$http.post(API.url + 'projects', {
              project: {
                corp_id: this.project.qy_name,
                product_id: this.project.product_id
              }
            }).then((res)=>{
              var resBody = res.body;
              var project = resBody.project;
              this.xmid=project.id;
              this.jdid=project.process_stage_id;
              this._addProjectSuccess()
              this.txtLoad = false
          }).catch(this._addProjectError)
          } else {
            return false;
          }
        });
      },
      // 新增项目成功
      _addProjectSuccess(res){
        this.$confirm('新增项目成功！', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal:false,
          type: 'success'
        }).then(() => {
          this.$router.push({name: 'serviceApply',params :{ id: this.xmid , state_id:this.jdid},query:{name:this.stage_name}})
        }).catch(()=>{
          location.reload()
        })
      },
      // 新增项目失败
      _addProjectError(error){
        this.$confirm('新增项目失败', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'error'
        }).then().catch(()=>{
          location.reload()
        })
        return false;
      },
      //获取服务分类id
      _getFenleiId(res){
        var resBody = res.body;
        this.project.product_id = ''
        this.products = resBody.products
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped="">
  .create-role{
    .el-button{
      min-width:98px;
    }
  }
  .addqy {
    padding-top: 5px;
  }
</style>
<style lang="scss">
  .addprojectForm .el-select .el-input {
    width: 400px;
  }
</style>
