import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faDoorOpen, faChalkboardTeacher, faPersonBooth, faMapMarkedAlt, faBell, faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaDuotoneIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {

  constructor(
    private edificioService: EdificioService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private authService: AuthService,
    private tenantService: TenantService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faDoor = faDoorOpen;
  faBoard = faChalkboardTeacher;
  faPersonBooth = faPersonBooth;
  faMapMarkedAlt = faMapMarkedAlt;
  faBell = faBell;
  faMapSigns = faMapSigns;

  edificios: Edificio[] = [];
  selectedEdificio: Edificio | undefined;

  //Forms
  agregarEdificio: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  editarEdificio: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  lat = -34.3397205;
  lng = -56.71386;

  //Control de roles
  miTenant: boolean = false;
  portero: boolean = false;
  gestor: boolean = false;
  admin: boolean = false;

  ngOnInit(): void {
    this.getEdificios();
    let auth = this.authService.getAuth();
    let tenant = this.tenantService.getTenant();

    if (auth) {
      this.miTenant = auth.usuario.tenantInstitucionId == tenant;
      this.admin = auth.roles.find((element: string) => element == 'Admin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor') != undefined;
      this.portero = auth.roles.find((element: string) => element == 'Portero') != undefined;
    }
  }

  getEdificios() {
    this.edificioService.getAll().subscribe(
      response => {
        this.edificios = response;
      },
      error => {
        this.toastService.showError((error.body) ? error.body : 'Error del servidor');
      }

    )
  }
  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, edificio: Edificio) {
    this.editarEdificio.patchValue(edificio);
    this.selectedEdificio = edificio;
    this.modalService.open(content);
    console.log(edificio.latitud, edificio.longitud);

    if (edificio.latitud) this.lat = edificio.latitud;
    if (edificio.longitud) this.lng = edificio.longitud;
  }

  borrarModal(content: any, edificio: Edificio) {
    this.modalService.open(content);
    this.selectedEdificio = edificio;
  }

  mapModal(content: any, edificio: Edificio) {
    this.modalService.open(content);
    if (edificio.latitud) this.lat = edificio.latitud;
    if (edificio.longitud) this.lng = edificio.longitud;
  }


  onSubmit() {
    if (this.agregarEdificio.valid) {

      let edificio = new Edificio(this.agregarEdificio.value)


      this.edificioService.post(edificio).subscribe(
        response => {
          this.toastService.showSuccess('Edificio agregado');
          this.getEdificios();
        },
        error => {
          this.toastService.showError(error.error ?? 'Error del servidor');
        }

      )
    }else{
      this.toastService.showError('Valores invalidos');
    }
  }

  onEdit() {
    if (this.editarEdificio.valid && this.selectedEdificio && this.selectedEdificio.id) {

      let edificio = new Edificio(this.editarEdificio.value)


      this.edificioService.put(edificio, this.selectedEdificio?.id).subscribe(
        response => {
          this.getEdificios();
          this.toastService.showSuccess('Edificio agregado');

        },
        error => {
          this.toastService.showError(error.error ?? 'Error del servidor');
        }

      )
    }else{
      this.toastService.showError('Valores invalidos');
    }
  }

  onDelete(modal: any) {
    if (this.selectedEdificio && this.selectedEdificio.id) {
      this.edificioService.delete(this.selectedEdificio.id).subscribe(
        response => {
          this.edificios = this.edificios.filter(e => e.id !== this.selectedEdificio?.id);
          modal.close();
          this.toastService.showSuccess('Edificio agregado');

        },
        error => {
          this.toastService.showError(error.error ?? 'Error del servidor');

        }

      )
    }
  }

  onChange(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    this.agregarEdificio.patchValue({ latitud: this.lat, longitud: this.lng });
  }

  onChangeE(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;

    this.editarEdificio.patchValue({ latitud: this.lat, longitud: this.lng });
  }

}
