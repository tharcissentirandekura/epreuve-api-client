import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://tharapi.pythonanywhere.com/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getDataHandler(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${endpoint}`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => error);
      })
    );
  }

  getTestByCategory(route: string,query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${route}?search=${query}`)
    .pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => error);
      })
    );
  }

  postDataHandler(data: any,endpoint: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, data)
    .pipe(
      catchError((error) => {
        console.error('Error posting data:', error);
        return throwError(() => error);
      })
    );
  }

  // Add more methods as needed
}