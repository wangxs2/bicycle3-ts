<template>
  <div class="center-content">
    <div class="center-top" id="mapContainer" ref="fullScreenTarget">
      <!-- 全屏按钮 S -->
      <div class="full-screen-btn" @click="fullScreen">
        <i class="iconfont icon-quanping1"></i>
      </div>
      <!-- 全屏按钮 E -->

      <!-- 设置按钮 S -->
      <div class="setting-btn" @click="settingShow = !settingShow">
        <img src="../../../../assets/image/icon_display_pre@3x.png" draggable="false" v-if="settingShow">
        <img src="../../../../assets/image/icon_display_nor@3x.png" draggable="false" v-else>
        <span class="glabfont">显示设置</span>
      </div>
      <!-- 设置按钮 E -->
      <!-- 设置内容 S -->
    <transition
      name="from-above-down"
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <div class="setting-content" v-show="settingShow">
        <!-- 企业 -->
        <!-- 企业 -->

        <!-- 设置项 -->
        <div class="setting-selects">
          <div
            class="selects-item"
            v-for="(item,index) in settingItemData"
            @click="selectSetItem(item)"
            :key="index"
          >
            <img src="@img/select_pre1.png" draggable="false" v-if="item.state">
            <img src="@img/select_nor1.png" draggable="false" v-else>
            <span class="glabfont">{{item.name}}</span>
          </div>
        </div>
        <!-- 设置项 -->
      </div>
    </transition>
    <!-- 设置内容 E -->

    <!-- 工单图例 S -->
    <transition name="fade">
      <div class="map-legend" @mouseleave="isShowLegendTab = false" v-if="isShowLegend">
        <div
          class="legend-item"
          @click="showLegendTable(index)"
          v-for="(item,index) in legendData"
          :key="index"
        >
          <img :src="item.icon">
          <span class="glabfont">{{item.name}}</span>
        </div>

        <div class="workOrder-tab" v-show="isShowLegendTab">
          <div class="slide-box">
            <div class="tab-head">
              <div
                :style="{width: item.width + '%'}"
                v-for="(item,index) in legendTabHead[selectLegend]"
                :key="index"
              >
                <span>{{item.name}}</span>
              </div>
            </div>
            <div class="tab-body">
              <div
                class="tab-item"
                v-for="(item,index) in sheetWorkOrder[selectLegend]"
                :key="index"
              >
                <div
                  :style="{width: legendTabHead[selectLegend][subindex].width + '%'}"
                  v-for="(subItem,subindex) in item"
                  :key="subindex"
                >
                  <span>{{subItem}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 工单图例 E -->


    </div>
    <div class="center-bottom">
       <borderBlock :msg="msgconcat"></borderBlock>
       <div class="tableox">
         <center-bottom></center-bottom>
       </div>
      <!-- <center-bottom></center-bottom> -->
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped src="./index.scss"></style>
