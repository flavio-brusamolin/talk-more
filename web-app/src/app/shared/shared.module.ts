import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'

import { LoginContainerComponent } from './login-container/login-container.component'
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [
    LoginContainerComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    NgbModule,
    NgSelectModule,

    LoginContainerComponent,
    InputComponent
  ]
})
export class SharedModule { }
