import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
// Custom Components
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any;

  constructor(public fetchApi: FetchApiDataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
    let list = localStorage.getItem('favoriteMovies');
    this.favorites = list?.split(',');
  }

  isFavorite(movieID: string): boolean {
    return this.favorites.includes(movieID);
  }

  getMovies() {
    this.fetchApi.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response.sort((a: any, b: any) => a.title > b.title);
      },
    });
  }

  toggleFavorite(id: string): void {
    let index = this.favorites.indexOf(id);
    if (index === -1) {
      this.favorites.push(id);
      this.fetchApi.addUsersFavorite(id).subscribe({
        next: (response) => {
          this.favorites = response.favoriteMovies;
        },
        error: (error) => {
          this.favorites.pop();
        },
      });
    } else {
      this.favorites.splice(index, 1);
      this.fetchApi.deleteUsersFavorite(id).subscribe({
        next: (response) => {
          this.favorites = response.favoriteMovies;
        },
        error: (error) => {
          this.favorites.push(id);
        },
      });
    }
  }

  openDirectorDialog(name: string, bio: string, birthYear: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name,
        bio,
        birthYear,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  openGenreDialog(genre: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        genre,
        description,
      },
      // Assign dialog width
      width: '500px',
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        title,
        synopsis: description,
      },
      // Assign dialog width
      width: '500px',
    });
  }
}
