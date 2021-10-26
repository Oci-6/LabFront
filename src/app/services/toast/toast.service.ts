import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  showStandard(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ textOrTpl});
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ textOrTpl, classname: 'bg-success text-light' });
  }

  showError(textOrTpl: string | TemplateRef<any>) {
    this.toasts.push({ textOrTpl, classname: 'bg-danger text-light' });
  }
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}