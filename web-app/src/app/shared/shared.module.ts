import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

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

    LoginContainerComponent,
    InputComponent
  ]
})
export class SharedModule { }
