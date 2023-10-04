import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES } from './roles/roles';

@Injectable({
  providedIn: 'root'
})
export class DocenteGuard implements CanActivate {

  constructor(private router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const rolUsuario = localStorage.getItem('rolUsuario');
      if (rolUsuario === ROLES.DOCENTE) {
        return true;
      } else {
        this.router.navigate(["/inicio"]);
        return false;
      }
    }
}