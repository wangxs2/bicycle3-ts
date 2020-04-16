import echarts from 'echarts';
export default class MyEcharts {
  public peak: any = null;

  constructor() {
    this.initEcharts();
  }
  // 初始化
  public initEcharts(): void {
    const peak: any = document.querySelector('#peak');
    this.peak = echarts.init(peak);
    window.addEventListener('resize', () => {
      this.peak.resize();
      
    });
  }

  // 清除
  public clearContainer(el: string) {
    (this as any)[el].clear();
  }

  // 配置项
  // el: 容器id
  // x: x轴数据
  // bar: y轴数据 柱状图
  // line: y轴数据 折线图
  // name: 数据标题

  public echartsOption(params: any): void {
    const option: any = {
      color:params.color,
      grid: {
        top: '40',
        bottom: '30',
        right:"8",
        left:"84",
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        right : '8',
        textStyle:{
          color:"#C3CAD9",
          fontSize : 20    //更改坐标轴文字大小
        }
      },
      textStyle: {
        color: '#C3CAD9',
        fontSize : 20     //更改坐标轴文字大小
      },
      xAxis: {
        type: 'category',
        boundaryGap:false,
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
          fontSize : 20 
        },
        axisLabel: {
          show:true,
          fontSize : 20   //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#657CA8'],
            opacity: 0.1,
          },
        },
        data: params.x,
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        axisLabel: {
          show:true,
          fontSize : 20   //调整数值改变倾斜的幅度（范围-90到90）
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          color: '#C3CAD9',
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#12559A'],
            opacity: 0.1,
          },
        },
        minInterval: 1,
        name: '数量(辆)',
      },
      series: params.line,
    };
    // setTimeout((this as any)[params.el].setOption(option), 500);
    (this as any)[params.el].setOption(option, true);
  }
}
