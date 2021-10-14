<template>
  <div class="container">
    <child>
      <div class="header" slot="header" slot-scope="slotProps">
        老版本我是头部内容111111111{{ slotProps.users }}
      </div>
      <template v-slot:main="slotProps">
        <div class="header">
          Vue2.6以上版本我是主要内容11{{ slotProps.users }}
        </div>
      </template>
      <template #footer>
        <div class="header">我是footer</div>
      </template>
      <template v-slot:person>
        <div class="person">
          <a-button type="primary">person</a-button>
        </div>
      </template>
    </child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  components: {
    child,
  },
};
</script>