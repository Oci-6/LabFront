import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faEdit, faTrash, faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Asignacion } from 'src/app/models/Asignacion';
import { Edificio } from 'src/app/models/Edificio';
import { Puerta } from 'src/app/models/Puerta';
import { AsignacionService } from 'src/app/services/asignacion/asignacion.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { PuertaService } from 'src/app/services/PuertaService/puerta.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {


  constructor(
    private asignacionService: AsignacionService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private edificioService: EdificioService,
    public authService: AuthService,
    private tenantService: TenantService,
    private puertaService: PuertaService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faCamera = faCamera;

  asignaciones: Asignacion[] = [];
  puertas: Puerta[] = [];
  selectedAsignacion: Asignacion | undefined;
  edificioId: string | undefined;
  edificio: Edificio = {};

  editarAsignacion: FormGroup = new FormGroup({
    puertaId: new FormControl('', Validators.required),
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

    }
    this.getAsignacions();

    this.edificioService.get(this.edificioId).subscribe(
      response => {
        this.edificio = response;
      },
      error => {
        console.error(error);
      }
    )

    this.puertaService.getPuertasEdificio(this.edificioId).subscribe(
      response => {
        this.puertas = response;
      },
      error => {
        console.error(error);
      }
    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  addAsignacion(asignacion: Asignacion, button: HTMLButtonElement) {
    this.getAsignacions();
    button.click();
  }

  editarModal(content: any, Asignacion: Asignacion) {
    this.editarAsignacion.patchValue(Asignacion);
    this.selectedAsignacion = Asignacion;
    console.log(this.selectedAsignacion);

    this.modalService.open(content);
  }

  borrarModal(content: any, Asignacion: Asignacion) {
    this.modalService.open(content);
    this.selectedAsignacion = Asignacion;
  }

  getAsignacions() {
    if (this.edificioId) this.asignacionService.getAsignacionesEdificio(this.edificioId).subscribe(
      response => {
        this.asignaciones = response;

      },
      error => {
        console.error(error);
      }

    )
  }

  onEdit() {
    if (this.editarAsignacion.valid && this.editarAsignacion.touched && this.selectedAsignacion && this.selectedAsignacion.id) {

      let asignacion = new Asignacion(this.editarAsignacion.value)


      this.asignacionService.put(asignacion, this.selectedAsignacion?.id).subscribe(
        response => {

          this.asignaciones[this.asignaciones.findIndex((obj => obj.id == this.selectedAsignacion?.id))] = asignacion;
          this.toastService.showSuccess('Asignacion modificado');

        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedAsignacion && this.selectedAsignacion.id) {
      this.asignacionService.delete(this.selectedAsignacion.id).subscribe(
        response => {
          this.asignaciones = this.asignaciones.filter(e => e.id !== this.selectedAsignacion?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }
}
