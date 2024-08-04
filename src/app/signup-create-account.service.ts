import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
  }

  makeSeller(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createSeller`, data);
  }

  checkSeller(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkSeller`, data);
  }

  addProduct(productData: { name: string, description: string, price: number, stock: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/allproducts`, productData);
  }

}
