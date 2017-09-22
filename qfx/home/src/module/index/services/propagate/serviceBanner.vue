<template>
  <div class="propage-item">
    <!--高新技术企业认定-->
    <div class="top-slider s-gaoxin" v-if="currentView=='s-gaoxin'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'gxjs_01.jpg'">
      </div>
    </div>
    <!--进口设备免关税-->
    <div class="top-slider s-jinkou" v-if="currentView=='s-jinkou'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'jksb_01.jpg'">
      </div>
    </div>
    <!--技术转让、开发、咨询、服务相关税收优惠-->
    <div class="top-slider s-jishu" v-if="currentView=='s-jishu'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'jszr_01.jpg'">
      </div>
    </div>
    <!--上海市高新技术成果转化-->
    <div class="top-slider s-shanghai" v-if="currentView=='s-shanghai'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'gxjscg_01.jpg'">
      </div>
    </div>

    <!--研发费用加计扣除-->
    <div class="top-slider s-yanfa" v-if="currentView=='s-yanfa'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'yffy_01.jpg'">
      </div>
    </div>

    <!--发明专利-->
    <div class="top-slider zs-faming" v-if="currentView=='zs-faming'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'fmzl_01.jpg'">
      </div>
    </div>

    <!--软件著作权-->
    <div class="top-slider zs-ruanjian" v-if="currentView=='zs-ruanjian'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'rjzz_01.jpg'">
      </div>
    </div>

    <!--商标注册-->
    <div class="top-slider zs-shangbiao" v-if="currentView=='zs-shangbiao'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'sbzc_01.jpg'">
      </div>
    </div>

    <!--实用新型专利-->
    <div class="top-slider zs-shiyong" v-if="currentView=='zs-shiyong'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'xxzl_01.jpg'">
      </div>
    </div>

    <!--外观专利设计-->
    <div class="top-slider zs-waiguan" v-if="currentView=='zs-waiguan'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'wgzl_01.jpg'">
      </div>
    </div>

    <!--上海市产业转型升级发展专项资金项目（工业强基）-->
    <div class="top-slider zx-chanyegongye" v-if="currentView=='zx-chanyegongye'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_gyqj_01.jpg'">
      </div>
    </div>

    <!--上海市产业转型升级发展专项资金项目（品牌经济发展）-->
    <div class="top-slider zx-chanyepinpai" v-if="currentView=='zx-chanyepinpai'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zxsj_01.jpg'">
      </div>
    </div>

    <!--上海市产业转型升级发展专项资金项目(生产性服务业发展)-->
    <div class="top-slider zx-chanyeshengchan" v-if="currentView=='zx-chanyeshengchan'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'cyzx_01.jpg'">
      </div>
    </div>

    <!--上海市产业转型升级发展专项资金项目（重点技术改造）-->
    <div class="top-slider zx-chanyezhongdian" v-if="currentView=='zx-chanyezhongdian'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_jishugaizao_01.jpg'">
      </div>
    </div>


    <!--上海市促进文化创意产业发展扶持资金-->
    <div class="top-slider zx-cujinwenhua" v-if="currentView=='zx-cujinwenhua'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_cujinwenhua_01.jpg'">
      </div>
    </div>

    <!--上海市服务业发展引导专项资金-->
    <div class="top-slider zx-fuwuye" v-if="currentView=='zx-fuwuye'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_fuwu_01.jpg'">
      </div>
    </div>

    <!--上海市高端智能装备首台突破和示范应用专项-->
    <div class="top-slider zx-gaoduanzhineng" v-if="currentView=='zx-gaoduanzhineng'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'stt_01.jpg'">
      </div>
    </div>

    <!--上海市工业互联网创新发展专项资金-->
    <div class="top-slider zx-gongyehulianwnag" v-if="currentView=='zx-gongyehulianwnag'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'gyhlw_01.jpg'">
      </div>
    </div>

    <!--上海市“科技创新行动计划”科技小巨人工程项目-->
    <div class="top-slider zx-xiaojuren" v-if="currentView=='zx-xiaojuren'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_xiaojuren_01.jpg'">
      </div>
    </div>

    <!--科技型中小企业技术创新资金-->
    <div class="top-slider zx-kejizhongxiao" v-if="currentView=='zx-kejizhongxiao'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'cxzj_01.jpg'">
      </div>
    </div>

    <!--上海市青年科技启明星计划项目-->
    <div class="top-slider zx-qingniankeji" v-if="currentView=='zx-qingniankeji'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'kjqmx_01.jpg'">
      </div>
    </div>

    <!--上海市企业技术中心认定-->
    <div class="top-slider zx-qiyejishu" v-if="currentView=='zx-qiyejishu'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_qyjs_01.jpg'">
      </div>
    </div>

    <!--上海市软件和集成电路发展专项资金-->
    <div class="top-slider zx-ruanjian" v-if="currentView=='zx-ruanjian'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zxruanjian_01.jpg'">
      </div>
    </div>

    <!--上海市新能源汽车专项资金项目-->
    <div class="top-slider zx-xinnengyuancar" v-if="currentView=='zx-xinnengyuancar'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'xnyqc_01.jpg'">
      </div>
    </div>

    <!--上海市信息化发展专项资金-->
    <div class="top-slider zx-xinxihua" v-if="currentView=='zx-xinxihua'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_xinxihua_01.jpg'">
      </div>
    </div>

    <!--上海市张江国家自主创新示范区专项发展资金-->
    <div class="top-slider zx-zhangjiangguojia" v-if="currentView=='zx-zhangjiangguojia'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zjzz_01.jpg'">
      </div>
    </div>

    <!--上海市职工职业培训专项补贴-->
    <div class="top-slider zx-zhigongbutie" v-if="currentView=='zx-zhigongbutie'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zyzg_01.jpg'">
      </div>
    </div>

    <!--上海市中小企业发展专项资金-->
    <div class="top-slider zx-zhongxiaoqiye" v-if="currentView=='zx-zhongxiaoqiye'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zxzj_01.jpg'">
      </div>
    </div>

    <!--上海市专利试点示范单位认定-->
    <div class="top-slider zx-zhuanlishidian" v-if="currentView=='zx-zhuanlishidian'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_zlsd_01.jpg'">
      </div>
    </div>

    <!--上海市著名商标认定-->
    <div class="top-slider zx-zhumingshangbiao" v-if="currentView=='zx-zhumingshangbiao'">
      <div class="min-width">
        <img width="1200" :src="imageUrl+'zx_zmsb_01.jpg'">
      </div>
    </div>


  </div>
