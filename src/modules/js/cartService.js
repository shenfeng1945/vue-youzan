//封装所有需要请求的方法，提前把哪个方法要用哪个接口提起处理好,不用在关心url
//第五课，购物车第四节

import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Cart {
    static add(id){
        //返回的是一个promise对象。
        return fetch(url.addCart,{id,number:1})
    }
    static reduce(id){
        return fetch(url.cartReduce,{id,number:1})
    }
    static remove(id){
        return fetch(url.cartRemove,{id})
    }
    static mRemove(ids){
        return fetch(url.cartMremove,{ids})
    }
    static list(){
        return fetch(url.cartLists)
    }
    static update(id,number){
        return fetch(url.update,{id,number})
    }
}
export default Cart