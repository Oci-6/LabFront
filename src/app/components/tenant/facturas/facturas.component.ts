import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faMoneyBillWave, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { Factura } from 'src/app/models/Factura';
import { FacturaService } from 'src/app/services/FacturaService/factura.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PagoService } from 'src/app/services/PagoService/pago.service';
import { Pago } from 'src/app/models/Pago';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  constructor(
    private facturaService: FacturaService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private pagoService: PagoService,
    private authService: AuthService,
    private tenantService: TenantService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  facturas: Factura[] = [];
  selectedFactura: Factura | undefined;
  selectedPago: Pago | undefined;

  //Iconos
  faMoneyBillWave = faMoneyBillWave;
  faReceipt = faReceipt;

  //Control de roles
  miTenant: boolean = false;
  portero: boolean = false;
  gestor: boolean = false;
  admin: boolean = false;

  ngOnInit(): void {

    let auth = this.authService.getAuth();
    let tenant = this.tenantService.getTenant();

    this.getFacturas();
    if (auth) {
      this.miTenant = auth.usuario.tenantInstitucionId == tenant || auth.roles.find((element: string) => element == 'SuperAdmin') != undefined;
      this.admin = auth.roles.find((element: string) => element == 'Admin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor') != undefined;
      this.portero = auth.roles.find((element: string) => element == 'Portero') != undefined;

    }
  }

  getFacturas() {
    this.facturaService.getFacturas().subscribe(
      response => {
        this.facturas = response;
        console.log(response);

      },
      error => {
        console.error(error);
      }
    )
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

  pagar(factura: Factura) {
    this.pagoService.pagar(factura.id).subscribe(
      response => {
        console.log(response);
        window.open(response.message, "_blanck");
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  abrirModal(pago: Pago, modal: any) {
    this.modalService.open(modal);
    this.selectedPago = pago;
  }

}
