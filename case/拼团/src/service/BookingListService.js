import fetch from  '../config/fetch';

class BookingListService {
  //获取首页拼团列表
  getBookingList(params){
    return fetch('pointgate/collage/indexList/query',params,'POST')
  }

  //获取‘大家都在拼’待成团列表
  getWaitingList(params){
    return fetch('pointgate/collage/waitingTeamList/query',params,'POST')

  }
}

export default new BookingListService()
