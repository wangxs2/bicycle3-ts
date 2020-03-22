<template>
  <div class="realtime">
    <div>{{timeDate.date}}</div>
    <div class="time1">{{timeDate.week}}</div>
    <div>{{timeDate.time}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
moment.locale('zh-cn');

@Component
export default class Weather extends Vue {
  public timeDate: object = {};
  public clearTime: any = null;

  public created() {
    this.setTime();
  }

  /**
   * 请求数据
   */
  public setTime(): void {
    if (this.clearTime) {
      clearTimeout(this.clearTime);
    }
    const nowDate = moment();
    const date = nowDate.format('YYYY-MM-DD HH:mm:ss').split(' ');
    const week = nowDate.format('dddd');

    this.timeDate = {
      time: date[1],
      date: date[0],
      week,
    };

    this.clearTime = setTimeout(() => {
      this.setTime();
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.realtime {
  display: flex;
  color:rgba(101,198,252,1);
  @include vw2(font-size,16);
  align-items: center;
   transform: scale(1,1.6);
  -ms-transform: scale(1,1.6);
  -webkit-transform: scale(1,1.6);
  -moz-transform: scale(1,1.6);
  -o-transform:  scale(1,1.6);
  .time1{
    // @include vw2(font-size,15);
    @include vw2(margin-right,17.71);
    @include vw2(margin-left,17.71);
    @include vw2(margin-top,-4);
  }
}
</style>
