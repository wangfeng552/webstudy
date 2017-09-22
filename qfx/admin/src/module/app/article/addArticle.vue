<template>
  <div class="article">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ name:'articleList' }">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增文章</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="table-box">
      <el-form  :model="article" :rules="rules" ref="articleForm" label-width="100px">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <el-form-item label="发布日期" prop="published_at">
          <el-date-picker
            v-model="article.published_at"
            type="date"
            placeholder="请选择发布日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="文章来源" prop="source">
          <el-input v-model="article.source" placeholder="请输入文章来源"></el-input>
        </el-form-item>

        <el-form-item label="所属分类" prop="category">
          <el-select v-model="article.category" placeholder="请选择所属分类" @change="getTags2()">
            <el-option label="政策快讯" value="policy_news"></el-option>
            <el-option label="行业聚焦" value="activity_news"></el-option>
          </el-select>
          <el-select v-model="article.service_category_id" placeholder="请选择所属分类" v-if="tags2!=''">
            <el-option v-for="(v,i) in tags2" :label="v.name" :value="v.id"></el-option>
          </el-select>
        </el-form-item>

        <div class="fwtj clearfix">
          <dl class="tj-layout">
            <dt class="title"><span>*</span>服务推荐</dt>
            <dd class="tj-main">

              <div v-for="(v, index) in article.recommend" :key="v.key">
                <el-form-item
                  class="wf-inlineblock"
                  :prop="'recommend.' + index + '.value'"
                  :rules="{ required: true, type: 'number', message: '请选择服务分类', trigger: 'change' }">
                  <el-select v-model="v.value" placeholder="请选择服务分类" @change="getRecomend(v.value,index)">
                    <el-option v-for="(s,i) in service_categories" :label="s.name" :value="s.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  class="wf-inlineblock"
                  :prop="'recommend.' + index + '.name'"
                  :rules="{ required: true, type: 'number', message: '请选择服务名称', trigger: 'change' }">
                  <el-select v-model.number="v.name" placeholder="请选择服务名称">
                    <el-option v-for="(s,i) in v.tags3[0]" :label="s.name" :value="s.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-button @click.prevent="removeDomainSelect(v)" icon="delete">删除</el-button>
              </div>

              <div class="tj-ico"><el-button @click="addDomainSelect" icon="plus"><i class="add">+</i>添加</el-button></div>
            </dd>
          </dl>
        </div>

        <el-form-item label="文章内容" prop="content">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="article.content"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="go_negative">返回</el-button>
          <el-button type="primary" @click="onsubmit('articleForm')" v-loading.fullscreen="fullscreenLoading"
                     element-loading-text="发布中">发布
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  export default{
    created(){
      this.$http.get(API.serviceurl+'service_categories').then((res)=>{
        var resBody=res.body;
        this.service_categories=resBody.service_categories
      })
    },
    data(){
      return {
        service_categories:[], // 服务分类
        fullscreenLoading: false,
        tags2: [],
        // 文章信息
        article: {
          title: '',
          published_at: '',
          source: '',
          category: '',
          service_category_id: '',
          content: '',
          service_ids:'',
          recommend:[
            {
              value: '',
              name:'',
              tags3:[]
            }
          ]
        },
        rules: {
          'title': [{required: true, message: '请输入文章标题', trigger: 'blur'}],
          'content': [{required: true, message: '请输入文章内容', trigger: 'blur'}],
          'source': [{required: true, message: '请输入文章来源', trigger: 'blur'}],
          'category': [{required: true, message: '请选择所属分类', trigger: 'change'}],
          'published_at': [{ type: 'date', required: true, message: '请选择发布日期', trigger: 'change' }]
        }
      }
    },
    computed:{
      //获取服务商品的ID []
      getName(){
        var arr=[];
        this.article.recommend.filter((v)=>{
          return arr.push(v.name)
        })
        return arr
      }
    },
    methods: {
      // 返回
      go_negative(){
        this.$router.go(-1)
      },
      // 删除服务推荐
      removeDomainSelect(item){
        var index = this.article.recommend.indexOf(item)
        if (index !== -1) {
          this.article.recommend.splice(index, 1)
        }
      },
      // 添加服务推荐
      addDomainSelect() {
        this.article.recommend.push({
          value: '',
          name:'',
          tags3:[],
          key: Date.now()
        });
      },
      // 获取二级服务名称
      getRecomend(v,index){
        this.$http.get(API.serviceurl + 'service_categories/'+v+'/services').then((res) => {
          var resBody = res.body;
          this.article.recommend[index]['name'] = '';
          this.article.recommend[index]['tags3'] = [];
          this.article.recommend[index]['tags3'].push(resBody.services)
        }).catch()
      },
      // 获取所属分类
      getTags2(){
        this.article.service_category_id = ''
        this.$http.get(API.url + 'articles/subtags', {
          params: {
            tag: this.article.category
          }
        }).then((res) => {
          var resBody = res.body;
          this.tags2 = [];
          this.tags2 = resBody.subtags
        }).catch()
      },
      onsubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            this.$http.post(API.url + 'articles', {article: {
              title:this.article.title,
              content:this.article.content,
              source:this.article.source,
              category:this.article.category,
              service_category_id:this.article.service_category_id,
              published_at:this.article.published_at,
              service_ids:this.getName
            }}).then((res) => {
              this.fullscreenLoading = false;
              this.$router.push({name: 'articleList'})
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" >
.fwtj{
  margin-bottom: 22px;
  .tj-layout{
    .title{
      padding: 7px 12px 11px 0;
      width: 100px;
      float: left;
      text-align: right;
      font-size: 14px;
      color: #48576a;
      span{
        color: #ff4949;
        padding-right: 3px;
      }
    }
    .tj-main{
       width: 700px;
      float: left;
      .tj-ico{
        position: relative;
        .add{
          position: absolute;
          left: 5px;
          top:6px;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .el-form-item__content{
        margin-left: 0!important;
      }
      .wf-inlineblock{
        display: inline-block;
      }
    }
  }
}
</style>
