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
    this.currentUserSubject = new BehaviorSubject<string | null>(null);
    this.isLoggedIn$ = this.currentUserSubject.asObservable().pipe(
      map(user => !!user)
    );
  }

  login(loginData: { login: string; userPassword: string }): Observable<any> {
    return this.http.post('http://localhost:8080/login', loginData).pipe(
      tap((response: any) => {
        if (response && response.userFullName) {
          this.currentUserSubject.next(loginData.login);
        }
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }
}
