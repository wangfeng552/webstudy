webstudy

### vue-signature 签名组件
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
