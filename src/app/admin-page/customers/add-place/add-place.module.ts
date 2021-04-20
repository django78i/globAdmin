import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPlaceRoutingModule } from './add-place-routing.module';
import { AddPlaceComponent } from './add-place.component';


@NgModule({
  declarations: [
    AddPlaceComponent
  ],
  entryComponents: [
    AddPlaceComponent
  ],
  imports: [
    CommonModule,
    AddPlaceRoutingModule,
    FormsModule
  ]
})
export class AddPlaceModule { }
