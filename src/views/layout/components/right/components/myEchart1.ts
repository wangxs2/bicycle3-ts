import echarts from 'echarts';
export default class MyEcharts {
  public company: any = null;
  constructor() {
    this.initEcharts();
  }
  // 初始化
  public initEcharts(): void {
    
    const company: any = document.querySelector('#company');
    this.company = echarts.init(company);
    window.addEventListener('resize', () => {
      this.company.resize();
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

  


  public echartsOption1(params: any): void {
    const option: any = {
      grid: {
        top: '20',
        bottom: '40',
        right:"8",
        left:"40",
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      textStyle: {
        color: '#C3CAD9',
        fontSize : 20 
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
          fontSize : 20 
        },
        axisLabel:{
            show:true,
            fontSize : 20
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
        axisLabel:{
            show:true,
            fontSize : 20 
        },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
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
        name: '',
      },
      series: [
        {
          data: params.data1,
          type: 'bar',
          barWidth:10,
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FF8434'
                }, {
                    offset: 1,
                    color: '#FF9D5E'
                }]),
            }
          },
      },
      {
        data: params.data2,
        type: 'bar',
        barWidth:10,
        itemStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#5C73FF'
              }, {
                  offset: 1,
                  color: '#3CB1F7'
              }]),
          }
        },
    },
    ],
    };
    // setTimeout((this as any)[params.el].setOption(option), 500);
    (this as any)[params.el].setOption(option, true);
  }
}
