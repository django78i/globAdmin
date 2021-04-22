import { InterestsPlacesService } from './../../services/interests-places.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-sheet-place',
	templateUrl: './sheet-place.component.html',
	styleUrls: ['./sheet-place.component.scss']
})
export class SheetPlaceComponent implements OnInit {

	data$: Observable<any> = new Observable;
	data: any[] = [];
	image: any;


	constructor(private http: HttpClient, private afs: AngularFirestore, public pls: InterestsPlacesService) { }

	ngOnInit(): void {
		this.getPlaces();
	}

	getPlaces() {
		let params = new HttpParams();
		var headers_object = new HttpHeaders();
		headers_object.append('Authorization', 'Bearer q88cho7TUQ4oyAdyGYwbaivq');
		params = params.append('key', 'AIzaSyA0UptHRDSNjJXTl6zkaZgmKRueNpAZ5Ag');
		this.data$ = this.http.get('https://sheets.googleapis.com/v4/spreadsheets/1lOEvAvBJ8KzpjPmFFgt-fkn-sPJlbsEoE8W1MPlAG5A/values/A1:D150', { params: params })
			.pipe(
				map((r: any) => r.values),
				tap(r => {
					let tabl = r;
					tabl.splice(0, 1);
					this.data = tabl.map((v: any) => v = {
						ville: v[0],
						nom: v[1],
						type: v[2],
						adresse: '',
						photos: [],
						place_id: v[3],
						pays: 'Maroc',
					});
					console.log(this.data);
				})
			)
	}




	savePlaces() {

		this.data.map(r => {
			// console.log(r);
			this.pls.getPLace(r)
			let id = this.afs.createId();
			let data = { ...r, uid: id }
			this.afs.collection('interest').doc(data.uid).set(Object.assign({}, data));
		})
	}


}
