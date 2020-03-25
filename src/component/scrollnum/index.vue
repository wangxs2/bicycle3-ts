<template>
  <div class="scrollnum">
    <div class="scrollbox">
      <div class="scrolltext">
        <div class="gundong"
             v-for="(iteam,index) in datanum"
             :key="index">
          <ul :class="iteam==0?'anmationgun':iteam==1?'anmationgun1':iteam==2?'anmationgun2':iteam==3?'anmationgun3':iteam==4?'anmationgun4':iteam==5?'anmationgun5':iteam==6?'anmationgun6':iteam==7?'anmationgun7':iteam==8?'anmationgun8':'anmationgun9'">
            <li><span class="glabfont">0</span></li>
            <li><span class="glabfont">1</span></li>
            <li><span class="glabfont">2</span></li>
            <li><span class="glabfont">3</span></li>
            <li><span class="glabfont">4</span></li>
            <li><span class="glabfont">5</span></li>
            <li><span class="glabfont">6</span></li>
            <li><span class="glabfont">7</span></li>
            <li><span class="glabfont">8</span></li>
            <li><span class="glabfont">9</span></li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class scrollnum extends Vue{

  @Prop()
  private datanum!: any; // 父元素的值
  public created() {
  }
  
}
</script>
<style lang="scss" scoped>
$sumnum: 10s;
.scrollnum {
  // width: 100%;
  // height: 100%;
  overflow: hidden;
  .scrollbox {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // padding-top: vh(30);
    .scrolltext {
      // width: vw(202);
      // height: vh(90);
      // background: url("../../assets/image/one/bj_6_1@3x.png");
      // background-size: 100% 100%;
      // margin-top: vh(8);
      display: flex;
      justify-content: center;
      align-items: center;
      .gundong {
        width: vw(17);
        height: vh(23);
        border:vh(1) solid #1A4483;
        // border-image:linear-gradient(0deg, rgba(36,196,255,1), rgba(0,87,194,1)) 10 10;
        font-size: vw(18);
        text-align: center;
        // line-height: vh(78);
        color: #FF5D4E;
        overflow: hidden;
        margin-left: vw(4);
        ul {
          list-style-type: none;
          padding: 0px;
          margin: 0px;
          li {
            height: vh(23);
            line-height: vh(23);
          }
        }
        .anmationgun {
          margin-top: vh(0);
          animation: mynumb_0 $sumnum infinite;
          @keyframes mynumb_0 {
            0%,
            90% {
              margin-top: 0;
              margin-top: vh(0);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(0);
            }
          }
        }
        .anmationgun1 {
          margin-top: vh(-23);
          animation: mynumb_1 $sumnum infinite;
          @keyframes mynumb_1 {
            0%,
            90% {
              margin-top: 0;
              margin-top: vh(-23);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-23);
            }
          }
        }
        .anmationgun2 {
          margin-top: vh(-46);
          animation: mynumb_2 $sumnum infinite;
          @keyframes mynumb_2 {
            0%,
            90% {
              margin-top: vh(-46);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-46);
            }
          }
        }
        .anmationgun3 {
          margin-top: vh(-69);
          animation: mynumb_3 $sumnum infinite;
          @keyframes mynumb_3 {
            0%,
            90% {
              margin-top: vh(-69);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-69);
            }
          }
        }
        .anmationgun4 {
          margin-top: vh(-92);
          animation: mynumb_4 $sumnum infinite;
          @keyframes mynumb_4 {
            0%,
            90% {
              margin-top: vh(-92);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-92);
            }
          }
        }
        .anmationgun5 {
          margin-top: vh(-115);
          animation: mynumb_5 $sumnum infinite;
          @keyframes mynumb_5 {
            0%,
            90% {
              margin-top: vh(-115);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-115);
            }
          }
        }
        .anmationgun6 {
          margin-top: vh(-138);
          animation: mynumb_6 $sumnum infinite;
          @keyframes mynumb_6 {
            0%,
            90% {
              margin-top: vh(-138);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-138);
            }
          }
        }
        .anmationgun7 {
          margin-top: vh(-161);
          animation: mynumb_7 $sumnum infinite;
          @keyframes mynumb_7 {
            0%,
            90% {
              margin-top: vh(-161);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-161);
            }
          }
        }
        .anmationgun8 {
          margin-top: vh(-184);
          animation: mynumb_8 $sumnum infinite;
          @keyframes mynumb_8 {
            0%,
            90% {
              margin-top: vh(-184);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-184);
            }
          }
        }
        .anmationgun9 {
          margin-top: vh(-207);
          animation: mynumb_9 $sumnum infinite;
          @keyframes mynumb_9 {
            0%,
            90% {
              margin-top: vh(-207);
            }
            91% {
              margin-top: 0;
            }
            100% {
              margin-top: vh(-207);
            }
          }
        }
      }
    }
    .text-top {
      font-size: vw(17);
      color: #29e9ff;
    }
  }
}
</style>
