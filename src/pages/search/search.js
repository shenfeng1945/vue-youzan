import './search.css'
import 'css/common.css'
import qs from 'qs'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

let {keyword,id} = qs.parse(location.search.substr(1))
new Vue({
    el:'.container',
    data:{
      searchList:null,
      keyword,
      isShow:false,
      pageSize:8,
      pageNum:1,
      loading:false,
      allLoaded:false
    },
    created(){
      this.getSearchList()
    },
    methods:{
      getSearchList(){
        this.loading =true
        // if(this.pageNum>1){return}
        axios.post(url.searchLists,{keyword,id,pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
          let current = res.data.lists
          if(this.searchList){
             this.searchList = this.searchList.concat(current)
          }else{
             this.searchList = current
          }
          this.loading = false
          this.pageNum++
        })
      },
      move(){
          //回到顶部是否出现
        if(document.documentElement.scrollTop > 100){
           this.isShow = true
        }else{
           this.isShow = false
        }
      },
      toTop(){
         Velocity(document.body,'scroll',{duration:800})
      }
    },
    mixins:[mixin]
})

