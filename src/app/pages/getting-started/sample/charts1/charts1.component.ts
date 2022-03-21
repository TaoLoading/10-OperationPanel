import { Component, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-charts1',
  templateUrl: './charts1.component.html',
  styleUrls: ['./charts1.component.scss']
})
export class Charts1Component implements OnInit {
  // 表格宽高
  cWidth: string = '';
  cHeight: string = '';
  // 表格的实例。用于初始化和清除实例
  instanceChart = null;

  constructor() { }

  @Input() eWidth: number = 0;
  @Input() eHeight: number = 0;
  @Input() index: number = 0;
  @Input() isAdd: boolean = false;

  ngOnInit(): void { }

  ngOnChanges(change) {
    // 当接收到新的值时对表格清除实例并重新渲染
    if (change.eWidth.currentValue) {
      this.cWidth = change.eWidth.currentValue * 0.95 + 'px';
    }
    if (change.eHeight.currentValue) {
      this.cHeight = change.eHeight.currentValue * 0.95 + 'px';
    }
    if (this.instanceChart) {
      this.instanceChart.dispose();
    }
    if (change.eWidth) {
      this.initPages();
    }
  }

  // 初始化页面
  initPages() {
    // 未进行添加操作，此时是初始化展示页面，渲染图表
    const ec = echarts as any;
    const eWrap = document.getElementsByClassName('lineChart')[this.index];
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
      width: this.cWidth,
      height: this.cHeight
    })
    lineChart.setOption(lineChartOption);
  }
}
