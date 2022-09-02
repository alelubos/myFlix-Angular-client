import { Component, OnInit, Input } from '@angular/core';
// Angular Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Service for Backend Data Requests
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  userLogin(): void {
    console.log(this.userData);
    this.fetchApiData.userLogin(this.userData).subscribe({
      // Given a successful result
      next: (response) => {
        console.log(response);
        // close the Registration Form Modal
        this.dialogRef.close();
        // Inform the user the registration succeeded
        this.snackBar.open('You Logged In Scuccessfully!', 'OK', {
          duration: 2000,
        });
      },
      // Given an Error
      error: (error) => {
        console.error(error.error);
        this.snackBar.open(error.error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
