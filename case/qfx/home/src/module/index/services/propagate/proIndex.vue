<template>
  <div class="propag-layout">
    <profigure :institution="institution" :service_id="service_id" :category_id="category_id"></profigure>
    <!-- tab组件 -->
    <div class="anchor" id="anchor" v-sticky="{ zIndex: 1, stickyTop: 0 }">
      <ul class="anchor_list">
        <li v-for="(item,index) in tabs" :class="{current:current==index}" @click="toggle(index)">{{item.type}}</li>
      </ul>
    </div>
    <keep-alive>
      <component v-bind:is="currentView" ref="scrollHeigth"></component>
    </keep-alive>
    <advantage ref='advantage'></advantage>
    <!--相关推荐-->
    <div class="bgf6f clearfix">
      <recommend :recommend="recommend"></recommend>
    </div>
  </div>
</template>

<script>
  import API from 'API/config'
  import VueSticky from 'vue-sticky'
  import servicebanner from './serviceBanner.vue'
  import sgaoxin from './sGaoxin.vue'
  import syanfa from './sYanfa.vue'
  import sshanghai from './sShanghai.vue'
  import sjishu from './sJishu.vue'
  import sjinkou from './sJinkou.vue'
  import zxruanjian from './zxRuanjian.vue'
  import zxkejixiaojuren from './zxKejiXiaojuren.vue'
  import zxqiyejishu from './zxQiyejishu.vue'
  import zxzhuanlishidian from './zxZhuanlishidian.vue'
  import zxzhumingshangbiao from './zxZhumingshangbiao.vue'
  import zxfuwuyu from './zxFuwuye.vue'
  import zxxinxihua from './zxXinxihua.vue'
  import zxcujinwenhua from './zxCujinwenhua.vue'
  import zxchanyezhongdian from './zxChanyeZhongdian.vue'
  import zxchanyegongye from './zxChanyeGongye.vue'
  import zxzhongxiaoqiye from './zxZhongxiaoqiye.vue'
  import zxkejizhongxiao from './zxKejiZhongxiao.vue'
  import zxchanyepinpai from './zxChanyePinpai.vue'
  import zxgaoduanzhineng from './zxGaoduanzhineng.vue'
  import zxchanyeshengchan from './zxChanyeShengchan.vue'
  import zxxinnengyuancar from './zxXinnengyuanCar.vue'
  import zxzhigongbutie from './zxZhigongButie.vue'
  import zxqingniankeji from './zxQingniankeji.vue'
  import zxgongyehulianwnag from './zxGongyehulianwnag.vue'
  import zxzhangjiangguojia from './zxZhangjiangGuojia.vue'
  import zsshangbiao from './zsShangbiao.vue'
  import zsruanjian from './zsRuanjian.vue'
  import zsfaming from './zsFaming.vue'
  import zsshiyong from './zsShiyong.vue'
  import zswaiguan from './zsWaiguan.vue'
  import recommend from './recommend.vue'
  import advantage from './_advantage.vue' //优势
  import profigure from './_productFigure.vue' //商品主图
  export default{
    directives: {
      'sticky': VueSticky,
    },
    data(){
      return {
        currentView: '',
        qiyeName: '',
        category: '',
        crumbstitle: '',
        advantageHeight: 0,
        items: {
          '高新技术企业认定': 's-gaoxin',
          '研发费用加计扣除': 's-yanfa',
          '上海市高新技术成果转化': 's-shanghai',
          '技术转让、开发、咨询、服务相关税收优惠': 's-jishu',
          '进口设备免关税': 's-jinkou',
          '上海市软件和集成电路发展专项资金': 'zx-ruanjian',
          '上海市“科技创新行动计划”科技小巨人工程项目': 'zx-xiaojuren',
          '上海市企业技术中心认定': 'zx-qiyejishu',
          '上海市专利试点示范单位认定': 'zx-zhuanlishidian',
          '上海市著名商标认定': 'zx-zhumingshangbiao',
          '上海市服务业发展引导专项资金': 'zx-fuwuye',
          '上海市信息化发展专项资金': 'zx-xinxihua',
          '上海市促进文化创意产业发展扶持资金': 'zx-cujinwenhua',
          '上海市产业转型升级发展专项资金项目（重点技术改造）': 'zx-chanyezhongdian',
          '上海市产业转型升级发展专项资金项目（工业强基）': 'zx-chanyegongye',
          '上海市中小企业发展专项资金': 'zx-zhongxiaoqiye',
          '科技型中小企业技术创新资金': 'zx-kejizhongxiao',
          '上海市产业转型升级发展专项资金项目（品牌经济发展）': 'zx-chanyepinpai',
          '上海市高端智能装备首台突破和示范应用专项': 'zx-gaoduanzhineng',
          '上海市产业转型升级发展专项资金项目(生产性服务业发展)': 'zx-chanyeshengchan',
          '上海市新能源汽车专项资金项目': 'zx-xinnengyuancar',
          '上海市职工职业培训专项补贴': 'zx-zhigongbutie',
          '上海市青年科技启明星计划项目': 'zx-qingniankeji',
          '上海市工业互联网创新发展专项资金': 'zx-gongyehulianwnag',
          '上海市张江国家自主创新示范区专项发展资金': 'zx-zhangjiangguojia',
          '商标注册': 'zs-shangbiao',
          '软件著作权': 'zs-ruanjian',
          '发明专利': 'zs-faming',
          '实用新型专利': 'zs-shiyong',
          '外观专利设计': 'zs-waiguan'
        },
        //相关推荐商品
        currentRelated:[],

    :{
          '高新技术企业认定':['研发费用加计扣除'],
          '研发费用加计扣除':['技术转让、开发、咨询、服务相关税收优惠','高新技术企业认定','科技型中小企业技术创新资金'],
          '上海市高新技术成果转化':['技术转让、开发、咨询、服务相关税收优惠','高新技术企业认定','研发费用加计扣除'],
          '技术转让、开发、咨询、服务相关税收优惠':['研发费用加计扣除','高新技术企业认定','上海市高新技术成果转化'],
          '进口设备免关税':['上海市产业转型升级发展专项资金项目（重点技术改造）','上海市中小企业发展专项资金','上海市张江国家自主创新示范区专项发展资金'],
          '上海市软件和集成电路发展专项资金':['上海市工业互联网创新发展专项资金','上海市张江国家自主创新示范区专项发展资金','科技型中小企业技术创新资金'],
          '上海市“科技创新行动计划”科技小巨人工程项目':['研发费用加计扣除','高新技术企业认定','上海市技术中心认定'],
          '上海市企业技术中心认定':['高新技术企业认定','上海市“科技创新行动计划”科技小巨人工程项目','研发费用加计扣除'],
          '上海市专利试点示范单位认定':['高新技术企业认定'],
          '上海市著名商标认定':['上海市促进文化创意产业发展扶持资金','上海市产业转型升级发展专项资金项目（品牌经济发展）'],
          '上海市服务业发展引导专项资金':['上海市张江国家自主创新示范区专项发展资金','上海市产业转型升级发展专项资金项目（生产性服务业发展）'],
          '上海市信息化发展专项资金':['上海市工业互联网创新发展专项资金','上海市张江国家自主创新示范区专项发展资金','科技型中小企业技术创新资金'],
          '上海市促进文化创意产业发展扶持资金':['上海市产业转型升级发展专项资金项目（品牌经济发展）','上海市张江国家自主创新示范区专项发展资金','上海市著名商标认定'],
          '上海市产业转型升级发展专项资金项目（重点技术改造）':['进口设备免关税','上海市张江国家自主创新示范区专项发展资金','上海市中小企业发展专项资金'],
          '上海市产业转型升级发展专项资金项目（工业强基）':['进口设备免关税','上海市产业转型升级发展专项资金项目（重点技术改造）','上海市中小企业发展专项资金'],
          '上海市中小企业发展专项资金':['进口设备免关税','上海市张江国家自主创新示范区专项发展资金','上海市产业转型升级发展专项资金项目（重点技术改造）'],
          '科技型中小企业技术创新资金':['研发费用加计扣除','高新技术企业认定'],
          '上海市产业转型升级发展专项资金项目（品牌经济发展）':['著名商标认定','上海市促进文化创意产业发展扶持资金','上海市张江国家自主创新示范区专项发展资金'],
          '上海市张江国家自主创新示范区专项发展资金':['上海市产业转型升级发展专项资金项目（品牌经济发展）','上海市产业转型升级发展专项资金项目（重点技术改造）','上海市信息化发展专项资金'],
          '上海市高端智能装备首台突破和示范应用专项':['研发费用加计扣除','高新技术企业认定','上海市张江国家自主创新示范区专项发展资金'],
          '上海市产业转型升级发展专项资金项目（生产性服务业发展）':['服务业发展引导专项资金','上海市信息化发展专项资金','高新技术企业认定'],
          '上海市新能源汽车专项资金项目':['上海市产业转型升级发展专项资金项目（重点技术改造）','上海市张江国家自主创新示范区专项发展资金','上海市中小企业发展专项资金'],
          '上海市职工职业培训专项补贴':['研发费用加计扣除','高新技术企业认定','上海市产业转型升级发展专项资金项目（品牌经济发展）'],
          '上海市青年科技启明星计划项目':['研发费用加计扣除','高新技术企业认定'],
          '上海市工业互联网创新发展专项资金':['上海市信息化发展专项资金','上海市高新成果转化','高新技术企业认定']
        },
        institution: '',//获取宣传页服务机构内容
        recommend: '',//获取宣传页相关推荐内容
        providerId: '',//获取服务商id
        service_id: '',//获取服务id
        category_id: '',//获取服务分类id
        current: 0,
        zr_currentView: 'introduce',
        height: 0,
        height1: 0,
        height2: 0,
        tabs: [
          {
            type: '服务介绍',
            view: '#introduce'
          },
          {
            type: '服务流程',
            view: '#process'
          },
          {
            type: '平台优势',
            view: '#advantage'
          }
        ]
      }
    },
    components: {
      's-gaoxin': sgaoxin,
      's-yanfa': syanfa,
      's-shanghai': sshanghai,
      's-jishu': sjishu,
      's-jinkou': sjinkou,
      'zx-ruanjian': zxruanjian,
      'zx-xiaojuren': zxkejixiaojuren,
      'zx-qiyejishu': zxqiyejishu,
      'zx-zhuanlishidian': zxzhuanlishidian,
      'zx-zhumingshangbiao': zxzhumingshangbiao,
      'zx-fuwuye': zxfuwuyu,
      'zx-xinxihua': zxxinxihua,
      'zx-cujinwenhua': zxcujinwenhua,
      'zx-chanyezhongdian': zxchanyezhongdian,
      'zx-chanyegongye': zxchanyegongye,
      'zx-zhongxiaoqiye': zxzhongxiaoqiye,
      'zx-kejizhongxiao': zxkejizhongxiao,
      'zx-chanyepinpai': zxchanyepinpai,
      'zx-gaoduanzhineng': zxgaoduanzhineng,
      'zx-chanyeshengchan': zxchanyeshengchan,
      'zx-xinnengyuancar': zxxinnengyuancar,
      'zx-zhigongbutie': zxzhigongbutie,
      'zx-qingniankeji': zxqingniankeji,
      'zx-gongyehulianwnag': zxgongyehulianwnag,
      'zx-zhangjiangguojia': zxzhangjiangguojia,
      'zs-shangbiao': zsshangbiao,
      'zs-ruanjian': zsruanjian,
      'zs-faming': zsfaming,
      'zs-shiyong': zsshiyong,
      'zs-waiguan': zswaiguan,
      recommend,
      advantage,
      servicebanner,
      profigure
    },
    beforeRouteUpdate (to, from, next) {
      this.current = 0
      next()
    },
    created () {
      this.categoryData()

    },
    watch: {
      '$route': 'categoryData'
    },
    methods: {
      categoryData(){
        this.$http.get(API.url + 'services/' + this.$route.params.id).then(this.servicesId).catch((res) => {
        })
      },
      //通过servicesId取categoryId
      servicesId(res){
        this.qiyeName = res.body.service.name;
        this.currentView = this.items[this.qiyeName.replace(/[\s\n\t]/g, '')];
        this.currentRelated= this.related[this.qiyeName.replace(/[\s\n\t]/g, '')]
        this.category = res.body.service.category;
        this.getRelated()
        this.getRelatedTitle()
      },
      //获取相关内容
      getRelated(){
        this.$http.get(API.url + 'services/' + this.$route.params.id + '/products/online').then((res) => {
          this.institution = res.body.products
          this.service_id = this.$route.params.id
          this.category_id = this.$route.params.category_id
        })
      },
      //获取推荐商品
      getRelatedTitle(){
        this.$http.get(API.url+'services/recommend', {
          params:
            {
              q: {
                name_in: this.currentRelated
              }
            }
        }).then((res)=>{
          var resBody=res.body;
          this.recommend =resBody.services
        }).catch()
      },
      // tab切换
      toggle(index, v){
        this.current = index
        this.zr_currentView = v
        if (this.current == 0) {
          this.$refs.scrollHeigth.introduce()
        } else if (this.current == 1) {
          this.$refs.scrollHeigth.process()
        } else {
          this.$refs.advantage.getHeight3()
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scope>
  .anchor_list {
    background: #fff;
    padding-left: 630px;
    border-bottom: 1px solid #e2e2e2;
  }
</style>

