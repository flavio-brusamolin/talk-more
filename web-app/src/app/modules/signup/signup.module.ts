import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { SignupRoutingModule } from './signup-routing.module'

import { SignupFormComponent } from './page/signup-form/signup-form.component'

@NgModule({
  declarations: [SignupFormComponent],
  imports: [
    SharedModule,

    SignupRoutingModule
  ]
})
export class SignupModule { }
