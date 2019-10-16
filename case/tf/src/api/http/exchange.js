let request
const root = process.env.API_URL
function formatUrl(url) {
  return root + url;
}
export default function createExchange(rt) {
  request = rt
}

// 根据品牌id获取含车系列表的工厂列表
export async function getCarFactorySerielistBrandId(data) {
  const { car_brand_id } = data
  return request(formatUrl("/api/data/car_model/ajax_get_car_factory_list_with_car_serie_list_by_car_brand_id"), {
    method: "POST",
    data: {
      car_brand_id
    }
  })
}
