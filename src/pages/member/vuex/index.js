//使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'
Vue.use(Vuex)

//创建Store实例
const store = new Vuex.Store({
    state:{
    //定义状态，不允许直接修改，只能通过事件来管理
     lists:null,
    },
    mutations:{
    //同步事件,修改
      init(state,lists){
        if(!state.lists){
          state.lists = lists 
        }
      },
      add(state,list){
        state.lists.push(list)
      },
      remove(state,id){
        let lists = state.lists
        let index = lists.findIndex(item=>{
          return item.id = id
        })
        lists.splice(index,1)
      },
      update(state,instance){
        let lists = JSON.parse(JSON.stringify(state.lists))
        let index = lists.findIndex(item=>{
          return item.id === instance.id
        })
        lists[index] = instance 
        state.lists = lists
      },
      setDefault(state,id){
        let lists  = state.lists
        lists.forEach(item=>{
          item.isDefault = item.id==id?true:false
        })
      }
    },
    actions:{
    //异步操作,完成后，在触发mutations,进行同步操作。
      getLists({commit}){
          Address.list().then(res=>{
              commit('init',res.data.lists)
          })
      },
      addAction({commit},instance){
        Address.add(instance).then(res=>{
           commit('add',res.data.data)
        })
      },
      removeAction({commit},id){
        Address.remove(id).then(res=>{
          commit('remove',id)
        })
      },
      updateAction({commit},instance){
        Address.update(instance).then(res=>{
         // commit('update',res.data.data) 实际开发
         let data = res.data.data
         data.id = instance.id
         data.isDefault = instance.isDefault
         commit('update',data)
        })
      } ,
      setDefaultAction({commit},id){
        Address.setDefault(id).then(res=>{
          commit('setDefault',id)
        })
      }
    }
})
export default store