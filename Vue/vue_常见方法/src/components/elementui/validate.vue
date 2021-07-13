<template>
  <div class="mk">
    <el-form-item label="库存" prop="store">
      <el-input v-model.number="shopInfoForm.store" class="w200"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  data() {
    const mobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }

    // 金额保留2位小数
    const validateNumber = (rule, value, callback) => {
      if (value != '' && !/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
        callback(new Error('格式不正确'))
      } else {
        callback()
      }
    }

    // 不必填数字验证
    const noRequireNumber = (rule, value, callback) => {
      if (value != '') {
        if (/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false) {
          callback(new Error('请填写大于0的数字'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    // 字母数字 ^[A-Za-z0-9]+$
    const validateZimuShuzi = (rule, value, callback) => {
      if (!/^[A-Za-z0-9]+$/.test(value)) {
        callback(new Error('格式不正确'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'change' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'change'
          }
        ],
        store: [
          { required: true, message: '请输入', trigger: 'blur' },
          { type: 'number', message: '请输入', trigger: 'blur' } // number 必须在v-model.number
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: mobile, trigger: 'change' }
        ],
        sort: [{ validator: noRequireNumber, trigger: 'blur' }],
        money: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>