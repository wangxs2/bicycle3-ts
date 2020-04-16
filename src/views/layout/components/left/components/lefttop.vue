<template>
  <div class="left-top">
    <!-- <borderBlock :msg="msgconcat"></borderBlock> -->
    <div class="header-box">
      <borderBlock :msg="msgconcat"></borderBlock>
      <div class="box-right">
        <div :class="innum==iteam.id?'box-bor box-bor1':'box-bor'" @click="showinde(iteam)" v-for="(iteam,index) in shudata" :key="iteam.id"><span class="glabfont">{{iteam.name}}</span></div>
      </div>
    </div>
    <div class="allbox" id="echar">
      
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import borderBlock from "@/component/borderBlock/index.vue";
import rankBlock1 from "@/component/rankBlock1/index.vue";
import { refinedCal, cloneObj } from "@/libs/util.ts";
import API from "@/api/index";
import echarts from 'echarts';
@Component({
  components: {
    borderBlock,
    rankBlock1
  }
})
export default class leftTop extends Vue {
  private msgconcat: string = "单车活跃率";
  private innum: number = 1;
  // 街镇数据
  private townData: Array<{}> = [];
  // 重点区排名数据
  public peak: any = null;
  private activeRange: Array<{}> = [];
  private shudata: any = [
    {
      id: 1,
      name: "总活跃率",
    },
    {
      id: 2,
      name: "摩拜",
    },
    {
      id: 3,
      name: "哈啰",
    }
  ];
  private shudata1: any = [
    {
      id: 1,
      name: "金桥镇",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
    },
    {
      id: 2,
      name: "曹路镇",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
    },
    {
      id: 3,
      name: "洋泾街道",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
    }
  ];
  public created() {
    this.getKeyArea();
    
  }
  public mounted() {
    this.initEcharts();
  }


  private showinde(row:any):void{
    this.innum=row.id
    if(row.id==2){
      this.getKeyArea1("摩拜","#FF9D5E","#FF8434")
    }else if(row.id==3){
      this.getKeyArea1("哈啰","#3CB1F7","#5C73FF")
    }else{
      this.getKeyArea()
    }

  }

   public initEcharts(): void {
    const peak: any = document.querySelector('#echar');
    this.peak = echarts.init(peak);
    window.addEventListener('resize', () => {
      this.peak.resize();
      
    });
  }
  public echartsOption(arrx: any,arry: any,color1:string,color2:string): void {
    const option: any = {
      grid: {
        top: '40',
        bottom: '38',
        right:"8",
        left:"60",
      },
      title:{
        show:true,
        text:"百分比(%)",
        textStyle:{
          color:"#ffffff",
          fontStyle: 'normal' ,
          fontWeight: 'normal' ,
        }
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      textStyle: {
        color: '#C3CAD9',
        fontSize : 20 
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
          fontSize : 20 ,
        },
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        
        axisLabel: {
          interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
          rotate:30 ,
          fontSize : 18   //调整数值改变倾斜的幅度（范围-90到90）
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
        data: arrx,
      },
      yAxis: {
        type: 'value',
        max:100,
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: '#C3CAD9',
        },
        axisLabel: {
          show:true,
          fontSize : 20   //调整数值改变倾斜的幅度（范围-90到90）
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#12559A'],
            opacity: 0.1,
          },
        },
        minInterval: 1,
        name: '',
      },
      series: [{
          data: arry,
          type: 'bar',
          barWidth:14,
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: color1
                }, {
                    offset: 1,
                    color: color2
                }]),
            }
          },
      }],
    };
    // setTimeout((this as any)["echar"].setOption(option), 500);
    this.peak.setOption(option, true);
  }
  // 获取重点区域排名
  private getKeyArea(): void {
    API.getKeyArea().then((res: any): void => {
      if (res.status === 0) {
        console.log(res.activeRange)
        // this.townData = cloneObj(res.activeRange);
        let arrx:any=[]
        let arry:any=[]
        res.activeRange.forEach((itam:any)=>{
          arrx.push(itam.orgName)
          arry.push((itam.activeRate*100).toFixed(2))
        })
        console.log(arry)
        this.echartsOption(arrx,arry,'#33ff99','#00908e')
      }
    });
  }

  // 获取重点区域排名
  private getKeyArea1(val:string,color1:string,color2:string): void {
    const camnuna:string=val
    API.getKeyArea1(camnuna).then((res: any): void => {
      if (res.status === 0) {
        console.log(res.activeRange)
        // this.townData = cloneObj(res.activeRange);
        let arrx:any=[]
        let arry:any=[]
        res.activeRange.forEach((itam:any)=>{
          arrx.push(itam.orgName)
          arry.push((itam.activeRate*100).toFixed(2))
        })
        console.log(arry)
        this.echartsOption(arrx,arry,color1,color2)
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.left-top {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  box-sizing: border-box;
  padding: vh(8) vw(8);
  border: vw(1) solid rgba(18, 85, 154, 1);
  .allbox{
    flex:1;
  }
  .header-box{
    display:flex;
    justify-content: space-between;
    .box-right{
      display:flex;
      justify-content: flex-start;

      .box-bor{
        width:vw(64);
        height:vh(17);
        line-height:vh(17);
        background:rgba(3,26,72,0.5);
        border:1px solid rgba(18,85,154,0.8);
        margin-right:vw(4);
        cursor:pointer;
      }
      .box-bor1{
        background:rgba(3,241,250,0.2);
        
        span{
          color:#FFFFFF;
        }
      }
      span{
        font-size:vw(10);
        color:#65C6FC;
      }
    }
  }
 
}
</style>
