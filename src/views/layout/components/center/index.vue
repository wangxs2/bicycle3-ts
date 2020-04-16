<template>
  <div class="center-content">
    <div class="center-top" id="mapContainer" ref="fullScreenTarget">
      <div class="workemag" v-if="isShowWorkOrderDispose">
        <div class="myWork">
          <div class="info-close iconfont iconguanbi" @click="isShowWorkOrderDispose=false"></div>
          <div class="header-tit">
            <span class="glabfont">工单详情</span>
          </div>
          <div
            class="msgList"
            v-for="(item,index) in workOrderDisposeData.detailsTexts"
            :key="index"
          >
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
              <div
                style="margin-right:6px;"
                v-for="(item,index) in workOrderDisposeData.detailsImgs1"
                :key="index"
              >
                <el-image
                  style="width:40px; height:64px"
                  :src="item"
                  :preview-src-list="workOrderDisposeData.detailsImgs1"
                ></el-image>
              </div>
            </div>
          </div>
          <div class="msgList" v-if="workOrderDisposeData.detailsImgs2.length>0">
            <span class="left-f glabfont">处理后：</span>
            <div class="left-r">
              <div
                style="margin-right:6px;"
                v-for="(item,index) in workOrderDisposeData.detailsImgs2"
                :key="index"
              >
                <el-image
                  style="width:40px; height:64px"
                  :src="item"
                  :preview-src-list="workOrderDisposeData.detailsImgs2"
                ></el-image>
              </div>
            </div>
          </div>
          <div class="msgList" v-if="workOrderDisposeData.detailsImgs3.length>0">
            <span class="left-f glabfont">派单照片：</span>
            <div class="left-r">
              <div
                style="margin-right:6px;"
                v-for="(item,index) in workOrderDisposeData.detailsImgs3"
                :key="index"
              >
                <el-image
                  style="width:40px; height:64px"
                  :src="item"
                  :preview-src-list="workOrderDisposeData.detailsImgs3"
                ></el-image>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 全屏按钮 S -->
      <div class="full-screen-btn" @click="fullScreen">
        <img src="../../../../assets/image/qunping.png" />
      </div>
      <!-- 全屏按钮 E -->
      <!-- 工单详情 S -->
      <div class="wokr-btn" @click="isshowtable=true">
        <span class="glabfont" style="border:0.03vw solid #03f1fa;cursor:pointer;width:3vw;font-size:0.1vw;color:#65C6FC;background:rgba(12, 58, 111, 0.8);padding:0.2vh 0.3vw;border-radius:0.2vw">工单列表</span>
      </div>
      <!-- 工单详情 E -->
      <!-- 表格的弹框 -->
      <div class="mytable" v-if="isshowtable">
        <div class="info-close iconfont iconguanbi" @click="isshowtable=false"></div>
        <div class="tabscroll">
          <table cellspacing="0" cellpadding="0">
            <thead>
              <tr>
                <th>
                  <span class="glabfont">序号</span>
                </th>
                <th>
                  <span class="glabfont">单号</span>
                </th>
                <th>
                  <span class="glabfont">派单时间</span>
                </th>
                <th>
                  <span class="glabfont">地点</span>
                </th>
                <th>
                  <span class="glabfont">处理单位</span>
                </th>
                <th>
                  <span class="glabfont">状态</span>
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in dataTable" :key="index">
                <td>
                  <span class="glabfont">{{index+1}}</span>
                </td>
                <td>
                  <span class="glabfont">{{item.sheetCode}}</span>
                </td>
                <td>
                  <span class="glabfont">{{dateFormat("YYYY-mm-dd HH:MM", new Date(item.dispatchTime))}}</span>
                </td>
                <td>
                  <span class="glabfont">{{item.handleAddr}}</span>
                </td>
                <td>
                  <span class="glabfont">{{item.dispatchReceive}}</span>
                </td>
                <td>
                  <span class="glabfont" style="display:inline-block;width:2vw">{{sheetd[item.sheetStatus]}}</span>
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 表格的弹框 -->

      <!-- 设置按钮 S -->
      <div class="setting-btn" @click="settingShow = !settingShow">
        <img
          src="../../../../assets/image/icon_display_pre@3x.png"
          draggable="false"
          v-if="settingShow"
        />
        <img src="../../../../assets/image/icon_display_nor@3x.png" draggable="false" v-else />
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
              <img src="@img/select_pre1.png" draggable="false" v-if="item.state" />
              <img src="@img/select_nor1.png" draggable="false" v-else />
              <span class="glabfont">{{item.name}}</span>
            </div>
          </div>
          <!-- 设置项 -->
        </div>
      </transition>
      <!-- 设置内容 E -->

      <!-- 禁停区详情 S -->
      <transition name="fade">
        <forbid-info
          v-if="ForbidName !== ''"
          @close="ForbidName = ''"
          :params="ForbidData[ForbidName]"
        ></forbid-info>
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
            <img :src="item.icon" />
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
        </div>-->
      </transition>
      <!-- 工单详情 E -->
    </div>

    <div class="center-bottom">
      <div class="class-right">
        <borderBlock :msg="msgconcat"></borderBlock>
        <div class="class-box">
            <div class="itea-class" @click="isClass=1"><span>111</span></div>
            <div class="itea-class" @click="isClass=2"><span>222</span></div>
        </div>
      </div>
      <div class="tableox">
        <center-bottom v-if="isClass==1"></center-bottom>
        <tableBottom v-if="isClass==2"></tableBottom>
      </div>
      <!-- <center-bottom></center-bottom> -->
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" scoped src="./index.scss"></style>
