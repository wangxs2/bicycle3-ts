<template>
  <div class="right-top">
    <!-- 规则弹框 -->
    <div class="myimg" v-if="isshowimg">
      <img class="rolesimg1" v-if="gu1==1" src="../../../../../assets/image/bjroles.png">
      <img class="rolesimg2" v-if="gu1==2" src="../../../../../assets/image/bjroles2.png">
      <img class="rolesimg3" v-if="gu1==3" src="../../../../../assets/image/bjroles3.png">
      <div class="info-close iconfont iconguanbi" @click="isshowimg=false"></div>
    </div>

    <!-- 规则弹框 -->
    <!-- 表格的弹框 -->
    <div class="mytable" v-if="isshowtable">
      <div class="info-close iconfont iconguanbi" @click="isshowtable=false"></div>
      <div class="table-tit"><span class="glabfont">{{numxianshi==2?"预警播报列表":"违规停放列表"}}</span></div>
      <div class="tabscroll">
        <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th><span class="glabfont">序号</span></th>
                <th><span class="glabfont">{{numxianshi==2?"预警时间":"报警时间"}}</span></th>
                <th><span class="glabfont">区域名称</span></th>
                <th v-if="numxianshi==2"><span class="glabfont">预测车辆数</span></th>
                <th v-if="numxianshi==2"><span class="glabfont">预警上限</span></th>
                <th v-if="numxianshi==2"><span class="glabfont">需清运车辆数</span></th>
                <th><span class="glabfont">处理结果</span></th>
                <th><span class="glabfont">详情</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in dataTable" :key="index">
                <td><span class="glabfont">{{index+1}}</span></td>
                <td><span class="glabfont">{{item.discoverTime}}</span></td>
                <td><span class="glabfont">{{item.name}}</span></td>
                <td v-if="numxianshi==2"><span class="glabfont">{{item.predictNum}}</span></td>
                <td v-if="numxianshi==2"><span class="glabfont">{{item.maxNum}}</span></td>
                <td v-if="numxianshi==2"><span class="glabfont">{{item.cleanNum}}</span></td>
                <td><span class="glabfont">{{item.hdlDetail}}</span></td>
                <td><span class="glabfont">{{item.detail}}</span></td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>

    <!-- 表格的弹框 -->
    <borderBlock :msg="msgconcat1"></borderBlock>
    <div class="roles">
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">总量报警</span>
        </div>
        <img class="gzimg" @click="isshowimg=true,gu1=1" src="../../../../../assets/image/gz1.png">
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">区域预警</span>
        </div>
        <img class="gzimg" @click="isshowimg=true,gu1=2" src="../../../../../assets/image/gz2.png">
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">违规停放</span>
        </div>
        <img class="gzimg" @click="isshowimg=true,gu1=3" src="../../../../../assets/image/gz3.png">
      </div>
    </div>
    <div class="roles cumulative">
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">累计发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum1'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">本月发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum2'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
      <div class="rloes-box1 cumulativebox" @click="showtableData(allowList3,1)">
        <span class="ljnum glabfont">本月发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum3'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
    </div>
    <div class="roles cumulative">
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">今日发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum4'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
      <div class="rloes-box1 cumulativebox" @click="showtableData(allowList2,2)">
        <span class="ljnum glabfont">今日发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum5'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
      <div class="rloes-box1 cumulativebox">
        <span class="ljnum glabfont">今日发现</span>
        <div class="scrollnumsa"><scroll-num :datanum='allnum6'></scroll-num></div>
        <span class="ljnum glabfont">起</span>
      </div>
    </div>
    <div class="cumulative">
      <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png">
        <div class="yujing">
          <span v-if="allowList1.length==0" class="noyuData glabfont">暂无数据</span>
          <rank-block2 :rank-data='allowList1'
                    :gradient-ramp="['#6ad4ff','#5a60ff']"
                    font-color="#20c0fe">
          </rank-block2>
        </div>
      </div>
      <div class=" cumulativebox">
        <img src="../../../../../assets/image/bj.png">
        <div class="yujing">
          <span v-if="allowList2.length==0" class="glabfont">暂无数据</span>
          <rank-block2 :rank-data='allowList2'>
          </rank-block2>
        </div>
      </div>
      <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png">
        <div class="yujing">
          <span v-if="allowList3.length==0" class="glabfont">暂无数据</span>
          <rank-block2 :rank-data='allowList3'>
          </rank-block2>
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
          <div class="font2">
            <span class="gont2 glabfont">{{topnum1}}</span>
            <span class="gont2 glabfont">{{topnum2}}</span>
            <span class="gont2 glabfont">{{topnum3}}</span>
          </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import borderBlock from '@/component/borderBlock/index.vue';
