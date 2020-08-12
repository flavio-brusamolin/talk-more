import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { PlanRoutingModule } from './plan-routing.module'

import { PlanListComponent } from './page/plan-list/plan-list.component'
import { PlanItemComponent } from './components/plan-item/plan-item.component'

@NgModule({
  declarations: [
    PlanListComponent,
    PlanItemComponent
  ],
  imports: [
    SharedModule,

    PlanRoutingModule
  ]
})
export class PlanModule { }
