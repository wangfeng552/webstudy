import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const indexLayout = resolve => require(['index/home/indexLayout'], resolve)
const bussinessCircles = resolve => require(['index/services/category/businessCircles'], resolve)
const login = resolve => require(['index/login/login'], resolve)
const login_simple = resolve => require(['index/login/simple_login'], resolve)
const register = resolve => require(['index/login/register'], resolve)
const simpleRegister = resolve => require(['index/login/simple_register'], resolve)
const simpleRegisterSuccess = resolve => require(['index/login/simple_register_success'], resolve)
const registersuccess = resolve => require(['index/login/register_success'], resolve)
const parkDetail = resolve => require(['index/services/park/parkDetail.vue'], resolve)
const agreement = resolve => require(['index/login/agreement'], resolve)
const proIndex = resolve => require(['index/services/propagate/proIndex'], resolve)
const users = resolve => require(['index/users/users'], resolve)
const userEmpty = resolve => require(['index/users/userEmpty'], resolve)
const userCenter = resolve => require(['index/users/usersCenter'], resolve)
const userEdit = resolve => require(['index/users/edit'], resolve)
const userChangepassword = resolve => require(['index/users/changePassword'], resolve)
const userChangePhone = resolve => require(['index/users/changePhone'], resolve)
const userChangeEmail = resolve => require(['index/users/changeEmail'], resolve)
const forgotPassword = resolve => require(['index/users/forgotPassword'], resolve)
const simple_forgot = resolve => require(['index/users/simpleForgot'], resolve)//修改之后的忘记密码
const corp = resolve => require(['index/users/corp'], resolve)//企业
const corpApply = resolve => require(['index/users/corpApply'], resolve)//企业申请认证
const corpSuccess = resolve => require(['index/users/corpSuccess'], resolve)//企业申请成功
const enterpriseActivation = resolve => require(['index/users/enterpriseActivation'], resolve)//激活企业
const activationSuccess = resolve => require(['index/users/activationSuccess'], resolve)//激活成功
const application = resolve => require(['index/services/application/application'], resolve)//服务申请表
const about = resolve => require(['index/about/about'], resolve)//关于企服星
const help = resolve => require(['index/about/help'], resolve)//帮助中心
const authentication = resolve => require(['index/about/authentication'], resolve)//注册与认证
const newHelp = resolve => require(['index/about/new'], resolve)//新手帮助
const mechanism = resolve => require(['index/about/mechanism'], resolve)//服务机构
const platform = resolve => require(['index/about/platform'], resolve)//平台功能
const service = resolve => require(['index/about/service'], resolve)//服务流程

const consultList = resolve => require(['index/about/consultList'], resolve)//政策中心
const consultationTab = resolve => require(['index/about/consultationTab'], resolve)//tab
const industry = resolve => require(['index/about/industry'], resolve)//行业聚焦

const consultdetails = resolve => require(['index/about/consultdetails'], resolve)//咨询中心详情页
const agreementTK = resolve => require(['index/about/agreement'], resolve)//服务条款
const applySuccess = resolve => require(['index/services/application/applySuccess'], resolve)//服务申请表申请成功页面
const phonesuccess = resolve => require(['index/users/phonesuccess'], resolve)//手机号修改成功
const passwordsuccess = resolve => require(['index/users/passwordsuccess'], resolve)//密码修改成功
const forgotpasswordsuccess = resolve => require(['index/users/forgotpasswordsuccess'], resolve)//忘记密码修改成功
const activedetails = resolve => require(['index/services/category/activedetails'], resolve)//活动详情页
const home = resolve => require(['index/home/home'], resolve)//首页

const notFound = resolve => require(['index/home/error'], resolve)//404
const construction = resolve => require(['index/home/construction'], resolve)//施工
const messageTickets = resolve => require(['index/login/message_tickets'], resolve)//短信URL

//项目管理
const project = resolve => require(['index/project/project'], resolve)
const serviceApply = resolve => require(['index/project/serviceApply'], resolve)
const fileDtl = resolve => require(['index/project/fileDtl'], resolve)

