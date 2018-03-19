import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  lists:[],
  control:[{name:'all',click:true},{name:'active',click:false},{name:'complete',click:false}]
}
const mutations = {
    add(state,val){
      if(val===''){return}
      state.lists.push({
           content:val,
           isSelected:false
      }) 
    },
    remove(state,index){
        state.lists.splice(index,1)
    },
    selected(state,{list}){
        list.isSelected = !list.isSelected
    },
    triggle(state,index){
        if(index===0){

        }
        if(index===1){
          state.lists = state.lists.filter(item=>{
              return item.isSelected === false
          })
        }
        if(index===2){
          state.lists = state.lists.filter(item=>{
              return item.isSelected === true
          })
        }
    },
    clearCompleted(state){
        state.lists = state.lists.filter(item=>!item.isSelected)
    }
}
const actions = {
    addAction({commit},val){
        commit('add',val)
    },
    removeAction({commit},index){
        commit('remove',index)
    },
    selectAction({commit},{list}){
        commit('selected',{list})
    },
    triggleAction({commit},index){
        commit('triggle',index)
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})