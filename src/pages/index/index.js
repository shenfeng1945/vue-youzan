import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api'
new Vue({
    el:'#app',
    data:{
        //存放vue管理的数据
        lists:null,
    },
    created(){
        axios.post(url.hotLists,{
            pageNum:1,
            pageSize:6
        }).then(res=>{
            this.lists = res.data.lists
        })
    }
})