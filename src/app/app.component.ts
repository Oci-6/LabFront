import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LabFront';

  auth: any;
  brand: string = "App";

  constructor(
    private authService: AuthService
    ) {}
  
  ngOnInit(): void {
    
      this.auth = this.authService.getAuth();
    
  }

}
