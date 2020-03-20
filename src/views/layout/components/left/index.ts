import { Component, Vue } from 'vue-property-decorator';
import leftTop from './components/leftTop/index.vue';
import leftBottom from './components/leftBottom/index.vue';
@Component({
  components: {
    leftTop,
    leftBottom,
  },
})
export default class PageTop extends Vue {
}
