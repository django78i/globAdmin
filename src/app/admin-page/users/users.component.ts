import { trigger, state, transition, style, animate } from '@angular/animations';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number,
  nom: string;
  mail: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class UsersComponent implements OnInit {

  userList: Observable<any> = new Observable;
  usTemplate: any[] = [];
  displayedColumns: string[] = ['position', 'nom', 'mail'];
  dataSource: any;
  expandedElement?: PeriodicElement | null;

  constructor(public us: UsersService) { }

  ngOnInit(): void {
    this.userList = this.us.getUserList().pipe(
      tap(r => {
        this.usTemplate = r.map((v: any, index) => {
          return {
            nom: v.name,
            mail: v.mail,
            position: index
          }
        })
        this.dataSource = this.usTemplate;
      })
    );
  }



}
