import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { PagoService } from 'src/app/services/PagoService/pago.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css']
})
export class FailedComponent implements OnInit {

  faTimes = faTimes;

  constructor(
    public tenantService: TenantService
  ) { }

  ngOnInit(): void {
    
  }

}
