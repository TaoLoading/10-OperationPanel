import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomScreenComponent } from './custom-screen.component'

const routes: Routes = [
  {
    path: '',
    component: CustomScreenComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomScreenModule {}
