import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin-component/admin.component';
import { PipeDataComponent } from './admin-component/pipe-data/pipe-data.component';

const routes: Routes = [
  {
    path: 'assign-ingredient-categories',
    component: PipeDataComponent
  },
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
