import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faHistory } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaDuotoneIconComponent } from '@fortawesome/angular-fontawesome';
import { ProductoService } from 'src/app/services/ProductoService/producto.service';
import { PrecioService } from 'src/app/services/PrecioService/precio.service';
import { Producto } from 'src/app/models/Producto';
import * as moment from 'moment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private precioService: PrecioService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
  ) 
  { 
  config.backdrop = 'static';
  config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faHistory= faHistory;

  productos: Producto[] = [];
  selectedProducto: Producto | undefined;
  precio: number | undefined;
  validez: Date | undefined;

  agregarProducto: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cantMaxEdificios: new FormControl('', Validators.required),
    cantMaxSalones: new FormControl('', Validators.required),
  });

  editarProducto: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cantMaxEdificios: new FormControl('', Validators.required),
    cantMaxSalones: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    this.productoService.getProductos().subscribe(
      response => {
        this.productos = response;
        console.log(response);
        
      },
      error => {
        console.error(error);
      }
    )    

  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, producto: Producto) {
    this.editarProducto.patchValue(producto);
    this.selectedProducto = producto;
    this.modalService.open(content);
  }

  borrarModal(content: any, producto: Producto) {
    this.modalService.open(content);
    this.selectedProducto = producto;
  }

  onSubmit() {
    if (this.agregarProducto.valid) {

      let producto = new Producto(this.agregarProducto.value)


      this.productoService.post(producto).subscribe(
        response => {
          this.productos.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarProducto.valid && this.editarProducto.touched && this.selectedProducto && this.selectedProducto.id) {

      let producto = new Edificio(this.editarProducto.value)


      this.productoService.put(producto, this.selectedProducto?.id).subscribe(
        response => {
          console.log("Before update: ", this.productos)

          this.productos[this.productos.findIndex((obj => obj.id == this.selectedProducto?.id))] = producto;

          console.log("After update: ", this.productos)
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedProducto && this.selectedProducto.id) {
      this.productoService.delete(this.selectedProducto.id).subscribe(
        response => {
          this.productos = this.productos.filter(e => e.id !== this.selectedProducto?.id);
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