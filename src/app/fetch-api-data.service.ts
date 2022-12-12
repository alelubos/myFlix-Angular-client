import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base URL for API services
 */
const apiUrl = 'https://careful-teal-bighorn-sheep.cyclic.app/';

/**
 * Service Component with methods to call HTTP Endpoints
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module into constructor params. By making it
  // private, becomes available to entire class (as this.http) rather than
  // just the constructor
  constructor(private http: HttpClient) {}

  /**
   * Extracts response data from API calls
   * @param res
   * @returns
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handler for API calls
   * @param error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log('Some error occurred:', error.error);
    } else {
      console.log(
        `Error Status code: ${error.status}, Error body is: ${error.error}, Error message: ${error.message}`
      );
      // Alert user the type of Error
      window.alert(error.message + '. Try Again!');
    }
    throwError(
      () =>
        new Error(
          `Something went wrong: ${error.error} Please try again later.`
        )
    );
  }

  //API CALLS-------------------------------------------------------------------

  /**
   * Calls API Endpoint to Register a new user
   * @param userDetails
   * @returns observable that resolves in text confirming registration
   */
  public userRegistration(userDetails: any): Observable<any> {
    // We return the Observable<Response> to whoever consumes this method:
    return this.http
      .post(apiUrl + 'users', userDetails, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Login user
   * @param userCredentials
   * @returns observable that resolves in JSON object with the user's data and its JWT.
   */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Retrieve All Movies
   * @returns observable that resolves in list of movie objects (Array<Movie>) JSON object
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Retrieve Single Movie's data
   * @param movieID
   * @returns observable that resolves in a movie JSON object
   */
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

  /**
   * Calls API Endpoint to Retrieve Single Director's data
   * @param name
   * @returns observable that resolves in a single Director JSON object
   */
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

  /**
   * Calls API Endpoint to Retrieve Single Genre's data
   * @param name
   * @returns observable that resolves in a single Genre JSON object
   */
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genres/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Retrieve the current logged user's data
   * @param username
   * @returns observable that resolves in as single user JSON object
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Retrieve favourite movies from the user
   * @returns observable that resolves in user's favorite movies (Array<MovieID>) as JSON object
   */
  public getUsersFavorites(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Add a Movie to user's favorites
   * @param movieID
   * @returns observable that resolves in JSON object with user's data and an array of updated favorite Movies.
   */
  addUserFavorite(movieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + `users/${username}/favorites/${movieID}`, movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Update information from Single user
   * @param updatedUser
   * @returns observable that resolves in JSON object with updated user's data
   */
  editUser(updatedUser: any): Observable<any> {
    updatedUser['birthday'] = JSON.stringify(updatedUser.birthday).slice(1, 11);
    // console.log('editUser: ', updatedUser.birthday);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Delete a user
   * @returns observable that resolves in a confirmation string
   */
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Calls API Endpoint to Delete Movie from User's favourites
   * @param movieID
   * @returns observable that resolves in JSON object with user's data with updated favorite movies array.
   */
  deleteUserFavorite(movieID: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${username}/favorites/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
