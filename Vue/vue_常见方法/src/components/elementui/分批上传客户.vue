<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <div class="submit-excel-wrap">
      <el-button
        type="primary"
        size="mini"
        @click="submitCustomer()"
        :disabled="isSubmit"
        >提交客户</el-button
      >
      <el-link
        class="ml10"
        :underline="false"
        type="primary"
        href="https://img.1-1.com/customerData.xls"
        target="_blank"
        >下载模板</el-link
      >
    </div>

    <div class="error" v-show="hasPhone">
      表格中有空的手机号存在,提交将过滤空的手机号。
    </div>

    <!-- 重复数据 -->
    <el-dialog
      title="重复数据"
      :visible.sync="dialogFrozenVisible"
      class="addskudialog"
      :close-on-click-modal="false"
    >
      <div class="repeatdata" v-if="maxForzen">
        <el-table :data="frozenData" style="width: 100%">
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column prop="name" label="客户名称"> </el-table-column>
          <el-table-column prop="gender" label="性别"> </el-table-column>
          <el-table-column prop="idNumber" label="身份证号"> </el-table-column>
        </el-table>
      </div>
      <div v-else>当前重复数据有2000条</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFrozenVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForzenData()"
          >覆盖并导入</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { importCustomer, checkImportCustomer } from '@/api/customer'
export default {
  name: 'uploadcustomer',
  components: {
    UploadExcelComponent
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      clientList: [], // 提交给后台的所有数据
      hasPhone: false, // 是否存在空的手机号
      dialogFrozenVisible: false,
      frozenData: [], //重复数据
      maxForzen: false,
      frozenDataCount: 0,
      isSubmit: true
    }
  },
  methods: {
    beforeUpload(file) {
      this.isSubmit = true
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1000m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.$message({
        message: '添加成功,请提交客户',
        type: 'warning'
      })
      this.isSubmit = false
      this.tableData = results
      this.tableHeader = header
      let newResults = JSON.parse(JSON.stringify(results))
      //旧key到新key的映射
      let keyMap = {
        电话号码1: 'mobile',
        客户姓名: 'name',
        性别: 'gender',
        投保城市: 'insuranceCity',
        投保日期: 'insuranceStart',
        车型: 'carType',
        '4S店名称': 'storeName',
        身份证号码: 'idNumber',
        邮件: 'email',
        公司名称: 'companyName',
        客户地址: 'address',
        新建日期: 'createTime',
        更新时间: 'modifyTime',
        业务类别: 'businessType',
        投保截止日期: 'insuranceEnd',
        车架号码: 'vin',
        权益知晓程度: 'rightsUnderstanding',
        公众号关注: 'wechatFollow'
      }
      for (let i = 0; i < newResults.length; i++) {
        let obj = newResults[i]
        for (let key in obj) {
          let newKey = keyMap[key]
          if (newKey) {
            obj[newKey] = obj[key]
            delete obj[key]
          }
        }
      }
      this.hasPhone = true
      this.hasPhone = newResults.some((v) => {
        return v.mobile == undefined
      })
      this.clientList = newResults
      if (this.hasPhone) {
        this.clientList = newResults.filter((v) => {
          return v.mobile != undefined
        })
      }
    },
    async submitCustomer() {
      if (!this.clientList.length) {
        this.$message({
          type: 'error',
          message: '请上传客户数据'
        })
        return
      }
      try {
        // 验证重复数据
        this.$loading()
        console.log('check')
        let copyClientList = JSON.parse(JSON.stringify(this.clientList))
        let i = 0
        let j
        let checkResClientList = []
        while (i < copyClientList.length) {
          console.log(i)
          let uploadClientList = []
          for (j = 0; j < 500; j++) {
            uploadClientList.push(copyClientList[i])
            i++
            if (i == copyClientList.length) {
              break
            }
          }
          if (uploadClientList.length > 0) {
            const checkRes = await checkImportCustomer({
              clientList: uploadClientList
            })
            for (j = 0; j < checkRes.data.repeatClientList.length; j++) {
              checkResClientList.push(checkRes.data.repeatClientList[j])
            }
          }
        }
        let forzenData = checkResClientList
        this.dialogFrozenVisible = false
        if (forzenData.length > 0) {
          this.$loading().close()
          this.dialogFrozenVisible = true
          if (forzenData.length > 100) {
            this.forzenData = []
            this.maxForzen = false
            this.frozenDataCount = forzenData.length
          } else {
            this.frozenData = forzenData
            this.maxForzen = true
            this.frozenDataCount = 0
          }
          return
        } else {
          this.submitForzenData()
        }
      } catch (err) {
        this.$loading().close()
      }
    },
    // 提交重复数据
    async submitForzenData() {
      try {
        this.$loading()
        console.log('update')
        let copyClientList = JSON.parse(JSON.stringify(this.clientList))
        let i = 0
        let j
        while (i < copyClientList.length) {
          console.log(i)
          let uploadClientList = []
          for (j = 0; j < 500; j++) {
            uploadClientList.push(copyClientList[i])
            i++
            if (i == copyClientList.length) {
              break
            }
          }
          if (uploadClientList.length > 0) {
            const checkRes = await importCustomer({
              clientList: uploadClientList
            })
          }
        }
        this.$loading().close()
        this.$message({
          type: 'success',
          message: '提交成功'
        })
        this.dialogFrozenVisible = false
        this.tableData = []
        this.tableHeader = []
        this.clientList = []
        this.frozenData = []
      } catch (err) {
        this.$loading().close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ml10 {
  margin-left: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
.submit-excel-wrap {
  text-align: center;
  margin-top: 10px;
}
</style>
