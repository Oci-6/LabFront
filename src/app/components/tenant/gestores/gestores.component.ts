import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Institucion } from 'src/app/models/Institucion';
import { Usuario } from 'src/app/models/Usuario';
import { GestorService } from 'src/app/services/gestor/gestor.service';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  
  constructor(
    //Inyecciones
    private gestorService: GestorService,
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
  gestores: Usuario[] = [];
  selectedGestor: Usuario | undefined;

  //Forms
  agregarGestor: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  editarGestor: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  ngOnInit(): void {
    this.getGestores();
    
  }

  getGestores() {
    this.gestorService.getAll().subscribe(
      response => {
        this.gestores = response;
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, gestor: Usuario) {
    this.editarGestor.patchValue(gestor);
    this.selectedGestor = gestor;
    this.modalService.open(content);
  }

  borrarModal(content: any, gestor: Usuario) {
    this.modalService.open(content);
    this.selectedGestor = gestor;
  }

  onSubmit() {
    if (this.agregarGestor.valid) {

      let gestor = new Usuario(this.agregarGestor.value)


      this.gestorService.post(gestor).subscribe(
        response => {
          this.getGestores();
          this.toastService.showSuccess("Gestor agregado")

        },
        error => {

          this.toastService.showError((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        }

      )
    }
  }

  onEdit() {
    if (this.editarGestor.valid && this.editarGestor.touched && this.selectedGestor && this.selectedGestor.id) {

      let gestor = new Usuario(this.editarGestor.value)


      this.gestorService.put(gestor, this.selectedGestor?.id).subscribe(
        response => {

          this.gestores[this.gestores.findIndex((obj => obj.id == this.selectedGestor?.id))] = gestor;
          this.toastService.showSuccess("Gestor modificado")

        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedGestor && this.selectedGestor.id) {
      this.gestorService.delete(this.selectedGestor.id).subscribe(
        response => {
          this.gestores = this.gestores.filter(e => e.id !== this.selectedGestor?.id);
          modal.close();
          this.toastService.showSuccess("Gestor borrado")
        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

}
