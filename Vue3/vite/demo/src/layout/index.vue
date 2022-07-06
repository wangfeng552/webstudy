<script lang="ts" setup>
import Logo from "./logo/index.vue";
import AsideMenu from "./menu/menuList.vue";
import PageHeader from "./header/index.vue";

const route = useRoute();

const collapsed = ref<boolean>(false);
// 自定义侧边栏菜单收缩和展开时的宽度
const asiderWidth = computed(() => (collapsed.value ? 80 : 220));
</script>

<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :width="asiderWidth" :trigger="null" collapsible>
      <!--      网站logo start-->
      <logo :collapsed="collapsed" />
      <!--      网站logo end-->
      <!--      侧边菜单栏start-->
      <aside-menu :collapsed="collapsed" />
      <!--      侧边菜单栏end-->
    </a-layout-sider>
    <a-layout>
      <!--      页头 start-->
      <page-header v-model:collapsed="collapsed" />
      <!--      页头end-->
      <!--      内容区域start-->
      <a-layout-content class="layout-content">
        <!--        <tabs-view />-->
        <router-view v-slot="{ Component }">
          <template v-if="Component">
            <routerView name="fade-transform" mode="out-in" appear>
              <component :is="Component" :key="route.fullPath" />
            </routerView>
          </template>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    flex: none;
    padding: 24px;
    background: #f1f1f1;
    min-height: 360px;
    max-height: calc(100vh - 64px);
    overflow: auto;
  }
}
</style>
