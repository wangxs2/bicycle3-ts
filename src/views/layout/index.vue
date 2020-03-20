<template>
  <div class="layout">
    <div class="header">
      <weather></weather>
      <realTime></realTime>
    </div>
    <div class="content">
      <div class="left">
        <left-box></left-box>
      </div>
      <div class="center">
        <center-box></center-box>
      </div>
      <div class="right">
        <right-box></right-box>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import leftBox from "./components/left/index.vue";
import weather from "@/component/Weather/index.vue";
import realTime from "@/component/RealTime/index.vue";
import centerBox from "./components/center/index.vue";
import rightBox from "./components/right/index.vue";
@Component({
  components: {
    leftBox,
    centerBox,
    rightBox,
    realTime,
    weather
  }
})
export default class layout extends Vue {
  private msg: string = "我是一个小花";
}
</script>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #04194b;
  .header {
    width: 100%;
    @include vh2(height, 51.143);
    background: url("../../assets/image/header.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    @include vw2(padding-left, 11.43);
    @include vw2(padding-right, 11.43);
  }
  .content {
    flex: 1;
    box-sizing: border-box;
    @include vw2(padding-left, 11.43);
    @include vw2(padding-right, 11.43);
    @include vh2(padding-top, 7.143);
    @include vh2(padding-bottom, 13.143);
    display: flex;
    justify-content: space-between;
    .left {
      @include vw2(width, 571.43);
      height: 100%;
    }
    .center {
      height: 100%;
      @include vw2(width, 731.43);
    }
    .right {
      flex: 1;
    }
  }
}
</style>
