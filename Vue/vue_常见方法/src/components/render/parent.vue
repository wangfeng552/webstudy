<template>
  <div>
    <Item :title="blogTitle">
      <p>我是slot的元素</p>
    </Item>
  </div>
</template>
<script>
import Item from "./Item.vue"
export default {
  data() {
    return {
      blogTitle: "你好",
    }
  },
  components: {
    Item,
  },
}
</script>
