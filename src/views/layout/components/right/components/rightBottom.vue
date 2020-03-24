<template>
  <div class="right-bottom">
    <borderBlock :msg="msgconcat1"></borderBlock>
    <div class="echartbox">
        <div class="echart1">
          <div class="echartone" id="company"></div>
        </div>
        <div class="right-list">
          <span class="gont1 glabfont">企业工单处置昨日得分</span>
          <img src="../../../../../assets/image/paiming.png">
          <div class="">

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
import Echart from './myEchart';
let MyEchart1: any = null; // 自定义echarts
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

  };
  private msgconcat1: string = "企业工单处置得分 (历史7天)";
  private msgvide1: string = "平台监管工单";
  
  public mounted() {
    MyEchart1 = new Echart();
    MyEchart1.echartsOption1(this.companydata);
   
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
      flex:1;
      margin-top:vh(6)
    }
  
}

</style>
