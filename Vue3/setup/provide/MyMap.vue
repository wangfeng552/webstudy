<template>
  <MyMarker></MyMarker>
</template>
<script>
import { provide, reactive, ref, readonly } from "vue"
import MyMarker from "./MyMarker.vue"
export default {
  components: {
    MyMarker,
  },
  setup() {
    //   为了增加 provide 值和 inject 值之间的响应性，我们可以在 provide 值时使用 ref 或 reactive。
    const location = ref("North Pole")
    const geolocation = reactive({
      longitude: 90,
      latitude: 135,
    })
    // 注入数据的组件内部更新 inject 的数据,建议 provide 一个方法来负责改变响应式 property
    const updateLocation = () => {
      location.value = "South Pole"
    }
    provide("location", readonly(location)) // 如果要确保通过 provide 传递的数据不会被 inject 的组件更改，我们建议对提供者的 property 使用 readonly。
    provide("geolocation", readonly(geolocation))
    provide("updateLocation", updateLocation)
  },
  methods: {
    //   建议尽可能将对响应式 property 的所有修改限制在定义 provide 的组件内部。
    updateLocation() {
      this.location = "South Pole"
    },
  },
}
</script>
