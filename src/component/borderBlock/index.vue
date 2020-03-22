<template>
  <div class="quadrangle">
   <div class="boederh">
     <span class="borderw"></span>
     <span class="msgfont glabfont">{{msg}}</span>
   </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class BorderBlock extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="scss" scoped>
.quadrangle {
  width: 100%;
  display: flex;
  .boederh{
    display: flex;
    align-items: center;
    color: #03F1FA;
  }
  .msgfont{
    font-size: vw(13);
    margin-left: vw(6);
  }
  .borderw{
    width:vw(3);
    height:vh(10);
    background:rgba(3,241,250,1);
  }
 
}
</style>