</template>
<script>
  import API from 'API/config'
  export default{
    props: ['currentView'],
    data(){
      return{
        imageUrl:API.imageUrl
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .s-gaoxin {
    background: url("http://public.entservice.com/gxjs_bg_01.jpg") center top no-repeat;
  }

  .s-jinkou {
    background: url("http://public.entservice.com/jksb_bg_01.jpg") center top no-repeat;
  }

  .s-jishu {
    background: url("http://public.entservice.com/jszr_bg_01.jpg") center top no-repeat;
  }

  .s-shanghai {
    background: url("http://public.entservice.com/gxjscg_bg_01.jpg") center top no-repeat;
  }

  .s-yanfa {
    background: url("http://public.entservice.com/yffy_bg_01.jpg") center top no-repeat;
  }

  .zs-faming {
    background: url("http://public.entservice.com/fmzl_bg_01.jpg") center top no-repeat;
  }

  .zs-ruanjian {
    background: url("http://public.entservice.com/rjzz_bg_01.jpg") center top no-repeat;
  }

  .zs-shangbiao {
    background: url("http://public.entservice.com/sbzc_bg_01.jpg") center top no-repeat;;
  }

  .zs-shiyong {
    background: url("http://public.entservice.com/xxzl_bg_01.jpg") center top no-repeat;
  }

  .zs-waiguan {
    background: url("http://public.entservice.com/wgzl_bg_01.jpg") center top no-repeat;
  }

  .zx-chanyegongye {
    background: url("http://public.entservice.com/zx_gyqj_bg_01.jpg") center top no-repeat;
  }

  .zx-chanyepinpai {
    background: url("http://public.entservice.com/zxsj_bg_01.jpg") center top no-repeat;
  }

  .zx-chanyeshengchan {
    background: url("http://public.entservice.com/cyzx_bg_01.jpg") center top no-repeat;
  }

  .zx-chanyezhongdian {
    background: url("http://public.entservice.com/zx_jishugaizao_bg_01.jpg") center top no-repeat;

  }

  .zx-cujinwenhua {
    background: url("http://public.entservice.com/zx_cujinwenhua_bg_01.jpg") center top no-repeat;
  }

  .zx-fuwuye {
    background: url("http://public.entservice.com/zx_fuwu_bg_01.jpg") center top no-repeat;
  }

  .zx-gaoduanzhineng {
    background: url("http://public.entservice.com/stt_bg_03.jpg") center top no-repeat;
  }

  .zx-gongyehulianwnag {
    background: url("http://public.entservice.com/gyhlw_bg_01.jpg") center top no-repeat;
  }

  .zx-xiaojuren {
    background: url("http://public.entservice.com/zx_xiaojuren_bg_01.jpg") center top no-repeat;
  }

  .zx-kejizhongxiao {
    background: url("http://public.entservice.com/cxzj_bg_01.jpg") center top no-repeat;
  }

  .zx-qingniankeji {
    background: url("http://public.entservice.com/kjqmx_bg_01.jpg") center top no-repeat;

  }

  .zx-qiyejishu {
    background: url("http://public.entservice.com/zx_qyjs_bg_01.jpg") center top no-repeat;

  }

  .zx-ruanjian {
    background: url("http://public.entservice.com/zxruanjian_bg_01.jpg") center top no-repeat;
  }

  .zx-xinnengyuancar {
    background: url("http://public.entservice.com/xnyqc_bg_01.jpg") center top no-repeat;
  }

  .zx-xinxihua {
    background: url("http://public.entservice.com/zx_xinxihua_bg_01.jpg") center top no-repeat;

  }

  .zx-zhangjiangguojia {
    background: url("http://public.entservice.com/zjzz_bg_01.jpg") center top no-repeat;

  }

  .zx-zhigongbutie {
    background: url("http://public.entservice.com/zyzg_bg_01.jpg") center top no-repeat;
  }

  .zx-zhongxiaoqiye {
    background: url("http://public.entservice.com/zxzj_bg_01.jpg") center top no-repeat;
  }

  .zx-zhuanlishidian {
    background: url("http://public.entservice.com/zx_zlsd_bg_01.jpg") center top no-repeat;
  }

  .zx-zhumingshangbiao {
    background: url("http://public.entservice.com/zx_zmsb_bg_01.jpg") center top no-repeat;

  }
</style>
