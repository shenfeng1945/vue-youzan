<template>
  <div class="todoapp">
      <header>
        <h1>todos</h1>
        <input type="text" 
               class="new-todo" 
               placeholder="What needs to be done?"
               @keyup.enter="addTodo()"
               v-model="val">
      </header>
      <section>
          <ul class="todoList">
              <li v-for="(list,index) in lists" :key="index">
                  <input type="checkbox" v-model="list.isSelected">
                  <label :class="{completed:list.isSelected}">{{list.content}}</label>
                  <button @click="removeTodo(index)" class="remove">X</button>
              </li>
          </ul>
      </section>
      <footer v-show="lists.length!==0">
         <span class="left">{{left}} {{left | number}} left</span>
         <ul>
             <li><a class="active" href="">All</a></li>
             <li><a href="">Active</a></li>
             <li><a href="">Complete</a></li>
         </ul>
         <span class="clearAll" v-show="haveCompleted">Clear completed</span>
      </footer>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                lists:[],
                val:'',
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
           }
        },
        methods:{
            addTodo(){
              if(this.val.trim()===''){return}
              this.lists.push({
                 content:this.val.trim(),
                 isSelected:false
              })
              this.val = ''
            },
            removeTodo(index){
              this.lists.splice(index,1)
            }
        },
        filters:{
           number(val){
               return val===1?'item':'items'
           }
        }
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
  .todoList li{display: flex;align-items: center;padding:5px;position: relative;}
  .todoList li label{
      word-break: break-all;
      padding:5px;
  }
  .todoList li .completed{
      text-decoration:line-through;
      color:#666;
  }
  .todoList li .remove{
      position: absolute;
      right:10px;top:50%;
      transform: translate(-50%,-50%);
  }
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
</style>

