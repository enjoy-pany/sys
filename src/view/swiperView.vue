<template>
  <div>
    <h2>Hello, this is swiper review</h2>
    <swiper :options="swiperOption" ref="mySwiper">
     <!-- slides -->
     <swiper-slide class="slide-styl">I'm Slide 1</swiper-slide>
     <swiper-slide class="slide-styl">I'm Slide 2</swiper-slide>
     <swiper-slide class="slide-styl">I'm Slide 3</swiper-slide>
     <!-- Optional controls -->
     <div class="swiper-pagination"  slot="pagination"></div>
     <div class="swiper-button-prev" slot="button-prev"></div>
     <div class="swiper-button-next" slot="button-next"></div>
     <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
// import Swiper from '../components/Swiper'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
 name: 'carrousel',
 data() {
   return {
     swiperOption: {
       notNextTick: true,
       // swiper configs 所有的配置同swiper官方api配置
       autoplay: 3000,
       // direction : 'vertical',
       effect:"coverflow",
       grabCursor : true,
       setWrapperSize :true,
       // autoHeight: true,
       // paginationType:"bullets",
       pagination : '.swiper-pagination',
       paginationClickable :true,
       prevButton:'.swiper-button-prev',
       nextButton:'.swiper-button-next',
       // scrollbar:'.swiper-scrollbar',
       //mousewheelControl : true,
       observeParents:true,
       // if you need use plugins in the swiper, you can config in here like this
       // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
       // debugger: true,
       // swiper callbacks
       // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
       // onTransitionStart(swiper){
       //   console.log(swiper)
       // },
       // more Swiper configs and callbacks...
       // ...
     }
   }
 },
 components: {
 swiper,
 swiperSlide
},
 // you can find current swiper instance object like this, while the notNextTick property value must be true
 // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
 computed: {
   swiper() {
     return this.$refs.mySwiper.swiper
   }
 },
 mounted() {
   // you can use current swiper instance object to do something(swiper methods)
   // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
   // console.log('this is current swiper instance object', this.swiper)
   // this.swiper.slideTo(3, 1000, false)
    console.log('mounted');
 }
}
</script>

<style lang="less" scoped>
  h2 {
    text-align: center;
  }
   html,body {
    position: relative;
    height: 100%;
  }
  body {
    background: #eee;
  }
  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .slide-styl{
    height: 200px;
    background: #f1f1f1;
  }
</style>
