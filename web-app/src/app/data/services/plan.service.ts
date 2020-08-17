import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment'
import { Plan } from '../models'

@Injectable()
export class PlanService {
  private url = `${environment.api}/plans`

  constructor (private http: HttpClient) { }

  loadPlans (): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.url)
  }
}
