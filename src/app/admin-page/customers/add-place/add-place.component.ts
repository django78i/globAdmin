import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DialogData } from './../customers.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-add-place',
	templateUrl: './add-place.component.html',
	styleUrls: ['./add-place.component.scss']
})
export class AddPlaceComponent implements OnInit {

	info: any;
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public http: HttpClient) { }

	ngOnInit(): void {
	}


	getInfo() {
		this.http.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.info}&fields=name,photo,formatted_address,address_components,rating,geometry,formatted_phone_number,type&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA`)
			// this.http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=Kilim&region=MA&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA')
			.pipe(tap(r => console.log(r))).subscribe();

	}


}

