<template>
  <div>
    <h3>computed</h3>
    <a-button @click="count++">+count</a-button>
    <div>{{ total }}</div>

    <h3>购物车</h3>
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>
            <a-button size="small" @click="changeCount(item, false)">-</a-button>{{ item.num }}
            <a-button size="small" @click="changeCount(item, true)">+</a-button>
          </td>
          <td>{{ item.price * item.num }}</td>
          <td><a-button @click="delShop(index)" size="small">删除</a-button></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ totalCount }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const count = ref<number>(2)
const item = ref<number>(20)

const total = computed<number>(() => {
  return count.value + item.value
})

// 购物车case
type Shop = {
  name: string
  num: number
  price: number
}

const data = reactive<Shop[]>([
  {
    name: '小满的袜子',
    num: 1,
    price: 100,
  },
  {
    name: '小满的裤子',
    num: 1,
    price: 200,
  },
  {
    name: '小满的衣服',
    num: 1,
    price: 300,
  },
  {
    name: '小满的毛巾',
    num: 1,
    price: 400,
  },
])

const changeCount = (item: Shop, type: boolean): void => {
  if (item.num > 1 && !type) {
    item.num--
  }
  if (item.num < 100 && type) {
    item.num++
  }
}

const delShop = (index: number) => {
  data.splice(index, 1)
}

const totalCount = computed<number>(() => {
  return data.reduce((prev, next) => {
    return prev + next.num * next.price
  }, 0)
})
</script>

<style></style>
