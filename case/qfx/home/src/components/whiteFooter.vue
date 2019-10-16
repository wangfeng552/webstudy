<template>
    <div class="footer">
        <div class="advance">
            <ul>
                <li><i class="icon icon-standard fl"></i>
                    <div class="fl content"><p class="fs18 fc000 lh34 mb10 fw-bold">流程规范</p>
                        <p class="fs14 fc5c5 lh24">平台严格监管服务流程</p>
                        <p class="fs14 fc5c5 lh24">实时推送服务进程通知</p>
                        <p class="fs14 fc5c5 lh24">服务质量进度双重保障</p></div>
                </li>
                <li><i class="icon icon-guarantee fl"></i>
                    <div class="fl content"><p class="fs18 fc000 lh34 mb10 fw-bold">品质保障</p>
                        <p class="fs14 fc5c5 lh24">精选各行业优质服务商</p>
                        <p class="fs14 fc5c5 lh24">多重审核机制并行实施</p>
                        <p class="fs14 fc5c5 lh24">确保服务专业、贴心</p></div>
                </li>
                <li><i class="icon icon-safety fl"></i>
                    <div class="fl content"><p class="fs18 fc000 lh34 mb10 fw-bold">信息安全</p>
                        <p class="fs14 fc5c5 lh24">采用特殊加密存储系统</p>
                        <p class="fs14 fc5c5 lh24">保护用户信息、往来文件</p>
                        <p class="fs14 fc5c5 lh24">安全保障机制全程护航</p></div>
                </li>
                <li><i class="icon icon-trade fl"></i>
                    <div class="fl content"><p class="fs18 fc000 lh34 mb10 fw-bold">担保交易</p>
                        <p class="fs14 fc5c5 lh24">平台设有安全担保机制</p>
                        <p class="fs14 fc5c5 lh24">服务成果违背预期承诺</p>
                        <p class="fs14 fc5c5 lh24">退还企业用户交易款项</p></div>
                </li>
            </ul>
        </div>
      <div class="bottom">
        <div class="min-width">
          <div class="content">
            <ul class="fl">
              <li>
                <router-link :to="{name:'about'}">关于企服星</router-link>
              </li>
              <li>服务条款</li>
              <li>
                <router-link :to="{name:'consultList'}">资讯中心</router-link>
              </li>
              <li>
                <router-link :to="{name:'newHelp'}">帮助中心</router-link>
              </li>
            </ul>
            <div class="consult fr">
              <p class="fs16 mb25 fcfff">咨询热线</p>
              <p class="fs24 lh34 fcfff">400-870-8750</p>
              <p class="fs14 fca3a">工作日 9:00 - 18:00</p></div>
          </div>
          <p class="copy-right fs12"><span class="fc7c7 mr45">Copyright © 2000-2017 www.entservice.com All Rights Reserved</span><span
            class="fcb2b">沪ICP备17009199号</span></p></div>
      </div>
    </div>
</template>
<script>
    export default{
        name: 'whiteFooter'
    }
</script>
