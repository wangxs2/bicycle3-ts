<template>
  <!-- 工单详情 -->
  <div class="table">
    <div class="table-head">
        <div class="thead thead1"><span class="glabfont">派单方式</span></div>
        <div class="thead thead2"><span class="glabfont">时间</span></div>
        <div class="thead thead3"><span class="glabfont">地点</span></div>
        <div class="thead thead4"><span class="glabfont">派单部门</span></div>
        <div class="thead thead5"><span class="glabfont">处理要求</span></div>
        <div class="thead thead6"><span class="glabfont">接收单位</span></div>
        <div class="thead thead7"><span class="glabfont">处理状态</span></div>
    </div>
    <div class="tablebody">
        <div class="swiper-container righttable" id="swipertable"  @mouseenter="on_bot_enter" @mouseleave="on_bot_leave">
            <div class="swiper-wrapper">
                <div class="swiper-slide"
                    v-for="(iteam,index) in findVisible"
                    :key="index">
                <div class="allData" @click="showMsg(iteam.sheetCode)">
                    <div class="table-foncom table-foncom1"><span class="glabfont">{{iteam.type}}</span></div>
                    <div class="table-foncom table-foncom2"><span class="glabfont">{{iteam.dispatchTime}}</span></div>
                    <div class="table-foncom table-foncom3"><span class="glabfont">{{iteam.handleAddr}}</span></div>
                    <div class="table-foncom table-foncom4"><span class="glabfont">{{iteam.name}}</span></div>
                    <div class="table-foncom table-foncom5"><span class="glabfont">{{iteam.method}}</span></div>
                     <div class="table-foncom table-foncom6"><span class="glabfont">{{iteam.dispatchReceive}}</span></div>
                    <div class="table-foncom table-foncom7"><span class="glabfont">{{iteam.status}}</span></div>

                </div>

                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
  import API from '@/api/index.ts';
  import Swiper from "swiper";
  import moment from 'moment';
  moment.locale('zh-cn');
  import { Component, Prop, Vue } from 'vue-property-decorator';
  @Component({
      components: {
      }
    })
  export default class centerBottom extends Vue {
    private swipertable:any | null=null;
    // 工单数据
     private legendData: Array<{ icon: any; name: string }> = [
    // {
    //   icon: require(`../../../../assets/image/icon_1@3x.png`),
    //   name: '防疫重点区',
    // },
    // {
    //   icon: require(`../../../../assets/image/icon_1@3x.png`),
    //   name: '自检',
    // },
    {
      icon: require(`../../../../../assets/image/icon_2@3x.png`),
      name: '已派单',
    },
    {
      icon: require(`../../../../../assets/image/icon_3@3x.png`),
      name: '处理中',
    },
    {
      icon: require(`../../../../../assets/image/icon_4@3x.png`),
      name: '已处理',
    },
    // {
    //   icon: require(`../../../../assets/image/icon_5@3x.png`),
    //   name: '超时未处理',
    // },
  ];
  
  private workOrderDisposeData: any = {};
    private workOrderObjData: any = {};
    private findVisible: any =[];
    public created() {
        this.getWorkData();
      
    }
    public mounted() {
    }

    private initsatable(): void {
      setTimeout(()=>{
        this.swipertable = new Swiper("#swipertable", {
            loop: true, // 循环模式选项
            autoplay: {
              delay: 5000, // 切换时间
              disableOnInteraction: false
            },
            direction: 'vertical',
            slidesPerView: 2,
            slidesPerGroup: 2,
            mousewheel: true,
            observer: true, // 修改swiper自己或子元素时，自动初始化swiper
            observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        });

      },300)
      
    }


    private on_bot_enter(): void {
        this.swipertable.autoplay.stop()
    }
    private on_bot_leave(): void {
        this.swipertable.autoplay.start()
    }

    public getWorkData(): void {
    // 昨天
      API.getRightTable().then(
        (res: any): void => {
          // 时间倒序
          this.findVisible=res
          this.$nextTick(() => {
             this.initsatable();
           });
        }
      );
    }



    public showMsg(code:any): void {
        const startTime: string = moment().format('YYYY-MM-DD');
        API.getAreaIdAndDate(startTime, startTime).then(
        (res: any): void => {
          res.data.forEach((item: any) => {
            if(item.sheetCode==code){
                console.log(item)
                this.disposeWorkOrderDetails(item,1)
            }
          })
        },
      );
    }





  private disposeWorkOrderDetails(row: any, type: number) {
    const data: any = row;

    const statusData: any = this.judgeStatus(data.sheetCode, data.sheetStatus); // 格式状态
    let detailsTexts: any = [
      {
        key: '单号',
        val: data.sheetCode,
      },
      {
        key: statusData.isDespatch ? '派单时间' : '自检时间',
        val: moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        key: statusData.isDespatch ? '地点' : '自检地点',
        val: data.handleAddr,
      },
      {
        key: statusData.isDespatch ? '处理单位' : '自检单位',
        val: statusData.isDespatch ? data.dispatchReceive : data.dispatchOrgName,
      },
    ];

    let detailsImgs3: any[] = [];
    let detailsImgs1: any[] = [];
    let detailsImgs2: any[] = [];
    let roundRobinimg: any = null;

    if (
      data.sheetStatus === -1 ||
      data.sheetStatus === 0 ||
      data.sheetStatus === 1 ||
      data.sheetStatus === 3
    ) {
      if (type === 1) {
        // 工单详情的图片数组
        detailsImgs3 = data.dispatchPhotoURLs.map((item: any) => {
          return 'http://106.14.198.128:18088/' + item;
        });

        if (data.sheetStatus === -1) {
          // detailsTexts.push({
          //   key: '超时时长',
          //   val: new Date(data.voList[data.voList.length - 1].handleTime).Format('yyyy-MM-dd hh:mm:ss')
          // })
        }
      } else {
        // 治理轮循的图片单张
        roundRobinimg = 'http://106.14.198.128:18088/' + data.dispatchPhotoURLs[0];
      }
    } else if (data.sheetStatus === 2 || data.sheetStatus === 4) {
      const addDetailsTexts = [
        // {
        //   key: '单号',
        //   val: data.sheetCode,
        // },
        {
          key: '处理时间',
          val: moment(data.voList[data.voList.length - 1].handleTime).format(
            'YYYY-MM-DD HH:mm:ss',
          ),
        },
        {
          key: '整理数',
          val: data.arrangeNum,
        },
        {
          key: '清运数',
          val: data.cleanNum,
        },
      ];
      detailsTexts = [...detailsTexts, ...addDetailsTexts];

      if (type === 1) {
        // 工单详情的图片数组
        // let detailsImgs1 = [];
        // let detailsImgs2 = [];
        // detailsImgs = [];
        let dispatchReceive = '';
        data.voList.forEach((item: any) => {
          dispatchReceive = statusData.isDespatch
            ? item.dispatchReceive
            : item.dispatchOrgName;
          item.dispatchBeforePhotoURLs.forEach((beforeItem: any) => {
            detailsImgs1.push('http://106.14.198.128:18088/' + beforeItem);
          });
          item.dispatchAfterPhotoURLs.forEach((afterItem: any) => {
            detailsImgs2.push('http://106.14.198.128:18088/' + afterItem);
          });
        });
      } else {
        // 治理轮循的图片单张
        roundRobinimg =
          'http://106.14.198.128:18088/' +
          data.voList[data.voList.length - 1].dispatchAfterPhotoURLs[0];
      }
    }

    if (type === 1) {
      // 工单详情格式数据
      this.workOrderDisposeData = {
        nowStatus: statusData.nowStatus, // 当前状态
        despatchStatus: statusData.despatchStatus, // 处理的状态
        classTimestamp: `container${Date.now()}`,
        detailsImgs1, // 处理照片
        detailsImgs2, // 处理照片
        detailsImgs3, // 处理照片
        detailsTexts, // 处理记录
      };
      console.log(this.workOrderDisposeData)
      console.log(this.$store.state.workeObj)
      this.$store.state.workeObj=this.workOrderDisposeData
      this.$nextTick(function () {
        // this.workOrderDisposeOptions = {
        //   autoplay: true, // 可选选项，自动滑动
        //   simulateTouch: false,
        //   loop: detailsImgs.length > 1,
        // };
        // this.isShowWorkOrderDispose = true;
      });
    } else {
      return {
        nowStatus: statusData.nowStatus, // 当前状态
        despatchStatus: statusData.despatchStatus, // 处理的状态
        roundRobinimg, // 处理照片
        detailsTexts, // 处理记录
      };
    }
  }


  private judgeStatus(code: string, status: number): any {
    let icon: any = null;
    let nowStatus: string = '';
    let despatchStatus: string = '';
    let isDespatch: boolean = false;
    // 自检
    if (code.includes('-CHECK-')) {
      isDespatch = false;
      switch (status) {
        case 1:
          // 处理中
          nowStatus = '自检-处理中';
          despatchStatus = '企业处理中';
          icon = this.legendData[0].icon;
          break;
        case 2:
          // 已处理
          nowStatus = '自检完成';
          despatchStatus = '企业自检完毕';
          icon = this.legendData[0].icon;
          break;
      }
    } else {
      // 督办
      // if (code.includes('-DISPATCH-'))
      isDespatch = true;
      switch (status) {
        case -1:
          // 超时
          nowStatus = '超时未处理';
          despatchStatus = '已推送街镇城运分中心,企业';
          // icon = this.legendData[4].icon;
          break;
        case 0:
          // 未处理
          nowStatus = '已派单';
          despatchStatus = '已推送街镇城运分中心,企业';
          icon = this.legendData[0].icon;
          break;
        case 1:
          // 处理中
          nowStatus = '处理中';
          despatchStatus = '企业处理中';
          icon = this.legendData[1].icon;
          break;
        case 2:
          // 已处理
          nowStatus = '已处理';
          despatchStatus = '企业处理完毕';
          icon = this.legendData[2].icon;
          break;
        case 3:
          // 重新派单
          nowStatus = '已派单';
          despatchStatus = '已推送街镇城运分中心,企业';
          icon = this.legendData[0].icon;
          break;
        case 4:
          // 已完成
          nowStatus = '已处理';
          despatchStatus = '企业处理完毕';
          // icon = this.legendData[3].icon;
          break;
      }
    }

    return { icon, nowStatus, despatchStatus, isDespatch };
  }



   
  }
