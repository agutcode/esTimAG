import { Component } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  loggedUser: User | null

  constructor(private _authService:AuthService){    
    this.loggedUser = this._authService.getloggedUser();
  }

  logOut = () => {
   this.loggedUser = this._authService.logOut()
  }
}
