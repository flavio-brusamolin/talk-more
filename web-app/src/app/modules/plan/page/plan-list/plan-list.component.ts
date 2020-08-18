import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'

import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { Plan } from 'src/app/data/models'
import { PlanService } from 'src/app/data/services/plan.service'
import { AuthService } from 'src/app/core/services/auth.service'
import { ContractService } from 'src/app/data/services/contract.service'

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean

  plans$: Observable<Plan[]>
  currentPlanId: string

  private unsub$ = new Subject<void>()

  constructor (
    private planService: PlanService,
    private authService: AuthService,
    private contractService: ContractService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit (): void {
    this.getAuthStatus()
    this.loadPlans()
    this.loadCurrentPlan()
  }

  ngOnDestroy (): void {
    this.unsub$.next()
    this.unsub$.complete()
  }

  private getAuthStatus (): void {
    this.authService.isLoggedIn()
      .pipe(takeUntil(this.unsub$))
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn)
  }

  private loadPlans (): void {
    this.plans$ = this.planService.loadPlans()
  }

  private loadCurrentPlan (): void {
    if (this.isLoggedIn) {
      this.authService.loadLoggedUser()
        .pipe(takeUntil(this.unsub$))
        .subscribe(({ planId }) => this.currentPlanId = planId)
    }
  }

  createContract (planId: string): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/signin'])
      this.toastr.info('Faça login para continuar', 'Oops!')
    } else {
      this.contractService.createContract(planId)
        .pipe(takeUntil(this.unsub$))
        .subscribe(() => {
          this.toastr.success('Obrigado por adquirir nosso plano', 'Opa!')
          this.currentPlanId = planId
        })
    }
  }
}
