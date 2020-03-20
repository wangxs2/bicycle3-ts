import { Component, Vue } from 'vue-property-decorator';
import rightTop from './components/rightTop/index.vue';
import rightBottom from './components/rightBottom/index.vue';
@Component({
  components: {
    rightTop,
    rightBottom,
  },
})
export default class PageTop extends Vue {
}
