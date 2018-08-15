<template>
    <div class="means bgfff">
      <i-row class="mb20">
        <i-col span="16">
          <i-input
            class="mr20"
            prefix="ios-search"
            placeholder="请输入货币信息"
            clearable
            @on-blur="searchMonetary"
            v-model="monetary"
            style="width: auto" />
          <i-switch class="mr10" v-model="switch1" @on-change="changeSwitch" />只显示有资金币种
        </i-col>
        <i-col span="8" class="right">
          <div class="zcgz mb5">
            <span class="fcad">当前资产估值</span>
            <span class="ydy">
              <span class="zwf">≈</span>
              <span class="zwf">￥</span>
              <span>523562.32</span>
            </span>
          </div>
          <div class="myzcgz fcad">
            <span class="zwf">≈</span>
            <span class="zwf">$</span>
            <span>523562.32</span>
          </div>
        </i-col>
      </i-row>

      <i-table :columns="columns" :data="monetaryList"></i-table>

    </div>
</template>

<script>
    export default {
      name: "means",
      data(){
        return {
          monetary:'',
          switch1: false,
          columns:[
            {
              title: ' ',
              key: 'wf',
              width: 50,
              render: (h, params) => {
                return h('div', [
                  h('img', {domProps: {
                      align: 'center',
                      src: params.row.wf,
                    }})
                ]);
              }
            },
            {
              title: '币种',
              key: 'bz'
            },
            {
              title: '全称',
              key: 'name'
            },
            {
              title: '可用余额',
              key: 'ky',
              sortable: true
            },
            {
              title: '下单冻结',
              key: 'xd',
              sortable: true
            },
            {
              title: '总额',
              key: 'all',
              sortable: true
            },
            {
              title: '人民币估值',
              key: 'rmb',
              sortable: true
            }
          ],
          monetaryList:[
            {
              wf:require('../../assets/image/btb.png'),
              bz:'BTC',
              name:'比特币',
              ky:'123.000000',
              xd:'456.320000',
              all:'34526523',
              rmb:'34526525.00'
            },
          ]
        }
      },
      methods:{
        searchMonetary(){
          console.log('查询')
        },
        changeSwitch (status) {
          console.log(status)
        }
      },
      computed:{
      }
    }
</script>

<style lang="less">
  .means{
    .ivu-icon-ios-close-circle{ cursor: pointer;}
    .zwf{ display: inline-block; width: 17px; text-align: center;}
  }

</style>
