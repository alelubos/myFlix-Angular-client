import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Triggers router navigation to 'movies' page
   */
  navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Triggers router navigation to 'profile' route
   */
  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Triggers router navigation to 'welcome' page after logging user out
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
