<template>
  <div class="right-bottom">
    <!-- 弹框 -->
    <div class="myimg" v-if="isshowimg">
      <img class="rolesimg1" src="../../../../../assets/image/role2.png">
      <div class="info-close iconfont iconguanbi" @click="isshowimg=false"></div>
    </div>

    <!-- 弹框 -->
    
    <div class="header-top">
      <borderBlock :msg="msgconcat1"></borderBlock>
      <div class="pfroles" @click="isshowimg=true"><span class="glabfont">评分规则</span></div>
    </div>
    
    <div class="echartbox">
        <div class="echart1">
          <div class="echartone" id="company"></div>
        </div>
        <div class="right-list">
          <span class="gont1 glabfont">企业工单处置昨日得分</span>
          <div class="fractionBox">
            <div class="imgfraction1">
              <waterPond :score="score1" :imgBg="imgBg1" :borderColor="borderColor1"></waterPond>
              <!-- <span class="fonsinum1 glabfont">52</span>
              <span class="fonsinum2 glabfont">分</span> -->
            </div>
            <div class="imgfraction1">
              <waterPond :score="score2" :imgBg="imgBg2" :borderColor="borderColor2"></waterPond>
              <!-- <span class="fonsinum1 glabfont">48</span>
              <span class="fonsinum2 glabfont">分</span> -->
            </div>
          </div>
          <div class="numde">
            <span class="gont2 glabfont">摩拜</span>
            <span class="gont2 glabfont">哈啰</span>
          </div>
        </div>
    </div>
    <borderBlock :msg="msgvide1"></borderBlock>
    <div class="tableboxwork">
      <div class="left-ech" id="echLef"></div>
      <div style="width:30%">
        <div class="fv glabfont">投诉企业百分比</div>
        <div class="workOrderBox">
          <div class="workOrderBox-item">
            <div class="echart-content"
                id="disContainer1"></div>
            <div class="name-text glabfont" style="color:#FF8434">摩拜:129</div>
          </div>
          <div class="workOrderBox-item">
            <div class="echart-content"
                id="disContainer2"></div>
            <div class="name-text glabfont" style="color:#29B2EE">哈啰:71</div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import borderBlock from '@/component/borderBlock/index.vue';
import waterPond from '@/component/waterLevelPond/index.vue';
// import echartsLiquidfill from 'echarts-liquidfill'
import echarts from 'echarts';
import Echart2 from './myEchart1';
import Echartsa from './myEcharts';
let MyEchart3: any = null; // 自定义echarts
let MyEchart4: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    waterPond
  },
})
export default class rightTop extends Vue {
  private companydata: any = 
  {
    el:"company",
    x:["03-04","03-05","03-06","03-07","03-08","03-09","03-10"],
    data1:[50, 58, 49, 50, 54, 49, 47],
    data2:[42, 49, 52, 47, 49, 46, 49],

  };
  private rihtBoxData: any = 
  {
     el: "disContainer1",
      value: 65.5,
      name: "1",
      unVal: 34.5,
      color: ['#F25B4A', '#4F505D'],

  };
  private rihtBoxData1: any = 
  {
     el: "disContainer2",
      value: 34.5,
      name: "1",
      unVal: 65.5,
      color: ['#70A7E0', '#4F505D'],

  };
  private score1: number=0;
  private score2: number=0;
  private msgconcat1: string = "企业工单处置得分 (历史7天)";
  private isshowimg: boolean =false;
  private isshowimg1: boolean =false;
  private msgvide1: string = "市民热线投诉统计";
  private imgBg1:any=null;
  private imgBg2:any=null;
  private town1:any=null;
  private company1:any=null;
  private borderColor1: string = "";
  private borderColor2: string = "";
  
  public mounted() {
    this.initEcharts1()
   
    this.$nextTick(function() {
        this.getnumEchart()
        this.score1=52
        this.score2=48
        this.borderColor1="#FFC955"
        this.borderColor2="#36D7FF"
        this.imgBg1=require("../../../../../assets/water.png")
        this.imgBg2=require("../../../../../assets/water2.png")
    })
  }

