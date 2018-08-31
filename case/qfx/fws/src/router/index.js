import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => require(['components/login/login'], resolve)
const facilitator = resolve => require(['components/common/facilitator'], resolve)
const mainPart = resolve => require(['components/common/mainPart'], resolve)
const notFound  = resolve => require(['components/common/error'], resolve) // 404
const construction  = resolve => require(['components/common/construction'], resolve) // 施工中页面

//目录
const assignment = resolve => require(['components/assignment/assignment'], resolve)//线上项目指派
const toDoList = resolve => require(['components/toDoList/toDoList'], resolve)//待办事项
const projectList = resolve => require(['components/project/projectList'], resolve)//项目列表
const project = resolve => require(['components/project/project'], resolve)//项目
const addProject = resolve => require(['components/project/addProject'], resolve)//新增项目
const projectEmpty = resolve => require(['components/project/empty'], resolve)//空
const payment = resolve => require(['components/payment/payment'], resolve)//支付管理

const clientEmpty = resolve => require(['components/client/empty'], resolve)//空
const clientList = resolve => require(['components/client/clientList'], resolve)//客户列表
const clientDetails = resolve => require(['components/client/clientDetails'], resolve)//客户详情
const createEnterprise = resolve => require(['components/client/createEnterprise'], resolve)//新增企业
const editEnterprise = resolve => require(['components/client/editEnterprise'], resolve)//编辑企业

const organization = resolve => require(['components/organization/organization'], resolve)//组织架构
const addSection = resolve => require(['components/organization/addSection'], resolve)//组织架构
const addNumber = resolve => require(['components/organization/addNumber'], resolve)//新增账号
const editNumber = resolve => require(['components/organization/editNumber'], resolve)//编辑账号
const editdepartment = resolve => require(['components/organization/editdepartment'], resolve)//编辑部门

const createRole = resolve => require(['components/organization/createRole'], resolve)//组织架构
const organEmpty = resolve => require(['components/organization/empty'], resolve)//空
const form = resolve => require(['components/form/form'], resolve)//表单管理
const projectDtl = resolve => require(['components/project/projectDtl'], resolve)//项目详情

//工单样式路径
const fqht = resolve => require(['components/project/gd/fqht'], resolve)//发送合同
const fqzf = resolve => require(['components/project/gd/fqzf'], resolve)//发起支付
const fsbd = resolve => require(['components/project/gd/fsbd'], resolve)//发送表单
const fstz = resolve => require(['components/project/gd/fstz'], resolve)//发送通知
const fswj = resolve => require(['components/project/gd/fswj'], resolve)//发送文件
const qrwj = resolve => require(['components/project/gd/qrwj'], resolve)//确认文件
const sywj = resolve => require(['components/project/gd/sywj'], resolve)//索要文件

const formcreate = resolve => require(['components/form/formcreate/create'], resolve)//创建表单
const formpreview = resolve => require(['components/form/formcreate/preview'], resolve)
const fileList = resolve => require(['components/project/fileList'], resolve)//文件详情

const serviceApply = resolve => require(['components/project/serviceapply/serviceApply'], resolve) // 服务申请 页面
const contractStage  = resolve => require(['components/project/serviceapply/contractStage'], resolve) // 合同页面
const transitionStage  = resolve => require(['components/project/serviceapply/transitionStage'], resolve) // 过度页面

const auditForm  = resolve => require(['components/project/serviceapply/auditForm'], resolve) // 内省表单
const auditFile  = resolve => require(['components/project/serviceapply/auditFile'], resolve) // 内省文件

// 用户中心
const activation  = resolve => require(['components/organization/activation'], resolve) // 子账号激活
const activationsuccess  = resolve => require(['components/organization/activationsuccess'], resolve) // 子账号激活成功
const userCenter  = resolve => require(['components/login/userCenter'], resolve) // 用户中心
const changePassword  = resolve => require(['components/login/changePassword'], resolve) // 修改密码
const changePhone  = resolve => require(['components/login/changePhone'], resolve) // 修改手机
const changePhoneSuccess  = resolve => require(['components/login/changePhoneSuccess'], resolve) // 修改手机成功
const changePasswordSuccess  = resolve => require(['components/login/changePasswordSuccess'], resolve) // 修改密码成功
const forgetPassword  = resolve => require(['components/login/forgetPassword'], resolve) // 忘记密码

