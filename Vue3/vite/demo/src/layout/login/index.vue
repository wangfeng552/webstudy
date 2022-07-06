<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Form } from 'ant-design-vue'
import { IUser } from '@/api/user/type'
const { useForm } = Form

const modelRef = reactive<IUser>({
  username: 'admin',
  password: '111111',
})

const router = useRouter()

const rulesRef = reactive({
  username: [
    {
      required: true,
      message: 'Please input name',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please select region',
    },
  ],
})
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
  onValidate: (...args) => console.log(...args),
})

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef))
      localStorage.setItem('token', '1')
      router.push('/base')
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
    <a-form-item label="username" v-bind="validateInfos.username">
      <a-input v-model:value="modelRef.username" />
    </a-form-item>
    <a-form-item label="password" v-bind="validateInfos.password">
      <a-input v-model:value="modelRef.password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">login</a-button>
    </a-form-item>
  </a-form>
</template>
