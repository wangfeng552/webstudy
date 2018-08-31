<template>
  <div class="service-publish">
    <el-breadcrumb separator="">
      <el-breadcrumb-item :to="{path:'/system/servicePublish/serviceList'}">服务发布</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="main-content">
      <router-link :to="{name:'serviceAdd',params:{id:$route.params.id}}">
        <el-button type="primary" class="add-service">
          新增服务
        </el-button>
      </router-link>
      <div class="service-menu scroll-beauty">
        <p class="tit">服务机构</p>
        <ul>
          <li v-for="(v,i) in providers" @click="clickLeftMenu(v)">
            <router-link :to="{name:'serviceList',params: { id: v.id }}" active-class="active" :title="v.name" >{{v.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="service-main">
        <p class="tit">服务列表</p>

        <!--<div class="form-box">-->
        <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">-->
        <!--<el-form-item label="商品编号">-->
        <!--<el-input v-model="formInline.user1" placeholder="请输入商品编码"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="服务名称">-->
        <!--<el-input v-model="formInline.user2" placeholder="请输入服务名称"></el-input>-->
        <!--</el-form-item>-->
        <!--<br/>-->
        <!--<el-form-item label="服务分类">-->
        <!--<el-select v-model="formInline.region1" placeholder="全部">-->
        <!--<el-option label="区域一" value="shanghai"></el-option>-->
        <!--<el-option label="区域二" value="beijing"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="提交时间">-->
        <!--<template>-->
        <!--<div class="fl">-->
        <!--<el-date-picker-->
        <!--v-model="value1"-->
        <!--type="date"-->
        <!--placeholder="选择日期"-->
        <!--:picker-options="pickerOptions1">-->
        <!--</el-date-picker>-->
        <!--</div>-->
        <!--</template>-->
        <!--<span class="fl date-line"></span>-->
        <!--<template>-->
        <!--<div class="fl">-->
        <!--<el-date-picker-->
        <!--v-model="value2"-->
        <!--type="date"-->
        <!--placeholder="选择日期"-->
        <!--:picker-options="pickerOptions2">-->
        <!--</el-date-picker>-->
        <!--</div>-->
        <!--</template>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary">查询</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <router-view></router-view>
      </div>

    </div>
  </div>

</template>
<script>
  import API from 'API/config'
  export default {
    data(){
      return {
        providers: '',

        formInline: {
          user1: '',
          user2: '',
          user3: '',
          region1: '',
          region2: ''
        },
      }
    },
    methods: {
      clickLeftMenu(v){
        this.$store.dispatch('get_current_paoviders',v);
      },
      chooseState(i)
      {
        this.serviceState.forEach((v) => {
          v.active = false
        })
        this.serviceState[i].active = true
      }
    },
    created(){
      this.$http.get(API.url + 'providers'
      ).then((res) => {
          this.providers = res.body.providers;
          var that = this;
          var target = undefined;
          this.providers.forEach(function (item,index) {
            if(item.id == 1) target = item;
          })
          if(target != undefined)  that.$store.dispatch('get_current_paoviders',target);
        }
      )
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .service-publish {
    .main-content {
      padding: 20px 21px 0 0;
      .tit {
        padding-left:10px;
        font-size: 16px;
        color: #1b1b1b;
      }
    }
    .add-service {
      float: right;
      margin-right: 17px;
      a {
        color: #FFFFFF;
      }
    }
    .service-menu {
      float: left;
      width: 220px;
      ul {
        margin-top: 9px;
        padding-bottom: 20px;
        height:590px;
        overflow-y: scroll;
        li {
          position: relative;
          height:39px;
          line-height:39px;
          font-size: 14px;
          a {
            padding-left: 10px;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #1b1b1b;
            width:100%;
            height:39px;
          }
          a.active {
            color: #FFFFFF;
            background: #20a0ff;
          }
        }
      }
    }
    .service-main {
      margin-left: 220px;
      padding-left:20px;
      a {
        color: #000;
      }
    }

  }
</style>
