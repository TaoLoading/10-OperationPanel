import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-plugin',
  templateUrl: './search-plugin.component.html',
  styleUrls: ['./search-plugin.component.scss']
})
export class SearchPluginComponent implements OnInit {
  @Input() fullScreen;
  @Input() close;

  isFullScreen = false;
  infoData = [
    {
      name: '插件1',
      description: '这是插件1',
      queryCriteria: 'sessionTime>=7200000',
      createTime: '2022-03-15 17:11'
    },
    {
      name: '插件2',
      description: '这是插件2',
      queryCriteria: 'bytes.out>bytes.in',
      createTime: '2022-03-16 17:11'
    },
    {
      name: '插件3',
      description: '这是插件3',
      queryCriteria: 'bytes.in==bytes.out',
      createTime: '2022-03-17 17:11'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleFullScreen() {
    this.isFullScreen = !this.isFullScreen;
    this.fullScreen();
  }

  // 删除插件
  delete() {
    console.log('点击了删除');
  }

  // 置顶插件
  top() {
    console.log('点击了置顶');
  }
}
