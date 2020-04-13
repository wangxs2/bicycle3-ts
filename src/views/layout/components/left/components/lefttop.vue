<template>
  <div class="left-top">
    <borderBlock :msg="msgconcat"></borderBlock>
    <div class="allbox">
      <div class="concat-box">
        <div class="concatlist" v-for="iteam in shudata" :key="iteam.id">
          <span style="color:#ffffff" class="nametit glabfont">{{iteam.name}}</span>
          <div class="jianju">
            <div class="telju">
              <img src="../../../../../assets/image/loader.png" />
              <span class="glabfont">{{iteam.concat1}}</span>
            </div>
            <div class="telju" style="text-align:left">
              <img src="../../../../../assets/image/tel.png" />
              <span class="glabfont">{{iteam.tel1}}</span>
            </div>
          </div>
          <div style="text-align:left" class="jianju">
            <div class="telju">
              <img src="../../../../../assets/image/loader.png" />
              <span class="glabfont">{{iteam.concat2}}</span>
            </div>
            <div class="telju">
              <img src="../../../../../assets/image/tel.png" />
              <span class="glabfont">{{iteam.tel2}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="concat-box">
        <div class="concatlist" v-for="iteam in shudata1" :key="iteam.id">
          <span style="color:#ffffff" class="nametit glabfont">{{iteam.name}}</span>
          <div class="jianju">
            <div class="telju">
              <img src="../../../../../assets/image/loader.png" />
              <span class="glabfont">{{iteam.concat1}}</span>
            </div>
            <div class="telju" style="text-align:left">
              <img src="../../../../../assets/image/tel.png" />
              <span class="glabfont">{{iteam.tel1}}</span>
            </div>
          </div>
          <div style="text-align:left" class="jianju">
            <div class="telju">
              <img src="../../../../../assets/image/loader.png" />
              <span class="glabfont">{{iteam.concat2}}</span>
            </div>
            <div class="telju">
              <img src="../../../../../assets/image/tel.png" />
              <span class="glabfont">{{iteam.tel2}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="video-box">
      <borderBlock :msg="msgvide"></borderBlock>
      <div class="active-box"></div>
       <rank-block1 :rank-data='activeRange'
                    :gradient-ramp="['#6ad4ff','#5a60ff']"
                    block-tit=''
                    font-color="#20c0fe">
        </rank-block1>
    </div>-->

    <!-- <div class=></div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import borderBlock from "@/component/borderBlock/index.vue";
import rankBlock1 from "@/component/rankBlock1/index.vue";
import { refinedCal, cloneObj } from "@/libs/util.ts";
import API from "@/api/index";
@Component({
  components: {
    borderBlock,
    rankBlock1
  }
})
export default class leftTop extends Vue {
  private msgconcat: string = "指挥体系";
  private msgvide: string = "街镇车辆活跃度排名TOP10";
  // 街镇数据
  private townData: Array<{}> = [];
  // 重点区排名数据
  private activeRange: Array<{}> = [];
  private shudata: any = [
    {
      id: 1,
      name: "金杨新村街道",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
    },
    {
      id: 2,
      name: "东明路街道",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
    },
    {
      id: 3,
      name: "北蔡镇",
      concat1: "分管领导",
      tel1: "123456",
      concat2: "分中心常务副主任",
      tel2: "123456"
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
  public mounted() {}

  // 获取重点区域排名
  private getKeyArea(): void {
    API.getKeyArea().then((res: any): void => {
      if (res.status === 0) {
        this.townData = cloneObj(res.activeRange);
        res.activeRange = res.activeRange.slice(0, 10);
        this.activeRange = res.activeRange.map(
          (item: any, index: number): object => {
            item.percentage = refinedCal(`${item.activeRate}*100`, -1) + "%";
            item.index = index + 1;
            item.name = item.orgName;
            (item.img = require(`@img/topten/${index + 1}.png`)),
              (item.describe = item.percentage);
            return item;
          }
        );
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
    display: flex;
  justify-content: space-between;
  }
  .concat-box {
    width: vw(280);
    height: 100%;
    .concatlist {
      display: flex;
      align-items: center;
      border-bottom: vw(1) solid rgba(112, 167, 224, 0.3);
      box-sizing: border-box;
      padding: vh(7) vw(0);
      .nametit {
        width: vw(72);
        text-align: left;
      }
      span {
        font-size: vw(10);
        color: #65c6fc;
      }
      .jianju {
        margin-left: vw(11);
        .telju {
          display: flex;
          align-items: center;
          margin-bottom: vh(5);
          img {
            margin-right: vw(2);
            width: vw(9);
            height: vh(9);
          }
        }
      }
    }
    .concatlist:last-child {
      border-bottom: none;
    }
  }
  .video-box {
    flex: 1;
    margin-left: vw(12);
    border: vw(1) solid rgba(18, 85, 154, 1);
    box-sizing: border-box;
    padding: vh(8) vw(8);
    display: flex;
    flex-direction: column;
    .active-box {
      flex: 1;
      box-sizing: border-box;
    }
  }
}
</style>
