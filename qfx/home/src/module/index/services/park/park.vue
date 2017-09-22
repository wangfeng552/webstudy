<template>
  <div class="park-list">
    <div class="top-slider">
      <div class="min-width">
        <img src="../../../../assets/images/showApply/banner_park_inner.jpg" width="1200" height="397" alt="">
      </div>
    </div>
    <div class="min-width">
      <h2 class="park_title">选择园区时应注意什么</h2>
      <ul class="park clearfix">
        <li>
          <img src="../../../../assets/images/showApply/park1.jpg" class="parkIcon">
          <h4 class="parkListTitle">园区配套设施与服务</h4>
          <p class="parkInfo">入驻园区不仅仅是寻找一个办公场所，更应重视园区的软硬件配套、服务配套体系，免去后顾之忧。</p>
        </li>
        <li class="center">
          <img src="../../../../assets/images/showApply/park2.jpg" class="parkIcon">
          <h4 class="parkListTitle">园区主导产业</h4>
          <p class="parkInfo">产业集聚带来的群体效应有助于企业快速成长，各项资源配备更为完善，为企业节约成本与精力。</p>
        </li>
        <li>
          <img src="../../../../assets/images/showApply/park3.jpg" class="parkIcon">
          <h4 class="parkListTitle">园区优惠政策</h4>
          <p class="parkInfo">不同园区对于不同类型的企业有不同程度的优惠鼓励，入园之前先行了解，有助于企业降低税收，获取更多利益。</p>
        </li>
      </ul>
      <h2 class="park_title">优质园区推荐</h2>
      <div class="parkRecommend clearfix">
        <ul>
          <router-link to="/services/categoty/parkDetail" tag="li" v-for="(v,i) in park" :key="i">
            <a>
              <img :src='v.url'>
              <p class="recommendTitle">{{v.title}}</p>
            </a>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  var data = {
    park: [
      {
        title: '上海临港园区',
        url: "http://omfp56ofi.bkt.clouddn.com/park4.jpg"
      },
      {
        title: '上海聚科生物园区',
        url: "http://omfp56ofi.bkt.clouddn.com/park5.jpg"
      },
      {
        title: '上海天地软件园',
        url: "http://omfp56ofi.bkt.clouddn.com/park6.jpg"
      },
      {
        title: '上海漕河泾新兴技术开发区',
        url: "http://omfp56ofi.bkt.clouddn.com/park7.jpg"
      },
      {
        title: '上海多媒体产业园',
        url: "http://omfp56ofi.bkt.clouddn.com/park8.jpg"
      },

      {
        title: '上海市五角场高新技术产业园区',
        url: "http://omfp56ofi.bkt.clouddn.com/park9.jpg"
      },
      {
        title: '上海紫竹科学园区',
        url: "http://omfp56ofi.bkt.clouddn.com/park10.jpg"
      },
      {
        title: '上海市张江高科技园区',
        url: "http://omfp56ofi.bkt.clouddn.com/park11.jpg"
      },
      {
        title: '上海动漫产业孵化器',
        url: "http://omfp56ofi.bkt.clouddn.com/park12.jpg"
      }

    ]
  }
  export default{
    data(){
      return data
    }
  }
</script>
