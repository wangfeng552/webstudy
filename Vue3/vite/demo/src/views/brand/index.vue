<script lang="ts" setup>
import { usePagination, useRequest } from "vue-request";
import { brandList, chafenList, ecuList, modelList } from "@/api/brand/service";
import { IBrandAdd, IBrandEdit } from "@/api/brand/type";
import type { SelectProps } from "ant-design-vue";

import dayjs from "dayjs";
interface IFormSearch {
  keyword: string;
}

const columns = [
  {
    title: "品牌名称",
    dataIndex: "brand_name",
    width: "20%",
  },
  {
    title: "品牌代号",
    dataIndex: "brand_number",
    width: "20%",
  },
  {
    title: "描述",
    dataIndex: "brand_descp",
    width: "40%",
  },
  {
    title: "时间",
    dataIndex: "brand_opTime",
    width: "40%",
    customRender: (text, row, index) => {
      return dayjs(text.value).format("YYYY-MM-DD HH:mm");
    },
  },
  {
    title: "",
    dataIndex: "operation",
  },
];
const modelSearch = reactive<IFormSearch>({
  keyword: "",
});

const time = ref(dayjs(1655856000000).format("YYYY-MM-DD HH:mm"));

const { data, run, loading, current, pageSize } = usePagination(brandList, {
  pagination: {
    currentKey: "page_number",
    pageSizeKey: "page_size",
  },
});

const { data: chafen, run: getChafen } = useRequest(chafenList, {
  ready: computed(() => !!data.value),
  loadingDelay: 1000,
});

const getChafenList = () => {
  getChafen({ page_number: 1, page_size: 2 });
};

const tableChafen = computed(() => chafen?.value?.data);
console.log(tableChafen);

const tableData = computed(() => data?.value?.data);

const pagination = computed(() => ({
  total: data?.value?.pageable?.total,
  page_number: current.value,
  page_size: pageSize.value,
}));

const onSearch = () => {
  run({
    keyword: modelSearch.keyword,
    page_number: current.value,
    page_size: pageSize.value,
  });
};

const onAdd = (type, record?: IBrandEdit) => {};
const onDelete = (id) => {};

const { data: modelData, run: getModel } = useRequest(modelList, {});

const modelListData = computed(() => modelData?.value?.data);
</script>
<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="品牌名称">
        <a-input v-model:value="modelSearch.keyword" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click.prevent="onSearch">查询</a-button>
        <a-button type="primary" @click.prevent="getChafenList">查询差分</a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
      >
        <template #headerCell="{ column }">
          <template v-if="column.dataIndex === 'brand_name'">
            <span>name</span>
          </template>
        </template>

        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-button class="mr-8" @click="onAdd(1, record)">编辑</a-button>
            <a-button @click="onDelete(record.id)">删除</a-button>
          </template>
        </template>
      </a-table>
    </div>

    <div>
      <a-select ref="select" v-model:value="ecuValue" style="width: 120px">
        <a-select-option :value="v.id" v-for="(v, i) in modelListData" :key="i">{{
          v.model_name
        }}</a-select-option>
      </a-select>
    </div>
  </div>
</template>
