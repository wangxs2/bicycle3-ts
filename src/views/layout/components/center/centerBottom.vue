<template>
  <!-- 工单详情 -->
  <div class="table">
    <div class="table-head">
        <div class="thead thead1"><span class="glabfont">时间</span></div>
        <div class="thead thead2"><span class="glabfont">地址</span></div>
        <div class="thead thead3"><span class="glabfont">描述</span></div>
        <div class="thead thead4"><span class="glabfont">推送单位</span></div>
        <div class="thead thead5"><span class="glabfont">状态</span></div>
    </div>
    <div class="tablebody">
        <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
                <div class="swiper-slide"
                    v-for="(iteam,index) in findVisible"
                    :key="index"
                    :autoplay='5000'>
                <div class="allData">
                    <div class="table-foncom table-foncom1"><span class="glabfont">{{iteam.time}}</span></div>
                    <div class="table-foncom table-foncom2"><span class="glabfont">{{iteam.dir}}</span></div>
                    <div class="table-foncom table-foncom3"><span class="glabfont">{{iteam.des}}</span></div>
                    <div class="table-foncom table-foncom4"><span class="glabfont">{{iteam.org}}</span></div>
                    <div class="table-foncom table-foncom5"><span :class="iteam.status==2?'ycl':'clz'" class="glabfont">{{iteam.status}}</span></div>

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
    private findVisible: any =[];
    public created() {
      
    }
    public mounted() {
      this.initSwipertable();
      this.getWorkOrder();
    }

    private initSwipertable(): void {
       this.swipertable = new Swiper("#swiper1", {
                loop: true, // 循环模式选项
                direction: 'vertical',
                mousewheel: true,
                autoplay: {
                  delay: 5000, // 切换时间
                },
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
            });

    }

    public getWorkOrder(): void {
    // 昨天
      const startTime: string = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD');

      const endTime: string = moment().format('YYYY-MM-DD');
      API.getWorkOrderDetails(startTime, endTime).then(
        (res: any): void => {
          // 时间倒序
          const sortData: Array<{}> = res.sort((x: any, y: any) => {
            if (x.dispatchTime > y.dispatchTime) {
              return -1;
            } else if (x.dispatchTime < y.dispatchTime) {
              return 1;
            } else {
              return 0;
            }
          });

          // 取十条
          let data: Array<{}> = sortData;
          data = data.map(
            (item: any, index: number): object => {
              return {
                index,
                time: moment(item.dispatchTime).format('YYYY-MM-DD HH:mm'),
                dir: item.handleAddr,
                des: '共享单车乱停乱放',
                org: item.orgName,
                status: item.status === 2 ? '已处理' : '处理中',
              };
            },
          );

          this.findVisible=data
        }
      );
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
            width:20%;
        }
        .thead2 {
            width:30%;
        }
        .thead3 {
          width:20%;
        }
         .thead4 {
            width:10%;
        }
        .thead5 {
          width:20%;
        }
    }
    .tablebody{
        flex:1;
        height:vh(76);
        border:1px solid rgba(9,28,93,1);
        overflow:hidden;
         span{
          color:#ffffff;
          font-size:vw(10);
        }
        .swiper-container{
            width:100%;
            height:vh(76);
            color:#BDD3FF;
            overflow:hidden;
            .swiper-slide {
                width: 100%;
                height: vh(38) !important;
                .allData{
                    width: 100%;
                    height: vh(37);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom:1px solid rgba(9,28,93,1);
                    .table-foncom{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100%;
                        box-sizing:border-box;
                        padding:vh(0) 0;
                    }
                    .table-foncom1{
                        width: 20%;
                    }
                    .table-foncom2{
                        width: 30%;
                    }
                    .table-foncom3{
                        width: 20%;
                    }
                    .table-foncom4{
                        width: 10%;
                    }
                    .table-foncom5{
                        width:20%;
                        .ycl{
                          width:90%;
                          height:vh(14);
                          line-height:vh(14);
                          background: url("../../../../assets/image/yichuli.png") no-repeat;
                          background-size: 100% 100%;
                        }
                        .clz{
                          width:90%;
                          height:vh(14);
                          line-height:vh(14);
                          background: url("../../../../assets/image/clz.png") no-repeat;
                          background-size: 100% 100%;
                        }
                    }
                    
                }
            }
        }
    }
    

}

</style>