import scrollNum from '@/component/scrollnum/index.vue';
import rankBlock2 from '@/component/rankBlock2/index.vue';
import Echart from './myEchart';
import { refinedCal, cloneObj } from '@/libs/util.ts';
import API from '@/api/index';

let MyEchart1: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    scrollNum,
    rankBlock2,
  },
})
export default class rightTop extends Vue {
  private towndata: any = 
  {
    el:"town",
    x:[],
    dataY:[],

  };
  
  private numxianshi: number =1;
  private gu1: number =1;
  private allnum1: any =[0];
  private allnum2: any =[0];
  private allnum3: any =[];
  private allnum4: any =[0];
  private allnum5: any =[];
  private allnum6: any =[];
  private isshowimg: boolean =false;
  private isshowtable: boolean =false;
  private threenum: any =[];
  private dataTable: any =[];
  private topnum1: string ="";
  private topnum2: string ="";
  private topnum3: string ="";
  private intelligentData: any ={};
  private allowList1: any ={};
  private allowList2: any ={};
  private allowList3: any ={};
  private msgconcat1: string = "智能发现";
  private msgvide1: string = "街道派单TOP10 (累计历史七天)";
  
  public mounted() {
    this.$nextTick(function() {
        this.getnumEchart()
    })
  }
   public created() {
    this.getThree()
    this.getIntelligentData()
  }

  // getIntelligent

  private getIntelligentData(): void {
    API.getIntelligent().then(
        (res: any): void => {
          this.intelligentData=res
          console.log(res)
          const str1:string=String(this.intelligentData[0].allNum)
          const str2:string=String(this.intelligentData[1].allNum)
          const str3:string=String(this.intelligentData[2].allNum)
          const str4:string=String(this.intelligentData[0].todayNum)
          const str5:string=String(this.intelligentData[1].todayNum)
          const str6:string=String(this.intelligentData[2].todayNum)
          this.allnum1=(str1).split("")
          this.allnum2=(str2).split("")
          this.allnum3=(str3).split("")
          this.allnum4=(str4).split("")
          this.allnum5=(str5).split("")
          this.allnum6=(str6).split("")
          //报警播报
          this.allowList1=this.intelligentData[0].list
          this.allowList2=this.intelligentData[1].list
          this.allowList3=this.intelligentData[2].list
          this.allowList3.forEach((item:any,index:number)=>{
            item.id=index+1
          })
          // this.intelligentData
          // this.allnum1=this.intelligentData
          // var array=nums.split("");
        }
        
      );
     
    
  }

    // 格式累计这些数字
  // private FormatNumber(polygon: string): Array<[]> {
   
  // }


  private getThree(): void {
    API.getTownThree().then(
        (res: any): void => {
          this.threenum=cloneObj(res)
          this.topnum1=this.threenum[1].shortName
          this.topnum2=this.threenum[0].shortName
          this.topnum3=this.threenum[2].shortName
          
        }
        
      );
     
    
  }


  private showtableData(data:any,num:number): void {
    this.isshowtable=true
    this.numxianshi=num
    console.log(this.numxianshi)
    this.dataTable=data
  }




