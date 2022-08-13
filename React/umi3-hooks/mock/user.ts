import mockjs from 'mockjs';
let dataList = mockjs.mock({
  'list|10': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1,'id|+1':1 }],
})
export default {
    'GET /api/tags': mockjs.mock({
        'list|10': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1,'id|+1':1 }],
      }),

    'DELETE /api/delete':(req,res)=>{
      // console.log(req.query);
      const {id} = req.query
      dataList.forEach((item,index)=>{
        if(item.id === id){
          dataList.splice(index,1)
        }
      })
      
    }

}