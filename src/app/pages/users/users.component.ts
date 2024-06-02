import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'id',
    'username',
    'firstname',
    'lastname',
    'email',
    'createdTimestamp',
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => (this.users = users),
    });
  }
}
