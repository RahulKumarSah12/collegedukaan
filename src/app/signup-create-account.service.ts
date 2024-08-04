import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupCreateAccountService {

  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  createAccount(accountData: { name: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, accountData);
  }

  signIn(loginData: { contactInfo: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token); // Store the token
        }
      })
    );
  }



}