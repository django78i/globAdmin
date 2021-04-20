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


  constructor(private http: HttpClient, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    let params = new HttpParams();
    var headers_object = new HttpHeaders();
    headers_object.append('Authorization', 'Bearer q88cho7TUQ4oyAdyGYwbaivq');
    params = params.append('key', 'AIzaSyA0UptHRDSNjJXTl6zkaZgmKRueNpAZ5Ag');
    this.data$ = this.http.get('https://sheets.googleapis.com/v4/spreadsheets/1lOEvAvBJ8KzpjPmFFgt-fkn-sPJlbsEoE8W1MPlAG5A/values/A1:C150', { params: params })
      .pipe(
        map((r: any) => r.values),
        tap(r => {
          let tabl = r;
          tabl.splice(0, 1);
          this.data = tabl.map((r: any) => r = {
            ville: r[0],
            nom: r[1],
            type: r[2],
            adresse: '',
            photos: [],
            pays: 'Maroc'
          })
          // console.log(this.data)
        })
      )
  }




  savePlaces() {

    this.data.map(r => {
      // console.log(r);
      let id = this.afs.createId();
      this.afs.collection('interest').doc(id).set(Object.assign({}, r));
    })
  }


}
