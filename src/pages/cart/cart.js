import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import './cart_popover.css'
import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js' 
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'


new Vue({
  el:'.container',
  data:{
    lists:null,
    total:0,
    isEditing:false,
    editShop:null,
    removePopup:false,
    removeData:null,
    editShopIndex:-1,
    removeMsg:'',
    
  },
  computed:{
    allSelected:{
      get(){
        //是否店铺全部选中,正向操作
        if(this.lists&&this.lists.length){
          return this.lists.every(shop=>{
            return shop.isCheck
          })
        }
        return false
      },
      set(newVal){
          //反向操作
        this.lists.forEach(shop=>{
            shop.isCheck = newVal
            shop.goodsList.forEach(good=>{
                good.isCheck = newVal
            })
        })
      }
    },
    allRemoveSelected:{
      get(){
        if(this.editShop){
          return this.editShop.removeCheck
        }
        return false
      },
      set(newVal){
        if(this.editShop){
          this.editShop.removeCheck = newVal
          this.editShop.goodsList.forEach(good=>{
            good.removeCheck = newVal
          })
        }
      }
    },
    selectedList(){
      if(this.lists&&this.lists.length){
        let arr = []
        let total = 0
        this.lists.forEach(shop=>{
            shop.goodsList.forEach(good=>{
                if(good.isCheck){
                  arr.push(good)//结算要提交id和number
                  total +=good.price*good.number//显示总价
                }
            })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists(){
      if(this.editShop){
        let arr = []
        this.editShop.goodsList.forEach(good=>{
          if(good.removeCheck){
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      Cart.list().then(res=>{
        let lists = res.data.cartList
         lists.forEach(shop => {
             shop.isCheck = false
             shop.editing = false
             shop.removeCheck = false
             shop.editingMsg = '编辑'
             shop.goodsList.forEach(good=>{
                 good.isCheck = false
                 good.removeCheck = false
             })
         });
         this.lists = lists
        // 勾选商品是，返回的数据里并没有这个属性，只能通过前端操作。
        //考虑到响应式，应该先对返回的数据进行处理，再赋值。
      })
    },
    chooseGood(shop,good){
      let attr = this.isEditing?'removeCheck':'isCheck'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good=>{
          //该店铺下所有商品通过测试
          return good[attr]
      })
    },
    chooseShop(shop){
       let attr = this.isEditing?'removeCheck':'isCheck'
        shop[attr] = !shop[attr]
        shop.goodsList.forEach(good=>{
            //店铺被选中，则所有商品被选中。
           good[attr] = shop[attr]
        })
    },
    chooseAll(){
      let attr = this.isEditing?'allRemoveSelected':'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop,shopIndex){
     shop.editing = !shop.editing
     shop.removeCheck = false
     this.isEditing = shop.editing
     this.editShopIndex = shopIndex
     shop.editingMsg = shop.editing?'完成':'编辑'
     this.lists.forEach((item,i)=>{
        if(shopIndex !== i){
           item.editing = false
           item.editingMsg = shop.editing?'':'编辑'
        }
     })
     shop.goodsList.forEach(good=>{
       //初始化之前选中的
       good.removeCheck = false
     })
     this.editShop = shop.editing?shop:null
     //将正常状态下，滑动的距离复原。再显示删除。
     this.lists.forEach((shop,index1)=>{
       shop.goodsList.forEach((good,index2)=>{
          this.touchAnimate(index1,index2,{left:'0px'})
       })
      })
    },
    changeNum(good,type){
      if(type<0){
        //减，减少之前先进行异步操作,数据库先改，然后再改本地。
        // axios.post(url.addCart,{id:good.id,number:1}).then(res=>{
        //   if(res.status===200){
        //     if(good.number<=1){return}
        //     good.number--;
        //   }
        // })
        Cart.reduce(good.id).then(res=>{
          if(good.number<=1){return}
          good.number--;
        })
      }else if(type>0){
        //加
        // axios.post(url.addCart,{id:good.id,number:1}).then(res=>{
        //   if(res.status===200){
        //     good.number++;
        //   }
        // })
        Cart.add(good.id).then(res=>{
          good.number++
        })
      }
    },
    remove(shop,shopIndex,good,goodIndex){
      this.removePopup  = true
      this.removeData = {shop,shopIndex,good,goodIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },
    removeAll(){
      this.removePopup = true
      this.removeMsg = `去定将所选${this.removeLists.length}个商品删除？`
    },
    removeConfim(){
      if(this.removeMsg=='确定要删除该商品吗？'){
        let {shop,shopIndex,good,goodIndex} = this.removeData
        Cart.remove(good.id).then(res=>{
           shop.goodsList.splice(goodIndex,1)
           if(!shop.goodsList.length){
              this.lists.splice(shopIndex,1)
              this.removeShop()
           }
           this.removePopup = false
           //再我删除滑动过的商品时，让它的下一个不要滑出头,下面这个不行，有动画
          //  this.touchAnimate(shopIndex,goodIndex,{left:'0px'})
          //下面这个也不是最好的方法，应该对v-for进行唯一识别，这样v-for会重排，用:key="good.id"
          // this.$refs[`goods-${shopIndex}-${goodIndex}`][0].style.left='0px'
         })
      }else{
        let ids = []
        this.removeLists.forEach(good=>{
          ids.push(good.id)
        })
        Cart.mRemove(ids).then(res=>{
        // axios.post(url.cartMremove,{ids}).then(res=>{
          if(res.status===200){
            let arr = []
            // 将未勾选的商品重新付给
            this.editShop.goodsList.forEach(good=>{
              let index = this.removeLists.findIndex(item=>{
                return item.id == good.id
              })
              if(index===-1){
                arr.push(good)
              }
            })
            if(arr.length){
              this.editShop.goodsList = arr
            }else{
              this.lists.splice(this.editShopIndex,1)
              this.removeShop()
            }
          }
        })
      }
      
    },
    removeShop(){
     //移除店铺后，要切换成正常状态。
     this.isEditing = false 
     this.editShop = null
     this.removePopup = false
     this.editShopIndex = -1
     this.lists.forEach(shop=>{
       shop.editing = false
       shop.editingMsg = '编辑'
     })
    },
    start(e,good){
      good.startX = e.changedTouches[0].clientX
    },
    end(e,shopIndex,good,goodIndex){
      //编辑状态下，不可滑动
      if(this.isEditing){return}
      let endX = e.changedTouches[0].clientX
      let left = '0'
      if(good.startX-endX>30){
        left = '-60px'
      }
      if(endX-good.startX>30){
        left='0px'
      }
      //滑动之前，除了当前这个，其余复原
      this.lists.forEach((shop,index1)=>{
        shop.goodsList.forEach((good,index2)=>{
          if(shopIndex!==index1||goodIndex!==index2){
            this.touchAnimate(index1,index2,{left:'0px'})
          }
        })
      })
      this.touchAnimate(shopIndex,goodIndex,{left})
    },
    touchAnimate(shopIndex,goodIndex,options){
      Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],options)
    },
    inputBlur(good){
      Cart.update(good.id,good.number).then(res=>{
        if(Number(good.number)<=0){
          good.number=1
        }
        if((''+good.number).split('.').length>=2){
          good.number = good.number.split('.')[0]
        }
      })
    },
  },
  mixins:[mixin]
})
