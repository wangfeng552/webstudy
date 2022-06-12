<template>
  <div>
    <div>https://github.com/hql7/tree-transfer</div>
    <div>基于elementui 树形穿梭框</div>
    <div>npm install el-tree-transfer --save</div>
    <tree-transfer
      :rootPidValue="-1"
      ref="tree"
      :defaultCheckedKeys="defaultCheckedKeys"
      :defaultTransfer="true"
      checkStrictlyType="puppet"
      pid="parent_uid"
      node_key="uid"
      :title="['待采集数据', '已选采集数据']"
      :from_data="fromData"
      :to_data="toData"
      :defaultProps="{ label: 'name' }"
      @add-btn="add"
      @remove-btn="remove"
      :mode="mode"
      height="540px"
      filter
      openAll
    >
    </tree-transfer>
    <el-button @click="changeBtn">点击</el-button>
  </div>
</template>

<script>
import treeTransfer from 'el-tree-transfer'
export default {
  data() {
    return {
      defaultCheckedKeys: ['1-1-1'],
      fromData: [
        {
          parent_uid: -1,
          uid: '1',
          name: 'CAN',
          description: 'CAN信号采集',
          children: [
            {
              uid: '1-1',
              parent_uid: '1',
              name: '514',
              description: '车轮距离边缘计数',
              children: [
                {
                  uid: '1-1-1',
                  parent_uid: '1-1',
                  name: 'WhlDistEdgeCntrLR',
                  description: '左后车轮距离边缘计数器',
                },
                {
                  uid: '1-1-2',
                  parent_uid: '1-1',
                  name: 'WhlDistEdgeCntrRR',
                  description: '右后车轮距离边缘计数器',
                },
              ],
            },
            {
              uid: '2-1',
              parent_uid: '1',
              name: '49',
              description: '前角速度信号',
              children: [
                {
                  uid: '2-1-1',
                  parent_uid: '2-1',
                  name: 'WhlAngVelRFrtAuth',
                  description: '前角速度信号组：右前车轮角速度',
                },
                {
                  uid: '2-1-2',
                  parent_uid: '2-1',
                  name: 'WhlAngVelLFrtAuth',
                  description: '前角速度信号组：左前车轮角速度',
                },
              ],
            },
          ],
        },
        {
          parent_uid: -1,
          uid: '2',
          name: 'SOA',
          description: 'SOA服务数据采集',
        },
      ],
      toData: [],
      mode: 'transfer',
    }
  },
  components: { treeTransfer },
  methods: {
    add() {},
    remove() {},
    changeBtn() {
      this.defaultCheckedKeys = ['1-1-2']
      this.$refs.tree.addToAims(false)
    },
  },
}
</script>
