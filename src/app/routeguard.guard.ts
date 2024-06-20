import { CanActivateFn, Router } from '@angular/router';
import { HttpService } from './services/http.service';
import { inject } from '@angular/core';

export const routeguardGuard: CanActivateFn = (route, state) => {
  const httpService = inject(HttpService);
  const router = inject(Router);
  if(httpService.getIsChat())
    return true;
  router.navigate(["/"])
  return httpService.getIsChat();
};
