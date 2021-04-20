import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

const routes: Routes = [
	{
		path: '',
		component: AdminPageComponent,
		children: [
			{
				path: 'users',
				loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
			},
			{
				path: 'customers',
				loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
			},
			{
				path: 'sheetPlace',
				loadChildren: () => import('../admin-page/sheet-place/sheet-place.module').then(m => m.SheetPlaceModule)
			},
			{
				path: '',
				redirectTo: 'users',
				pathMatch: 'full'
			},
		]
	},
	{
		path: '',
		redirectTo: 'users',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminPageRoutingModule { }
