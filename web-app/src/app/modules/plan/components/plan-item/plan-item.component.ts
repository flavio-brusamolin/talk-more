import { Component, OnInit, Input } from '@angular/core'

import { Plan } from 'src/app/data/models'

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {
  @Input() plan: Plan

  constructor () { }

  ngOnInit (): void {
  }
}
