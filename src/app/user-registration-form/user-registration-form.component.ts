import { Component, OnInit, Input } from '@angular/core';
// From Angulat Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Service for Backend Data Requests
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Dialog Form Component for Users to Register and initialize their account in the DB.
 */
@Component({
  selector: 'registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Sends form data to backend calling @function userRegistration from FetchApiDataService.
   * Then redirects the user to 'welcome' page to log in.
   */
  registerUser(): void {
    this.fetchApiData
      .userRegistration(this.userData)
      // userRegistration returns an Observable, so we can subscribe to
      // it, to get informed when it result is resolved:
      .subscribe({
        // Given a successful result
        next: (response) => {
          console.log('From Register User: ' + response);
          // close the Registration Form Modal
          this.dialogRef.close();
          // Inform the user the registration succeeded
          this.snackBar.open('You are now registered! Please Log in', 'OK', {
            duration: 2000,
          });
          // Here we could alternatively Log the user in directly and redirect to the Movie List
        },
        // Given an Error
        error: (error) => {
          this.snackBar.open('Something went wrong. Try Again!', 'OK', {
            duration: 2000,
          });
        },
      });
  }
}
