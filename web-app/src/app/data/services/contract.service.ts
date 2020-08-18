import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { User } from '../models'

@Injectable()
export class ContractService {
  private url = `${environment.api}/contracts`

  constructor (private http: HttpClient) { }

  createContract (planId: string): Observable<User> {
    return this.http.post<User>(this.url, {
      planId
    })
  }
}
