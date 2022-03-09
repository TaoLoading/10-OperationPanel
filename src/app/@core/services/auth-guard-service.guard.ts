import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

import { ToastService } from 'ng-devui';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isUserLoggedIn()) {
      
      this.toastService.open({
        value: [
          {
            severity: 'info',
            summary: '提示',
            content: '请先进行登录!'
          }
        ],
        life: 2000,
      });
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
