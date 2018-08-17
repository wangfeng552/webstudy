import Vue from "vue"
import UButton from "@/components/UButton"
import UImage from "@/components/UImage"

Vue.component(UButton.name, UButton)
Vue.component(UImage.name, UImage)

Vue.mixin({
  methods: {
    // 必传 标题，描述。其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。
    $seo(title, content, payload = []) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        }].concat(payload)
      }
    }
  }
})
