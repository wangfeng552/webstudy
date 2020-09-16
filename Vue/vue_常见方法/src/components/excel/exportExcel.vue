<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      attributeList: [],
    }
  },
  methods: {
    exportAttribute() {
      import("@/vendor/Export2Excel").then((excel) => {
        const tHeader = [
          "id",
          "名字",
          "排序",
          "商品分类",
          "商品分类ID",
          "属性值",
        ]
        //  需要的字段
        const filterVal = [
          "id",
          "name",
          "sort",
          "goodsCategoryName",
          "goodsCategoryId",
          "goodsAttributeValueListString",
        ]
        const data = this.formatJson(filterVal, this.attributeList)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: "属性表", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx", //非必填
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j]
        })
      )
    },
  },
}
</script>