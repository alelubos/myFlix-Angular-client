import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client App:
const apiUrl = 'https://top-flix.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This provides HttpClient to the entire class, available via: this.http
  constructor(private http: HttpClient) {}

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
    }
    throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  //API CALLS-------------------------------------------------------------------

  // POST /users -User Registration-
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // POST /login -User Login- returns JSON object: { user, token }
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  // GET /movies -Retrieve All Movies as JSON object-
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET /movies/[movieID] -Retrieve Single Movie as JSON object-
  getOneMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET /directors/[name] -Retrieve Single Director as JSON object-
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET /genres/[name] -Retrieve Single Genre as JSON object-
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genress/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET /users/[username] -Retrieve Single User as JSON object-
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET /users/[username]/favourites -Retrieve favourite movies from user as JSON object-
  getUsersFavorites(): Observable<any> {
    const { username } = JSON.parse(localStorage['user']);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}/favourites`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // POST /users/[username]/favorites/[movieID] -Add Movie to user's favorites-
  addUsersFavorites(movieID: string): Observable<any> {
    const { username } = JSON.parse(localStorage['user']);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}/favourites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // PUT /users/[username] -Update information from Single user-
  editUser(updatedUser: Object): Observable<any> {
    const { username } = JSON.parse(localStorage['user']);
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE /users/[username] -Delete user-
  deleteUser(): Observable<any> {
    const { username } = JSON.parse(localStorage['user']);
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE /movies/[username]/favourites/[movieID] -Delete Movie from User's favourites-
  deleteUsersFavourite(movieID: string): Observable<any> {
    const { username } = JSON.parse(localStorage['user']);
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}/favourites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
