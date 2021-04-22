import { FormBuilder, FormGroup } from '@angular/forms';
import { InterestsPlacesService } from './../../../services/interests-places.service';
import { HttpClient } from '@angular/common/http';
import { DialogData } from './../customers.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { SwiperOptions } from 'swiper';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-pop-up-place',
	templateUrl: './pop-up-place.component.html',
	styleUrls: ['./pop-up-place.component.scss']
})
export class PopUpPlaceComponent implements OnInit {

	infoList: Observable<any>;
	photoList: Observable<any>;
	tofList: any[] = [];
	placeForm: FormGroup;
	uploadPercent: Observable<number>;


	config: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		slidesPerView: 'auto',
		spaceBetween: 10,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
	};


	url: any;
	imageUrl: any;

	placeTemp: any;
	disabled: boolean = true;

	displayConfirm: Boolean = false;
	photoToDelete: any;
	place$: Observable<any>;

	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private storage: AngularFireStorage,
		public http: HttpClient, public pls: InterestsPlacesService, public fbuilder: FormBuilder) { }

	ngOnInit(): void {
		console.log(this.data);
		this.place$ = this.pls.getSinglePlace(this.data.place).pipe(
			tap(r => this.placeTemp = r)
		);
	}

	saveData(photo, info) {
		let newPlace = { ...info, photo: photo }
		console.log(newPlace)
		this.pls.updatePlace(newPlace);
	}

	uploadFile(event) {
		const file = event.target.files[0];
		const filePath = file.name;
		const ref = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);
		this.uploadPercent = task.percentageChanges();
		task.snapshotChanges().pipe(
			finalize(() => {
				this.imageUrl = ref.getDownloadURL();
				this.disabled = false;
				this.saveUrl(this.imageUrl);
			})
		)
			.subscribe()
	}

	saveUrl(url: Observable<any>) {
		url.subscribe(url => {
			this.url = url;
			// this.photoTemp.push(url);
		})
	}

	deletePhoto() {
		console.log(this.photoToDelete);
		// var photo: any[] = [];
		const index = this.data.place.photos.findIndex(photos => photos == this.photoToDelete);
		this.data.place.photos.splice(index, 1);
		console.log(this.data.place);
		this.pls.deletePhoto(this.data.place);
		this.display();
	}

	display() {
		this.displayConfirm = !this.displayConfirm;
	}

	confirmDelete(p) {
		this.photoToDelete = p;
		this.display();
	}


}
