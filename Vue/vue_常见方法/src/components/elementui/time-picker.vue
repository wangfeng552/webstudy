<template>
  <div>
    <el-form-item label="选择日：">
      <el-date-picker
        v-model="createTime"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getTime"
        :picker-options="pickerOptions1"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="选择月：">
      <el-date-picker
        v-model="mounthTime"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        :picker-options="pickerOptions2"
      >
      </el-date-picker>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createTime: '',
      mounthTime: '',
      pickerDayDate: null,
      pickerYearDate: null,
      day31: 30 * 24 * 3600 * 1000,
      pickerOptions1: {
        onPick: ({ maxDate, minDate }) => {
          if (minDate && this.pickerDayDate) {
            this.pickerDayDate = null
          } else if (minDate) {
            this.pickerDayDate = minDate.getTime()
          }
        },
        disabledDate: (time) => {
          if (this.pickerDayDate) {
            return (
              time.getTime() > this.pickerDayDate + this.day31 ||
              time.getTime() < this.pickerDayDate - this.day31
            )
          }
          return false
        }
      },
      pickerOptions2: {
        onPick: ({ maxDate, minDate }) => {
          if (minDate && this.pickerYearDate) {
            this.pickerYearDate = null
          } else if (minDate) {
            this.pickerYearDate = minDate.getTime()
          }
        },
         disabledDate: (time) => {
          if (this.pickerYearDate) {
            return (
              time.getTime() >
                new Date(
                  new Date(this.pickerYearDate).getFullYear() + 1,
                  new Date(this.pickerYearDate).getMonth() - 1
                ) ||
              time.getTime() <
                new Date(
                  new Date(this.pickerYearDate).getFullYear() - 1,
                  new Date(this.pickerYearDate).getMonth() - 1
                )
            )
          }
          return false
        }
      }
    }
  },
  methods: {}
}
</script>
