import { Component, Vue } from 'vue-property-decorator';
import centerBottom from './components/centerBottom.vue';
import screenfull from 'screenfull';
const fullObj: any = screenfull; // 全屏实例
import moment from 'moment';
import MyMap from './map';
import API from '@/api/index.ts';
import { arrGroup, refinedCal, eventDelegate } from '@/libs/util.ts';
let myMap: any = null; // 地图实例

interface DataFormat {
  centerLongitude: number; // 中心点
  centerLatitude: number; // 中心点
  polygonGeom: string; // 边界
  gisLevel?: number; // 放大级别
  name: string; // 区域名称
  bicycleNum: number; // 车辆数
  activeNum: number; // 活跃数
  activeRate?: number; // 活跃率
  warningFlag?: number; // 预警状态
  companyCode?: string; // 预警状态
}


@Component({
  components: {
    centerBottom,
  },
})
export default class center extends Vue {
  private settingShow: boolean = true; // 设置是否打开
  public pageConfig: any;
  // 是否显示图例
  private isShowLegend: boolean = true;
  // 是否显示表格
  private isShowLegendTab: boolean = false;
  // 当前选中的图例
  private selectLegend: number | string = -1;
  // 图例统计数据
  private legendTabHead: any[] = [
    [
      {
        name: '自检时间',
        width: 30,
      },
      {
        name: '自检单位',
        width: 26,
      },
      {
        name: '整理数',
        width: 22,
      },
      {
        name: '清运数',
        width: 22,
      },
    ],
    [
      {
        name: '派单时间',
        width: 33,
      },
      {
        name: '派单对象',
        width: 33,
      },
      {
        name: '派单部门',
        width: 33,
      },
    ],
    [
      {
        name: '派单时间',
        width: 33,
      },
      {
        name: '派单对象',
        width: 33,
      },
      {
        name: '已处理企业',
        width: 33,
      },
    ],
    [
      {
        name: '派单时间',
        width: 25,
      },
      {
        name: '派单对象',
        width: 20,
      },
      {
        name: '处理时间',
        width: 25,
      },
      {
        name: '整理数',
        width: 15,
      },
      {
        name: '清运数',
        width: 15,
      },
    ],
    [
      {
        name: '派单时间',
        width: 25,
      },
      {
        name: '派单对象',
        width: 25,
      },
      {
        name: '已处理企业',
        width: 25,
      },
      {
        name: '超时企业',
        width: 25,
      },
    ],
  ];
  // 定时器保存
  private timeoutObjs: any = {};
  private loadNum: number = 0; // 加载次数
  // 打开弹窗记录街镇名称
  private openTownName: string = '';
    // 单车曲线是否展示
    private isBicyTrend: boolean = false
  // 十五天单车曲线数据
  private bicyActiveData: any = {};
  private cityPointData: any = {}; // 市级点数据
  private areaPointData: any = {}; // 区级点数据
  // 当前选中区域的单车区域数据
  private nowBicyTrendData: any = null;
  private selectEnterpriseCode: string = 'all'; // 选择的企业编码
  private selectEnterpriseName: string = '全部'; // 选择的企业名称

  // 市级别 按三家企业分数据
  private cityCompanyData: any = null;

