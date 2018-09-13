#### 1. 图形验证码 在微信电脑客户端或者低版本的浏览器中无法显示

> 之前使用的是 Uint8Array 改为返回 blob 格式, 使用 FileReader 去转换图片格式,见 other.js

#### 2. 邀请后台传的字符串格式不规范导致浏览器会自动转换

> 1.  获取后台 url 把 sourceParam 的值通过 btoa()转换后分享出去,注册的时候在 atob()转换回来传给后台

> 2.  APP 分享出去的 URL 在浏览器上特殊符号会自动转义, +号转为%20, 需 replace(/%20/g,%2B)后，在 decodeURIComponent()传给后台

#### 3. 使用 vue-count-to 实现数字滚动效果和 text 字体渐变样式

        background-image: -webkit-gradient(
          linear,
          0 0,
          0 bottom,
          from(#fff),
          to(#aeeaff)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Helvetica;

#### 4. 毫秒倒计时有计算时差问题

> 使用 +new Date() 获取当前毫秒数减去最后一次时间来计算精准时间
> 页面离开的时候要在 destroyed 里 clearIntervel()

#### 5. 使用 Big.js 计算数字精准度

> 例: Big(this.rewardTotalValue).times(Big(10)).toFixed();
