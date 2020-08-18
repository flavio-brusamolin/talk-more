import { Component, OnInit } from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>

  name$: Observable<string>

  constructor (private authService: AuthService) { }

  ngOnInit (): void {
    this.getAuthStatus()
    this.loadUserName()
  }

  private getAuthStatus (): void {
    this.isLoggedIn$ = this.authService.isLoggedIn()
  }

  private loadUserName (): void {
    this.name$ = this.authService
      .loadLoggedUser()
      .pipe(map(user => user.name))
  }

  signOut (): void {
    this.authService.signOut()
  }
}
