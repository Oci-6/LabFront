import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Institucion } from 'src/app/models/Institucion';
import { Usuario } from 'src/app/models/Usuario';
import { AdminService } from 'src/app/services/admins/admin.service';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  constructor(
    //Inyecciones
    private adminService: AdminService,
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
  admins: Usuario[] = [];
  instituciones: Institucion[] = [];
  selectedAdmin: Usuario | undefined;

  //Forms
  agregarAdmin: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),
    tenantInstitucionId: new FormControl('', Validators.required),

  });

  editarAdmin: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),
    tenantInstitucionId: new FormControl('', Validators.required),

  });

  ngOnInit(): void {
    this.getAdmins();
    this.institucionesService.getAll().subscribe(
      response => {
        this.instituciones = response;
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }
    )
  }

  getAdmins() {
    this.adminService.getAll().subscribe(
      response => {
        this.admins = response;
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, admin: Usuario) {
    this.editarAdmin.patchValue(admin);
    this.selectedAdmin = admin;
    this.modalService.open(content);
  }

  borrarModal(content: any, admin: Usuario) {
    this.modalService.open(content);
    this.selectedAdmin = admin;
  }

  onSubmit() {
    if (this.agregarAdmin.valid) {

      let admin = new Usuario(this.agregarAdmin.value)


      this.adminService.post(admin).subscribe(
        response => {
          this.getAdmins();
          this.toastService.showSuccess("Admin agregado")

        },
        error => {

          this.toastService.showError((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        }

      )
    }
  }

  onEdit() {
    if (this.editarAdmin.valid && this.editarAdmin.touched && this.selectedAdmin && this.selectedAdmin.id) {

      let admin = new Usuario(this.editarAdmin.value)


      this.adminService.put(admin, this.selectedAdmin?.id).subscribe(
        response => {

          this.admins[this.admins.findIndex((obj => obj.id == this.selectedAdmin?.id))] = admin;
          this.toastService.showSuccess("Admin modificado")

        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedAdmin && this.selectedAdmin.id) {
      this.adminService.delete(this.selectedAdmin.id).subscribe(
        response => {
          this.admins = this.admins.filter(e => e.id !== this.selectedAdmin?.id);
          modal.close();
          this.toastService.showSuccess("Admin borrado")
        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  institucion(admin: Usuario){
    return this.instituciones.filter(e => e.id === admin.tenantInstitucionId);
  }
}