import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricComponent } from './metric.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    MetricComponent
  ],
  exports: [
    MetricComponent
  ],
  imports: [
    AgGridModule.withComponents([]),
    CommonModule
  ],
  providers: []
})
export class MetricModule {}
