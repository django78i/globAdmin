import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class InterestsPlacesService {

	infoSubject: Subject<any> = new Subject;
	photo: Subject<any[]> = new Subject<[]>()
	infoList: Observable<any>;
	lieux: any;
	image: any[] = [];

	singlePlaceSubject: BehaviorSubject<any> = new BehaviorSubject(null);
	singlePlace$: Observable<any>;
	constructor(public afs: AngularFirestore, public http: HttpClient) { }


	getPlacesList() {
		return this.afs.collection('interest').valueChanges();
	}

	getInfo(data) {
		this.http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${data.place.nom}&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA`)
			.pipe(
				map((r: any) => r = r.results),
				tap(r => {
					this.infoSubject.next(r);
				})
			).subscribe();
	}

	getSinglePlace(place) {
		console.log(place);
		this.singlePlaceSubject.next(place);
		this.singlePlace$ = this.singlePlaceSubject.pipe(
			switchMap(r => this.afs.collection('interest').doc(r.uid).valueChanges()),
			tap(r => console.log(r))
		)
		return this.singlePlace$;
	}

	deletePhoto(u) {
		this.afs.collection('interest').doc(u.uid).update(Object.assign({}, u));
	}

	getPLace(i) {
		console.log(i);
		this.image = [];
		this.http.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${i.place_id}&fields=name,photo,formatted_address,address_components,rating,geometry,formatted_phone_number,type&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA`)
			.pipe(
				tap(r => console.log(r)),
				tap((r: any) => this.lieux = {
					location: r.result.geometry.location,
					adresse: r.result.formatted_address
				}),
				map((d: any) => d = d.result.photos),
				map(r => r.map(r => r.photo_reference)),
				tap(r => console.log(r)),
				switchMap(r => r.map(v => v = this.http.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${v}&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA`, { responseType: 'blob' as 'json' })
					.pipe(tap((r: Blob) => this.createImageFromBlob(r))).subscribe()
				)),
				tap(r => this.photo.next(this.image))
			).subscribe();

	}

	getPhoto(data) {
		console.log(data);
		let photoRef = data.photos[0].photo_reference;
		this.http.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=AIzaSyBY3yru7c1Oyy8B8iMEAuYcCgiZwPwisnA`, { responseType: 'blob' as 'json' })
			.pipe(
				tap((r: Blob) => this.createImageFromBlob(r))
			).subscribe();
	}

	createImageFromBlob(image: Blob) {
		console.log('entree');
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			// this.photo.next(reader.result);
			this.image.push(reader.result);
		}, false);
		if (image) {
			reader.readAsDataURL(image);
		}
		// console.log(this.photo);
	}

	updatePlace(d) {
		let place = {
			...d,
			location: this.lieux.location,
			adresse: this.lieux.adresse
		}
		console.log(place);
		this.afs.collection('interest').doc(place.uid).update(Object.assign({}, place));
	}



}


