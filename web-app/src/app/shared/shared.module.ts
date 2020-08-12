import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { AuthContainerComponent } from './auth-container/auth-container.component'
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [
    AuthContainerComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,

    AuthContainerComponent,
    InputComponent
  ]
})
export class SharedModule { }
