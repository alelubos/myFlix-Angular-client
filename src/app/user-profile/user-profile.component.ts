import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Dialog Form Component to view/edit User's Profile information
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * @prop public input property that can be passed user's information
   */
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Initialization function gets user's information from API call
   * @returns user object and stores it in userData object
   */
  ngOnInit(): void {
    let username: string = localStorage.getItem('username') || '';
    this.fetchApiData.getUser(username).subscribe({
      next: (response) => {
        let birthday = response.birthday.slice(0, 10);
        console.log(birthday);
        this.userData = {
          username: response.username,
          email: response.email,
          birthday: birthday,
          password: '',
        };
      },
    });
  }

  /**
   * Updates user's info with text from input fields by
   * calling the @function editUser from the FetchApiDataService.
   * Then it logs user out in order to login again with updated credentials.
   */
  updateUser(): void {
    this.fetchApiData
      .editUser(this.userData)
      // userRegistration returns an Observable
      .subscribe({
        // Given a successful result
        next: (response) => {
          // Update userData with response
          console.log(response);
          // Inform the user the registration succeeded
          this.snackBar.open(
            "You have updated your details. You'll be redirected to Login again",
            'OK',
            {
              duration: 4000,
            }
          );
        },
        // Given an Error
        error: (error) => {
          this.snackBar.open('Something went wrong. Try Again!', 'OK', {
            duration: 4000,
          });
        },
      });
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(['welcome']);
    }, 3000);
  }

  /**
   * Erases user from DB by calling the @function deleterUser from FetchApiDataService
   * Then it clear the localStorage and navigates to the 'welcome' page
   */
  deleteUser() {
    let result = window.confirm(
      'Are you sure? Deleting your profile will unregister you.'
    );
    // If user confirms account deletion
    if (result) {
      this.fetchApiData.deleteUser().subscribe({
        next: (response) => {
          this.snackBar.open('Your account was erased!', 'OK', {
            duration: 4000,
          });
          setTimeout(() => {
            localStorage.clear();
            this.router.navigate(['welcome']);
          }, 3000);
        },
        error: (error) => {
          console.log('Error from deleteUser() in user-profile: ', error);
        },
      });
    } else {
      return;
    }
  }
}
