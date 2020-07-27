import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetricComponent } from './metric/metric.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'metrics', component: MetricComponent },
  { path: 'tables', component: TableComponent },
  { path: '**', component: TableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
