import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'

import { Plan } from 'src/app/data/models'
import callValues from 'src/app/app.properties'

interface Operators {
  origin: number
  destination: number
  minutes: number
}

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.css']
})
export class PlanItemComponent implements OnInit {
  @Input() plan: Plan
  @Input() current: boolean
  @Output() private subscribePlanEvent = new EventEmitter<string>();

  form: FormGroup

  origins = [...new Set(callValues.map(item => item.origin))]
  destinations = [...new Set(callValues.map(item => item.destination))]

  resultWithPlan: string = null
  resultWithoutPlan: string = null

  constructor (
    private formBuilder: FormBuilder,
    private modal: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit (): void {
    this.initializeForms()
  }

  private initializeForms (): void {
    this.form = this.formBuilder.group({
      origin: [null, Validators.required],
      destination: [null, Validators.required],
      minutes: [null, [Validators.required, Validators.min(1)]]
    })
  }

  openSimulationModal (content: any): void {
    this.modal.open(content, { centered: true })
      .result.then(
        () => {},
        () => {
          this.form.reset()
          this.resetResults()
        }
      )
  }

  calculate ({ origin, destination, minutes }: Operators): void {
    const [call] = callValues.filter(item => item.origin === origin && item.destination === destination)

    if (!call) {
      this.toastr.error('Combinação de DDDs inválida', 'Erro!')
      this.resetResults()
    } else {
      this.calculateWithPlan(call.tariff, minutes)
      this.calculateWithoutPlan(call.tariff, minutes)
    }
  }

  private calculateWithPlan (tariff: number, minutes: number): void {
    const extraMinutes = minutes - this.plan.minutes

    if (extraMinutes <= 0) {
      this.resultWithPlan = '0'
    } else {
      this.resultWithPlan = (extraMinutes * tariff * 1.1).toFixed(2)
    }
  }

  private calculateWithoutPlan (tariff: number, minutes: number): void {
    this.resultWithoutPlan = (tariff * minutes).toFixed(2)
  }

  private resetResults (): void {
    this.resultWithPlan = null
    this.resultWithoutPlan = null
  }

  subscribePlan (planId: string): void {
    this.subscribePlanEvent.emit(planId)
  }
}
