import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { AuthContainerComponent } from './auth-container/auth-container.component'

@NgModule({
  declarations: [AuthContainerComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,

    AuthContainerComponent
  ]
})
export class SharedModule { }
