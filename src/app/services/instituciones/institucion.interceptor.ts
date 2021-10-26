import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class InstitucionInterceptor implements HttpInterceptor {

  constructor(private route: ActivatedRoute) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let tenant = this.route.snapshot.parent?.children.find((e) => e.outlet ==="primary")?.paramMap.get('tenant');

    return next.handle(request);
  }
}
