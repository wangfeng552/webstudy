
let request
export default function createExchange(rt){
  request = rt
}

export async function getOrderSn() {
  return request('/order/nextsn')
}
export function queryCoinList(){
  return request(`/exchange/accounts/list/accounts`)
}


export async function cancelOrder(orderId){
  return request(`/exchange/orders/cancel/${orderId}`, {
    method: 'PUT'
  })
}

//改变支付方式
export async function ChangeTradePayment({ otcTradeId, userPaymentId}) {
  return request(`/exchange/otc/change/trade/payment`, {
    method: 'POST',
    data: {
      otcTradeId,
      userPaymentId
    }
  })
}

export async function queryBusinessType(){
  return request(`/exchange/accounts/flatbusiness`)
}

export async function complaintAdd({otcTradeId,remark,id,userId,file,appealStatus,userId4Receive}) {
  return request(`/exchange/otc/appeals/create`, {
    method: 'POST',
    headers: {
      'X-REAL-IP': '127.0.0.1',
      'Content-Type': 'multipart/form-data'
    },
    params:{otcTradeId,remark,id,userId,appealStatus,userId4Receive},
    data:file
  })
}
