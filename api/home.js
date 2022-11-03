import fly from '@/utils/request.js'
// 轮播图
export const getSwipersAPI = () => {
  return fly.get('/home/swiperdata')
}
// 分类导航
export const getCateNavsAPI = () => {
  return fly.get('/home/catitems')
}
// 楼层导航
export const getFloorsAPI = () => {
  return fly.get('/home/floordata')
}
