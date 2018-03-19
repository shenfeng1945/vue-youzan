<template>
  <div class="todoapp">
      <header>
        <h1>todos</h1>
        <input type="text" 
               class="new-todo" 
               placeholder="What needs to be done?"
               @keyup.enter="addTodo()"
               v-model="val">
        <svg :class="{gray:!allChecked,hide:!filterList.length}" @click="selectAll({isSelected:!allChecked})"><use xlink:href="#icon-down1"></use></svg>
      </header>
      <section>
          <ul class="todoList">
             <todo v-for="(list,index) in filterList" :key="index" :index="index" :list="list"></todo> 
          </ul>
      </section>
      <footer v-show="lists.length!==0">
         <span class="left">{{left}} {{left | number}} left</span>
         <ul>
             <li v-for="(val,key) in filters" :key="key"><a :class="{active:visibility===key}" @click="visibility=key" href="javascript:;">{{key|capitalize}}</a></li>
         </ul>
         <span class="clearAll" v-show="haveCompleted" @click="clearCompleted">Clear completed</span>
      </footer>
  </div>
</template>
<script>
    import Todo from './Todo'
    import {mapState,mapActions,mapMutations} from 'vuex'
    const filters = {
        all:lists=>lists,
        active:lists=>lists.filter(list=>list.isSelected===false),
        completed:lists=>lists.filter(list=>list.isSelected===true)
    }
    export default {
        data(){
            return {
              val:'',
              mode:0,
              filters:filters,
              visibility:'all'
            }
        },
        computed:{
          haveCompleted(){
             return this.lists.some(item=>{
                  return item.isSelected === true
              })
          },
           left(){
               return this.lists.filter(item=>{
                   return item.isSelected === false
               }).length
           },
           ...mapState(['control']),
           lists(){
               return this.$store.state.lists
           },
           filterList(){
               return filters[this.visibility](this.lists)
           },
           allChecked(){
               return this.filterList.every(item=>{
                   item.isSelected === true
               })
           }
        },
        methods:{
            ...mapActions(['addAction','inputAction']),
            ...mapMutations(['clearCompleted']),
            addTodo(){
              this.$store.dispatch('addAction',this.val)
              this.val = ''
            },
            triggle(index){
              this.control.forEach(item=>{
                  item.click = false
              })
              this.control[index].click = true
              this.mode = index
            //   this.$store.dispatch('triggleAction',index)
            },
            selectAll({isSelected}){
                console.log(isSelected)
            //   let lists = this.filters[this.visibility](this.lists)
            //   let isAll = lists.some(item=>{
            //       item.isSelected === false
            //   })
            //    lists.forEach(item=>{
            //        item.isSelected = isAll?true:false
            //    })

            }
        },
        filters:{
           number(val){
               return val===1?'item':'items'
           },
           capitalize(val){
               return val.charAt(0).toUpperCase()+val.slice(1)
           }
        },
        components:{Todo}
    }
</script>
<style scoped>
  .todoapp{
      background:#f5f5f5;
      height:100%;
      padding:130px 0 40px 0;
      width:550px;
      margin:0 auto;
  } 
  h1{
    font-size:50px;
  }
  header{
      text-align: center;
      position: relative;
  }
  header .new-todo{
    padding: 16px 16px 16px 60px;
    border: none;
    background:#fff;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    font-size:24px;
    width: 100%;
  }
  .todoList{background:#fff;}
  
  footer{
      display: flex;
      background:#fff;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e6e6e6;
      position: relative;
  }
  footer .left{
      position: absolute;
      left:15px;
  }
  footer .clearAll{
      position: absolute;
      right:15px;
      cursor: pointer;
  }
  footer ul{
      display: flex;
      justify-content: space-between;
  }
  footer ul li{
      margin:0 2px;
  }
  footer ul li a{
      padding:5px;
      display: block;
  }
  footer ul li a.active{
    border:1px solid rgba(175, 47, 47, 0.2);
  }
  svg{
      width:24px;
      height:24px;
      position: absolute;
      left:10px;bottom:18px;
      fill:#737373;
  }
  svg.gray{
      fill:#e6e6e6;
  }
  svg.hide{
      display: none;
  }
</style>

