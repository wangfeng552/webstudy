<template>
  <div style="margin-left: 10px" class="tree">
    <div :key="index" v-for="(item, index) in data">
      <div @click.stop="clickItem(item)">
        {{ item.name }}
        <TreeItem
          @tree-click="clickItem"
          v-if="item?.children?.length"
          :data="item.children"
        ></TreeItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}
type Props<T> = {
  data?: T[] | []
}
defineProps<Props<TreeList>>()

const emit = defineEmits(['tree-click'])
const clickItem = (item: TreeList) => {
  emit('tree-click', item)
}
</script>

<style></style>
