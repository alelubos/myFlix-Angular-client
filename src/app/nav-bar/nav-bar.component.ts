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

  navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
