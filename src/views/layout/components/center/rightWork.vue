<template>
     <div class="myWork">
        <div class="info-close iconfont iconguanbi" @click="isshowimg1=false"></div>
        <div class="header-tit">
          <span class="glabfont">工单详情</span>
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


</style>
