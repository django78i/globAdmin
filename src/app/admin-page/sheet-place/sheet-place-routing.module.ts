import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetPlaceComponent } from './sheet-place.component';

const routes: Routes = [{ path: '', component: SheetPlaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SheetPlaceRoutingModule { }
