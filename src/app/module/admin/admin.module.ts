import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin-component/admin.component';
import { PipeDataComponent } from './admin-component/pipe-data/pipe-data.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    PipeDataComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
