import { Component, Vue } from 'vue-property-decorator';
import leftTop from './components/lefttop.vue';
import leftBottom from './components/leftbottom.vue';
@Component({
  components: {
    leftTop,
    leftBottom,
  },
})
export default class PageTop extends Vue {
}
