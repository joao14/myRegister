import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  /**  
   * Función que permite obtener un Array de elementos
   * @author Alex Merino
   * @date 2/05/2019
   */
  get(apiUrl: string, httpOptions: object): Observable<any> {
    console.log('LA URL' + apiUrl);
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Función que permite otener un elemento por su identificador
   * @author Alex Merino
   * @date 2/05/2019
   */
  getById(apiUrl: string, id: string, httpOptions: object): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  /**
   * Función que permite ingresar un nuevo elemento
   * @author Alex Merino
   * @date 2/05/2019
   */
  post(apiUrl: string, data, httpOptions: object): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Función que permite actualizar un elemento
   * @author Alex Merino
   * @date 2/05/2019
   */
  update(apiUrl: string, id: string, data, httpOptions: object): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Función que permite eliminar un elemento
   * @author Alex Merino
   * @date 2/05/2019
   */
  delete(apiUrl: string, id: string, httpOptions: object): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Función que permite retornar el objeto de la respuesta
   * @author Alex Merino
   * @date 2/05/2019
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Función que permite retornar el tipo de error según la petición
   * @author Alex Merino
   * @date 2/05/2019
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
