import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faHistory } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaDuotoneIconComponent } from '@fortawesome/angular-fontawesome';
import { ProductoService } from 'src/app/services/ProductoService/producto.service';
import { PrecioService } from 'src/app/services/PrecioService/precio.service';
import { Producto } from 'src/app/models/Producto';
import * as moment from 'moment';
import { Precio } from 'src/app/models/Precio';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private precioService: PrecioService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faHistory = faHistory;


  precios: Precio[] = [];
  selectedPrecio: Precio | undefined;
  productoId: string | undefined;

  agregarPrecio: FormGroup = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_Validez: new FormControl('', Validators.required),
  });

  editarPrecio: FormGroup = new FormGroup({
    monto: new FormControl('', Validators.required),
    fecha_Validez: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.productoId = String(routeParams.get('idProducto'));

    this.precioService.getPreciosProducto(this.productoId).subscribe(
      response => {
        this.precios = response;
        console.log(response);
        this.precios.sort((x, y) => {
          if (x.fecha_Validez && y.fecha_Validez) {
            if (x.fecha_Validez > y.fecha_Validez) {
              return -1;
            }
            if (x.fecha_Validez < y.fecha_Validez) {
              return 1;
            }
          }
          // a must be equal to b
          return 0;
        })
      },
      error => {
        console.error(error);
      }
    )

  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, precio: Precio) {
    this.editarPrecio.patchValue(precio);
    this.selectedPrecio = precio;
    this.modalService.open(content);
  }

  borrarModal(content: any, producto: Precio) {
    this.modalService.open(content);
    this.selectedPrecio = producto;
  }

  onSubmit() {
    if (this.agregarPrecio.valid) {

      let precio = new Precio(this.agregarPrecio.value)
      precio.productoId = this.productoId;


      this.precioService.post(precio).subscribe(
        response => {
          this.precios.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarPrecio.valid && this.editarPrecio.touched && this.selectedPrecio && this.selectedPrecio.id) {

      let precio = new Edificio(this.editarPrecio.value)


      this.precioService.put(precio, this.selectedPrecio?.id).subscribe(
        response => {
          console.log("Before update: ", this.precios)

          this.precios[this.precios.findIndex((obj => obj.id == this.selectedPrecio?.id))] = precio;

          console.log("After update: ", this.precios)
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedPrecio && this.selectedPrecio.id) {
      this.precioService.delete(this.selectedPrecio.id).subscribe(
        response => {
          this.precios = this.precios.filter(e => e.id !== this.selectedPrecio?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
