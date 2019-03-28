<template>
<div>
  <div class="pickerpop" @touchmove.prevent>
    <mt-datetime-picker class="datefff" ref="picker" v-model="pickerDate" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" :closeOnClickModal="false" @confirm="confirmDate">
    </mt-datetime-picker>
  </div>
</div>
</template>
