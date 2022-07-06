<script lang="ts" setup>
import { LOADING } from "@/common/constants";
</script>
<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <component :is="Component" />
          <template #fallback>
            <div>{{ LOADING }}</div>
          </template>
        </suspense>
      </template>
    </router-view>
  </div>
</template>
