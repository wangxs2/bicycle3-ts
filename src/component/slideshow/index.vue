<template>
  <!-- 轮播图 -->
  <div class="slider-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>

      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"
           v-if="isShowPagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"
           v-if="isShowNavigation"></div>
      <div class="swiper-button-next"
           v-if="isShowNavigation"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

@Component
export default class Slideshow extends Vue {
  private swiperNode: any = {}; // swiper对象
  private isShowPagination: boolean = false; // 是否显示分页器
  private isShowNavigation: boolean = false; // 是否显示导航按钮

  @Prop()
  private parendClassName!: string; // 父元素的类名

  @Prop()
  private options!: any; // 配置项

  // @Watch("options")
  // onchanged(val: any, old: any) {
  //   if (Object.keys(val).length !== 0) {
  //     this.initSwiper();
  //   }
  // }

  public beforeDestroy() {
    if (this.swiperNode) {
      this.swiperNode.destroy();
      this.swiperNode = null;
    }
  }

  public created() {
    if (this.options.pagination && this.options.$isPage) {
      this.isShowPagination = true;
    }
    if (this.options.navigation && this.options.$isNav) {
      this.isShowNavigation = true;
    }
  }

  public mounted() {
    this.initSwiper();
  }

  public initSwiper(): void {
    this.swiperNode = new Swiper(
      `.${this.parendClassName} .swiper-container`,
      this.options,
    );
  }
}
</script>

<style lang="scss" scoped>
.slider-box {
  width: 100%;
  height: 100%;

  .swiper-container {
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
    }
    .swiper-button-prev,
    .swiper-button-next {
      width: vw(10);
      height: vw(10);
      background-position: center;
      background-size: vw(10) vw(10);
      background-color: rgba(176, 196, 222, 0.6);
      border-radius: vw(3);
    }
  }
}
</style>
