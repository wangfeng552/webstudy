### vue-signature 签名组件
    import vueSignature from "vue-signature"
    Vue.use(vueSignature)
    <vueSignature ref="signature" :w="'560px'" :h="'300px'" :sigOption="signOption"></vueSignature>
    signOption: {
      penColor: "rgb(0, 0, 0)",
      backgroundColor: "rgb(255,255,255)"
    },
    保存： this.picURL = this.$refs.signature.save()
    清除： this.$refs.signature.clear();

### postcss-pxtorem px转rem
    .postcssrc.js
    module.exports = {
      "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "autoprefixer": {},
        "postcss-pxtorem": {
          rootValue: 100,
          propList: ["*"],
          selectorBlackList: ["body"]
        }
      }
  }

### vconsole 开发工具
    import Vconsole from 'vconsole'
    let vConsole = new Vconsole()
    export default vConsole

### babel-polyfill es6-promise
    兼容IE浏览器
    在main.js里添加
    import 'babel-polyfill'
    import Es6Promise from 'es6-promise'
    require('es6-promise').polyfill()
    Es6Promise.polyfill()

    在store.js里添加
    import Es6Promise from 'es6-promise'
    Es6Promise.polyfill()

### clipboard 复制文本
    div id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target" @click="copyPolicyNo"
    import Clipboard from "clipboard"
    let clipboard = new Clipboard("#copyBtn")
    clipboard.on("success", function(e) {
        e.clearSelection()
    })

### vue-photo-preview 图片放大缩小预览
    import preview from 'vue-photo-preview'
    import 'vue-photo-preview/dist/skin.css'
    Vue.use(preview)
    <li v-for="(pic,index) in picList" :key="index"><img :src="pic.attachment" preview="1"></li>
    mounted() {
      let self = this;
      //异步插入的图片
      setTimeout(() => {
        self.$previewRefresh()
      }, 2000);
      //图片查看器打开后，打印本次查看器的实例（事件、方法、属性的示例）
      this.$preview.on('imageLoadComplete', (e, item) => {
        // console.log(this.$preview.self)
      })
    }

### qrcode.vue  生成二维码
    import QrcodeVue from 'qrcode.vue';
    components: {
        QrcodeVue
    },
    <qrcode-vue :value="jxc_seller_sn" :size="200" level="H" className='wf'></qrcode-vue>

### vue-marquee-ho 文字横向滚动
    import VueMarquee from 'vue-marquee-ho';
     components:{
      "vue-marquee": VueMarquee
    },
    <vue-marquee :content="msgScroll" class="two"  :showtwo="false" :speed="'slow'"></vue-marquee>
    this.msgScroll = msgList.join(' ')

### big.js 处理计算
    + 	plus
    - 	minus
    * 	times
    / 	div
    %	mod
    Big(0.00001).times(Big(0.000002)).toFixed()

### vue-awesome-swiper 焦点图

### better-scroll 滚动

### js-cookie
    import jsCookie from "js-cookie"
    jsCookie.get("bounsId")
    jsCookie.set("bounsId",{name:'123'})



