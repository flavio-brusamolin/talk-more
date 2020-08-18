import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'

import { ToastrService } from 'ngx-toastr'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { AuthService } from 'src/app/core/services/auth.service'
import { SignUpData } from 'src/app/data/models'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit, OnDestroy {
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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  signUp (userData: SignUpData): void {
    this.authService.signUp(userData)
      .pipe(takeUntil(this.unsub$))
      .subscribe(
        () => {
          this.toastr.success('Seja bem-vindo ao nosso sistema', 'Olá!')
          this.router.navigate(['/'])
        },
        ({ error }: HttpErrorResponse) => {
          console.error(error)
          this.toastr.error(error.error, 'Erro!')
        }
      )
  }
}
