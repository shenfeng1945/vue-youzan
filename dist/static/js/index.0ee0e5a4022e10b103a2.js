webpackJsonp([3],{0:function(t,e,s){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topLists:"/category/topList",rankLists:"/category/rank",subLists:"/category/subList",searchLists:"/search/list",details:"/goods/details",dealList:"/goods/deal",addCart:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mremove",update:"/cart/update",addressList:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdate:"/address/update",addressSetDefault:"/address/setDefault"};for(var n in a)a.hasOwnProperty(n)&&(a[n]="http://rapapi.org/mockjsdata/24170"+a[n]);e.a=a},11:function(t,e){},119:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(21),n=(s.n(a),s(28)),i=s.n(n),r=s(13),o=(s.n(r),s(91)),c=(s.n(o),s(1)),l=s(4),d=s.n(l),u=s(0),p=s(8),f=s.n(p),g=s(22),v=s.n(g);c.default.use(i.a),new c.default({el:"#app",data:{lists:null,pageNum:1,loading:!1,allLoaded:!1,pageSize:6,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.loading=!0,d.a.post(u.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){if(!t.allLoaded){var s=e.data.lists;s.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(s):t.lists=s,t.loading=!1,t.pageNum++}})},getBanner:function(){var t=this;d.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{Foot:f.a,Swipe:v.a}})},12:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bottom-nav"},[s("ul",t._l(t.lists,function(e,a){return s("li",{key:a,class:{active:t.index1==a}},[s("a",{attrs:{href:e.url}},[s("i",{class:e.icon}),s("div",[t._v(t._s(e.title))])])])}))])},staticRenderFns:[]}},13:function(t,e){},21:function(t,e){},22:function(t,e,s){function a(t){s(44)}var n=s(2)(s(32),s(45),a,null,null);t.exports=n.exports},32:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(74),n=s(43);s.n(n);e.default={name:"swipe",props:{lists:Array},created:function(){},mounted:function(){new a.a(".swiper-container",{pagination:{el:".swiper-pagination"},autoplay:{delay:5e3},loop:!0})},watch:{}}},43:function(t,e){},44:function(t,e){},45:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swiper-container"},[s("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t,e){return s("div",{key:e,staticClass:"swp-page swiper-slide"},[s("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[s("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),t._v(" "),s("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},8:function(t,e,s){function a(t){s(11)}var n=s(2)(s(9),s(12),a,null,null);t.exports=n.exports},9:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=[{url:"index.html",title:"有赞",icon:"icon-home"},{url:"category.html",title:"分类",icon:"icon-category"},{url:"cart.html",title:"购物车",icon:"icon-cart"},{url:"member.html",title:"我",icon:"icon-user"}];e.default={props:["index1"],data:function(){return{lists:a}}}},91:function(t,e){}},[119]);
//# sourceMappingURL=index.0ee0e5a4022e10b103a2.js.map