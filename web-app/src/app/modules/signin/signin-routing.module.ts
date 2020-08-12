import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SigninFormComponent } from './page/signin-form/signin-form.component'

const routes: Routes = [
  {
    path: '',
    component: SigninFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule { }
