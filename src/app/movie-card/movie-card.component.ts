import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// Custom Components
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

/**
 * Component renders View with List of Movies
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApi: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Gets List of movies by calling @function getAllMovies from FetchApiDataService
   * @returns array of movie objects
   */
  getMovies() {
    this.fetchApi.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
        if (!sessionStorage.getItem('movieTitlesById')) {
          const movieTitlesById = this.movies.reduce(
            (obj, current) => ({ ...obj, [current._id]: current.title }),
            {}
          );
          sessionStorage.setItem(
            'movieTitlesById',
            JSON.stringify(movieTitlesById)
          );
        }
      },
    });
  }

  /**
   * Gets List of favorite Movies by calling @function getUser from FetchApiDataService
   * @returns array of movie objects
   */
  getFavorites() {
    const username = localStorage.getItem('username') || '';
    this.fetchApi.getUser(username).subscribe({
      next: (response) => {
        this.favorites = response.favoriteMovies;
      },
    });
  }

  /**
   * Checks if a Movie is a favorite one, by verifying if its included in array favorites
   * @param movieID property movie._id
   * @returns boolean indicating if movie is favorite
   */
  isFavorite(movieID: string): boolean {
    return this.favorites.includes(movieID);
  }

  /**
   * Toggles if a movie is a favorite by adding/removing its _id from the favorites array
   * @param id property movie._id
   * @param title property movie.title
   */
  toggleFavorite(id: string, title: string): void {
    let index = this.favorites.indexOf(id);
    if (index === -1) {
      // Optimistic Update for more performant UX
      this.favorites.push(id);
      this.fetchApi.addUserFavorite(id).subscribe({
        next: (response) => {
          this.favorites = response.favoriteMovies;
          this.snackBar.open(`"${title}" was added to your Favorites.`, 'OK', {
            duration: 2000,
          });
        },
        error: (error) => {
          // Reverse Optimistic Update
          this.favorites.pop();
          this.snackBar.open(
            `Something went wrong "${title}" was not added to your Favorites.`,
            'OK',
            {
              duration: 2500,
            }
          );
        },
      });
    } else {
      this.favorites.splice(index, 1);
      this.fetchApi.deleteUserFavorite(id).subscribe({
        next: (response) => {
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });
        },
        error: (error) => {
          this.favorites.push(id);
          this.snackBar.open(
            'Something went wrong. Movie was not removed from favorites',
            'OK',
            {
              duration: 2000,
            }
          );
        },
      });
    }
  }

  /**
   * Opens dialog with the movie Director's info
   * @param name
   * @param bio
   * @param birthYear
   */
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

  /**
   * Opens dialog with information about a movie's Genre
   * @param genre
   * @param description
   */
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

  /**
   * Opens Dialog with info of a movie's Synopsis
   * @param title
   * @param description
   */
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
