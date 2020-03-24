import { Component, Vue } from 'vue-property-decorator';
import rightTop from './components/rightTop.vue';

import rightBottom from './components/rightBottom.vue';
@Component({
  components: {
    rightTop,
    rightBottom,
    
  },
})
export default class PageTop extends Vue {
}
