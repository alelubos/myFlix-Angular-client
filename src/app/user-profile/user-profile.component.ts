import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: new Date(),
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let username: string = localStorage.getItem('username') || '';
    this.fetchApiData.getUser(username).subscribe((response) => {
      let birthday = response.birthday.slice(0, 10);
      console.log(birthday);
      this.userData = {
        username: response.username,
        email: response.email,
        birthday: new Date(birthday),
        password: '',
      };
      console.log(new Date(response.birthday));
    });
  }

  updateUser(): void {
    this.fetchApiData
      .editUser(this.userData)
      // userRegistration returns an Observable, so we can subscribe to
      // it, to get informed when it result is resolved:
      .subscribe({
        // Given a successful result
        next: (response) => {
          // Update userData with response
          console.log(response);
          // Inform the user the registration succeeded
          this.snackBar.open('You have updated your details!', 'OK', {
            duration: 4000,
          });
        },
        // Given an Error
        error: (error) => {
          this.snackBar.open('Something went wrong. Try Again!', 'OK', {
            duration: 4000,
          });
        },
      });
  }
}
