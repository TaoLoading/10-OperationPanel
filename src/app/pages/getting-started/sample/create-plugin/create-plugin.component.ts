import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-plugin',
  templateUrl: './create-plugin.component.html',
  styleUrls: ['./create-plugin.component.scss']
})
export class CreatePluginComponent implements OnInit {
  @Input() handler: Function;
  buttonsObj: any = 'id?: string; cssClass?: string; text: string; handler: ($event: Event) => void;';

  constructor() { }

  ngOnInit(): void {
  }
}
