<template>
  <div class="tab">
    <div class="nav">
      <ul>
        <li v-for="(v,i) in names" :class="{act:v.isShow}" @click="tabtoggle(i)">{{v.name}}</li>
      </ul>
    </div>
    <div class="mingci">
      <!--循环class方法可以用v-show代替-->
      <!--<div v-for="v in names" :class="{show:v.isShow}">{{v.name}}</div>-->

      <!--循环的方法-->
      <!--<div v-for="v in names" v-show="v.isShow">{{v.name}}</div>-->

      <!--不一样的布局-->
      <div class="a1" v-show="names[0].isShow"><h2>11111111</h2></div>
      <div class="b1" v-show="names[1].isShow"><p>2222222222222</p></div>
      <div class="c1" v-show="names[2].isShow"><span>333333333333</span></div>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        names: [
          {name: '汽车', isShow: true},
          {name: '飞机', isShow: false},
          {name: '火车', isShow: false}
        ]
      }
    },
    methods: {
      tabtoggle(key) {
        this.names.forEach(function (v) {
          v.isShow = false
        })
        this.names[key].isShow = true
      }
    }
  }
</script>

<style>
  .act{color: #00a8dc}
</style>
