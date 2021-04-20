import { InterestsPlacesService } from './../../../services/interests-places.service';
import { HttpClient } from '@angular/common/http';
import { DialogData } from './../customers.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Component({
	selector: 'app-pop-up-place',
	templateUrl: './pop-up-place.component.html',
	styleUrls: ['./pop-up-place.component.scss']
})
export class PopUpPlaceComponent implements OnInit {

	infoList: Observable<any>;
	photoList: Observable<any>;
	tofList: any[] = [];


	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public http: HttpClient, public pls: InterestsPlacesService) { }

	ngOnInit(): void {
		// console.log(this.data);
		this.infoList = this.pls.infoSubject.pipe(tap(r => console.log(r)));
		this.photoList = this.pls.photo.pipe(
			tap(r => {
				console.log(r);
				this.tofList = r;
			}));
	}


	getInfo() {
		this.pls.getInfo(this.data);
	}

	getPhoto(data) {
		this.pls.getPLace(data);
	}



}
