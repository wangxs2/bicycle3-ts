<template>
  <div class="right-top">
    <borderBlock :msg="msgconcat1"></borderBlock>
    <div class="roles">
      <div class="rloes-box1">
        <div class="left-role">
          <img src="" alt="" srcset="">
          <span class="glabfont rolefont">投放报警</span>
        </div>
        <img src="" alt="" srcset="">
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img src="" alt="" srcset="">
          <span class="glabfont rolefont">区域预警</span>
        </div>
        <img src="" alt="" srcset="">
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img src="" alt="" srcset="">
          <span class="glabfont rolefont">违规停放</span>
        </div>
        <img src="" alt="" srcset="">
      </div>
    </div>
    <div class="roles cumulative">
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">累计发现</span>
        <span class="ljnum glabfont">22起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">累计发现</span>
        <span class="ljnum glabfont">3起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">累计发现</span>
        <span class="ljnum glabfont">2起</span>
      </div>
    </div>
    <div class="roles cumulative">
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">今日发现</span>
        <span class="ljnum glabfont">22起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">今日发现</span>
        <span class="ljnum glabfont">3起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">今日发现</span>
        <span class="ljnum glabfont">2起</span>
      </div>
    </div>
    <div class="cumulative">
      <div class="cumulativebox">
        <img src="">
        <div class="yujing">
          <span class="yujingfont glabfont">2020-03-07 17:51:30</span>
          <span style="margin-top:0.5vh" class="yujingfont glabfont">哈罗 连续5天每天增量200辆以上</span>
        </div>
      </div>
      <div class=" cumulativebox">
        <img src="">
        <div class="yujing">
          <span class="yujingfont glabfont">2020-03-07 17:51:12</span>
          <span style="margin-top:0.5vh" class="yujingfont glabfont">潍坊新村街道 上限预警</span>
        </div>
      </div>
      <div class="cumulativebox">
        <img src="">
        <div class="yujing">
          <span class="yujingfont glabfont">2020-03-07 08:00:00</span>
          <span style="margin-top:0.5vh" class="yujingfont glabfont">陆家嘴环路禁区  禁停区违停</span>
        </div>
      </div>
      
    </div>
    <div class="toplast">
      <borderBlock :msg="msgvide1"></borderBlock>
    </div>
    <div class="echartbox">
        <div class="echart1">
          <div class="echartone" id="town"></div>
        </div>
        <div class="right-list">
          <span class="gont1 glabfont">昨日街道派单排名</span>
          <img src="../../../../../assets/image/paiming.png">
          <div>
            <span class="gont2 glabfont">花木</span>
            <span class="gont2 glabfont">陆家嘴</span>
            <span class="gont2 glabfont">潍坊新村</span>
          </div>
        </div>
    </div>
    
   
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import borderBlock from '@/component/borderBlock/index.vue';
import Echart from './myEchart';
let MyEchart1: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
  },
})
export default class rightTop extends Vue {
  private towndata: any = 
  {
    el:"town",
    x:["陆家嘴","潍坊新村","塘桥","金桥","曹路镇","花木","金杨新村"],

  };
  private msgconcat1: string = "智能发现";
  private msgvide1: string = "街道派单TOP10 (累计历史七天)";
  
  public mounted() {
    MyEchart1 = new Echart();
    MyEchart1.echartsOption(this.towndata);
   
  }

}


</script>
<style scoped lang="scss">
.right-top{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: vh(8) vw(8);
    .roles{
      display:flex;
      justify-content: space-between;
      margin-top:vh(7.7);
      .rloes-box1{
        display:flex;
        justify-content: space-between;
        width:vw(171.4);
        height:vh(19.4);
        background:rgba(12,58,111,0.8);
        align-items: center;
        .left-role{
          display:flex;
          justify-content: flex-start;
          .rolefont{
            color:#65C6FC;
            font-size:vw(10);
          }
        }
      }
    }
    .cumulative{
      display:flex;
      justify-content: space-between;
      margin-top:vh(5);
      align-items: center;
      .cumulativebox{
        background:transparent;
        display:flex;
        justify-content:flex-start;
        align-items: center;
        img{
          width:vw(23);
          height:vh(21);
          margin-right:vw(4);
        }
        .ljnum{
          font-size:vw(10);
          color:#65C6FC;
        }
        .yujing{
          display: flex;
          flex-direction: column;
          .yujingfont{
            font-style:italic;
            font-size:vw(10);
            color:rgba(254,254,254,1);
            text-align:left;
          }
        }
      }
    }
    .toplast{
      margin-top:vh(18);
    }
    .echartbox{
      display:flex;
      justify-content: space-between;
      flex:1;
      .echart1{
        width:70%;
        height:100%;
         .echartone{
           width:100%;
           height:100%;
         }
      }
      .right-list{
        flex:1;
        border:1px solid red;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        span{
          color:#ffffff;
        }
        img{
          width: vw(100);
          height: vh(50);
          margin:vh(5) 0;
        }
        .gont1{
          font-size: vw(11);
        }
        .gont2{
          font-size: vw(10);
        }
      }
      // margin-top:vh(18);
    }
  }
</style>
