import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class InstitucionInterceptor implements HttpInterceptor {

  constructor(private tenantService: TenantService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tenant = localStorage.getItem('tenant');
    
    if (typeof tenant === 'string') {
        
        
        // const expiration = JSON.parse(auth).expiration;
        if (tenant) {
            const cloned = request.clone({
                headers: request.headers.set("TenantId",tenant)
            });

            return next.handle(cloned);

        }

    }
        return next.handle(request);
  }
}
