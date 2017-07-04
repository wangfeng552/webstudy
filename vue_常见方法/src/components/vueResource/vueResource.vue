<template>
  <div class="mk">
    <div v-show="isShow">加载中</div>
    <!--ref 指DOM元素，绑定在组件上时，ref 为一组件实例。-->
    <div class="lsd" ref="lsd">
      <ul>
        <li v-for="v in messages.categories">
          {{v.heading}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        messages: [],
        isShow: true
      }
    },
    created() {
      this.$http.get('http://192.168.1.117:49008/api/v1/platform/home/index').then((responce) => {
        this.isShow = false   // 添加loading
        this.messages = responce.body
//        console.log(this.messages.categories)
         this.$nextTick(() => {    // 修改数据后，获取更新后的DOM
          var m = this.$refs.lsd.height
          console.log(m)
        })
      })
    }
  }
</script>
