import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { SignUpData, SignInData, Token, User } from 'src/app/data/models'

@Injectable()
export class AuthService {
  private url = environment.api

  constructor (private http: HttpClient) { }

  signIn (credentials: SignInData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signin`, credentials)
      .pipe(tap(({ accessToken }) => this.setToken(accessToken)))
  }

  signUp (userData: SignUpData): Observable<Token> {
    return this.http
      .post<Token>(`${this.url}/signup`, userData)
      .pipe(tap(({ accessToken }) => this.setToken(accessToken)))
  }

  loadLoggedUser (): Observable<User> {
    return this.http.get<User>(`${this.url}/me`)
  }

  getToken (): string {
    return localStorage.getItem('accessToken')
  }

  private setToken (accessToken: string): void {
    localStorage.setItem('accessToken', accessToken)
  }
}
