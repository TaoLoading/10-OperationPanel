import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/@shared/shared.module';
import { SampleComponent } from './sample/sample.component';
import { GettingStartedComponent } from './getting-started.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { Charts1Component } from './sample/charts1/charts1.component';

@NgModule({
  declarations: [GettingStartedComponent, SampleComponent, Charts1Component],
  imports: [SharedModule, GettingStartedRoutingModule],
  providers: [],
})
export class GettingStartedModule {}
