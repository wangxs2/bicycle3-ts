<template>
     <div class="myWork" v-if="isshowimg1">
        <div class="info-close iconfont iconguanbi" @click="isshowimg1=false"></div>
        <div class="header-tit">
          <span class="glabfont">摩拜</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">单号</span>
          <span class="left-r glabfont">20200409-CHECK-957</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">地点</span>
          <span class="left-r glabfont">南泉北路新大陆车库入口旁</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">派单时间</span>
          <span class="left-r glabfont">2018-11-22 13:47</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">派单人(街道)</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">处理方式</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">企业</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">状态</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">处理前照片</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
        <div class="msgList">
          <span class="left-f glabfont">处理后照片</span>
          <span class="left-r glabfont">陆家嘴街道</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class rightWork extends Vue {
  // @Prop() 
  private isshowimg1: boolean=true;


   public mounted() {
    
  }

}
</script>

<style lang="scss" scoped>
.myWork{
    width:vw(250);
    background:rgba(12,58,111,1);
    border:1px solid rgba(50,134,217,1);
    box-shadow: rgba(12,58,111,0.6) 0 0 vw(10) vw(4) inset;
    .info-close{
        position: absolute;
        z-index: 10;
        right:vw(6);
        top:vh(8);
        color:#ffffff;
        cursor:pointer;
    }
    .header-tit{
      width:100%;
      height:vh(25);
      background:rgba(245,247,250,0.07);
      display:flex;
      align-items: center;
      justify-content: center;
      span{
        font-size:vw(11);
        color:#ffffff;
      }
    }
    .msgList{
      box-sizing:border-box;
      padding:vh(8) vw(8);
      .left-f{
        display:inline-block;
        width:35%;
        font-size:vw(10);
        color:#65C6FC;
        text-align:left;
      }
      .left-r{
        display:inline-block;
        width:65%;
        font-size:vw(10);
        color:#ffffff;
        text-align:left;
      }
    }
}

</style>
