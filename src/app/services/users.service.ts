import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userListSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public afs: AngularFirestore) { }

  getUserList() {
    return this.afs.collection('users').valueChanges();
  }

  

}
