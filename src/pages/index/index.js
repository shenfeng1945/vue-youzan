import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
//加载组件
import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'

new Vue({
    el:'#app',
    data:{
        //存放vue管理的数据
        lists:null,
        pageNum:1,
        loading:false,
        allLoaded:false,
        pageSize:6,
        bannerLists:null
    },
    created(){
        this.getLists()
        this.getBanner()
    },
    methods:{
      getLists(){
        //函数节流，未加载成功时，禁止多次加载
        this.loading = true
        axios.post(url.hotLists,{
             pageNum:this.pageNum,
             pageSize:this.pageSize
        }).then(res=>{
            //判断加载是否到底
            if(this.allLoaded){return}
            let currentLists = res.data.lists
            if(currentLists.length<this.pageSize){
                this.allLoaded = true
            }
            if(this.lists){
              this.lists = this.lists.concat(currentLists)  
            }else{
                //第一次加载
              this.lists = currentLists
            }
            this.loading = false
            this.pageNum++
        })
      },
      getBanner(){
        axios.get(url.banner).then(res=>{
          this.bannerLists = res.data.lists
        })
      }
    },
    components:{
        Foot
    }
})