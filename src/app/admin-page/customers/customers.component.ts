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
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';

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
	displayedColumns: string[] = ['select', 'position', 'nom', 'adresse'];
	dataSource = new MatTableDataSource<any[]>();
	expandedElement?: PeriodicElement | null;
	selection = new SelectionModel<any[]>(true, []);

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(public ips: InterestsPlacesService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.placesList = this.ips.getPlacesList().pipe(
			tap(r => {
				this.usTemplate = r.map((v: any, index) => {
					return {
						position: index,
						nom: v.nom,
						adresse: v.adresse,
						description: '',
						uid: v.uid,
						photos: v.photo,
						photoProfil: ''
					}
				})
				this.dataSource.data = this.usTemplate;
				console.log(r.place);
			})
		);;
	}


	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		console.log(this.paginator)
	}



	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
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
		});

	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	checkboxLabel(row?: any): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

}
