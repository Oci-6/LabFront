import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faEdit, faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Acceso } from 'src/app/models/Acceso';
import { Edificio } from 'src/app/models/Edificio';
import { Persona } from 'src/app/models/Persona';
import { AccesoService } from 'src/app/services/acceso/acceso.service';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {

  constructor(
    private accesoService: AccesoService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private edificioService: EdificioService,
    private personaService: PersonaService,
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
  faCamera = faCamera;

  accesos: Acceso[] = [];
  personas: any = {};
  selectedAcceso: Acceso | undefined;
  edificioId: string | undefined;
  edificio: Edificio = {};

  agregarAcceso: FormGroup = new FormGroup({
    personaId: new FormControl('', Validators.required),
  });

  editarAcceso: FormGroup = new FormGroup({
    personaId: new FormControl('', Validators.required),
  });

  //Control de roles
  miTenant: boolean = false;
  portero: boolean = false;
  gestor: boolean = false;
  admin: boolean = false;

  ngOnInit(): void {

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.edificioId = String(routeParams.get('idEdificio'));

    let auth = this.authService.getAuth();
    let tenant = this.tenantService.getTenant();

    if (auth) {
      this.miTenant = auth.usuario.tenantInstitucionId == tenant || auth.roles.find((element: string) => element == 'SuperAdmin') != undefined;
      this.admin = auth.roles.find((element: string) => element == 'Admin' || element == 'SuperAdmin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor' || element == 'SuperAdmin') != undefined;
      this.portero = auth.roles.find((element: string) => element == 'Portero' || element == 'SuperAdmin') != undefined;

      this.buscarPersonas();
    }
    this.getAccesos();

    this.edificioService.get(this.edificioId).subscribe(
      response => {
        this.edificio = response;
      },
      error => {
        console.error(error);
      }
    )
  }

  buscarPersonas(query?: string) {

    this.personaService.search(query).subscribe(
      response => {
        this.personas = response;
      },
      error => {
        console.error(error);
      }
    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  camModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, Acceso: Acceso) {
    this.editarAcceso.patchValue(Acceso);
    this.selectedAcceso = Acceso;
    this.modalService.open(content);
  }

  borrarModal(content: any, Acceso: Acceso) {
    this.modalService.open(content);
    this.selectedAcceso = Acceso;
  }

  getAccesos() {
    if (this.edificioId) this.accesoService.getAll(this.edificioId).subscribe(
      response => {
        this.accesos = response;
      },
      error => {
        console.error(error);
      }

    )
  }

  onSubmit() {
    if (this.agregarAcceso.valid && this.edificioId) {

      let acceso = new Acceso(this.agregarAcceso.value)
      acceso.edificioId = this.edificioId;

      this.accesoService.post(acceso).subscribe(
        response => {
          this.getAccesos();
          this.toastService.showSuccess('Acceso agregado');
        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    } else {
      this.toastService.showError('Valores incorrectos');
    }
  }

  onEdit() {
    if (this.editarAcceso.valid && this.editarAcceso.touched && this.selectedAcceso && this.selectedAcceso.id) {

      let acceso = new Acceso(this.editarAcceso.value)


      this.accesoService.put(acceso, this.selectedAcceso?.id).subscribe(
        response => {

          this.accesos[this.accesos.findIndex((obj => obj.id == this.selectedAcceso?.id))] = acceso;
          this.toastService.showSuccess('Acceso modificado');

        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedAcceso && this.selectedAcceso.id) {
      this.accesoService.delete(this.selectedAcceso.id).subscribe(
        response => {
          this.accesos = this.accesos.filter(e => e.id !== this.selectedAcceso?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }


}
