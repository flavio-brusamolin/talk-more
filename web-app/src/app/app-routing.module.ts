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
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
