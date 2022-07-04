<template>
  <div>
    <TreeItem :data="data" @tree-click="getItem"></TreeItem>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from './treeItem.vue'
type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}

const data = reactive<TreeList[]>([
  {
    name: 'no.1',
    children: [
      {
        name: 'no.1-1',
        children: [
          {
            name: 'no.1-1-1',
          },
        ],
      },
    ],
  },
  {
    name: 'no.2',
    children: [
      {
        name: 'no.2-1',
      },
    ],
  },
  {
    name: 'no.3',
  },
])

const getItem = (item) => {
  console.log(item.name)
}
</script>

<style></style>
