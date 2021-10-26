import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route : ActivatedRoute,
    private router: Router 
    ) {}
  
  ngOnInit(): void {
    let auth = localStorage.getItem('auth');
  
    if (typeof auth === 'string') {
      this.auth = JSON.parse(auth);
    }
  }

}
