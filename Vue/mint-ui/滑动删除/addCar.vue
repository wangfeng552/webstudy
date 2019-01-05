<template>
<div class="addcar">
  <div class="addtitle" @click="goBrandCar()"><i class="glyphicon glyphicon-plus"></i>添加车型</div>
  <div class="line"></div>
  <div class="container">
    <ul class="selectcarlist">
      <li class="list-item " v-for="(item,index) in list" :key="index" data-type="0" @click="editVehicleCompar(index)">
        <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip(index)">
          <div class="list-content">
            <i class="mintui mintui-field-success" :class="{act:item.isChose}"></i>
            <p class="title">{{item.format_car_full_name}}</p>
          </div>
        </div>
        <div class="delete" @click.stop="deleteItem" :data-index="index">删除</div>
      </li>
    </ul>
  </div>
  <div class="startpk">
    <div class="btn-start" :class="{isdisable:isShowBtnStart}" @click="goPKCar()">开始对比{{count>0?'('+count+')':""}}</div>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex"
import {
  Toast
} from "mint-ui"
export default {
  name: 'addCar',
  data() {
    return {
      list: [],
      startX: 0,
      endX: 0,
      isTrue:false
    }
  },
  created() {
    this.list = this.$store.state.admin.vehicleComparison
    console.log(this.list)
  },
  computed: {
    isShowBtnStart(){
      let chouseCar = this.list.filter((v) => {
        return v.isChose == true
      })
      let chouseCarLength =chouseCar.length
      if(chouseCarLength<2){
        return true
      }else{
        return false
      }
    },
    count() {
      var chouseCar = this.list.filter((v) => {
        return v.isChose == true
      })
      return chouseCar.length
    }
  },
  methods: {
    goBrandCar() {
      this.$store.dispatch("saveBrandCarFrom", 1)
      this.$router.push({
        name: "brandCar"
      })
    },
    goPKCar() {
      if (this.count < 2) {
        return
      }
      this.$router.push({
        name: "pkCar"
      })
    },
    editVehicleCompar(index) {
      this.$store.dispatch("editeVehicleComparison", index)
    },
    // 跳转
    skip(value) {
      //  console.log(this.list[value])
      // this.list[value].isChose = this.list[value].isChose === true ? false : true
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        // alert('You click the slide!')
      }
    },
    // 滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    // 滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    // 判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll('.list-item');
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    // 复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll('.list-item');
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    // 删除
    deleteItem(e) {
      // 当前索引
      let index = e.currentTarget.dataset.index;
      // 复位
      this.restSlide();
      this.$store.dispatch("delateVehicleComparison", index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="less" scoped>
.addcar {
  background: #fff;
  padding-top: 18px;

  .addtitle {
    font-size: 30px;
    width: 710px;
    margin: 0 auto 20px;
    text-align: center;
    height: 80px;
    line-height: 80px;
    border: 1px solid #ccc;
  }

  .line {
    height: 1px;
    background-color: #ccc;
  }

  .selectcarlist {
    width: 100%;
    list-style: none;
    padding: 0;
    overflow: hidden;
  }

  .list-item {
    position: relative;
    height: 100px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .list-item[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  .list-item[data-type="1"] {
    transform: translate3d(-150px, 0, 0);
  }

  .list-item:after {
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
  }

  .list-box {
    padding: 0 20px;
    background: #fff;
    display: flex;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
  }

  .list-item .list-content {
    padding: 12px 0;
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
  }

  .list-item .list-content .mintui {
    position: absolute;
    left: 0;
    top: 13px;
    color: #ccc;
    font-size: 30px;
  }

  .list-item .list-content .act {
    color: #29abe2;
  }

  .list-item .title {
    display: block;
    color: #333;
    overflow: hidden;
    font-size: 26px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 50px;
  }

  .list-item .delete {
    width: 150px;
    line-height: 50px;
    height: 100%;
    background: #ff4949;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 100px;
    position: absolute;
    top: 0;
    right: -150px;
  }

  .startpk {
    position: fixed;
    width: 750px;
    left: 50%;
    bottom: 0;
    margin-left: -375px;
    border-top: 1px solid #ccc;
    padding: 10px 0;
    background: #fff;

    .btn-start {
      width: 710px;
      margin: 0 auto;
      height: 80px;
      line-height: 80px;
      background-color: #29abe2;
      color: #fff;
      font-size: 30px;
      text-align: center;
    }
    .isdisable{
      opacity: 0.3
    }
  }
}
</style>
