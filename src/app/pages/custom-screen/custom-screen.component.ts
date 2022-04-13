import { Component, OnInit } from '@angular/core';
import { DashboardWidget } from 'ng-devui/dashboard';
import { IDrawerOpenResult, ToastService, DialogService, FormLayout } from 'ng-devui';

@Component({
  selector: 'app-custom-screen',
  templateUrl: './custom-screen.component.html',
  styleUrls: ['./custom-screen.component.scss']
})

export class CustomScreenComponent implements OnInit {
  results: IDrawerOpenResult;
  resultsLook: IDrawerOpenResult;
  // 大屏模块数据
  widgets: Array<DashboardWidget> = [];
  // 大屏模块伪数据
  falseWidgets: Array<DashboardWidget> = [
    {
      x: 0,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    },
    {
      x: 2,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    }
  ];
  // 是否可编辑模块
  canEditor: boolean = false;
  // 是否在添加模块
  isAdd: boolean = false;
  // 单个图表宽高
  width: number = 0;
  height: number = 0;
  // 存放全部图标宽高的数组
  widthArr: number[] = [];
  heightArr: number[] = [];
  // 表格控件需要
  layoutDirection: FormLayout = FormLayout.Horizontal;
  // 是否全屏
  isFullScreen: boolean = false;
  // 改变数据源的图表的下标
  changeDataIndex: number = null;

  constructor(
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    // 读取localStorage中的仪表盘布局
    this.widgets = JSON.parse(localStorage.getItem('widgets'));
    if (!this.widgets) {
      this.widgets = this.falseWidgets;
    }
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  // 编辑模块
  editorWidget() {
    this.toastService.open({
      value: [{ severity: 'success', summary: '拖动模块实现页面自定义' }],
    });
    this.canEditor = true;
    for (let index = 0; index < this.widgets.length; index++) {
      const element = this.widgets[index];
      delete element['locked'];
    }
  }

  // 保存编辑
  saveEditor() {
    this.canEditor = false;
    for (let index = 0; index < this.widgets.length; index++) {
      const element = this.widgets[index];
      element['locked'] = true;
    }
    this.toastService.open({
      value: [{ severity: 'success', summary: '保存成功' }],
    });
    // 存储当前布局到localStorage
    localStorage.setItem('widgets', JSON.stringify(this.widgets));
    for (let i = 0; i < this.widgets.length; i++) {
      this.widgetInit(i);
    }
  }

  // 增加模块
  addWidget() {
    this.isAdd = true;
    this.widgets.push({ width: 2, height: 1 });
  }

  // 渲染模块
  widgetInit(index) {
    // 获取每个模块的宽高
    let module;
    if (this.canEditor) {
      module = document.getElementsByClassName("widget")[index].children[0].children[1];
    } else {
      module = document.getElementsByClassName("widget")[index].children[0].children[0];
    }
    this.width = module.parentElement.offsetWidth;
    this.height = module.parentElement.offsetHeight;
    // TODO 获取的宽高与浏览器显示的宽高不符，导致拖拽时图表有溢出的可能
    /* console.log('module.parentElement', module.parentElement);
    console.log('module.parentElement.offsetWidth', module.parentElement.offsetWidth);
    console.log('module.parentElement.offsetHeight', module.parentElement.offsetHeight); */
    if (this.widthArr.length !== this.widgets.length) {
      // 此时宽高数组中还未记录全部数据，证明是在进行图表的初始化展示或添加新模块，继续将单个图表的宽高放入数组中
      this.widthArr.push(this.width);
      this.heightArr.push(this.height);
    } else {
      // 此时宽高数组中已记录全部数据，证明实在拖拽某个图表，将数组中该图表的数据进行替换
      this.widthArr[index] = this.width;
      this.heightArr[index] = this.height;
    }
  }

  // 删除模块
  deleteData(index, dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '删除图表',
      html: true,
      content: '您是否确定删除该图表？删除后不可恢复',
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            // 分别从模块数组、宽数组、高数组中删除该模块的数据
            this.widgets.splice(index, 1);
            this.widthArr.splice(index, 1);
            this.heightArr.splice(index, 1);
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

  // 打开修改模块数据源弹窗
  changeData(index) {
    this.changeDataIndex = index;
    // 过一秒后重置changeDataIndex的值，防止子组件由于changeDataIndex值不变而不触发弹窗
    setTimeout(() => {
      this.changeDataIndex = null;
    }, 1000);
  }
}
