import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// Angular Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Service for Backend Data Requests
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * Dialog Form Component for User to Login entering username and password
 *
 */
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
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Function to login user by calling @function userLogin from FetchApiDataService
   */
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      // Given a successful result
      next: (response) => {
        // Store credentials in localStorage
        const { user, token } = response;
        localStorage.setItem('username', user.username);
        localStorage.setItem('favoriteMovies', user.favoriteMovies);
        localStorage.setItem('token', token);
        // close the Registration Form Modal on success
        this.dialogRef.close();
        // Inform the user the registration succeeded
        this.snackBar.open('You are Logged In!', 'OK', {
          duration: 2000,
        });
        // Direct user to List of Movies
        this.router.navigate(['movies']);
        // CODE HERE...
      },
      // Given an Error
      error: (error) => {
        console.error(error.error);
        this.snackBar.open(
          'Login failed! Your username or password may be incorrect. Try again.',
          'OK',
          {
            duration: 3500,
          }
        );
      },
    });
  }
}
