import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { Router } from '@angular/router';

/**
 * Displays Home View for user to register or to log in
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, private route: Router) {}

  ngOnInit(): void {
    // If user already logged Go to Movies:
    // if (localStorage.getItem('username') && localStorage.getItem('token')) {
    //   this.route.navigate(['movies']);
    // }
  }

  /**
   * Opens dialog form to register
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * opens dialog form to log in
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
