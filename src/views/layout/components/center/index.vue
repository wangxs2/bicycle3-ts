<template>
  <div class="center-content">
    <div class="center-top" id="mapContainer" ref="fullScreenTarget">
      <div class="workemag" v-if="isShowWorkOrderDispose">
        <div class="myWork">
            <div class="info-close iconfont iconguanbi" @click="isShowWorkOrderDispose=false"></div>
            <div class="header-tit">
              <span class="glabfont">工单详情</span>
            </div>
            <div class="msgList" v-for="(item,index) in workOrderDisposeData.detailsTexts" :key="index">
              <span class="left-f glabfont">{{item.key}}：</span>
              <span class="left-r glabfont">{{item.val}}</span>
            </div>
            <div class="msgList">
              <span class="left-f glabfont">状态：</span>
              <span class="left-r glabfont">{{workOrderDisposeData.despatchStatus}}</span>
            </div>
            <div class="msgList" v-if="workOrderDisposeData.detailsImgs1.length>0">
              <span class="left-f glabfont">处理前：</span>
              <div class="left-r">
                 <div style="margin-right:6px;" v-for="(item,index) in workOrderDisposeData.detailsImgs1" :key="index">
                    <el-image 
                      style="width:40px; height:64px"
                      :src="item" 
                      :preview-src-list="workOrderDisposeData.detailsImgs1">
                    </el-image>
                  </div>
              </div>
            </div>
            <div class="msgList" v-if="workOrderDisposeData.detailsImgs2.length>0">
              <span class="left-f glabfont">处理后：</span>
              <div class="left-r">
                  <div style="margin-right:6px;" v-for="(item,index) in workOrderDisposeData.detailsImgs2" :key="index">
                    <el-image 
                      style="width:40px; height:64px"
                      :src="item" 
                      :preview-src-list="workOrderDisposeData.detailsImgs2">
                    </el-image>
                  </div>
                
              </div>
            </div>
            <div class="msgList" v-if="workOrderDisposeData.detailsImgs3.length>0">
              <span class="left-f glabfont">派单照片：</span>
              <div class="left-r">
                 <div style="margin-right:6px;" v-for="(item,index) in workOrderDisposeData.detailsImgs3" :key="index">
                    <el-image 
                      style="width:40px; height:64px"
                      :src="item" 
                      :preview-src-list="workOrderDisposeData.detailsImgs3">
                    </el-image>
                  </div>
              </div>
              
            </div>
        </div>
      </div>
      <!-- 全屏按钮 S -->
      <div class="full-screen-btn" @click="fullScreen">
        <img src="../../../../assets/image/qunping.png">
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

     <!-- 禁停区详情 S --> 
    <transition name="fade">
      <forbid-info v-if="ForbidName !== ''" @close="ForbidName = ''" :params="ForbidData[ForbidName]"></forbid-info>
    </transition>
    <!-- 禁停区详情 E -->

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

    <!-- 工单详情 S -->
    <transition name="fade">
      <!-- <div class="workOrder-details" >
        <div
          class="workOrder-details-close iconfont iconguanbi"
          @click="isShowWorkOrderDispose = false"
        ></div>
        <div class="details-status"><span class="glabfont">{{workOrderDisposeData.nowStatus}}</span></div>
        <div class="imgs">
          <slideshow
            v-if="isShowWorkOrderDispose"
            parendClassName="workOrder-details"
            :options="workOrderDisposeOptions"
          >
            <div
              class="swiper-slide"
              v-for="(item,index) in workOrderDisposeData.detailsImgs"
              :key="index"
            >
              <div class="img-item">
                <img :src="item.url">
                <div class="img-watermark"><span class="glabfont">{{item.text}}</span></div>
              </div>
            </div>
          </slideshow>
        </div>
        <div class="details-text">
          <p style="text-align:left;margin-bottom:0.5vh" v-for="(item,index) in workOrderDisposeData.detailsTexts" :key="index">
            <span class="glabfont">{{item.key}}：</span>
            <span class="glabfont">{{item.val}}</span>
          </p>
        </div>
        <div class="dispose-status"><span class="glabfont">{{workOrderDisposeData.despatchStatus}}</span></div>
      </div> -->
    </transition>
    <!-- 工单详情 E -->


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
