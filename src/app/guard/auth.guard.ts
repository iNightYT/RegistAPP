import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES } from './roles/roles';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router ){ }
  canActivate(): boolean {
    const rolUsuario = localStorage.getItem('rolUsuario');

    if (rolUsuario === ROLES.ALUMNO) {
      // El usuario tiene el rol de "alumno", permitir el acceso
      return true;
    } else if (rolUsuario === ROLES.DOCENTE) {
      // El usuario tiene el rol de "docente", permitir el acceso
      return true;
    } else {
      // El usuario no tiene un rol válido, denegar el acceso y redirigirlo, por ejemplo, a la página de inicio de sesión
      this.router.navigate(['/home']);
      return false;
    }
  }
}