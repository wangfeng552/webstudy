import request from '../utils/request';

// 获取在线车辆总数
export async function getOnlineAmount(data: string) {
  return request(`/uaes-common-api/homepage-view/home/carStatistics?${data}`);
}
