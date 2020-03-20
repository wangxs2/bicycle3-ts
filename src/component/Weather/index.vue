<template>
  <div class="weather">
    <div class="temp">{{weatherData.low_temp}} - {{weatherData.high_temp}}℃</div>
    <img :src="weatherData.img">
    <div class="temp1">{{weatherData.desc}}</div>
    <div class="temp1 temp3" v-if="weatherData.api">AQI {{weatherData.api}}</div>
    <div class="temp1 temp2" v-if="weatherData.wind">风力: {{weatherData.wind}}</div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import API from '@/api/index.ts';

@Component
export default class Weather extends Vue {
  public weatherData: object = {};

  public created() {
    this.getWeather();
  }

  /**
   * 请求数据
   */
  public getWeather(): void {
    API.getWeather().then((res: any) => {
      if (res.message === 'success') {
        const aqi = res.data.en.quality ? res.data.en.quality : '良';
        const thisWeather = res.data.forcast[0];
        // 是否白天
        const timeType =
          new Date(res.data.update_time).getHours() < 17 ? 'day' : 'night';
        const desc = thisWeather[timeType].type;
        const wind = res.data.current_wind_orient+res.data.current_wind
        this.weatherData = {
          aqi,
          img: require(`@img/weather/${desc}.png`),
          // img: `${process.env.BASE_URL}weather/${desc}.png`,
          low_temp: thisWeather.low_temp.slice(0, -1),
          high_temp: thisWeather.high_temp.slice(0, -1),
          wind,
          desc,
        };
      }
    });

    
  }
}
</script>

<style lang="scss" scoped>
.weather {
  display: flex;
  color:rgba(101,198,252,1);
  align-items: center;
  .temp{
    @include vw2(font-size,16);
  }
  .temp1{
    @include vw2(font-size,15);
  }
  img{
    @include vw2(width,26.29);
    @include vw2(height,19.43);
    @include vw2(margin-left,16.29);
  }
  .temp2,.temp3{
    @include vw2(margin-left,17);
  }

 
}
</style>
