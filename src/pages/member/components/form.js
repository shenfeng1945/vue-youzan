import Address from 'js/addressService.js'
import {mapState} from 'vuex'
export default {
    data(){
        return {
           name:'',
           tel:'',
           provinceValue:-1,
           cityValue:-1,
           districtValue:-1,
           address:'',
           id:'',
           type:'',
           instance:'',
           isDefault:false,
           addressData:require('js/address.json'),
           cityLists:null,
           districtLists:null,
           removeSuccess:false
        }
    },
    // computed:{
    //   lists(){
    //       return this.$store.state.lists
    //   }
    // },
    // computed:mapState['lists'],
    computed:{
        ...mapState({
            lists:state => state.lists
        })
    },
    created(){
       let params = this.$route.params
       this.type = params.type
       let instance = params.instance
       this.instance = params.instance
       if(this.type==='edit'){
           this.name = instance.name
           this.tel = instance.tel
           this.address = instance.address
           this.id = instance.id
           this.provinceValue = parseInt(instance.provinceValue)
           this.isDefault = instance.isDefault
       }
    },
    watch:{
       lists:{
           handler(){
             this.$router.go(-1)
           },
           //深度监听
           deep:true
       },
       provinceValue(val){
         if(val===-1){return}
         let lists = this.addressData.list
         let index = lists.findIndex(item=>{
             return item.value === val
         })
         this.cityLists = lists[index].children
         this.cityValue = -1
         this.districtValue = -1
         if(this.type==='edit'){
             this.cityValue = parseInt(this.instance.cityValue)
         }
         
       },
       cityValue(val){
         if(val===-1){return}
         let lists = this.cityLists
         let index = lists.findIndex(item=>{
             return item.value === val
         })
         if(lists[index]){
           this.districtLists = lists[index].children
         }
         this.districtValue = -1
         if(this.type==='edit'){
             this.districtValue = parseInt(this.instance.districtValue)
         }
       }
    },
    methods:{
      add(){
       //需要做非空和合法性校样
       let {name,tel,provinceValue,cityValue,districtValue,address,id} = this
       let data = {name,tel,provinceValue,cityValue,districtValue,address}
       if(this.type==='add'){
        //   Address.add(data).then(res=>{
        //       this.$router.go(-1)
        //   })
          this.$store.dispatch('addAction',data)
       }
       if(this.type==='edit'){
         data.id = id
         data.isDefault = this.isDefault
        //  Address.update(data).then(res=>{
        //     this.$router.go(-1)
        //  }) 
         this.$store.dispatch('updateAction',data)
       }
      },
      remove(){
          if(window.confirm('确认删除吗')){
            // Address.remove(this.id).then(res=>{
            //   this.removeSuccess = true
            //   setTimeout(()=>{
            //     this.removeSuccess = false
            //     this.$router.go(-1) 
            //   },500)
            // })
            this.$store.dispatch('removeAction',this.id)
          }
      },
      setDefault(){
        //  Address.setDefault(this.id).then(res=>{
        //     this.$router.go(-1) 
        //  })
        this.$store.dispatch('setDefaultAction',this.id)
      }
    }
}