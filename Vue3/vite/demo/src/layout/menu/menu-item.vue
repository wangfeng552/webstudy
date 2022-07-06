<template>
  <!-- 目录 -->
  <!--  <Menu.SubMenu-->
  <!--    v-if="props.menuInfo?.meta?.type === 0 || props.menuInfo?.children?.length"-->
  <!--    :key="props.menuInfo?.name"-->
  <!--    v-bind="$attrs"-->
  <!--  >-->
  <!--    <template #title>-->
  <!--      <span>-->
  <!--&lt;!&ndash;        <icon-font :type="props.menuInfo.meta?.icon" />&ndash;&gt;-->
  <!--        {{ props.menuInfo?.meta?.title }}-->
  <!--      </span>-->
  <!--    </template>-->
  <!--    <template v-for="item in menuChildren" :key="item.name || item.fullPath">-->
  <!--      &lt;!&ndash; 递归生成菜单 &ndash;&gt;-->
  <!--      <MyMenuItem :menu-info="item" />-->
  <!--    </template>-->
  <!--  </Menu.SubMenu>-->
  <!--  &lt;!&ndash; 菜单 &ndash;&gt;-->
  <!--  <template v-else>-->
  <!--    <Menu.Item :key="props.menuInfo?.name">-->
  <!--&lt;!&ndash;      <icon-font :type="props.menuInfo?.meta?.icon" />&ndash;&gt;-->
  <!--      {{ props.menuInfo?.meta?.title }}-->
  <!--    </Menu.Item>-->
  <!--  </template>-->

  <a-sub-menu :key="props?.menuInfo?.key">
    <template #icon><MailOutlined /></template>
    <template #title>{{ props?.menuInfo?.name }}</template>
    <template v-for="item in menuChildren" :key="item.key">
      <template v-if="!item?.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <MenuItem :key="item.key" :menu-info="item" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts" name="MenuItem">
import { MailOutlined, PieChartOutlined } from "@ant-design/icons-vue";
import { type PropType } from "vue";
import type { RouteRecordRaw } from "vue-router";
// import { IconFont } from "@/components/iconfont";

// const props = defineProps({
//   menuInfo: {
//     type: Object as PropType<RouteRecordRaw>,
//   },
// });

const props = defineProps<{
  menuInfo: any;
}>();

const menuChildren = computed(() => props.menuInfo?.children || []);
</script>

<style scoped></style>
