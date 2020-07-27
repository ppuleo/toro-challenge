import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  exports: [
    NavComponent
  ],
  imports: [
    RouterModule
  ],
  providers: []
})
export class NavModule { }
