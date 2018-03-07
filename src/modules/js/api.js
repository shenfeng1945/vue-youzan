let url = {
  hotLists : '/index/hotLists',
  banner:'/index/banner',
  topLists:'/category/topList',
  rankLists:'/category/rank',
  subLists:'/category/subList',
  searchLists:'/search/list',
  details:'/goods/details',
  dealList:'/goods/deal',
  addCart:'/cart/add',
  cartLists:'/cart/list',
  cartReduce:'/cart/reduce',
  cartRemove:'/cart/remove',
  cartMremove:'/cart/mremove',
  update:'/cart/update'
}

//开发环境和真实环境的切换
let host = 'http://rapapi.org/mockjsdata/24170'
// let host = ''

for(let key in url){
  if(url.hasOwnProperty(key)){
      url[key] = host + url[key]
  }
}
export default url