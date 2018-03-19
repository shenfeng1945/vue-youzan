<template>
  <li>
    <div class="view">
      <input type="checkbox" 
             :checked="list.isSelected"
             @change="toggle({list})">
      <label :class="{completed:list.isSelected}" @dblclick="editing=true">{{list.content}}</label>
      <button @click="remove(index)" class="remove">X</button>
    </div>
    <input type="text" class="edit" v-show="editing" v-model="list.content" @blur="doneEdit(index,$event)">
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      editing: false
    };
  },
  computed: {
    ...mapState(["lists"])
  },
  props: ["index", "list"],
  methods: {
    remove(index) {
      this.$store.dispatch("removeAction", index);
    },
    ...mapActions(["selectAction"]),
    toggle({list}) {
      this.$store.dispatch("selectAction", {list});
    },
    doneEdit(index,e){
      let val = e.target.value.trim()
      if(!val){
         this.$store.dispatch("removeAction", index);
         this.editing = false
      }else{
        this.editing = false
      }
    }
  }
};
</script>
<style scoped>
li {
  display: flex;
  align-items: center;
  padding: 5px;
  position: relative;
}
li label {
  word-break: break-all;
  padding: 5px;
}
li .completed {
  text-decoration: line-through;
  color: #666;
}
li .view{
  width:100%;
}
li .remove {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translate(-50%, -50%);
}
li .edit{
  position: absolute;
  left:20px;
  right:0;
  width:90%;
  height:100%;
}
</style>
