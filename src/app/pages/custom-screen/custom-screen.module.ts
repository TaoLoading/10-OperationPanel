import { NgModule } from '@angular/core';
import { DialogService, BackTopModule } from 'ng-devui';
import { SharedModule } from '../../@shared/shared.module';
import { CustomScreenModule } from './custom-screen-routing.module';
import { CustomScreenComponent } from './custom-screen.component';
import { DaLayoutModule } from '../../@shared/layouts/da-layout';

@NgModule({
  imports: [CustomScreenModule, SharedModule, BackTopModule, DaLayoutModule],
  declarations: [CustomScreenComponent],
  providers: [DialogService]
})
export class ScreenModule { }
