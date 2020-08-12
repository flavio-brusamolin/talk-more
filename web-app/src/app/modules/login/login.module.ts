import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { LoginRoutingModule } from './login-routing.module'

import { LoginFormComponent } from './page/login-form/login-form.component'

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    SharedModule,

    LoginRoutingModule
  ]
})
export class LoginModule { }