</script>
<style lang="scss" scoped>
.table{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    span{
      font-size:vw(10);
    }
    .table-head{
        width: 100%;
        height: vh(18.3);
        line-height: vh(18.3);
        color:#ffffff;
        // background:rgba(12,58,111,0.2);
        box-shadow: rgba(12,58,111,0.6) 0 0 vw(10) vw(4) inset;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          color:#65C6FC;
        }
        .thead {
          text-align: center;
          height: 100%;
        }
        .thead1 {
            width:10%;
        }
        .thead2 {
            width:15%;
        }
        .thead3 {
          width:30%;
        }
         .thead4 {
            width:15%;
        }
        .thead5 {
          width:10%;
        }
         .thead6 {
            width:10%;
        }
        .thead7 {
          width:10%;
        }
    }
    .tablebody{
        width:100%;
        height:vh(76);
        border:1px solid rgba(9,28,93,1);
        overflow:hidden;
         span{
          color:#ffffff;
          font-size:vw(10);
        }
        .righttable{
            width:100%;
            height:vh(76);
            color:#BDD3FF;
            overflow:hidden;
            // .swiper-wrapper{
            //   width:100%;
            //   height:100%;
            //   overflow:hidden;
            // }
            .swiper-slide {
                width: 100%;
                height: vh(38) !important;
                .allData{
                    width: 100%;
                    height: vh(38);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom:1px solid rgba(9,28,93,1);
                    cursor:pointer;
                    .table-foncom{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        box-sizing:border-box;
                        padding:vh(0) 0;
                    }
                    .table-foncom1{
                        width: 10%;
                    }
                    .table-foncom2{
                        width: 15%;
                    }
                    .table-foncom3{
                        width: 30%;
                    }
                    .table-foncom4{
                        width: 15%;
                    }
                    .table-foncom5{
                        width:10%;
                        
                    }
                    .table-foncom6{
                        width: 10%;
                    }
                    .table-foncom7{
                        width: 10%;
                    }
                    
                }
            }
        }
    }
    

}

</style>
