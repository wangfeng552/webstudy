webstudy

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
### vconsole 开发工具

### babel-polyfill
### es6-promise
    兼容IE浏览器
    在main.js里添加
    import 'babel-polyfill'
    import Es6Promise from 'es6-promise'
    require('es6-promise').polyfill()
    Es6Promise.polyfill()

    在store.js里添加
    import Es6Promise from 'es6-promise'
    Es6Promise.polyfill()
