import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'ng-devui/toast';

@Component({
  selector: 'app-search-plugin',
  templateUrl: './search-plugin.component.html',
  styleUrls: ['./search-plugin.component.scss']
})
export class SearchPluginComponent implements OnInit {
  @Input() fullScreen;
  @Input() close;

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

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    // 读取localStorage中的插件数据
    const pluginData = JSON.parse(localStorage.getItem('infoData'));
    if (pluginData) {
      this.infoData = pluginData;
    }
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreen();
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
}
