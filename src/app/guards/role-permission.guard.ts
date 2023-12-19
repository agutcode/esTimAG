import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class rolePermissionGuard implements CanActivate {
  constructor(
    private _authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    
    // Llama a la función o propiedad adecuada en tu servicio AuthService
    const loggedUser = this._authService.getloggedUser();

    if (!loggedUser || loggedUser.role !== 'admin') {
      // Puedes redirigir a la página de inicio de sesión u otra página si no estás autenticado
      this.router.navigateByUrl('/purchases')
    }

    return true;
  }
}
