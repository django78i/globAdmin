import { tap } from 'rxjs/operators/tap';
import { LoginService } from '../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logForm: FormGroup = new FormGroup({});
  errorMsg: Observable<any> = new Observable;
  constructor(private fBuild: FormBuilder, public lgs: LoginService) { }

  ngOnInit(): void {
    this.initForm();
    this.errorMsg = this.lgs.errorSubject;
  }

  initForm() {
    this.logForm = this.fBuild.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  log() {
    const logInfo = this.logForm.value;
    this.lgs.log(logInfo);
    console.log(this.logForm.value)

  }




}