    // 活跃量 获取数据
  private getnumEchart(): void {
    API.getRightTown().then(
        (res: any): void => {
          // for(let key in res){
          //   this.towndata.x.push(key)
          //   this.towndata.dataY.push(res[key].num)
          // }
          res.forEach((iteam:any)=>{
            this.towndata.x.push(iteam.shortName)
            this.towndata.dataY.push(iteam.num)
          })
          MyEchart1 = new Echart();
          MyEchart1.echartsOption(this.towndata);
        }
        
      );
     
    
  }

}


</script>
<style lang="scss">

</style>
<style scoped lang="scss">
.right-top{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: vh(8) vw(8);
    padding-bottom: vh(4);
    position: relative;
    .mytable{
      position: absolute;
      z-index: 10;
      left:0;
      top:vh(100);
      width:100%;
      height:vh(440);
      background:rgba(12,58,111,1);
      border:1px solid rgba(50,134,217,1);
      .info-close{
         position: absolute;
          z-index: 10;
          right:vw(6);
          top:vh(6);
          cursor:pointer;
      }
      .table-tit{
        font-size:vw(11);
        color:#fff;
        text-align:left;
        margin:vh(7.5);
      }
     .tabscroll{
       width:100%;
       height:90%;
       overflow:hidden;
       overflow-y:scroll;
       box-sizing:border-box;
       padding:vh(10) vw(16);
      }
      .tabscroll::-webkit-scrollbar {
          display: none; //Safari and Chrome
          -ms-overflow-style: none; //IE 10+
          overflow: -moz-scrollbars-none; //Firefox
          width: 0 !important 
      }
      table{
        width:100%;
        color:#fff;
        font-size:vw(10);
        border:vw(1) solid rgba(50,134,217,1);
        
        thead{
          th{
            padding:vh(7.5) vw(8);
            border:vw(1) solid rgba(50,134,217,1);
            border-left:none;
          }
            box-shadow: rgba(12,58,111,0.6) 0 0 vw(10) vw(4) inset;

        }
        tbody{
          td{
            padding:vh(7.5) vw(8);
            border:vw(1) solid rgba(50,134,217,1);
            border-top:none;
            border-left:none;
          }
        }
        
      }
    }
    .myimg{
      position: absolute;
      z-index: 10;
      left:vw(8);
      top:vh(50);
      .rolesimg1{
        width:vw(388.571);
        height:vh(111.43);
      }
      .rolesimg2{
        width:vw(548.571);
        height:vh(477.143);
      }
       .rolesimg3{
        width:vw(548.571);
        height:vh(213.714);
      }
      .info-close{
         position: absolute;
          z-index: 10;
          right:vw(6);
          top:vh(6);
          cursor:pointer;
      }
    }
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
          align-items: center;
          .lbimg{
            width:vw(12);
            height:vh(12);
            margin:0 vw(4);
          }
          .rolefont{
            color:#65C6FC;
            font-size:vw(10);
          }
        }
        .gzimg{
          width:vw(57);
          height:vh(15);
          margin-right:vw(4);
        }
      }
    }
    .cumulative{
      display:flex;
      justify-content: space-between;
      margin-top:vh(7);
      align-items: center;
      .cumulativebox{
        background:transparent;
        display:flex;
        justify-content:flex-start;
        align-items: center;
        .scrollnumsa{
          // flex:1;
        }
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
          width:vw(145);
          height:vh(23);
          justify-content:center;
          .noyuData{
            font-size:vw(10);
            text-align:left;
            line-height:vh(23);
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
        display: flex;
        flex-direction: column; 
        align-items: center;
        span{
          color:#ffffff;
        }
        img{
          width: vw(131);
          height: vh(58);
          // margin:vh(5) 0;
        }
        .gont1{
          font-size: vw(11);
          margin-bottom:vh(16)
        }
        .font2{
          width: 100%;
          display:flex;
          box-sizing: border-box;
          padding: 0 vw(10);
          justify-content: space-between;
          margin-top:vh(10)
        }
        .gont2{
          font-size: vw(10);
        }
      }
      // margin-top:vh(18);
    }
  }
</style>
