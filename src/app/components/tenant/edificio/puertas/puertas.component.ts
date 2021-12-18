import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faHandPointer, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PuertaService } from 'src/app/services/PuertaService/puerta.service';
import { Puerta } from 'src/app/models/Puerta';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';
import { Asignacion } from 'src/app/models/Asignacion';
import { AsignacionService } from 'src/app/services/asignacion/asignacion.service';

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.component.html',
  styleUrls: ['./puertas.component.css']
})
export class PuertasComponent implements OnInit {

  constructor(
    private puertaService: PuertaService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private edificioService: EdificioService,
    private authService: AuthService,
    private tenantService: TenantService,
    private asignacionService: AsignacionService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faHandPointer = faHandPointer;
  faTimes = faTimes;

  puertas: Puerta[] = [];
  selectedPuerta: Puerta | undefined;
  edificio: Edificio = {};

  @Input()
  edificioId: string | undefined;

  @Output() 
  newItemEvent = new EventEmitter<Asignacion>();

  actual: Puerta | undefined;


  agregarPuerta: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  editarPuerta: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  //Control de roles
  miTenant: boolean = false;
  portero: boolean = false;
  gestor: boolean = false;
  admin: boolean = false;


  ngOnInit(): void {

    let auth = this.authService.getAuth();
    let tenant = this.tenantService.getTenant();

    if (auth) {
      this.miTenant = auth.usuario.tenantInstitucionId == tenant;
      this.admin = auth.roles.find((element: string) => element == 'Admin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor') != undefined;
      this.portero = auth.roles.find((element: string) => element == 'Portero') != undefined;
    }

    // Route params
    if (!this.edificioId) {
      const routeParams = this.route.snapshot.paramMap;
      this.edificioId = String(routeParams.get('id'));
    }

    this.getPuertas();

    this.edificioService.get(this.edificioId).subscribe(
      response => {
        this.edificio = response;
      },
      error => {
        console.error(error);
      }
    )

    this.getActual();
  }

  getPuertas() {
    if (this.edificioId) this.puertaService.getPuertasEdificio(this.edificioId).subscribe(
      response => {
        this.puertas = response;
        console.log(response);

      },
      error => {
        console.error(error);
      }

    )
  }

  getActual() {
    if (this.portero) {
      this.asignacionService.getActual().subscribe(
        response => {
          this.actual = response;
        }
      )
    }
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, puerta: Puerta) {
    this.editarPuerta.patchValue(puerta);
    this.selectedPuerta = puerta;
    this.modalService.open(content);
  }

  borrarModal(content: any, puerta: Puerta) {
    this.modalService.open(content);
    this.selectedPuerta = puerta;
  }

  onSubmit() {
    if (this.agregarPuerta.valid) {

      let puerta = new Puerta(this.agregarPuerta.value)
      puerta.edificioId = this.edificioId;

      this.puertaService.post(puerta).subscribe(
        response => {
          this.puertas.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarPuerta.valid && this.editarPuerta.touched && this.selectedPuerta && this.selectedPuerta.id) {

      let puerta = new Puerta(this.editarPuerta.value)


      this.puertaService.put(puerta, this.selectedPuerta?.id).subscribe(
        response => {

          this.puertas[this.puertas.findIndex((obj => obj.id == this.selectedPuerta?.id))] = puerta;

        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedPuerta && this.selectedPuerta.id) {
      this.puertaService.delete(this.selectedPuerta.id).subscribe(
        response => {
          this.puertas = this.puertas.filter(e => e.id !== this.selectedPuerta?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }

  seleccionarPuerta(id: string) {
    if (this.miTenant && this.portero && !this.actual) {
      this.asignacionService.post({ puertaId: id }).subscribe(
        response => {
          this.getActual();
          this.getPuertas();
          this.newItemEvent.emit(response);

          this.toastService.showSuccess("Puerta seleccionada");
        },
        error => {
          this.toastService.showSuccess(error.error ?? 'Algo salio mal');

        }
      )
    }
  }

  deseleccionarPuerta(id: string) {

    if (this.miTenant && this.portero && this.actual) {
      this.asignacionService.desAsignar().subscribe(
        response => {
          this.actual = undefined;
          this.getPuertas();
          this.toastService.showSuccess("Puerta deseleccionada");
        },
        error => {
          this.toastService.showError(error.error ?? 'Algo salio mal');

        }
      )
    }
  }

}
