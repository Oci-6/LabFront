import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { Factura } from 'src/app/models/Factura';
import { FacturaService } from 'src/app/services/FacturaService/factura.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PagoService } from 'src/app/services/PagoService/pago.service';

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
    private pagoService: PagoService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  facturas: Factura[] = [];
  selectedFactura: Factura | undefined;

  //Iconos
  faMoneyBillWave = faMoneyBillWave;

  ngOnInit(): void {

    this.getFacturas();

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


}
