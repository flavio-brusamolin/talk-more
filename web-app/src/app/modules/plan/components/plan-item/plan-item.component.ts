import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

import { Plan } from 'src/app/data/models'

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {
  @Input() plan: Plan
  @Input() current: boolean

  @Output() private subscribePlanEvent = new EventEmitter<string>();

  constructor () { }

  ngOnInit (): void {
  }

  subscribePlan (planId: string): void {
    this.subscribePlanEvent.emit(planId)
  }
}
