import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
// Dialog Components
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(public fetchApi: FetchApiDataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.fetchApi.getAllMovies().subscribe((response) => {
      this.movies = response.sort((a: any, b: any) => a.title > b.title);
      console.log(response);
    });
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
