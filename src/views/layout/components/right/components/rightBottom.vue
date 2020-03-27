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
              <span class="fonsinum1 glabfont">89</span>
              <span class="fonsinum2 glabfont">分</span>
            </div>
            <div class="imgfraction1 imgfraction2">
              <span class="fonsinum1 glabfont">93</span>
              <span class="fonsinum2 glabfont">分</span>
            </div>
          </div>
          <div class="numde">
            <span class="gont2 glabfont">哈罗</span>
            <span class="gont2 glabfont">摩拜</span>
          </div>
        </div>
    </div>
    <borderBlock :msg="msgvide1"></borderBlock>
    <div class="tableboxwork">
      <tableBottom></tableBottom>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import borderBlock from '@/component/borderBlock/index.vue';
// import echartsLiquidfill from 'echarts-liquidfill'
import tableBottom from './tableBottom.vue';
import Echart2 from './myEchart1';
let MyEchart3: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    tableBottom
  },
})
export default class rightTop extends Vue {
  private companydata: any = 
  {
    el:"company",
    x:["03-04","03-05","03-06","03-07","03-08","03-09","03-10"],
    data1:[88, 90, 88, 80, 70, 96, 86],
    data2:[88, 90, 88, 80, 70, 96, 86],

  };
  private msgconcat1: string = "企业工单处置得分 (历史7天)";
  private isshowimg: boolean =false;
  private msgvide1: string = "平台监管工单";
  
  public mounted() {
    
    this.$nextTick(function() {
        this.getnumEchart()
    })
  }

   private getnumEchart(): void {
        MyEchart3 = new Echart2();
        MyEchart3.echartsOption1(this.companydata);
    
  }
  public created(){
    // MyEchart3 = new Echart2();
    // MyEchart3.echartsOption1(this.companydata);
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
        height:vh(222.857);
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
            background: url("../../../../../assets/image/-s-image_1.png");
            background-size: 100% 100%;
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
      height:vh(94);
      margin-top:vh(6)
    }
  
}

</style>
