import { Component } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LabFront';

  brand: string = "App";


  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
    let auth = this.authService.getAuth();
    if (auth&&auth.expira) {
      if(moment(auth.expira).isBefore(new Date())){
        this.toastService.showError("Sesión expirada");
        this.authService.logOut();
      }
    }
  }

}