//支付
const payIndex = resolve => require(['index/pay/payIndex'], resolve)
const payMethod = resolve => require(['index/pay/payMethod'], resolve)
const paySuccess = resolve => require(['index/pay/paySuccess'], resolve)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'hover',
  routes: [
    //支付
    {path: '/pay', component: payIndex, children:[
      {path: '', component: payMethod, name: 'payMethod',},
      {path: 'success', component: paySuccess, name: 'paySuccess',}
    ]},
    {path: '/construction', component: construction, name: 'construction'},
    {path: '/forgotpassword', component: simple_forgot, name: 'forgotpasswordsimple'},
    {path: '/register', component: simpleRegister, name: 'simpleRegister'},
    {path: '/login', component: login_simple, name: 'login'},
    {path: '/registersuccess', component: simpleRegisterSuccess, name: 'simpleRegisterSuccess'},//注册成功简版
    {
      path: '/', component: home, children: [
      {path: '', component: indexLayout, name: 'index',},
      {path: 'agreement', component: agreement, name: 'agreement'},
      {path: 'services/category/:id', component: bussinessCircles, name: 'category', meta: {auth: false}},
      {path: 'services/categoty/parkDetail', component: parkDetail, name: 'parkDetail'},
      {path: 'services/:id/category/:category_id', component: proIndex, name: 'proIndex', meta: {scrollToTop: true}},
      {
        path: 'services/:id/category/:category_id/application/:products_id',
        component: application,
        name: 'application'
      },
      {
        path: 'services/:id/category/:category_id/applySuccess/:products_id',
        component: applySuccess,
        name: 'applySuccess'
      },
      {path: 'about', component: about, name: 'about'},
      // 咨询中心
      {path: 'consultationTab', component: consultationTab, name: 'consultationTab',
        children:[
          {path: 'consultList', component: consultList, name: 'consultList'},
          {path: 'industry', component: industry, name: 'industry'},
        ]
      },
      {path: 'consultdetails/:id/:category', component: consultdetails, name: 'consultdetails', meta: {scrollToTop: true}},
      {path: 'agreementTK', component: agreementTK, name: 'agreementTK'},
      {
        path: 'help', component: help,
        children: [
          {path: 'authentication', component: authentication, name: 'authentication'},
          {path: 'newHelp', component: newHelp, name: 'newHelp'},
          {path: 'mechanism', component: mechanism, name: 'mechanism'},
          {path: 'platform', component: platform, name: 'platform'},
          {path: 'service', component: service, name: 'service'}
        ]
      },
      //用户中心
      {
        path: 'userCenter', component: userEmpty, children: [
        {path: '', component: userCenter, name: 'userCenterDefault',},
        {path: 'edit', component: userEdit, name: 'userEdit'},
        {path: 'changePassword', component: userChangepassword, name: 'userChangepassword'},
        {path: 'changePhone', component: userChangePhone, name: 'userChangePhone'},
        {path: 'changeEmail', component: userChangeEmail, name: 'userChangeEmail'},
        {path: 'corp', component: corp, name: 'corp'},
        {path: 'corpApply', component: corpApply, name: 'corpApply'},
        {path: 'corpSuccess', component: corpSuccess, name: 'corpSuccess'},
        {path: 'enterpriseActivation', component: enterpriseActivation, name: 'enterpriseActivation'},
        {path: 'activationSuccess', component: activationSuccess, name: 'activationSuccess'},
        {path: 'phonesuccess', component: phonesuccess, name: 'phonesuccess'},
        {path: 'passwordsuccess', component: passwordsuccess, name: 'passwordsuccess'},
        {path: 'forgotpasswordsuccess', component: forgotpasswordsuccess, name: 'forgotpasswordsuccess'},
        {path: 'activedetails/:id', component: activedetails, name: 'activedetails'}
      ]
      },
      //项目管理
      {path: 'project/:id', component: project, name: 'project',
        children:[
          {path: 'serviceApply/:stage_id', component: serviceApply, name: 'serviceApply'}
        ]},
      {path: 'project/:id/serviceApply/:stage_id/fileDtl', component: fileDtl, name: 'fileDtl'}
    ]
    },
    {path: '/message/tickets', component: messageTickets, name: 'messageTickets'},//短信url
    {path: '*', name: 'notFound', component: notFound},
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

export default router
