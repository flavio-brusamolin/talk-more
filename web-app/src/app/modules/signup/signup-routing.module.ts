import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SignupFormComponent } from './page/signup-form/signup-form.component'

const routes: Routes = [
  {
    path: '',
    component: SignupFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