  // 区级别 按三家企业分数据
  private townCompanyData: any = null;
    // 不同状态的工单数据 点击图例用
  private sheetWorkOrder: any[] = [];
  private legendData: Array<{ icon: any; name: string }> = [
    {
      icon: require(`../../../../assets/image/icon_1@3x.png`),
      name: '防疫重点区',
    },
    {
      icon: require(`../../../../assets/image/icon_1@3x.png`),
      name: '自检',
    },
    {
      icon: require(`../../../../assets/image/icon_2@3x.png`),
      name: '已派单',
    },
    {
      icon: require(`../../../../assets/image/icon_3@3x.png`),
      name: '处理中',
    },
    {
      icon: require(`../../../../assets/image/icon_4@3x.png`),
      name: '已处理',
    },
    {
      icon: require(`../../../../assets/image/icon_5@3x.png`),
      name: '超时未处理',
    },
  ];
  // 企业数据
  private enterpriseData: Array<{}> = [
    {
      name: '全部',
      code: 'all',
    },
    {
      name: '摩拜',
      code: '07mobike',
    },
    {
      name: 'ofo',
      code: '05ofo',
    },
    {
      name: '哈罗',
      code: '03hellobike',
    },
  ];
  // 设置项
  private settingItemData: Array<{}> = [
    {
      state: false,
      name: '热力图',
    },
    {
      state: true,
      name: '夜间模式',
    },
    {
      state: true,
      name: '街镇信息',
    },
    {
      state: true,
      name: '禁停区域',
    },
    {
      state: true,
      name: '单车治理',
    },
    {
      state: false,
      name: '重点区违停',
    },
    {
      state: false,
      name: '防疫重点区',
    },
  ];
  public mounted() {
    myMap = new MyMap({ el: 'mapContainer' });
    this.getBicyClePosition();
    this.getTownBoundary();
    // 监听全屏事件
    fullObj.on('change', (e:any) => {
      if (e.target.className === 'center-top' && fullObj.isFullscreen) {
        window.document.documentElement.setAttribute('data-theme', 'mapFull');
      } else {
        window.document.documentElement.setAttribute('data-theme', 'default');
      }

      this.$Bus.$emit('updateScreen');
    });
  }
   // 全屏
   public fullScreen(): void {
    if (fullObj.enabled) {
      fullObj.toggle(this.$refs.fullScreenTarget);
    }
  }

    /**
   * 选择设置项
   */
  private selectSetItem(data: any): void {
    data.state = !data.state;

    switch (data.name) {
      case '热力图':
        myMap.isHeatMap(data.state);
        break;
      case '夜间模式':
        myMap.setMapStyle(data.state ? 1 : 0);
        break;
      case '街镇信息':
        myMap.isPointInfo = data.state;
        myMap.pointGroupControl();
        break;
      case '禁停区域':
        // this.ForbidName = '';
        // myMap.isForbidGroup(data.state);
        break;
      case '单车治理':
        // this.isShowLegend = data.state;
        // myMap.isWorkGroup(data.state);
        break;
      case '治理轮循':
        // this.$nextTick(function() {
        //   this.roundRobinOptions = {
        //     autoplay: true, // 可选选项，自动滑动
        //     simulateTouch: false,
        //     observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        //     observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        //     $isPage: true,
        //     $isNav: true,
        //     pagination: {
        //       el: '.workOrders .swiper-pagination',
        //       clickable: true,
        //     },
        //     navigation: {
        //       nextEl: '.workOrders .swiper-button-next',
        //       prevEl: '.workOrders .swiper-button-prev',
        //     },
        //     loop: true,
        //   };
        //   this.isShowRoundRobinData = data.state;
        // });
        break;
      case '蓝牙嗅探':
        // myMap.isStationPoint(data.state);
        break;
      case '人员位置':
        // this.isShowStaffLegend = data.state;
        // myMap.isStaffGroup(data.state);
        break;
      case '预警播报':
        // this.isEarlyWarning = data.state;
        break;
    }
  }

  /**
   * 选择图例获取 对应状态工单
   */
  private showLegendTable(index: number | string) {
    this.$nextTick(function() {
      this.selectLegend = index;
      this.isShowLegendTab = true;
    });
  }


