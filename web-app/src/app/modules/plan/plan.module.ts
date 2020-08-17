import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'
import { DataModule } from 'src/app/data/data.module'

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
    DataModule,

    PlanRoutingModule
  ]
})
export class PlanModule { }
