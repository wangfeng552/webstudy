<script lang="ts" setup>
import { usePagination, useRequest } from 'vue-request'
import { brandAdd, brandEdit, brandList, brandRemove } from '@/api/brand/service'
// import type { TableProps } from "ant-design-vue";

import { Form } from 'ant-design-vue'
import { IBrandAdd, IBrandEdit } from '@/api/brand/type'

const useForm = Form.useForm

type IFormSearch = {
  keyword: string
}

const columns = [
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    width: '20%',
  },
  {
    title: '品牌代号',
    dataIndex: 'brand_number',
    width: '20%',
  },
  {
    title: '描述',
    dataIndex: 'brand_descp',
    width: '40%',
  },
  {
    title: '',
    dataIndex: 'operation',
  },
]

const modelSearch = reactive<IFormSearch>({
  keyword: '',
})

const modelAdd = reactive<IBrandAdd & { id?: number }>({
  brand_name: '',
  brand_number: '',
  brand_descp: '',
})

const { data, run, loading, current, pageSize } = usePagination(brandList, {
  pagination: {
    currentKey: 'page_number',
    pageSizeKey: 'page_size',
  },
  formatResult: (data) => {
    let arr = data.data
    console.log(arr)

    let s = arr.map((v) => {
      v.index = 12
      return v
    })

    return arr
  },
})

const brandAddRes = useRequest(brandAdd, {
  manual: true,
  onSuccess: (data) => {
    if (data.success) {
      visible.value = !visible.value
      run({
        keyword: modelSearch.keyword,
        page_number: 1,
        page_size: pageSize.value,
      })
    }
  },
})

const brandEditRes = useRequest(brandEdit, {
  manual: true,
  onSuccess: (data) => {
    if (data.success) {
      visible.value = !visible.value
      run({
        keyword: modelSearch.keyword,
        page_number: current.value,
        page_size: pageSize.value,
      })
    }
  },
})

const brandRemoveRes = useRequest(brandRemove, {
  manual: true,
  onSuccess: (data) => {
    if (data.success) {
      run({
        keyword: modelSearch.keyword,
        page_number: current.value,
        page_size: pageSize.value,
      })
    }
  },
})

const tableData = computed(() => {
  let t = data?.value?.data
  console.log(data)

  return data?.value
})

const pagination = computed(() => ({
  total: tableData?.value?.pageable?.total,
  page_number: current.value,
  page_size: pageSize.value,
}))

const rulesAdd = reactive({
  brand_name: [
    {
      required: true,
      message: 'Please input brand_name',
    },
  ],
  brand_number: [
    {
      required: true,
      message: 'Please select brand_number',
    },
  ],
  brand_descp: [
    {
      required: true,
      message: 'Please select brand_descp',
    },
  ],
})

const visible = ref<boolean>(false)

// const type = ref<number>(0);

const typeTitle = ref<string>('添加')
const typeModal = ref<number>(0)
/**
 * @description 查询
 */
const onSearch = () => {
  run({
    keyword: modelSearch.keyword,
    page_number: current.value,
    page_size: pageSize.value,
  })
}

/**
 * @description 添加/编辑
 * @param type 添加 0 编辑 1
 * @param record 该条数据
 */
const onAdd = (type, record?: IBrandEdit) => {
  typeTitle.value = type === 0 ? '添加' : '编辑'
  typeModal.value = type
  visible.value = !visible.value

  modelAdd.id = type === 1 ? record.id : 0
  modelAdd.brand_name = type === 1 ? record?.brand_name : ''
  modelAdd.brand_number = type === 1 ? record.brand_number : ''
  modelAdd.brand_descp = type === 1 ? record.brand_descp : ''
}

const { validate, validateInfos } = useForm(modelAdd, rulesAdd, {
  onValidate: (...args) => console.log(...args),
})

/**
 * @description 添加/编辑
 */
const onSubmit = () => {
  validate()
    .then(() => {
      if (typeModal.value === 0) {
        brandAddRes.run(modelAdd)
      } else {
        brandEditRes.run(modelAdd)
      }
    })
    .catch((err) => {
      console.log('error', err)
    })
}

/**
 * @description 删除
 */
const onDelete = (id) => {
  brandRemoveRes.run(id)
}

// const handleTableChange: TableProps["onChange"] = (
//   pag: { page_size: number; page_number: number },
//   filters: any,
//   sorter: any
// ) => {
//   run({
//     results: pag.page_size,
//     page: pag?.page_number,
//     sortField: sorter.field,
//     sortOrder: sorter.order,
//     ...filters,
//   });
// };
</script>
<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="品牌名称">
        <a-input v-model:value="modelSearch.keyword" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click.prevent="onSearch">查询</a-button>
      </a-form-item>
    </a-form>

    <a-button type="primary" @click.prevent="onAdd(0)">添加</a-button>

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="tableData"
      :pagination="pagination"
      :loading="loading"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-button class="mr-8" @click="onAdd(1, record)">编辑</a-button>
          <a-button @click="onDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" :title="`${typeTitle}品牌`" @ok="onSubmit">
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="brand_name" v-bind="validateInfos.brand_name">
          <a-input v-model:value="modelAdd.brand_name" />
        </a-form-item>
        <a-form-item label="brand_number" v-bind="validateInfos.brand_number">
          <a-input v-model:value="modelAdd.brand_number" />
        </a-form-item>
        <a-form-item label="brand_descp" v-bind="validateInfos.brand_descp">
          <a-input v-model:value="modelAdd.brand_descp" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
