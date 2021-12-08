import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SalonService } from 'src/app/services/SalonService/salon.service';
import { ActivatedRoute } from '@angular/router';
import { Salon } from 'src/app/models/Salon';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.css']
})
export class SalonesComponent implements OnInit {

  constructor(
    private salonService: SalonService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private edificioService: EdificioService,
    private authService: AuthService,
    private tenantService: TenantService
  ) 
  { 
  config.backdrop = 'static';
  config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;

  salones: Salon[] = [];
  selectedSalon: Salon | undefined;
  edificioId: string | undefined;
  edificio: Edificio = {};

  agregarSalon: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  editarSalon: FormGroup = new FormGroup({
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
      this.miTenant = auth.usuario.tenantInstitucionId == tenant || auth.roles.find((element: string) => element == 'SuperAdmin') != undefined;
      this.admin = auth.roles.find((element: string) => element == 'Admin' || element == 'SuperAdmin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor' || element == 'SuperAdmin') != undefined;
      this.portero = auth.roles.find((element: string) => element == 'Portero' || element == 'SuperAdmin') != undefined;
    }

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.edificioId = String(routeParams.get('id'));

    if(this.edificioId) this.salonService.getSalonesEdificio(this.edificioId).subscribe(
      response => {
        this.salones = response;
      },
      error => {
        console.error(error);
      }

    )

    this.edificioService.get(this.edificioId).subscribe(
      response=>{
        this.edificio = response;
      },
      error =>{
        console.error(error);
      }
    )


  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, salon: Salon) {
    this.editarSalon.patchValue(salon);
    this.selectedSalon = salon;
    this.modalService.open(content);
  }

  borrarModal(content: any, salon: Salon) {
    this.modalService.open(content);
    this.selectedSalon = salon;
  }

  onSubmit() {
    if (this.agregarSalon.valid) {

      let salon = new Salon(this.agregarSalon.value)
      salon.edificioId = this.edificioId;

      this.salonService.post(salon).subscribe(
        response => {
          this.salones.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarSalon.valid && this.editarSalon.touched && this.selectedSalon && this.selectedSalon.id) {

      let salon = new Salon(this.editarSalon.value)


      this.salonService.put(salon, this.selectedSalon?.id).subscribe(
        response => {
          this.salones[this.salones.findIndex((obj => obj.id == this.selectedSalon?.id))] = salon;
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedSalon && this.selectedSalon.id) {
      this.salonService.delete(this.selectedSalon.id).subscribe(
        response => {
          this.salones = this.salones.filter(e => e.id !== this.selectedSalon?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }

}
