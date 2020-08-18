import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { AuthService } from '../services/auth.service'

@Injectable()
export class HttpErorInterceptor implements HttpInterceptor {
  constructor (
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && this.router.url !== '/signin') {
          this.authService.signOut()
          this.toastr.error('Faça login novamente', 'Erro!')
        }

        return throwError(err)
      }))
  }
}
