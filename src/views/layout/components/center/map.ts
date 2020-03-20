interface Params {
  el: string;
  [propName: string]: any;
}
class MyMap {
  public el: string = ''; // 地图容器
  public map: any = null; // 地图实例
  public mapCenter: Array<number | string> = [107.608937, 33.429569]; // 默认地图中心点
  public mapStyle: string[] = ['amap://styles/normal', 'amap://styles/dbac6f5cf3de9f9a42262be47f18df58']; // 自定义地图 0 标准 1 自定义
  
  constructor(data: Params) {
    this.el = data.el;
    this.initMap();
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
      zoom: 4, // 地图级别
      center: this.mapCenter, // 中心点
      resizeEnable: true, // 监控地图容器尺寸变化
      expandZoomRange: true, // 是否支持可以扩展最大缩放级别 到20级
    });

    // 添加图层
    this.map.add([
      
    ]);
  }
}

export default MyMap;
