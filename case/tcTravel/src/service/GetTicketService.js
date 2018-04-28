import fetch from  '../config/fetch';
class GetTicketService {
  //获取门票列表
  getTickets(params) {
    return fetch('pointgate/ly/scenery/query', params, 'POST')
  }
}

export default new GetTicketService()