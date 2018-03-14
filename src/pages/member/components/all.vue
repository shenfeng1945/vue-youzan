<template>
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"  
         style="padding-left:40px;"
         @click="toEdit(list)"
         v-for="list in lists"
         :key="list.id"
         :class="{'address-item-default':list.isDefault}"
         v-if="lists&&lists.length">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
          :to="{name:'form',params:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>

<script>
    // import Address from 'js/addressService.js'
    export default {
        // data(){
        //     return {
        //         lists:null
        //     }
        // },
        created(){
            if(!this.lists){
              this.getLists()
            }
        },
        computed:{
          lists(){
              return this.$store.state.lists
          }
        },
        methods:{
            toEdit(list){
                // 所有子组件都可以拿到这个注入。编程式导航，通过事件绑定。
                this.$router.push({name:'form',params:{
                    type:'edit',
                    instance:list
                }})
            },
            getLists(){
                // Address.list().then(res=>{
                //     this.lists = res.data.lists
                // })
                this.$store.dispatch('getLists')
            }
        }
    }
</script>