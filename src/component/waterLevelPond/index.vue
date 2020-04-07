<template>
     <div class="boll" :style="{borderColor:borderColor}">
        <div class="num">{{score}}<span>分</span></div>
        <!-- <div class="water w1" ></div> -->
        <!-- <div class="water w2"></div> -->
        <div :style="{top:(100-score-9)+'%',background:'url('+imgBg+')  repeat-x',backgroundSize:'contain',}" class="water"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class waterPolo extends Vue {
  @Prop() private score: number=0;
  @Prop() private borderColor: string="";
  @Prop() private imgBg: any=null;
  
  private context: any=null
  

}
</script>

<style lang="scss" scoped>
    @-webkit-keyframes move_wave {
            0% { background-position:0 0 }
            to { background-position:798px 0 }
        }
 
        @keyframes move_wave {
            0% { background-position:0 0 }
            to { background-position:798px 0 }
        }
 
        .boll {
            height: 100%;
            width:100%;
            border-radius: 50%;
            border: vw(1) solid #FFC955;
            float: left;
            position: relative;
            font-size: 14px;
            overflow: hidden;
            // background:#002256;
        }
 
        .text {
            text-align: center;
            margin-top: 40px;
            color: #fe810c;
        }
 
        .num {
            font-size:vw(21);
            position: absolute;
            z-index:2;
            color:#ffffff;
            top:34%;
            left:17%;
            span{
                font-size:vw(10);
            }
        }
 
        .water {
            height: 100%;
            position: absolute;
            width: 100%;
            top:0;
            left:0;
            -webkit-animation: move_wave 4s linear infinite;
            animation: move_wave 4s linear infinite;
        }
        
        .w1 {
            opacity: .5;
            background-position: 120px 0;
            -webkit-animation: move_wave 10s linear infinite;
            animation: move_wave 10s linear infinite;
        }
 
        .w2 {
            opacity: .3;
            background-position: 60px 0;
            -webkit-animation: move_wave 8s linear infinite;
            animation: move_wave 8s linear infinite;
        }
</style>