   private getnumEchart(): void {
        MyEchart3 = new Echart2();
        MyEchart3.echartsOption1(this.companydata);
         MyEchart4= new Echartsa(); 
    MyEchart4.echartsOption(this.rihtBoxData);
    MyEchart4.echartsOption(this.rihtBoxData1);
        
    
  }
  public created(){
    // MyEchart3 = new Echart2();
    // MyEchart3.echartsOption1(this.companydata);
  }

   // 初始化
  public initEcharts1(): void {
    const town1: any = document.querySelector('#echLef');
    this.town1 = echarts.init(town1);
    window.addEventListener('resize', () => {
      this.town1.resize();
    });
    this.echartsOption3()
  }

  public echartsOption3(): void {
    const option: any = {
      color:["#FF5AC3"],
      grid: {
        top: '11',
        bottom: '25',
        right:"28",
        left:"44",
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        right : '8',
        textStyle:{
          color:"#C3CAD9",
          fontSize : 20    //更改坐标轴文字大小
        }
      },
      textStyle: {
        color: '#C3CAD9',
        fontSize : 20     //更改坐标轴文字大小
      },
      xAxis: {
        type: 'category',
        boundaryGap:false,
        
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
          fontSize : 16 
        },
        axisLabel: {
          show:true,
          fontSize : 20   //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#657CA8'],
            opacity: 0.1,
          },
        },
        data: ["03-04","03-05","03-06","03-07","03-08","03-09","03-10"],
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        max:240,
        axisLabel: {
          show:true,
          fontSize : 20   //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: '#C3CAD9',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#12559A'],
            opacity: 0.1,
          },
        },
        minInterval: 1,
      },
       series: [{
        data: [110, 132, 111, 134, 140, 125, 120],
        type: 'line',
         areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(225,72,225,0.6)'
                }, {
                    offset: 1,
                    color: 'rgba(0,0,0,0)'
                }])
            },
    }]
    };
    // setTimeout((this as any)[params.el].setOption(option), 500);
    this.town1.setOption(option, true);
  }

  

}


</script>
<style scoped lang="scss">
.right-bottom{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: vh(8) vw(8);
    position: relative;
    overflow:hidden;
    .myimg{
      position: absolute;
      z-index: 10;
      left:0;
      top:0;
      .rolesimg1{
        width:vw(548.57);
        height:vh(297.143);
      }
      .info-close{
         position: absolute;
          z-index: 10;
          right:vw(6);
          top:vh(6);
          cursor:pointer;
      }
    }
    
    .header-top{
      display:flex;
      justify-content: flex-start;
      .pfroles{
        margin-left:vw(10);
       width:vw(48);
        height:vh(16);
        cursor:pointer;
        background:rgba(0,228,255,0.1);
        border:1px solid rgba(0,228,255,1);
        border-radius:2px;
        font-size:vw(10);
        line-height:vh(16);
      }
    }
    .echartbox{
      display:flex;
      justify-content: space-between;
      width: 100%;
      height: vh(105);
      margin-top:vh(5);
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
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        .fractionBox{
          display: flex;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 0 vw(20);
          .imgfraction1{
            width: vw(50.8);
            height: vh(50.9);
            // background: url("../../../../../assets/image/-s-image_1.png");
            // background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: vh(11);
            margin-bottom: vh(5);
            .fonsinum1{
              font-size: vw(21);
              color:rgba(255,255,255,1);
            }
            .fonsinum2{
              font-size: vw(10);
              color:rgba(255,255,255,1);
            }

          }
          .imgfraction2{
            background: url("../../../../../assets/image/-s-image_2.png");
            background-size: 100% 100%;
          }
        }
        .numde{
           display: flex;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          padding: 0 vw(35);
        }
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
    .tableboxwork{
      width:100%;
      height:vh(100);
      margin-top:vh(6);
      display:flex;
      justify-content: space-between;
      .fv{
        font-size:vw(11);
        color:#ffffff;
        text-align:center;
      }
      .left-ech{
        width:70%;
        height:100%;
      }
      .workOrderBox {
        width:100%;
        height:100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .echart-content {
          width: vw(60);
          height: vh(56);
          div{
            // height:100% !important;
          }
        }
        .name-text {
          font-size: vw(10);
          color: #c3cad9;
          text-align: center;
          margin-top: vh(10);
        }
      }
    }
  
}

</style>
