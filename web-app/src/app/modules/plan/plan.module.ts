import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PlanRoutingModule } from './plan-routing.module'

import { PlanListComponent } from './page/plan-list/plan-list.component'
import { PlanItemComponent } from './components/plan-item/plan-item.component'

@NgModule({
  declarations: [
    PlanListComponent,
    PlanItemComponent
  ],
  imports: [
    CommonModule,

    PlanRoutingModule
  ]
})
export class PlanModule { }
