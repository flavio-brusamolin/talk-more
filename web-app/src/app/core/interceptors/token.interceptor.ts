import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'

import { Observable } from 'rxjs'

import { AuthService } from '../services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor (private authService: AuthService) { }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getToken()

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'x-access-token': accessToken
        }
      })
    }

    return next.handle(request)
  }
}
