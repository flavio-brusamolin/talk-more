import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'

import { ToastrService } from 'ngx-toastr'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AuthService } from 'src/app/core/services/auth.service'
import { SignInData } from 'src/app/data/models'

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit, OnDestroy {
  form: FormGroup

  private unsub$ = new Subject<void>()

  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit (): void {
    this.initializeForms()
  }

  ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private initializeForms (): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signIn (credentials: SignInData): void {
    this.authService.signIn(credentials)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.toastr.success('Login realizado com sucesso', 'Bem-vindo de volta!')
          this.router.navigate(['/'])
        },
        ({ error }: HttpErrorResponse) => {
          console.error(error)
          this.toastr.error(error.error, 'Erro!')
        }
      )
  }
}
