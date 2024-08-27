import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupCreateAccountService {

  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  createAccount(accountData: { name: string, email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, accountData);
  }

  signIn(loginData: { contactInfo: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
  }

  sendOtp(email: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/getOtp`, {email});
  }

  verifyOtp(data: { otp: string; email: string; phone: number; location: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createSeller`, data);
  }

  checkSeller(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/isSeller`, data);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, formData);
  }

  getproducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getallMyProducts(email:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/myProducts`, email);
  }

  deleteProduct(reqBody:any){
    return this.http.post(`${this.apiUrl}/deleteProduct`, reqBody);
  }

  updateProduct(reqBody:any){
    return this.http.post(`${this.apiUrl}/editProducts`, reqBody);
  }

}
