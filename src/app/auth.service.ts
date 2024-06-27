import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<{ token: string | null, login: string | null }>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const storedData = this.getData();
    this.currentUserSubject = new BehaviorSubject<{ token: string | null, login: string | null }>(storedData);
    this.isLoggedIn$ = this.currentUserSubject.asObservable().pipe(
      map(data => !!data.token)
    );
  }

  private getData(): { token: string | null, login: string | null } {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedData = localStorage.getItem('authData');
      if (storedData) {
        return JSON.parse(storedData);
      }
    }
    return { token: null, login: null };
  }

  private setData(data: { token: string, login: string }): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('authData', JSON.stringify(data));
    }
  }

  private removeData(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('authData');
    }
  }

  login(loginData: { login: string; userPassword: string }): Observable<any> {
    return this.http.post('http://localhost:8080/login', loginData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          const authData = { token: response.token, login: loginData.login };
          this.setData(authData);
          this.currentUserSubject.next(authData);
        }
      })
    );
  }

  logout() {
    this.removeData();
    this.currentUserSubject.next({ token: null, login: null });
  }

  getCurrentUser(): { token: string | null, login: string | null } {
    return this.currentUserSubject.value;
  }
}
