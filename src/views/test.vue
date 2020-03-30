<template>
  <div class="waterPolo" >
      <canvas id="myCanvas"  />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class waterPolo extends Vue {
  @Prop() private msg!: string;
  private context: any=null
  private options: any={
    value:50,
    a:20,//振幅
    pos:[50,60],//水球图位置
    r:40,//水球图半径
    color:['#2E5199','#1567c8','#1593E7','#42B8F9']//水纹颜色
  };


public mounted() {
  
     setTimeout(()=>{
        let c: any=document.querySelector("#myCanvas");
        console.log(c);
        this.context=c.getContext("2d");
        console.log(this.options)
        this.start(this.options);
    },500)
    // this.start(this.options);
}
public created() {
}



/**
* 绘制水球图
*/
  private start(options:any): void {
    this.context.translate(options.pos[0],options.pos[1]);
    this.context.font = 'bold 18px Arial';
    this.context.textAlign='center';
    this.context.textBaseLine = 'baseline';
    //计算水球图绘图数据
    this.createParams(options);
    //开启帧动画
    window.requestAnimationFrame(this.startAnim)
    // this.requestAnimationFrame(this.startAnim())
  }


  //生成水波动画参数，位置坐标公式为 y = A * (wt + φ)
private createParams(options:any): void {
   options.w = [];//存储水波的角速度
   options.theta = [];//存储每条水波的位移
   for(let i = 0; i < 4; i++){
     options.w.push(Math.PI /(100 + 20*Math.random()));
     options.theta.push(20*Math.random());
   }
}


//绘制水波线
private drawWaterLines(options:any): void {
  let offset;
  let A = options.a;//正弦曲线振幅
  let y,x,w,theta;
  let r = options.r;
  //遍历每一条水纹理
  for(let line = 0; line < 4; line++){ 
    this.context.save();
    //每次绘制时水波的偏移距离
    theta = Math.random();
    offset = r + A / 2  -  (r*19/8 + A) * (options.value / 100 ) + line * r/12;
    //获取正弦曲线计算参数
    w = options.w[line];
    theta = options.theta[line];
    this.context.fillStyle = options.color[line];
    this.context.moveTo(0,0);
    this.context.beginPath(); 
    //以0.1为步长绘制正弦曲线
    for(x = 0; x <= 2*r; x+=0.1){
       y = A * Math.sin(w * x + theta) + offset;
       //绘制点
       this.context.lineTo(x,y);
    }
     //绘制为超出水球范围的封闭图形
     this.context.lineTo(x,r);
     this.context.lineTo(x - 2 * r,r);
     this.context.lineTo(0, A * Math.sin(theta) - options.height);
     this.context.closePath();
     //填充封闭图形得到一条水波
     this.context.fill();
     //截取水波范围，绘制文字（此处将在后文解释）
     this.context.clip();
     this.context.fillStyle = 'white';
     this.context.fillText(parseInt(options.value,10) + '%',options.r + 10,10);
     this.context.restore();
  }
}


//绘制最底层文字
private drawText1(options:any): void {
   this.context.fillStyle = options.color[0];
   this.context.fillText(parseInt(options.value,10) + '%',options.r + 10,10);
}

//帧动画循环
private startAnim(): void {
   //用位移变化模拟水波
   this.options.theta = this.options.theta.map((item:any)=>item-0.03);
   //用百分比进度计算水波的高度
//    this.options.value += this.options.value > 100 ? 0:0.1;
   this.context.save();
   this.resetClip(this.options);//剪切绘图区
   this.drawText1(this.options);//绘制蓝色文字
   this.drawWaterLines(this.options);//绘制水波线
   this.context.restore();
   window.requestAnimationFrame(this.startAnim)
//    this.requestAnimationFrame(this.startAnim());
}

/**设置水球范围为剪裁区域
*(本例中并没有水球以外的部分需要绘制，实际上这里不需要加入帧动画循环中，只需要在开头设置一次即可。)
*/
private resetClip(options:any): void {
  let r = options.r;
  this.context.strokeStyle = '#2E5199';
  this.context.fillStyle = 'white';
  this.context.lineWidth = 1;
  this.context.beginPath();
  this.context.arc(r, 0, r, 0, 2*Math.PI, false);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
  this.context.beginPath();
  this.context.arc(r, 0, r, 0, 2*Math.PI, true);
  this.context.clip();
}


}
</script>

<style lang="scss" scoped>
.waterPolo {
    width: 600px;
    height: 600px;
    border: 1px solid red;
    #myCanvas{
        width:100%;
        height:100%;
    }
}
</style>
