import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import * as echarts from 'echarts';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss']
})
export class CustomChartComponent implements OnInit {
  // 图表宽高
  cWidth: string = '';
  cHeight: string = '';
  // 图表的实例。用于初始化和清除实例
  instanceChart = null;
  // 是否展示选择数据源按钮
  showBtn: boolean = false;
  // 是否为新添加的模块
  isNew: boolean = false;
  // 是否展示新图表
  isShowNew: boolean = false;

  constructor(private dialogService: DialogService) { }

  @Input() eWidth: number = 0;
  @Input() eHeight: number = 0;
  @Input() index: number = 0;
  @Input() isAdd: boolean = false;

  ngOnInit(): void { }

  ngOnChanges(change) {
    // 当接收到新的值时对图表清除实例并重新渲染
    if (change.eWidth !== undefined && change.eWidth.currentValue) {
      this.cWidth = change.eWidth.currentValue * 0.95 + 'px';
    }
    if (change.eHeight !== undefined && change.eHeight.currentValue) {
      this.cHeight = change.eHeight.currentValue * 0.95 + 'px';
    }
    if ((change.eWidth || change.eHeight) && change.isAdd) {
      this.isNew = change.isAdd.currentValue;
    }
    if ((change.eWidth && change.eWidth.currentValue) || (change.eHeight && change.eHeight.currentValue)) {
      if (this.instanceChart) {
        this.instanceChart.dispose();
      }
      this.initPages();
    }
  }

  // 初始化页面
  initPages() {
    // 外层div的宽高（当没有展示图表时使用）
    const divWrap = <HTMLElement>document.getElementsByClassName('center')[this.index];
    divWrap.style.width = this.cWidth;
    divWrap.style.height = this.cHeight;
    if (!this.isNew) {
      // 未进行添加操作，此时是初始化展示页面或选择数据源，渲染图表
      // 获取图表容器，此时进行的时图表初始化渲染
      let eWrap = <HTMLElement>document.getElementsByClassName('lineChart')[this.index];
      if (!eWrap && this.isShowNew) {
        // 获取图表容器，此时进行的是选择新数据源后图表的渲染
        eWrap = <HTMLElement>document.getElementsByClassName('newLineChart')[this.index];
      }
      eWrap.style.width = this.cWidth;
      eWrap.style.height = this.cHeight;
      const ec = echarts as any;
      const lineChart = ec.init(eWrap);
      this.instanceChart = lineChart;
      const lineChartOption = {
        grid: {
          top: '15%',
          bottom: '15%',
          left: '10%',
          right: '5%'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      };
      this.instanceChart.resize({
        width: 'auto',
        height: 'auto'
      })
      lineChart.setOption(lineChartOption);
    } else {
      // 进行添加操作，展示选择数据源按钮
      this.showBtn = true;
    }
  }

  // 打开选择数据源弹窗
  openChangeData(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '选择数据源',
      content: '',
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            this.showBtn = false;
            this.isNew = false;
            this.isShowNew = true;
            this.initPages();
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ]
    })
  }
}
