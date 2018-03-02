import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
// import './goods_base.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Vue from 'vue'
import axios from 'axios'
import Swipe from 'components/Swipe.vue'

let { id } = qs.parse(location.search.substr(1))
let tabsList = ['商品详情','本地成交']
new Vue({
    el: '#app',
    data: {
        details: null,
        tabsList,
        tabIndex:0,
        dealList:null,
        bannerList:null,
        skuType:1,
        showSku:false,
        skuNumber:1,
        isAddCart:false,//该商品是否添加过购物车
        isToCart:false,//是否加入购物车成功。
        shopIndex:0, //净含量
    },
    created() {
        this.getDetails()
    },
    methods: {
        getDetails() {
            axios.post('http://rapapi.org/mockjsdata/31693/goods/details', { id }).then(res => {
                this.details = res.data.data
                this.bannerList = []
                this.details.imgs.forEach(item => {
                   this.bannerList.push({
                       clickUrl:'javascript:;',
                       image:item
                   }) 
                });
            })
        },
        getDealList(){
            axios.post(url.dealList,{id}).then(res=>{
                this.dealList = res.data.data.lists
            })
        },
        tabsClick(index){
          this.tabIndex = index
          if(index===1){
              this.getDealList()
          }
        },
        chooseSku(type){
          this.skuType = type
          this.showSku = true
        },
        cancelSku(){
          this.showSku = false
        },
        changeNum(num){
          if(num<0 && this.skuNumber===1){return}
          num===1?this.skuNumber++:this.skuNumber--;
        },
        addCart(){
           axios.post(url.addCart,{id,number:this.skuNumber}).then(res=>{
             if(res.data.status===200){
                this.showSku = false
                this.isToCart = true
                this.isAddCart = true
                setTimeout(()=>{
                  this.isToCart = false
                },1000)
             }
           })
        }
    },
    watch:{
        // 控制content在出现遮罩层时禁止滑动。
      showSku(val,oldVal){
        document.body.style.overflow = val?'hidden':'auto'
        document.querySelector('html').style.overflow = val?'hidden':'auto'
        document.body.style.height = val?'100%':'auto'
        document.querySelector('html').style.height = val?'100%':'auto'
      },
    //   skuNumber(val,oldVal){
    //      if(val<=1){
    //          this.skuNumber=1
    //      }
    //   }
    },
    mixins:[mixin],
    components:{Swipe}
})