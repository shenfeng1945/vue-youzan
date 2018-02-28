import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
import mixin from 'js/mixin'

new Vue({
    el:'#app',
    data: {
      topLists:null,
      topIndex:0,
      subLists:null,
      rankLists:null
    },
    created(){
      this.getLists()
      this.getRankLists()
    },
    methods:{
      getLists(){
        axios.get(url.topLists).then(res=>{
          this.topLists = res.data.lists
        }).catch(res=>{
          console.log(res)
        })
      },
      getSubLists(id,index){
       this.topIndex = index
       if(index===0){
         this.getRankLists()
       }else{
         axios.post(url.subLists,{id}).then(res=>{
            this.subLists = res.data.data
         })
       }
      },
      getRankLists(){
        axios.post(url.rankLists).then(res=>{
          this.rankLists = res.data.data
        })
      },
      toSearch(list){
        location.href = `search.html?keyword=${list.name}&cate_id=${list.id}`
      }
    },
    mixins:[mixin]
    
})