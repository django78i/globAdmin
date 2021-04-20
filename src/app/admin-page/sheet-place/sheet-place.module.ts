import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetPlaceRoutingModule } from './sheet-place-routing.module';
import { SheetPlaceComponent } from './sheet-place.component';


@NgModule({
  declarations: [
    SheetPlaceComponent
  ],
  imports: [
    CommonModule,
    SheetPlaceRoutingModule
  ]
})
export class SheetPlaceModule { }
