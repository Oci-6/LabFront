import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';

@Component({
  selector: 'app-home-tenant',
  templateUrl: './home-tenant.component.html',
  styleUrls: ['./home-tenant.component.css']
})
export class HomeTenantComponent implements OnInit {

  constructor(
    private institucionService: InstitucionesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.institucionService.getAll().subscribe();
  }

}
