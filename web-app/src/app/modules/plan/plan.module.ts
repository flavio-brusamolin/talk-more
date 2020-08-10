import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PlanRoutingModule } from './plan-routing.module'

import { PlanListComponent } from './page/plan-list/plan-list.component'

@NgModule({
  declarations: [PlanListComponent],
  imports: [
    CommonModule,

    PlanRoutingModule
  ]
})
export class PlanModule { }
