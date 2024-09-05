import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-helpe',
  templateUrl: './helpe.component.html',
  styleUrls: ['./helpe.component.scss']
})
export class HelpeComponent implements OnInit {
  fullName: any;
  role: any;

  constructor( private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {

    });

    this.userStore.getFullNameFromStore().subscribe(val => {
      const fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this.userStore.getRoleFromStore().subscribe(val => {
      const roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }
  logout() {
    this.auth.signOut();
  }
}
