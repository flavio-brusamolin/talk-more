import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'

import { PlanService } from 'src/app/data/services/plan.service'
import { Plan } from 'src/app/data/models'

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  plans$: Observable<Plan[]>

  constructor (private planService: PlanService) { }

  ngOnInit (): void {
    this.loadPlans()
  }

  private loadPlans (): void {
    this.plans$ = this.planService.loadPlans()
  }
}
