<template>
  <div class="layout">
    <!-- 弹框 -->
    <el-dialog
      custom-class="rightrole"
      :visible.sync="isshowimg">
      <div class="bigimg">
          <img class="myimg" src="../../assets/image/bjroles.png">
      </div>
    </el-dialog>
    <!-- 弹框 -->
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
  private isshowimg: boolean = false;
  
  public mounted() {
  }
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
    height: vh(51);
    background: url("../../assets/image/header.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 vw(11.43);
  }
  .content {
    flex: 1;
    box-sizing: border-box;
    padding: vh(7.143) vw(11.43) vh(13.143) vw(11.43);
    display: flex;
    justify-content: space-between;
    .left {
      
      height: 100%;
      @include vw2(width,571.43);
      // background: url("../../assets/image/left.png") no-repeat;
      background-size: 100% 100%;
    }
    .center {
      height: 100%;
      @include vw2(width, 731.43);
      @include vw2(margin-left, 11.43);
      @include vw2(margin-right, 11.43);
    }
    .right {
      flex: 1;
      width: vw(571.4);
      // background: url("../../assets/image/right.png") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
