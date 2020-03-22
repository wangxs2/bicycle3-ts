interface Params {
  el: string;
  [propName: string]: any;
}
import { judgeType } from '@/libs/util.ts';
class MyMap {
  public el: string = ''; // 地图容器
  public map: any = null; // 地图实例
  public heatmap: any = null; // 热力图
  public provincePointGroup: any = new AMap.OverlayGroup(); // 省级点集合 上海市
  public provinceBorderGroup: any = new AMap.OverlayGroup(); // 省级边界集合 上海市

  public cityPointGroup: any = new AMap.OverlayGroup(); // 市级点集合 徐汇区
  public cityBorderGroup: any = new AMap.OverlayGroup(); // 市级边界集合 徐汇区

  public areaPointGroup: any = new AMap.OverlayGroup(); // 区级点集合 街道
  public areaBorderGroup: any = new AMap.OverlayGroup(); // 区级边界集合 街道
  public mapCenter: Array<number | string> = [121.544379,31.221517]; // 默认地图中心点
  public isPointInfo: boolean = true; // 行政区域点是否显示

  public ApointEvent: any[] = []; // 区级点事件
  public CpointEvent: any[] = []; // 市级点事件
  public mapStyle: string[] = ['amap://styles/normal', 'amap://styles/dbac6f5cf3de9f9a42262be47f18df58']; // 自定义地图 0 标准 1 自定义
  
  constructor(data: Params) {
    this.el = data.el;
    this.initMap();
    this.initHeatMap();
    this.mapEvent();
  }


  // 地图事件
  public mapEvent(): void {
    // 地图缩放级别
    this.map.on('zoomend', () => {
    });
  }
  // 设置地图样式id：0 标准 1 自定义
  public setMapStyle(id: number = 0): void {
    this.map.setMapStyle(this.mapStyle[id]);
  }
  // 设置地图中心点和缩放级别 coord 数组
  public setZoomAndCenter(
    zoom: number = 10,
    coord: any = this.mapCenter,
  ): void {
    this.map.setZoomAndCenter(zoom, coord);
  }
  // 初始化地图
  private initMap(): void {
    this.map = new AMap.Map(this.el, {
      mapStyle: this.mapStyle[1], // 自定义地图样式
      zoom:11, // 地图级别
      center: this.mapCenter, // 中心点
      resizeEnable: true, // 监控地图容器尺寸变化
      expandZoomRange: true, // 是否支持可以扩展最大缩放级别 到20级
    });

    // 添加图层
    this.map.add([
      this.provincePointGroup,
    ]);
  }


  // 向组里面添加覆盖物
  public addOverlayGroup(item: string, overlay: any): any {
    const type: string = judgeType(overlay);
    if (type === 'object') {
      (this as any)[item].addOverlay(overlay);
    } else if (type === 'array') {
      (this as any)[item].addOverlays(overlay);
    }
    return (this as any)[item];
  }


  // 创建市级点
  public createCityPoint(markData: any): object {
    const marker: object = new AMap.Marker({
      position: new AMap.LngLat(markData.lng, markData.lat),
      offset: new AMap.Pixel(-65, -65),
      content: this.setContent(markData),
      extData: { data: markData },
    });
    return marker;
  }

  // 修改市级点
  public upDateCityPoint(markData: any): void {
    this.cityPointGroup.getOverlays()[0].setContent(this.setContent(markData));
  }

  // 状态转颜色
  public getColor(state: number = -1): string {
    let color: string = '';
    switch (state) {
      case -1:
        color = '#8094dd';
        break;
      case 1:
        color = '#fe4a5d';
        break;
      case 0:
        color = '#ff6d10';
        break;
      default:
        color = '#db36f5';
    }
    return color;
  }

  // 设置内容 蓝色： #8094dd 紫色：#db36f5 黄色：#FF6D10
  public setContent(row: any, state: number = -1): string {
    return `<div class="adminPoint" style="font-size:16px;font-weight:bold;background-color: ${this.getColor(
      state,
    )};opacity: 0.8;color:#ffffff; height: 130px; width: 130px; border-radius: 50%;">
        <div style="width:100%;
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:center;
                    align-items: center;">
          <p style="margin:0;padding-bottom:10px">${row.name}</p>
          <p style="margin:0">总量:${row.bicycleNum}</p>
          <p style="margin:0;margin-top:5px;">活跃率:${row.activeNum}</p>
        </div>
      </div>
    `;
  }



  // 市级点 事件
  public CityPointEvent(): void {
    // 事件先清除再添加
    this.CpointEvent.forEach((item: any) => {
      AMap.event.removeListener(item);
    });
    this.CpointEvent = [];

    this.CpointEvent.push(
      AMap.event.addListener(this.cityPointGroup, 'click', (e: any) => {
        this.setZoomAndCenter(14, e.lnglat);
      }),
    );
    this.CpointEvent.push(
      AMap.event.addListener(this.cityPointGroup, 'mousemove', (e: any) => {
        const tagNode = e.target.he.contentDom.children[0];
        tagNode.style.backgroundColor = this.getColor(1000);
      }),
    );
    this.CpointEvent.push(
      AMap.event.addListener(this.cityPointGroup, 'mouseout', (e: any) => {
        const tagNode = e.target.he.contentDom.children[0];
        tagNode.style.backgroundColor = this.getColor(-1);
      }),
    );
  }



