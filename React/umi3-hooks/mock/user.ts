import mockjs from 'mockjs';
let dataList = mockjs.mock({
  msg: 'success',
  msgCode: 0,
  'data|10': [{ name: '@city', 'value|1-100': 50, 'type|+1': 1, 'id|+1': 1 }],
  pageable: { "pageSize": 10, "pageNumber": 1, "total": 30 }
})

let userList = mockjs.mock({
  msg: 'success',
  msgCode: 0,
  'data|300': [{ name: '@city', 'value|1-100': 50, 'type|+1': 1, 'id|+1': 1,'area|0-1':1 }],
  pageable: { "pageSize": 10, "pageNumber": 1, "total": 300 }
})

let userInfo = mockjs.mock({
  userInfo: {
    isLogin: true,
    userinfo: {
      name: 'lis'
    }
  }
})
export default {
  'GET /api/tags': dataList,
  'GET /api/user/list': userList,

  'GET /api/getTree': {
    value: [
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0', children: [] },
              { title: '0-0-0-1', key: '0-0-0-1', children: [] },
              { title: '0-0-0-2', key: '0-0-0-2', children: [] },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0', children: [] },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
            children: []
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0', children: [] },
          { title: '0-1-0-1', key: '0-1-0-1', children: [] },
          { title: '0-1-0-2', key: '0-1-0-2', children: [] },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
        children: []
      },
    ]
  },

  'POST /api/login': mockjs.mock({
    data: {
      isLogin: true,
      userinfo: {
        name: 'lis'
      }
    }
  }),

  'DELETE /api/delete': (req, res) => {
    const { id } = req.body
    let tagsList = dataList.data
    for (let i = 0; i < tagsList.length; i++) {
      if (tagsList[i].type == id) {
        tagsList.splice(i, 1)
        res.send({
          msgCode: "0",
          msg: '删除成功'
        })
        return
      }
    }
    res.send({
      msgCOde: '1001',
      msg: '删除失败'
    })
  },

  
  'DELETE /api/user/delete': (req, res) => {
    const { id } = req.body
    let tagsList = userList.data
    for (let i = 0; i < tagsList.length; i++) {
      if (tagsList[i].type == id) {
        tagsList.splice(i, 1)
        res.send({
          msgCode: "0",
          msg: '删除成功'
        })
        return
      }
    }
    res.send({
      msgCOde: '1001',
      msg: '删除失败'
    })
  }
}