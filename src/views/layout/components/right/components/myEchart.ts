import echarts from 'echarts';
export default class MyEcharts {
  public town: any = null;
  public company: any = null;
  constructor() {
    this.initEcharts();
  }
  // 初始化
  public initEcharts(): void {
    const town: any = document.querySelector('#town');
    this.town = echarts.init(town);
    const company: any = document.querySelector('#company');
    this.company = echarts.init(company);
    window.addEventListener('resize', () => {
      this.town.resize();
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

  public echartsOption(params: any): void {
    const option: any = {
      grid: {
        top: '20',
        bottom: '40',
        right:"8",
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      textStyle: {
        color: '#C3CAD9',
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
        },
        axisLine: {
          lineStyle: {
            color: '#12559A',
          },
        },
        
        axisLabel: {
          interval:0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
          rotate:30   //调整数值改变倾斜的幅度（范围-90到90）
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
      series: [{
          data: params.dataY,
          type: 'bar',
          barWidth:14,
          itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#A257FF'
                }, {
                    offset: 1,
                    color: '#753CFF'
                }]),
            }
          },
      }],
    };
    // setTimeout((this as any)[params.el].setOption(option), 500);
    (this as any)[params.el].setOption(option, true);
  }


  public echartsOption1(params: any): void {
    const option: any = {
      grid: {
        top: '20',
        bottom: '40',
        right:"8",
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: false,
      },
      textStyle: {
        color: '#C3CAD9',
      },
      xAxis: {
        type: 'category',
        nameTextStyle: {
          verticalAlign: 'bottom',
          color: '#C3CAD9',
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
          data: [88, 90, 88, 80, 70, 96, 86],
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
        data: [86, 71, 76, 80, 70, 86, 87],
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
