import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public users: any[] = [];
  public paginatedUsers: any[] = [];
  public fullName: string = '';
  public role: string = '';
  public searchTerm: string = ''; // For search functionality

  // Pagination properties
  public currentPage: number = 1;
  public pageSize: number = 5;
  public totalPages: number = 0;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private userStore: UserStoreService
  ) {}

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.updatePaginatedUsers();
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

  // Search functionality
  filterUsers() {
    const filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.currentPage = 1; // Reset to first page
    this.paginatedUsers = filtered.slice(0, this.pageSize);
  }

  // Pagination logic
  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }

  logout() {
    this.auth.signOut();
  }

}
