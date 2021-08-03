<template>
  <div class="m">
    <h3 class="title">element ui input 无法输入0.01</h3>
    <p>去掉v-model.number就可以</p>

    <el-input
      v-model="formData.reduceMoney"
      class="input200"
      type="number"
      @focus="discountMethodFocus(1)"
      :disabled="disabledOptions.includes('reduceMoney')"
    >
    </el-input>
  </div>
</template>