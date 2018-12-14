<template>
<div>
  <button @click="onSureAddress">确定</button>
  <mt-picker ref='addresPick' :slots="slots" value-key="name" @change="onValuesChange"></mt-picker>
</div>
</template>

<script>
const address = [{
    "code": "001",
    "name": "省份1",
    "childs": [{
        "code": "001-1",
        "name": "城市1",
        "childs": [{
            "code": "001-1-1",
            "name": "城市1县城1"
          },
          {
            "code": "001-1-2",
            "name": "城市1县城2"
          }
        ]
      },
      {
        "code": "001-2",
        "name": "城市2",
        "childs": [{
            "code": "001-2-1",
            "name": "城市2县城1"
          },
          {
            "code": "001-2-2",
            "name": "城市2县城2"
          }
        ]
      }
    ]
  },
  {
    "code": "002",
    "name": "省份2",
    "childs": [{
        "code": "002-1",
        "name": "城市3",
        "childs": [{
            "code": "002-1-1",
            "name": "城市3县城1"
          },
          {
            "code": "002-1-2",
            "name": "城市3县城2"
          }
        ]
      },
      {
        "code": "002-2",
        "name": "城市4",
        "childs": [{
            "code": "002-2-1",
            "name": "城市4县城1"
          },
          {
            "code": "002-2-2",
            "name": "城市4县城2"
          }
        ]
      }
    ]
  },
  {
    "code": "003",
    "name": "省份3",
    "childs": [{
        "code": "003-1",
        "name": "城市5",
        "childs": [{
            "code": "003-1-1",
            "name": "城市5县城1"
          },
          {
            "code": "003-1-2",
            "name": "城市5县城2"
          }
        ]
      },
      {
        "code": "003-2",
        "name": "城市6",
        "childs": [{
            "code": "003-2-1",
            "name": "城市6县城1"
          },
          {
            "code": "003-2-2",
            "name": "城市6县城2"
          }
        ]
      }
    ]
  },
];
export default {
  name: 'app',
  data() {
    return {
      myAdress: null,
      slots: [{
        flex: 1,
        values: address,
        defaultIndex: 0,
        className: 'slot1',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: address[0].childs,
        defaultIndex: 0,
        className: 'slot3',
        textAlign: 'center'
      }, {
        divider: true,
        content: '-',
        className: 'slot4'
      }, {
        flex: 1,
        values: address[0].childs[0].childs,
        defaultIndex: 0,
        className: 'slot5',
        textAlign: 'center'
      }]
    }
  },
  methods: {
    onSureAddress(){
      const data = this.$refs.addresPick.getValues()
      console.log(data)
    },
    onValuesChange(picker, values) {
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.myAdress) {
            // 赋默认值
          } else {
            picker.setValues([address[0], address[0].childs[0], address[0].childs[0].childs[0]])
          }
        });
      } else {
        picker.setSlotValues(1, values[0].childs);
        let town = [];
        if (values[1]) {
          town = values[1].childs;
        }
        picker.setSlotValues(2, town);
      }

    }
  }
}
</script>
