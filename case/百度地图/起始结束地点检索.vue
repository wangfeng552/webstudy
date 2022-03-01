<template>
<div class="makeapp">
  <input type="text"  placeholder="从哪儿出发" v-model="startaddress" class="input_style">
  <input type="text"  placeholder="想要去哪儿" v-model="endaddress" class="input_style">
  <button @click="queryDrivingRoute">查询</button>
  <baidu-map class="bm-view" :center="center" @ready="handler" @load="loadding" :scroll-wheel-zoom="true" :zoom='15'>
    <bm-view class="map" id="maplayout"></bm-view>
    <bm-local-search :keyword="startaddress" :auto-viewport="true" :pageCapacity="20" :location="city" @markersset="searchcomplete"></bm-local-search>
    <bm-local-search :keyword="endaddress" :auto-viewport="true" :pageCapacity="20" :location="city" @markersset="searchcomplete"></bm-local-search>
  </baidu-map>
</div>
</template>

<script>
import {
  Indicator
} from 'mint-ui';
export default {
  data() {
    return {
      map: '',
      center: {
        lng: '',
        lat: ''
      },
      city: '', // 城市
      startaddress: '上海火车站', //开始地点
      endaddress: '上海动物园', //结束地点
      address_detail: '',
    }
  },
  methods: {
    handler({
      BMap,
      map
    }) {
      let _this = this; // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
      _this.map = map
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        Indicator.close(); // 关闭loding
        console.log(r);
        _this.center = {
          lng: r.longitude,
          lat: r.latitude
        }
        _this.city = r.address.city
      }, {
        enableHighAccuracy: true
      })
    },
    loadding() {
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
    },
    searchcomplete(r) {
      //  console.log(r)
    },
    queryDrivingRoute() {
      var _this = this;
      var output = "从上地到西单驾车需要";

      var searchComplete = function (results) {
        if (transit.getStatus() != BMAP_STATUS_SUCCESS) {
          return;
        }
        var plan = results.getPlan(0);
        output += plan.getDuration(true) + "\n"; //获取时间
        output += "总路程为：";
        output += plan.getDistance(true) + "\n"; //获取距离
      }

      var transit = new BMap.DrivingRoute(_this.map, {
        renderOptions: {
          map: _this.map
        },
        onSearchComplete: searchComplete,
        onPolylinesSet: function () {
          setTimeout(function () {
            alert(output)
          }, "1000");
        }
      })
      transit.search(this.startaddress, this.endaddress)
    }
  },
  mounted() {
    var htmlHeight = document.documentElement.clientHeight;
    var mapId = document.getElementById("maplayout");
    mapId.style.height = htmlHeight + "px";
  },
}
</script>

<style lang="less" scoped>
.map {
  width: 100%;
  height: 667px;
}
</style>
