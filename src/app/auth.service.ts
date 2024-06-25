import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const storedToken = this.getToken();
    this.currentUserSubject = new BehaviorSubject<string | null>(storedToken);
    this.isLoggedIn$ = this.currentUserSubject.asObservable().pipe(
      map(token => !!token)
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authToken', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authToken');
    }
  }

  login(loginData: { login: string; userPassword: string }): Observable<any> {
    return this.http.post('http://localhost:8080/login', loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.setToken(response.token);
          this.currentUserSubject.next(response.token);
        }
      })
    );
  }

  logout() {
    this.removeToken();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }
}
