import { AddPlaceComponent } from './add-place/add-place.component';
import { PopUpPlaceComponent } from './pop-up-place/pop-up-place.component';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { InterestsPlacesService } from './../../services/interests-places.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
	position: number,
	nom: string;
	mail: string;
}

export interface DialogData {
	place: any;
}


@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class CustomersComponent implements OnInit, AfterViewInit {
	placesList: Observable<any> = new Observable;
	usTemplate: any[] = [];
	displayedColumns: string[] = ['position', 'nom', 'adresse'];
	dataSource = new MatTableDataSource<any[]>();
	expandedElement?: PeriodicElement | null;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(public ips: InterestsPlacesService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.placesList = this.ips.getPlacesList().pipe(
			tap(r => {
				this.usTemplate = r.map((v: any, index) => {
					// if (this.paginator) {
					// 	this.paginator.pageIndex = index;
					// }
					return {
						position: index,
						nom: v.nom,
						adresse: `${v.adresse.rue} ${v.adresse.codePostal}, ${v.ville}`,
						description: '',
						uid: v.id
					}
				})
				this.dataSource.paginator = this.paginator;
				this.dataSource.data = this.usTemplate;
				console.log(this.usTemplate.length);
			})
		);;
	}


	ngAfterViewInit() {
		console.log(this.paginator)
	}




	openDialog(r: any) {
		console.log(r);
		this.dialog.open(PopUpPlaceComponent, {
			height: '300px',
			width: '500px',
			data: {
				place: r
			}
		});
	}

	openDialogSheet() {
		this.dialog.open(AddPlaceComponent, {
			height: '300px',
			width: '500px',
			// data: {
			// 	place: r
			// }

		});

	}


}
