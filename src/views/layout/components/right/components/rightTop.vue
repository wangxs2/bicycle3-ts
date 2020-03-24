<template>
  <div class="right-top">
    <!-- 弹框 -->
    <div class="myimg" v-if="isshowimg">
      <img class="rolesimg1" src="../../../../../assets/image/bjroles.png">
      <div class="info-close iconfont iconguanbi" @click="isshowimg=false"></div>
    </div>

    <!-- 弹框 -->
    <borderBlock :msg="msgconcat1"></borderBlock>
    <div class="roles">
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">投放报警</span>
        </div>
        <img class="gzimg" @click="isshowimg=true" src="../../../../../assets/image/gz1.png">
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">区域预警</span>
        </div>
        <!-- <img class="gzimg" src="../../../../../assets/image/gz2.png"> -->
      </div>
      <div class="rloes-box1">
        <div class="left-role">
          <img class="lbimg" src="../../../../../assets/image/lb.png">
          <span class="glabfont rolefont">违规停放</span>
        </div>
        <img src="" alt="" srcset="">
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
      <div class="rloes-box1 cumulativebox">
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
      <div class="rloes-box1 cumulativebox">
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
          <span class="yujingfont glabfont">2020-03-07 17:51:30</span>
          <span style="margin-top:0.5vh" class="yujingfont glabfont">哈罗 连续5天每天增量200辆以上</span>
        </div>
      </div>
      <div class=" cumulativebox">
        <img src="../../../../../assets/image/bj.png">
        <div class="yujing">
          <span class="yujingfont glabfont">2020-03-07 17:51:12</span>
          <span style="margin-top:0.5vh" class="yujingfont glabfont">潍坊新村街道 上限预警</span>
        </div>
      </div>
      <div class="cumulativebox">
        <img src="../../../../../assets/image/bj.png">
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
          <div class="font2">
            <span class="gont2 glabfont">{{threenum[1].name!==undefined?threenum[1].name:''}}</span>
            <span class="gont2 glabfont">{{threenum[0].name!==undefined?threenum[0].name:''}}</span>
            <span class="gont2 glabfont">{{threenum[2].name!==undefined?threenum[2].name:''}}</span>
          </div>
        </div>
    </div>
    
   
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import borderBlock from '@/component/borderBlock/index.vue';
import scrollNum from '@/component/scrollnum/index.vue';
import Echart from './myEchart';
import API from '@/api/index';

let MyEchart1: any = null; // 自定义echarts
@Component({
  components: {
    borderBlock,
    scrollNum,
  },
})
export default class rightTop extends Vue {
  private towndata: any = 
  {
    el:"town",
    x:[],
    dataY:[],

  };
  
  private allnum1: any =[0];
  private allnum2: any =[5,3,2,7];
  private allnum3: any =[1,4,4];
  private allnum4: any =[0];
  private allnum5: any =[1,5,1];
  private allnum6: any =[6];
   private isshowimg: boolean =false;
  
  private threenum: any =[];
  private intelligentData: any ={};
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
          console.log(res)
          this.intelligentData=res
        }
        
      );
     
    
  }

  private getThree(): void {
    API.getTownThree().then(
        (res: any): void => {
          this.threenum=res
        }
        
      );
     
    
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
            this.towndata.x.push(iteam.name)
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
    position: relative;
    .myimg{
      position: absolute;
      z-index: 10;
      left:0;
      top:0;
      .rolesimg1{
        width:vw(257.143);
        height:vh(160);
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
        display: flex;
        flex-direction: column; 
        align-items: center;
        span{
          color:#ffffff;
        }
        img{
          width: vw(100);
          height: vh(50);
          // margin:vh(5) 0;
        }
        .gont1{
          font-size: vw(11);
          margin-bottom:vh(16)
        }
        .font2{
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
