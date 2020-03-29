<template>
  <div class="rank-block">
    <div class="block-centent">
      <transition-group name="custom-classes-transition"
                        tag="div"
                        enter-active-class="bounce-my-enter"
                        leave-active-class="bounce-my-leave">
        <div class="rank-item"
             v-for="item in ranking"
             :key="item.id">
          <span class="glabfont">{{item.discoverTime}}</span>
           <span style="margin-top:0.3vh" class="shenglue glabfont">{{item.detail}} {{item.name}}</span>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { arrGroup } from '@/libs/util.ts';
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

interface PropData {
  percentage: string;
  index: number;
  name: string;
  describe: string;
  [propName: string]: any;
}

@Component({})
export default class RankBlock extends Vue {
  @Prop()
  private rankData!: PropData[]; // 原始数据

  @Prop()
  private fontColor!: string; // 颜色

  @Prop()
  private gradientRamp!: string[]; // 渐变色

  // 分组数据
  private groupData: any[] = [];

  // 当前数据
  private ranking: any[] = [];

  private TimeNum: number | null = null;
  private TimeSubNum: number | null = null;

  @Watch('rankData')
  public onchanged(val: any[], oldVal: any[]) {
    if (val.length) {
      if (this.TimeNum) {
        clearTimeout(this.TimeNum);
        this.TimeNum = null;
      }

      if (this.TimeSubNum) {
        clearTimeout(this.TimeSubNum);
        this.TimeSubNum = null;
      }

      this.groupData = arrGroup(this.rankData, 1);
      this.rankAnimation(0);
    }
  }

  // 排行的动画
  public rankAnimation(index: number) {
    if (this.TimeNum) {
      clearTimeout(this.TimeNum);
      this.TimeNum = null;
    }

    // 每组中的数据切换
    const animationItem = (id: number) => {
      if (this.TimeSubNum) {
        clearTimeout(this.TimeSubNum);
        this.TimeSubNum = null;
      }

      this.$set(this.ranking, id, this.groupData[index][id]);

      this.TimeSubNum = setTimeout(() => {
        if (id < this.groupData[index].length - 1) {
            animationItem(++id);
        }
      }, 1200);
    };

    animationItem(0);

    // 每组切换
    this.TimeNum = setTimeout(() => {
      index = index < this.groupData.length - 1 ? index + 1 : 0;
      this.rankAnimation(index);
    }, 10000);
  }
}
</script>

<style lang="scss" scoped>
.rank-block {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .block-centent {
    width: 100%;
  height: 100%;
    position: relative;
    .rank-item {
      width: 100%;
      // margin-top: vh(7);
      height:vh(23);
      // background:linear-gradient(to right, rgba(18,85,154,0) 0%, rgba(18,85,154,0.7) 100%);
      display: flex;
      flex-direction: column;
      align-items:flex-start;
      justify-content:flex-start;
      box-sizing:border-box;
      .shenglue{
        width:vw(125);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        text-align:left;
      }
      span{
         font-size:vw(10);
         color:rgba(218,240,255,1);
         font-style:italic;
       }
    }
  }

  .bounce-my-enter {
    backface-visibility: visible;
    animation: myflip 1s;
  }
  @keyframes myflip {
    from {
      transform: rotate3d(1, 0, 0, 360deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    40% {
      transform: rotate3d(1, 0, 0, 190deg);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    50% {
      transform: rotate3d(1, 0, 0, 170deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    80% {
      transform: rotate3d(1, 0, 0, 0deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    to {
      transform: rotate3d(1, 0, 0, 0deg);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
  }
  .list-complete-enter,
  .list-complete-leave-to {
    opacity: 0;
  }
  .list-complete-leave-active {
    position: absolute;
    opacity: 0;
  }
  .bounce-my-leave {
    position: absolute;
  }
}
</style>
