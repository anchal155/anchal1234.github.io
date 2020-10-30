import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpClientService {
  apiBaseUrl="https://75.101.138.121:3000/v1/"
  constructor(
    private http: HttpClient,
  ) {}

  private formatErrors(error:HttpErrorResponse) {
    if(error.status === 401){
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("EXPIRES_IN");
      location.reload();
      return;
    }
    //alert(error.error.message);
    return of([]);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/{path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {},header?): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/{path}`,body,header).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {},header?): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/{path}`,body,header).pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: Object = {},header?): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/{path}`,body,header).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/{path}`).pipe(catchError(this.formatErrors));
  }
}
