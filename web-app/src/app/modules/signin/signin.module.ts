import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { SigninRoutingModule } from './signin-routing.module'

import { SigninFormComponent } from './page/signin-form/signin-form.component'

@NgModule({
  declarations: [SigninFormComponent],
  imports: [
    SharedModule,

    SigninRoutingModule
  ]
})
export class SigninModule { }
