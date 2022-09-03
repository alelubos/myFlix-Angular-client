import { Component, OnInit, Input } from '@angular/core';
// From Angulat Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Service for Backend Data Requests
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      // Given a successful result
      next: (response) => {
        console.log('From Register User: ' + response);
        // close the Registration Form Modal
        this.dialogRef.close();
        // Inform the user the registration succeeded
        this.snackBar.open('You are now registered. Please Login!', 'OK', {
          duration: 2000,
        });
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
