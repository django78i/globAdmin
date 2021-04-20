import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	errorSubject: Subject<any> = new Subject;
	error$: Observable<any> = new Observable;

	constructor(private auth: AngularFireAuth, private router: Router) { }


	log(info: any) {
		this.auth.signInWithEmailAndPassword(info.mail, info.password).then(
			() => {
				console.log('bn');
				this.router.navigate(['adminPage']);
			},
			(error) => this.errorSubject.next(error));
	}

	logout() {
		console.log('ici');
		this.auth.signOut();
	}

}
