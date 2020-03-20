import { Component, Vue } from 'vue-property-decorator';
import centerBottom from './components/centerBottom.vue';
import MyMap from './map';
let myMap: any = null; // 地图实例
@Component({
  components: {
    centerBottom,
  },
})
export default class center extends Vue {
  public mounted() {
    myMap = new MyMap({ el: 'mapContainer' });
  }
}
