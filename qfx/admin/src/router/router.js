import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import formcreate from 'app/formcreate/create.vue'
const formindex = resolve => require(['app/formindex/indexLayout'], resolve)
const formlist = resolve => require(['app/formlist/list'], resolve)
const formdetails = resolve => require(['app/formindex/formdetails'], resolve)
const formpreview = resolve => require(['app/formcreate/preview'], resolve)
const formpreviewTwo = resolve => require(['app/formcreate/previewTwo'], resolve)
const serviceRight = resolve => require(['app/formindex/serviceRight'], resolve)
const login = resolve => require(['app/login/login'], resolve)
const system = resolve => require(['app/system/system'], resolve)
const project = resolve => require(['app/project/project'], resolve)
const projectDtl = resolve => require(['app/project/projectDtl'], resolve)
const transaction = resolve => require(['app/revenue/transaction'], resolve)
const checkDtl = resolve => require(['app/revenue/checkDtl'], resolve)
const coManagement = resolve => require(['app/coManagement/coManagement'], resolve)
const createEnterprise = resolve => require(['app/coManagement/createEnterprise'], resolve)
const projectView = resolve => require(['app/coManagement/projectView'], resolve)
const enterpriseDtl = resolve => require(['app/coManagement/enterpriseDtl'], resolve)
const certification = resolve => require(['app/account/certification'], resolve)
const certificationdetails = resolve => require(['app/account/certificationdetails'], resolve)//企业审核详情页
const servicePublish = resolve => require(['app/serviceProvider/servicePublish'], resolve)
const serviceForm = resolve => require(['app/serviceProvider/serviceForm'], resolve)
const serviceImf = resolve => require(['app/serviceProvider/serviceImf'], resolve)
const serviceList = resolve => require(['app/serviceProvider/serviceList'], resolve)
const providerImf = resolve => require(['app/serviceProvider/providerImf'], resolve)
const createProvider = resolve => require(['app/serviceProvider/createProvider'], resolve)
const serviceAdd = resolve => require(['app/serviceProvider/serviceAdd'], resolve)
const serviceApply = resolve => require(['app/project/serviceApply'], resolve)
const fileLib = resolve => require(['app/project/fileLib'], resolve)
const fileDtl = resolve => require(['app/project/fileDtl'], resolve)
const fileList = resolve => require(['app/project/fileList'], resolve)
const suggestion = resolve => require(['app/serviceProvider/suggestion'], resolve)//意见反馈
const suggestList = resolve => require(['app/serviceProvider/suggestList'], resolve)//意见反馈
const interProcess = resolve => require(['app/serviceProvider/interProcess'], resolve)//内部审核
const processList = resolve => require(['app/serviceProvider/processList'], resolve)//内部审核
const addVerification = resolve => require(['app/serviceProvider/addVerification'], resolve)//新增审核
const editVerification = resolve => require(['app/serviceProvider/editVerification'], resolve)//审核编辑
const addOperator = resolve => require(['app/serviceProvider/addOperator'], resolve)//新增操作人员变更
const editOperator = resolve => require(['app/serviceProvider/editOperator'], resolve)//修改操作人员变更
// const serviceApply = resolve => require(['app/project/serviceApply'], resolve)
// const contractStage = resolve => require(['app/project/contractStage'], resolve)
// const transitionStage = resolve => require(['app/project/transitionStage'], resolve)

const articleView = resolve => require(['app/article/articleView'], resolve)//文章视图
const articleList = resolve => require(['app/article/articleList'], resolve)//文章列表
const addArticle = resolve => require(['app/article/addArticle'], resolve)//文章添加
const editArticle = resolve => require(['app/article/editArticle'], resolve)//文章编辑


const projectEmpty = resolve => require(['app/project/projectEmpty'], resolve)//项目管理内审
const auditForm = resolve => require(['app/project/auditForm'], resolve)//项目管理表单内审
const auditFile = resolve => require(['app/project/auditFile'], resolve)//项目管理文件内审

// 设置登录权限

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/', component: login, name: 'login',meta: { auth: false }//未登录可见
    },
    {
      path: '/system', component: system,
      children:[
        {path: '', component: project},
        {path: 'project', component: project, name: 'project'},
        {path: 'projectDtl/:id', component: projectDtl, name: 'projectDtl',
          children:[
            {path: 'serviceApply/:stage_id', component: projectEmpty, children:[
              {path:'', name: 'serviceApply', component: serviceApply},  //申请服务 材料审核等页面
              {path:'auditForm', name: 'auditForm', component: auditForm}, // 内审 表单
              {path:'auditFile', name: 'auditFile', component: auditFile}, // 内审 文件
            ]},
          ]
        },
        {path: 'transaction', component: transaction, name: 'transaction'},
        {path: 'checkDtl/:id', component: checkDtl, name: 'checkDtl'},
        {path: 'createEnterprise', component: createEnterprise, name: 'createEnterprise'},
        {path: 'coManagement', component: coManagement, name: 'coManagement'},
        {path: 'certification', component: certification, name: 'certification'},
        {path: 'certificationdetails/:id/:auth_status', component: certificationdetails, name: 'certificationdetails'},//企业审核详情页
        {path: 'servicePublish', component: servicePublish,
        children:[{path: ':id', component: serviceList, name: 'serviceList'}]
        },
        {path: 'serviceForm', component: serviceForm, name: 'serviceForm'},
        {path: 'serviceImf', component: serviceImf,
          children:[{path: ':id', component: providerImf, name: 'providerImf'}]
        },
        {path: 'formindex', component: formindex,
          children:[{path: ':id', component: serviceRight, name: 'serviceRight'}]
        },
        {path: 'formcreate/:id', component: formcreate, name: 'formcreate'},
        {path: 'formdetails/:id', component: formdetails, name: 'formdetails'},
        {path: 'formlist/:id', component: formlist, name: 'formlist'},
        {path: 'formpreview/:id', component: formpreview, name: 'formpreview'},
        {path: 'formpreviewTwo/:id', component: formpreviewTwo, name: 'formpreviewTwo'},
        {path: 'enterpriseDtl/:id', component: enterpriseDtl, name: 'enterpriseDtl'},
        {path: 'projectView/:id', component: projectView, name: 'projectView'},
        {path: 'createProvider', component: createProvider, name: 'createProvider'},
        {path: 'serviceAdd/:id', component: serviceAdd, name: 'serviceAdd'},
        {path: 'fileLib/:id/:stage_id', component: fileLib, name: 'fileLib'},
        {path: 'fileList/:id/:stage_id', component: fileList, name: 'fileList'},
        {path: 'fileDtl/:pro_id/:id/:stage_id', component: fileDtl, name: 'fileDtl'},
        {path: 'suggestion', component: suggestion,
         children:[{path: ':id', component: suggestList, name: 'suggestList'}]
        },
        {path: 'interProcess', component: interProcess,
          children:[{path: ':id', component: processList, name: 'processList'}]
        },
        {path: 'addVerification/:provider_id', component: addVerification, name: 'addVerification'},
        {path: 'editVerification/:provider_id/:setting_id', component: editVerification, name: 'editVerification'},
        {path: 'addOperator/:provider_id', component: addOperator, name: 'addOperator'},
        {path: 'editOperator/:provider_id/:setting_id', component: editOperator, name: 'editOperator'},
        {path: 'articleList', component: articleView, children:[
          {path:'',component: articleList, name: 'articleList'}, // 文章列表
          {path: 'addArticle', component: addArticle, name: 'addArticle'}, // 添加文章
          {path: 'editArticle/:id', component: editArticle, name: 'editArticle'}, // 编辑文章
        ]},


      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
