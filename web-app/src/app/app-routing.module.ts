import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainComponent } from './layout/main/main.component'

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'plans',
        pathMatch: 'full'
      },
      {
        path: 'plans',
        loadChildren: () => import('./modules/plan/plan.module').then(m => m.PlanModule)
      }
    ]
  },
  {
    path: 'signin',
    loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
