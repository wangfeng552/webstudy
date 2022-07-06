<script setup lang="ts">
import { PieChartOutlined } from '@ant-design/icons-vue'
import MenuItem from './menu-item.vue'
import { IMenuClick } from '@/types'

const props = defineProps({
  collapsed: {
    // 侧边栏菜单是否收起
    type: Boolean,
  },
})

// 当前路由
const currentRoute = useRoute()
const router = useRouter()

const state = reactive<any>({
  openKeys: [],
  selectedKeys: [currentRoute.name],
})

const menus: any = computed(() => [
  {
    key: 'base',
    name: '基础数据管理',
    children: [
      {
        key: 'brand',
        name: '品牌管理',
      },
      {
        key: 'global',
        name: '全局属性',
      },
      {
        key: 'ref',
        name: 'ref全家桶',
      },
      {
        key: 'reactive',
        name: 'reactive全家桶',
      },
      {
        key: 'toQjt',
        name: 'to全家桶',
      },
      {
        key: 'computed',
        name: '计算属性',
      },
      {
        key: 'watch',
        name: 'watch',
      },
      {
        key: 'parent',
        name: '父子组件',
      },
      {
        key: 'dongtai',
        name: '动态组件',
      },
      {
        key: 'router',
        name: '路由',
      },
    ],
  },
  {
    key: 'brand',
    name: 'brand',
  },
])

// 根据activeMenu获取指定的menu
const getTargetMenuByActiveMenuName = (activeMenu: string) => {
  return router.getRoutes().find((n) => [n.name, n.path].includes(activeMenu))
}

// 获取当前打开的子菜单
function getOpenKeys() {
  console.log(currentRoute.matched)
  const { meta } = currentRoute
  // if (meta?.activeMenu) {
  //   const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu);
  //   return targetMenu?.meta?.namePath ?? [meta?.activeMenu];
  // }

  return meta?.hideInMenu
    ? state?.openKeys || []
    : currentRoute.meta?.namePath ?? currentRoute.matched.map((n) => n.name)
}

// 监听菜单收缩状态
watch(
  () => props.collapsed,
  (newVal) => {
    state.openKeys = newVal ? [] : getOpenKeys()
    state.selectedKeys = [currentRoute.name]
  }
)

// 跟随页面路由变化，切换菜单选中状态
watch(
  () => currentRoute.fullPath,
  () => {
    if (props.collapsed) return
    state.openKeys = getOpenKeys()
    console.log(state.openKeys)
    const { meta } = currentRoute
    if (meta?.activeMenu) {
      const targetMenu = getTargetMenuByActiveMenuName(meta.activeMenu)
      state.selectedKeys = [targetMenu?.name ?? meta?.activeMenu]
    } else {
      state.selectedKeys = [currentRoute.meta?.activeMenu ?? currentRoute.name]
    }
  },
  {
    immediate: true,
  }
)

// 点击菜单
const clickMenuItem = ({ key }: IMenuClick) => {
  console.log(key)
  router.push({ name: key })
}
</script>

<template>
  <div class="menu-container">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :collapsed="props.collapsed"
      @click="clickMenuItem"
    >
      <template v-for="item in menus" :key="item.key">
        <template v-if="!item.children">
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
    </a-menu>
  </div>
</template>

<style lang="less" scoped>
.menu-container {
  height: calc(100vh - 64px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}
</style>
