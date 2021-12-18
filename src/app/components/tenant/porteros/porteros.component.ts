import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/Usuario';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { PorteroService } from 'src/app/services/portero/portero.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-porteros',
  templateUrl: './porteros.component.html',
  styleUrls: ['./porteros.component.css']
})
export class PorterosComponent implements OnInit {

  
  constructor(
    //Inyecciones
    private porteroService: PorteroService,
    private institucionesService: InstitucionesService,
    private toastService: ToastService,

    //Bootstrap
    config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  };

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  //Variables
  porteros: Usuario[] = [];
  selectedPortero: Usuario | undefined;

  //Forms
  agregarPortero: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose(
      [Validators.email, Validators.required])),    password: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('',Validators.compose(
      [Validators.minLength(8),Validators.maxLength(12), Validators.required])),    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  editarPortero: FormGroup = new FormGroup({
    email: new FormControl('',Validators.compose(
      [Validators.email, Validators.required])),    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('',Validators.compose(
      [Validators.minLength(8),Validators.maxLength(12), Validators.required])),    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  ngOnInit(): void {
    this.getPorteros();
    
  }

  getPorteros() {
    this.porteroService.getAll().subscribe(
      response => {
        this.porteros = response;
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, Portero: Usuario) {
    this.editarPortero.patchValue(Portero);
    this.selectedPortero = Portero;
    this.modalService.open(content);
  }

  borrarModal(content: any, Portero: Usuario) {
    this.modalService.open(content);
    this.selectedPortero = Portero;
  }

  onSubmit() {
    if (this.agregarPortero.valid) {

      let Portero = new Usuario(this.agregarPortero.value)


      this.porteroService.post(Portero).subscribe(
        response => {
          this.getPorteros();
          this.toastService.showSuccess("Portero agregado")

        },
        error => {

          this.toastService.showError((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        }

      )
    }
  }

  onEdit() {
    if (this.editarPortero.valid && this.editarPortero.touched && this.selectedPortero && this.selectedPortero.id) {

      let portero = new Usuario(this.editarPortero.value)


      this.porteroService.put(portero, this.selectedPortero?.id).subscribe(
        response => {

          this.porteros[this.porteros.findIndex((obj => obj.id == this.selectedPortero?.id))] = portero;
          this.toastService.showSuccess("Portero modificado")

        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedPortero && this.selectedPortero.id) {
      this.porteroService.delete(this.selectedPortero.id).subscribe(
        response => {
          this.porteros = this.porteros.filter(e => e.id !== this.selectedPortero?.id);
          modal.close();
          this.toastService.showSuccess("Portero borrado")
        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

}
