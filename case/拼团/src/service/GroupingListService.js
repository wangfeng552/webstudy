import fetch from  '../config/fetch';

class GroupingListService {
  //获取某一商品待成团列表
  getGroupingList(params){
    return fetch('pointgate/collage/gdsCollageTeamList/query',params,'POST')
  }
}

export default new GroupingListService()