   /**
   * 分拣不同状态的工单
   */
  private sortOutWorkOrder(res: any): void {
    // 判断工单的类型
    let item: any[] = [];
    const sortArr: any[] = [];
    res.forEach((data: any) => {
      if (data.sheetCode.includes('-CHECK-')) {
        // 自检
        if (data.sheetStatus === 2) {
          // 自检只要 自检完成的
          if (!sortArr[0]) {
            sortArr[0] = [];
          }
          item = [
            moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
            data.dispatchOrgName,
            data.arrangeNum,
            data.cleanNum,
          ];
          sortArr[0].push(item);
        }
      } else {
        // 督办
        switch (data.sheetStatus) {
          case -1:
            // 超时未处理
            if (!sortArr[4]) {
              sortArr[4] = [];
            }

            const disposeCompany = data.voList.map((items: any) => {
              return items.dealCompany;
            });

            item = [
              moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
              data.dispatchReceive,
              disposeCompany.join(','),
            ];
            sortArr[4].push(item);
            break;
          case 0:
          case 3:
            // 未处理
            // 重新派单
            if (!sortArr[1]) {
              sortArr[1] = [];
            }

            item = [
              moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
              data.dispatchReceive,
              data.dispatchOrgName,
            ];
            sortArr[1].push(item);
            break;
          case 1:
            // 处理中
            if (!sortArr[2]) {
              sortArr[2] = [];
            }
            item = [
              moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
              data.dispatchReceive,
              data.voList
                .filter((items: any) => {
                  return items.dealStatus === 2;
                })
                .map((items: any) => {
                  return items.dealCompany;
                })
                .join(','),
            ];
            sortArr[2].push(item);
            break;
          case 2:
          case 4:
            // 已处理
            // 已完成
            if (!sortArr[3]) {
              sortArr[3] = [];
            }
            item = [
              moment(data.dispatchTime).format('YYYY-MM-DD HH:mm:ss'),
              data.dispatchReceive,
              moment(data.voList[data.voList.length - 1].handleTime).format(
                'YYYY-MM-DD HH:mm:ss',
              ),
              data.arrangeNum,
              data.cleanNum,
            ];
            sortArr[3].push(item);
            break;
        }
      }
    });

    this.sheetWorkOrder = sortArr.map((itemArr: any[]) => {
      return itemArr.sort((a: any, b: any) => {
        a = new Date(a[0]);
        b = new Date(b[0]);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    });
  }

  // 定时刷新任务
  public timeoutEvent(call: any, time: number = 600000): void {
    // 先清除之前的请求
    if (this.timeoutObjs[call]) {
      clearTimeout(this.timeoutObjs[call]);
      this.timeoutObjs[call] = null;
    }

    this.timeoutObjs[call] = setTimeout(() => {
      this.timeoutObjs[call]();
    }, time);
  }
   /**
   * 单车位置 热力图
   * @param {String} companyCode 单车企业编码
   */
  private getBicyClePosition(companyCode?: string): void {
    API.getBicyClePosition(companyCode === 'all' ? '' : companyCode).then(
      (res: any): void => {
        if (res.status === 0) {
          myMap.setHeatMapData(res.hotGraph);
        }
      },
    );
  }


   /**
   * 获取中心点 边界
   */
  private getTownBoundary(): void {
    Promise.all([API.getDistrictBoundary(), API.getAreaBoundary()]).then(
      (res: any) => {
        const AllCityData: DataFormat = res[0].boundary; // 市级数据
        const DivideCityData: DataFormat[] = res[0].comanyBikeNums; // 分企业的市级数据
        const DivideAreaData: DataFormat[] = res[1].dataCompany; // 分企业的区级数据
        // 总的区级数据
        const AllAreaData: DataFormat[] = res[1].data.map(
          (item: any): any => {
            item.companyCode = 'all';
            return item;
          },
        );

        // 边界只绘制一次
        if (this.loadNum === 0) {
          this.disCityBorder(AllCityData);
          this.disAreaBorder(AllAreaData);
          this.loadNum++;
        }

        // 合并所有的区域数据
        const overallArea: DataFormat[] = [
          ...AllAreaData,
          ...DivideAreaData,
        ];
        // 合并所有的市级数据
        AllCityData.companyCode = 'all';
        const overallCity: DataFormat[] = [AllCityData, ...DivideCityData];
        // const overallCity: Array<DataFormat> = []

        // 分类数据
        const disTypeData = this.disCompanyData(overallCity, overallArea);

        this.townCompanyData = disTypeData[1];
        this.cityCompanyData = disTypeData[0];

        this.disCityData(this.selectEnterpriseCode);
        this.disAreaData(this.selectEnterpriseCode);

        // 定时刷新
        this.timeoutEvent('getTownBoundary');
      },
    );
  }


   // 处理数据 按企业分
   private disCompanyData(
    city: DataFormat[],
    town: DataFormat[],
  ): any[] {
    const cityData: any = {};
    const townData: any = {};

    // 数据类型
    const typeData: any[] = this.enterpriseData;

    typeData.forEach(
      (item: any): void => {
        townData[item.code] = [];
        cityData[item.code] = {};

        city.forEach(
          (subItem: DataFormat): void => {
            if (subItem.companyCode === item.code) {
              cityData[item.code] = {
                lng: subItem.centerLongitude,
                lat: subItem.centerLatitude,
                name: subItem.name,
                bicycleNum: subItem.bicycleNum,
                activeNum: refinedCal(`${subItem.activeRate}*100`, 2) + '%',
              };
            }
          },
        );
        town.forEach(
          (subItem: DataFormat): void => {
            if (subItem.companyCode === item.code) {
              townData[item.code].push({
                lng: subItem.centerLongitude,
                lat: subItem.centerLatitude,
                name: subItem.name,
                bicycleNum: subItem.bicycleNum,
                activeNum: refinedCal(`${subItem.activeRate}*100`, 2) + '%',
                state: subItem.warningFlag,
              });
            }
          },
        );
      },
    );

    return [cityData, townData];
  }

   // 处理市的数据
   private disCityData(key: string): void {
    const CityData: DataFormat = this.cityCompanyData[key];

    // 有修改 没有就添加
    if (this.cityPointData.name === CityData.name) {
      myMap.upDateCityPoint(CityData);
    } else {
      this.cityPointData = CityData;
      myMap
        .addOverlayGroup('cityPointGroup', myMap.createCityPoint(CityData))
        .hide();
    }
    myMap.CityPointEvent();
  }

  // 处理市级边界
  private disCityBorder(cityData: any): void {
    // 地图 中心点
    const center: number[] = [cityData.centerLongitude, cityData.centerLatitude];
    // 边界 遮罩
    const border: Array<[]> = this.FormatGolygon(cityData.polygonGeom);

    myMap.setZoomAndCenter(cityData.gisLevel, center);
    myMap.initShade(border);
  }

   // 处理区级边界
   private disAreaBorder(AreaData: DataFormat[]): void {
    let border: Array<[]> = []; // 边界
    const overlays: Array<{}> = []; // 覆盖物集合
    AreaData.forEach(
      (item: DataFormat, index: number): void => {
        if(item.polygonGeom!==undefined){
          border = this.FormatGolygon(item.polygonGeom);
          overlays.push(myMap.createAreaBorder(border, item.name));
        }
        
      },
    );

    myMap.addOverlayGroup('areaBorderGroup', overlays).hide();
  }

  // 处理区级点
  private disAreaData(key: string): void {
    const data: any[] = this.townCompanyData[key];
    
    data.forEach((item: any) => {
      if (this.areaPointData[item.name]) {
        myMap.upDateAreaPoint(item.name, item);
      } else {
        this.areaPointData[item.name] = item;
        myMap
          .addOverlayGroup('areaPointGroup', myMap.createAreaPoint(item))
          .hide();
      }
    });

    myMap.AreaPointEvent(this.openFifteenWin);
  }

   // 打开街镇 十五天趋势弹窗
   private openFifteenWin(name: string): void {
    const fifteenData: any = (this as any).bicyActiveData[name];
    this.openTownName = fifteenData.name = name;

    this.isBicyTrend = true;

    this.nowBicyTrendData = fifteenData;
  }

  // 格式边界数据
  private FormatGolygon(polygon: string): Array<[]> {
    const polygonGeom: Array<number | string> = polygon
      .slice(9, -2)
      .split(/\,|\s/);

    return arrGroup(polygonGeom, 2);
  }

  
}
