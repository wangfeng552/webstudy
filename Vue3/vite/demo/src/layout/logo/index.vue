<script setup>
defineProps({
  collapsed: {
    type: Boolean,
  },
});

const { t } = useI18n();
</script>
<template>
  <div class="logo">
    <img src="~@/assets/images/logo.png" alt="" />
    <h2 v-show="!collapsed" class="title">{{ t("setting.title") }}</h2>
  </div>
</template>
<style lang="less" scoped>
.logo {
  @apply flex overflow-hidden whitespace-nowrap items-center;

  height: 64px;
  padding-left: 24px;
  line-height: 64px;

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    @apply mb-0 text-white text-xl;
  }
}
</style>
