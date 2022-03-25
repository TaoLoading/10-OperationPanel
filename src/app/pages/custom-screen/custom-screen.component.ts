import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { DashboardWidget } from 'ng-devui/dashboard';
import { ToastService } from 'ng-devui/toast';
import { DialogService } from 'ng-devui/modal';
import { FormLayout } from 'ng-devui/form';

@Component({
  selector: 'app-custom-screen',
  templateUrl: './custom-screen.component.html',
  styleUrls: ['./custom-screen.component.scss']
})
export class CustomScreenComponent implements OnInit {
  @ViewChild('conditionDrawer', { static: true }) conditionDrawer: TemplateRef<any>;
  @ViewChild('searchPluginDrawer', { static: true }) searchPluginDrawer: TemplateRef<any>;
  @ViewChild('createPluginModal', { static: true }) createPluginModal: TemplateRef<any>;

  results: IDrawerOpenResult;
  resultsLook: IDrawerOpenResult;
  // 插件抽屉数据
  selectList = [
    {
      name: '超长会话',
      value: 'sessionTime>=7200000',
      check: false
    },
    {
      name: '请求流量大于响应流量',
      value: 'bytes.in>bytes.out',
      check: false
    },
    {
      name: '外联流量大于内联流量',
      value: 'bytes.out>bytes.in',
      check: false
    },
    {
      name: '80端口非HTTP协议',
      value: 'port==80&&proto.appProto!=HTTP',
      check: false
    },
    {
      name: '连入流量等于连出流量',
      value: 'bytes.in==bytes.out',
      check: false
    }
  ];
  // 存放查询数据的数组
  searchArr = [];
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
    },
    /* {
      x: 4,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    },
    {
      x: 6,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    },
    {
      x: 8,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    },
    {
      x: 10,
      y: 0,
      width: 2,
      height: 1,
      locked: true
    } */
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
  // 插件信息
  plugin = {
    name: '',
    description: '',
    queryCriteria: '',
    createTime: ''
  }
  // 是否全屏
  isFullScreen = false;
  // 插件伪数据
  infoData = [
    {
      id: 0,
      name: '插件1',
      description: '这是插件1',
      queryCriteria: 'sessionTime>=7200000',
      createTime: '2022-03-15 17:11',
      isTop: false
    },
    {
      id: 1,
      name: '插件2',
      description: '这是插件2',
      queryCriteria: 'bytes.out>bytes.in',
      createTime: '2022-03-16 17:11',
      isTop: false
    },
    {
      id: 2,
      name: '插件3',
      description: '这是插件3',
      queryCriteria: 'bytes.in==bytes.out',
      createTime: '2022-03-17 17:11',
      isTop: false
    }
  ];

  constructor(private drawerService: DrawerService, private toastService: ToastService, private dialogService: DialogService) { }

  ngOnInit(): void {
    // 读取localStorage中的仪表盘布局
    this.widgets = JSON.parse(localStorage.getItem('widgets'));
    if (!this.widgets) {
      this.widgets = this.falseWidgets;
    }
    // 读取localStorage中的插件数据
    const pluginData = JSON.parse(localStorage.getItem('infoData'));
    if (pluginData) {
      this.infoData = pluginData;
    }
  }
  
  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  // 打开快捷查询抽屉
  openConditionDrawer() {
    this.results = this.drawerService.open({
      width: '300px',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      onClose: () => { },
      contentTemplate: this.conditionDrawer
    });
  }

  // 关闭快捷查询抽屉
  close($event) {
    this.results.drawerInstance.hide();
  }

  // 插件内容点击
  selectItemChange(val) {
    if (val.check) {
      this.searchArr.push(val.value);
    } else {
      this.searchArr.splice(this.searchArr.indexOf('val.value'), 1);
    }
    let searchContext = '';
    for (let index = 0; index < this.searchArr.length; index++) {
      const element = this.searchArr[index];
      if (searchContext === '') {
        searchContext = element;
      } else {
        searchContext += '||' + element;
      }
    }
    this.toastService.open({
      value: [{ severity: 'success', summary: '当前搜索条件为', content: searchContext }],
    });
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
    location.reload();
  }

  // 增加模块
  addWidget() {
    this.isAdd = true;
    this.widgets.push({ width: 2, height: 1 });
  }

  // 删除模块
  deleteWidget(i) {
    if (i < 0 || i >= this.widgets.length) {
      return;
    }
    this.widgets.splice(i, 1);
  }

  // 渲染模块
  widgetInit(index) {
    // 获取每个模块的宽高
    const module = document.getElementsByClassName("widget")[index].children[0].children[0];
    this.width = module.parentElement.offsetWidth;
    this.height = module.parentElement.offsetHeight;
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

  // 打开添加插件弹窗
  openCreatePlugin(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '添加插件',
      // content: CreatePluginComponent,
      contentTemplate: this.createPluginModal,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
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

  // 打开查看插件抽屉
  openSearchPlugin() {
    this.results = this.drawerService.open({
      contentTemplate: this.searchPluginDrawer,
      width: '300px',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      onClose: () => { },
      data: {
        text: 'hello',
        name: 'tom1',
        close: (event) => {
          this.results.drawerInstance.hide();
        },
        fullScreen: this.fullScreen
      }
    })
  }
  
  // 控制查看插件弹窗是否全屏
  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreen();
  }

  // 全屏展示的方法
  fullScreen() {
    this.results.drawerInstance.toggleFullScreen();
  }
  
  // 删除插件
  delete(item) {
    for (let i = 0; i < this.infoData.length; i++) {
      const element = this.infoData[i];
      if (element === item) {
        this.infoData.splice(i, 1);
        // 将插件数据存储到localStorage中
        localStorage.setItem('infoData', JSON.stringify(this.infoData));
        this.toastService.open({
          value: [{ severity: 'success', summary: '删除成功' }],
        });
        return
      }
    }
  }

  // 插件置顶与取消置顶
  top(item) {
    if (!item.isTop) {
      // 置顶
      for (let i = 0; i < this.infoData.length; i++) {
        if (item === this.infoData[i]) {
          item.isTop = true;
          this.infoData.splice(i, 1);
          this.infoData.unshift(item);
          // 将插件数据存储到localStorage中
          localStorage.setItem('infoData', JSON.stringify(this.infoData));
          return
        }
      }
    } else {
      // 取消置顶
      for (let i = 0; i < this.infoData.length; i++) {
        if (item === this.infoData[i]) {
          item.isTop = false;
          this.infoData.splice(i, 1);
          this.infoData.push(item);
          // 将插件数据存储到localStorage中
          localStorage.setItem('infoData', JSON.stringify(this.infoData));
          return
        }
      }
    }
  }

  // 使用插件
  applyPlugin(item) {
    this.toastService.open({
      value: [{ severity: 'success', summary: '当前搜索条件为', content: item.queryCriteria }],
    });
  }

  // 删除模块
  deleteData(index, dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '删除图表',
      html: true,
      content: '您是否确定删除该图表？',
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            this.widgets.splice(index, 1);
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
  changeData(index, dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '修改数据源',
      html: true,
      content: `<h2>修改第${index + 1}个图表的数据源</h2>`,
      backdropCloseable: true,
      dialogtype: dialogtype,
      onClose: () => { },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
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
