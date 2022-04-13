import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DialogService, FormLayout } from 'ng-devui'
import * as echarts from 'echarts';

@Component({
  selector: 'app-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss']
})
export class CustomChartComponent implements OnInit {
  @ViewChild('changeDataModal', { static: true }) changeDataModal: TemplateRef<any>;

  // 图表宽高
  cWidth: string = '';
  cHeight: string = '';
  // 图表的实例。用于初始化和清除实例
  instanceChart = null;
  // 是否展示选择数据源按钮
  showBtn: boolean = false;
  // 是否为新添加的模块
  isNewModule: boolean = false;
  // 是否为新添加的图表
  isNewChart: boolean = false;
  // 图表序号
  chartNum: number = null;
  // 表格控件需要
  layoutDirection: FormLayout = FormLayout.Horizontal;
  // 选择数据源下拉展示
  changeDataArr: Array<string> = ['图表1', '图表2', '图表3'];
  // 选择数据源下拉默认展示
  selectType: string = '图表1';
  // 图表的配置
  chartOptions = {
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
    ],
    color: '#5e7ce0'
  };

  constructor(private dialogService: DialogService) { }

  @Input() eWidth: number = 0;
  @Input() eHeight: number = 0;
  @Input() index: number = 0;
  @Input() isAdd: boolean = false;
  @Input() changeDataIndex: number = 0;

  ngOnInit(): void { }

  ngOnChanges(change) {
    // 如果是点击了修改数据源则重新选择数据源
    if (change.changeDataIndex && change.changeDataIndex.currentValue === this.index) {
      this.openChangeData();
    }
    // 获取改变后的宽度
    if (change.eWidth !== undefined && change.eWidth.currentValue) {
      this.cWidth = change.eWidth.currentValue * 0.95 + 'px';
    }
    // 获取改变后的高度
    if (change.eHeight !== undefined && change.eHeight.currentValue) {
      this.cHeight = change.eHeight.currentValue * 0.95 + 'px';
    }
    // 获取状态，是否为新添加的模块
    if ((change.eWidth || change.eHeight) && change.isAdd) {
      this.isNewModule = change.isAdd.currentValue;
    }
    // 重新渲染图表
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
    if (!this.isNewModule) {
      // 获取图表容器，此容器为图表初始化显示或修改数据源的容器
      let eWrap = <HTMLElement>document.getElementsByClassName('lineChart')[this.index];
      // 获取图表容器，此容器为对没有数据源的模块第一次选择数据源的容器
      let nWrap = <HTMLElement>document.getElementsByClassName('newChart')[this.index];
      if (eWrap) {
        // 如果eWrap存在，则清除nWrap的宽高，防止占据多余空间
        nWrap.style.width = '0';
        nWrap.style.height = '0';
      } else {
        // 获取图表容器，此时进行的是选择新数据源后图表的渲染
        eWrap = nWrap;
      }
      eWrap.style.width = this.cWidth;
      eWrap.style.height = this.cHeight;
      const ec = echarts as any;
      const lineChart = ec.init(eWrap);
      this.instanceChart = lineChart;
      this.instanceChart.resize({
        width: 'auto',
        height: 'auto'
      })
      lineChart.setOption(this.chartOptions);
    } else {
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
      contentTemplate: this.changeDataModal,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            // 如果不是新添加的图表，则移除echarts实例
            if (this.isNewModule === false) {
              this.instanceChart.dispose();
            }
            // 模拟修改数据源
            if (this.selectType === '图表1') {
              this.chartOptions.color = '#5e7ce0';
            } else if (this.selectType === '图表2') {
              this.chartOptions.color = 'red';
            } else {
              this.chartOptions.color = 'yellow';
            }
            this.showBtn = false;
            this.isNewModule = false;
            this.isNewChart = true;
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