//消息中心
const messageList  = resolve => require(['components/message/messageList'], resolve) // 消息列表

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: { auth: false }//未登录可见
    },
    {
      path: '/facilitator',
      component: facilitator,
      children: [
        {
          path: '/',
          component: mainPart,
          children: [
            {path: 'assignment', name: 'assignment', component: assignment},
            {path: 'toDoList', name: 'toDoList', component: toDoList},
            //项目管理
            {
              path: 'projectList', component: projectEmpty, children: [
              {path: '', name: 'projectList', component: projectList},
              {path: 'addProject', name: 'addProject', component: addProject},
            ]
            },
            //支付管理
            {path: 'payment', name: 'payment', component: payment},
            //客户管理
            {
              path: 'client', component: clientEmpty, children: [
              {path: '', name: 'clientList', component: clientList},
              {path: 'createEnterprise', name: 'createEnterprise', component: createEnterprise},
              {path: 'editEnterprise/:id', name: 'editEnterprise', component: editEnterprise},
              {path: 'clientDetails/:id', name: 'clientDetails', component: clientDetails},
            ]
            },
            //消息中心
            {
              path: 'message', component: clientEmpty, children: [
              {path: '', name: 'messageList', component: messageList},
            ]
            },

            //组织架构
            {
              path: 'organization', component: organEmpty, children: [
              {path: '', name: 'organization', component: organization},
              {path: 'createRole', name: 'createRole', component: createRole},// 新建角色
              {path: 'addSection', name: 'addSection', component: addSection},//新建部门
              {path: 'addNumber', name: 'addNumber', component: addNumber},//新建账号
              {path: 'editNumber/:id', name: 'editNumber', component: editNumber},//新建账号
              {path: 'editdepartment/:id', name: 'editdepartment', component: editdepartment},//新建账号
            ]},
            {path:'form',name:'form',component:form},
            {path: 'formcreate', component: formcreate, name: 'formcreate'},//创建表单
            //用户中心
            {
              path:'userCenter', component: organEmpty, children:[
              {path: '', name: 'userCenter', component: userCenter},
              {path: 'changePassword', name: 'changePassword', component: changePassword},
              {path: 'changePasswordSuccess', name: 'changePasswordSuccess', component: changePasswordSuccess},
              {path: 'changePhone', name: 'changePhone', component: changePhone},
              {path: 'changePhoneSuccess', name: 'changePhoneSuccess', component: changePhoneSuccess},
            ]

            },
          ]
        },
        {path: 'formpreview', component: formpreview, name: 'formpreview'},//创建表单预览
        {
          path: '/project',
          name: 'project',
          component: project,
          children: [
            {path: ':id', component: projectDtl,
              children:[
                {path: 'serviceApply/:state_id', component: clientEmpty, children:[
                  {path:'', name: 'serviceApply', component: serviceApply},  //申请服务 材料审核等页面
                  {path:'auditForm', name: 'auditForm', component: auditForm}, // 内审 表单
                  {path:'auditFile', name: 'auditFile', component: auditFile}  // 内省 文件
                ]}
              ]
            }
          ]
        },
        {path:'/fileList/project/:id/stage/:stage_id',name:'fileList',component:fileList},

        //工单路由
        {path:'/fqht',name:'fqht',component:fqht},
        {path:'/fqzf',name:'fqzf',component:fqzf},
        {path:'/fsbd',name:'fsbd',component:fsbd},
        {path:'/fstz',name:'fstz',component:fstz},
        {path:'/fswj',name:'fswj',component:fswj},
        {path:'/qrwj',name:'qrwj',component:qrwj},
        {path:'/sywj',name:'sywj',component:sywj}
      ],
    },
    { path: '/construction', component: construction, name:'construction', meta: { auth: false } },//施工
    {path:'/activation',name:'activation', component: activation, meta: { auth: false }},//子账号激活
    {path:'/activationsuccess',name:'activationsuccess', component: activationsuccess, meta: { auth: false }},//子账号激活
    { path: '/forgetPassword', name: 'forgetPassword', component: forgetPassword, meta: { auth: false }},  //忘记密码
    { path: '*', name:'notFound', component: notFound, meta: { auth: false } }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
