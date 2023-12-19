import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  loggedUser!: User | null

  constructor(
    private _authService: AuthService,
    private router: Router
  ){
    this.loggedUser = this._authService.getloggedUser()
  }

  logOut = () => {
    this.loggedUser = this._authService.logOut()
    this.router.navigate(['/'])
  }

}
