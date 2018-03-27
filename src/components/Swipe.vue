<template>
   <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swp-page swiper-slide" v-for="(list,index) in lists" :key="index">
          <a class="js-no-follow" :href="list.clickUrl">
            <img class="goods-main-photo fadeIn" :src="list.image">
          </a>
        </div>
      </div>
      <div class="swiper-pagination" style="text-align:center;"></div>
    </div>
</template>
<script>
//轮播组件只负责功能性和展示，不用数据。
//xxx.vue默认变成vue的实例，相当于也是个options
//swiper对dom节点进行操作的，dom节点什么时候生成呢？mounted
//如果lists是个字符串数组，这个组件处理不了，得预先处理，即该组件只接受统一的格式。
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "swipe",
  props: {
    //动态绑定
    lists: Array
  },
  created() {
    //  console.log('created',document.querySelector('.swiper-slide'))
  },
  mounted() {
    //  console.log('mounted',document.querySelector('.swiper-slide'))
    var mySwiper = new Swiper(".swiper-container", {
      // Optional parameters
      pagination:{el:'.swiper-pagination'},
      autoplay:{delay:5000},
      loop: true,
    });
  },
  watch: {
    // lists(val,oldVal){
    //     console.log('before nextTick',document.querySelector('.swiper-slide'))
    //     this.$nextTick(()=>{
    //        console.log('after nextTick',document.querySelector('.swiper-slide'))
    //     })
    // }
  }
};
</script>
<style>

</style>

