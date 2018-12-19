<template>
  <div class="star">
      <span class="star-main" v-for="v in stars" :class="v" ></span>
  </div>
</template>
<script>
  const fenshu = 2.6
  const LENGTH = 5
  export default{
    computed: {
      stars () {
        let results = []
        let dianwu = Math.floor(fenshu * 2) / 2   // 向下取0.5的倍数
        let xiaoshu = dianwu % 1 !== 0            // 判断是否有小数
        let zhen = Math.floor(dianwu)             // 取整数
        for (let i = 0; i < zhen; i++) {
          results.push('x-1')                     // 添加完整的星星
        }
        if (xiaoshu) {
          results.push('x-2')                     // 添加半星
        }
        while (results.length < LENGTH) {
          results.push('x-3')                     // 添加灰星
        }
        return results
      }
    }
  }
</script>

<style>
  .star-main{
    display: inline-block;
    width: 50px;
    height: 50px;
  }
  .x-1{ background: url("./x1.png") 0 0 no-repeat}
  .x-2{ background: url("./x2.png") 0 0 no-repeat}
  .x-3{ background: url("./x3.png") 0 0 no-repeat}
</style>
