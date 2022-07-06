<script lang="ts" setup>
import { message } from "ant-design-vue";
import { get } from "@/utils/request";
import { useUserStore } from "@/store/modules/user";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "@/styles/global.scss";
import "@/styles/override.scss";

</script>
<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
