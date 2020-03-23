<template>
  <div class="left-top">
    <div class="concat-box">
      <borderBlock :msg="msgconcat"></borderBlock>
      <div class="concatlist" v-for="iteam in shudata" :key="iteam.id">
        <span style="color:#ffffff" class="nametit glabfont">{{iteam.name}}</span>
        <div class="jianju">
          <div class="telju">
            <img src="" alt="" srcset="">
            <span class="glabfont">{{iteam.concat1}}</span>
          </div>
          <div style="text-align:left">
            <img src="" alt="" srcset="">
              <span class="glabfont">{{iteam.tel1}}</span>
          </div>
        </div>
        <div style="text-align:left" class="jianju">
          <div class="telju">
            <img src="" alt="" srcset="">
            <span class="glabfont">{{iteam.concat2}}</span>
          </div>
          <div>
            <img src="" alt="" srcset="">
              <span class="glabfont">{{iteam.tel2}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="video-box">
      <borderBlock :msg="msgvide"></borderBlock>
    </div>
    
    <!-- <div class=></div> -->
   
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import borderBlock from '@/component/borderBlock/index.vue';
@Component({
  components: {
   borderBlock,
  }
})
export default class leftTop extends Vue {
  private msgconcat: string = "指挥体系";
   private msgvide: string = "街镇活跃排名TOP10"; 
   private shudata: any = [
     {
       id:1,
       name:"金杨新村街道",
       concat1:"分管领导",
       tel1:"123456",
       concat2:"分中心常务副主任",
       tel2:"123456",
     },
     {
       id:2,
       name:"东明路街道",
       concat1:"分管领导",
       tel1:"123456",
       concat2:"分中心常务副主任",
       tel2:"123456",
     },
     {
       id:3,
       name:"北蔡镇",
       concat1:"分管领导",
       tel1:"123456",
       concat2:"分中心常务副主任",
       tel2:"123456",
     },
   ];
  public mounted() {
  }
}
</script>
<style lang="scss" scoped>
.left-top{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .concat-box{
    width: vw(280);
    height: 100%;
    border:vw(1) solid rgba(18,85,154,1);
    box-sizing: border-box;
    padding: vh(8) vw(8);
    .concatlist{
      display: flex;
      align-items: center;
      border-bottom: vw(1) solid rgba(112, 167, 224, 0.3);
      box-sizing: border-box;
      padding: vh(7) vw(0);
      .nametit{
        width: vw(72);
        text-align: left;
      }
      span{
        font-size: vw(10);
        color: #65C6FC;
      }
      .jianju{
        margin-left: vw(11);
        .telju{
          margin-bottom: vh(5);
        }
      }
    }
    .concatlist:nth-child(4){
      border-bottom: none;
    }

  }
  .video-box{
    flex:1;
    margin-left: vw(12);
    border:vw(1) solid rgba(18,85,154,1);
    box-sizing: border-box;
    padding: vh(8) vw(8);
  }
}

</style>
