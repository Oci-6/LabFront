import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { PagoService } from 'src/app/services/PagoService/pago.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  faCheck = faCheck;

  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private router: Router,
    public tenantService: TenantService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get("id");
    if (id){
      this.pagoService.get(id).subscribe(
        response => {

        },
        error => {
          this.router.navigate(["/"])
        }
      );
    }else{
      this.router.navigate(["/"])
    }
  }

}
