import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userData: any;

  constructor(
    private userListService: UserListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userListService.getUsers().subscribe(userList => {
      this.userData = userList;
    })
  }

  back() {
    this.router.navigate([`/login`]);
  }
}