  // 创建区级 边界
  public createAreaBorder(path: Array<[]>, name: string): object {
    const polygon: object = new AMap.Polygon({
      path,
      strokeColor: '#db36f5',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#0d2055',
      fillOpacity: 0,
      extData: {
        name,
      },
    });
    return polygon;
  }

  
  // 创建区级点
  public createAreaPoint(markData: any) {
    console.log(markData)
    if(markData.lng&&markData.lat){
      const marker: object = new AMap.Marker({
        position: new AMap.LngLat(markData.lng, markData.lat),
        offset: new AMap.Pixel(-65, -65),
        topWhenClick: true,
        content: this.setContent(markData, markData.state),
        extData: {
          index: markData.index,
          name: markData.name,
          state: markData.state,
        },
      });
      return marker;
    }
  }

  // 区级点 事件
  public AreaPointEvent(callback: any): void {
    // 小优化
    let nameFlag: string = '';
    // 事件先清除再添加
    this.ApointEvent.forEach((item: any) => {
      AMap.event.removeListener(item);
    });
    this.ApointEvent = [];

    this.ApointEvent.push(
      AMap.event.addListener(this.areaPointGroup, 'click', (e: any) => {
        const name: string = e.target.getExtData().name;

        if (name) {
            callback(name);
          }
      }),
    );
    this.ApointEvent.push(
      AMap.event.addListener(this.areaPointGroup, 'mousemove', (e: any) => {
        const name: string = e.target.getExtData().name;
        if (nameFlag !== name) {
          const tagNode = e.target.he.contentDom.children[0];
          // 显示边界
          this.areaBorderGroup
            .getOverlays()
            .find(
              (item: any): boolean => {
                return item.he.extData.name === name;
              },
            )
            .show();
          nameFlag = name;
          // 选中状态
          tagNode.style.backgroundColor = this.getColor(100);
        }
      }),
    );
    this.ApointEvent.push(
      AMap.event.addListener(this.areaPointGroup, 'mouseout', (e: any) => {
        const params: any = e.target.getExtData();
        const name: string = params.name;
        const state: number = params.state;
        const tagNode = e.target.he.contentDom.children[0];
        // 隐藏边界
        this.areaBorderGroup
          .getOverlays()
          .find(
            (item: any): boolean => {
              return item.he.extData.name === name;
            },
          )
          .hide();
        tagNode.style.backgroundColor = this.getColor(state);
        nameFlag = '';
      }),
    );
  }

  // 修改区级点
  public upDateAreaPoint(name: string, markData: any): void {
    const Evnet = this.areaPointGroup.getOverlays().find(
      (item: any): boolean => {
        return item.he.extData.name === name;
      },
    );

    Evnet.setContent(this.setContent(markData, markData.state));
    Evnet.setExtData({
      index: markData.index,
      name: markData.name,
      state: markData.state,
    });
  }
    // 初始化热力图
    public initHeatMap(): void {
      this.map.plugin(
        ['AMap.Heatmap'],
        (): void => {
          this.heatmap = new AMap.Heatmap(this.map, {
            radius: 20,
            opacity: [0, 0.8],
            gradient: {
              0.1: '#3A7340',
              0.25: '#62A924',
              0.55: '#5AB327',
              0.85: '#82D105',
              1: '#CA6606',
            },
          });
        },
      );
      this.isHeatMap(false);
    }
  
    // 显示/隐藏 热力图
    public isHeatMap(flag: boolean): void {
      flag ? this.heatmap.show() : this.heatmap.hide();
    }
  
    // 设置热力图展现的数据集
    public setHeatMapData(points: any, max: number = 80): void {
      this.heatmap.setDataSet({ data: points, max });
    }

    // 行政区域显示/隐藏控制
  public pointGroupControl(): void {
    if (!this.isPointInfo) {
      this.provincePointGroup.hide();
      this.cityPointGroup.hide();
      this.areaPointGroup.hide();
      return;
    } else {
      const zoom: number = this.map.getZoom();

      // console.log(zoom)
      if (zoom < 14 && zoom > 11 && this.isPointInfo) {
        this.cityPointGroup.show();
      } else {
        this.cityPointGroup.hide();
      }

      if (zoom > 13 && zoom < 16 && this.isPointInfo) {
        this.areaPointGroup.show();
      } else {
        this.areaPointGroup.hide();
      }
    }
  }

    // 绘制 遮罩 行政边界
  public initShade(path: Array<string | number>): void {
    // 全图大遮罩
    const pathArray: Array<{}> = [
      [
        new AMap.LngLat(-360, 90, true),
        new AMap.LngLat(-360, -90, true),
        new AMap.LngLat(360, -90, true),
        new AMap.LngLat(360, 90, true),
      ],
    ];

    // 抠图
    pathArray.push.apply(pathArray, [path]);

    const polygon: any = new AMap.Polygon({
      path: pathArray,
      // strokeColor: '#db36f5',
      strokeColor: '#745E3A',
      strokeWeight: 2,
      strokeOpacity: 1,
      fillColor: '#0d2055',
      fillOpacity: 0.4,
    });

    // polygon.setPath(pathArray)
    this.map.add(polygon);
  }
}

export default MyMap;
