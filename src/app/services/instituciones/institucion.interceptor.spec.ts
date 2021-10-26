import { TestBed } from '@angular/core/testing';

import { InstitucionInterceptor } from './institucion.interceptor';

describe('InstitucionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InstitucionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InstitucionInterceptor = TestBed.inject(InstitucionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
