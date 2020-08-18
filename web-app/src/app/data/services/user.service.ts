import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { User } from '../models'

@Injectable()
export class UserService {
  private url = `${environment.api}/me`

  constructor (private http: HttpClient) { }

  loadLoggedUser (): Observable<User> {
    return this.http.get<User>(this.url)
  }
}
