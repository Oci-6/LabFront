import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faDoorOpen, faChalkboardTeacher, faPersonBooth, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FaDuotoneIconComponent } from '@fortawesome/angular-fontawesome';

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
  ) 
  { 
  config.backdrop = 'static';
  config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faDoor= faDoorOpen;
  faBoard= faChalkboardTeacher;
  faPersonBooth= faPersonBooth;
  faMapMarkedAlt = faMapMarkedAlt;

  edificios: Edificio[] = [];
  selectedEdificio: Edificio | undefined;

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

  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
    this.getEdificios();
  }

  getEdificios(){
    this.edificioService.getAll().subscribe(
      response => {
        this.edificios = response;
      },
      error => {
        console.error(error);
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
    
    if(edificio.latitud) this.lat = edificio.latitud;
    if(edificio.longitud) this.lng = edificio.longitud;
  }

  borrarModal(content: any, edificio: Edificio) {
    this.modalService.open(content);
    this.selectedEdificio = edificio;
  }

  mapModal(content: any, edificio: Edificio) {
    this.modalService.open(content);
    if(edificio.latitud) this.lat = edificio.latitud;
    if(edificio.longitud) this.lng = edificio.longitud;
  }


  onSubmit() {
    if (this.agregarEdificio.valid) {

      let edificio = new Edificio(this.agregarEdificio.value)


      this.edificioService.post(edificio).subscribe(
        response => {
          this.edificios.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarEdificio.valid && this.selectedEdificio && this.selectedEdificio.id) {

      let edificio = new Edificio(this.editarEdificio.value)


      this.edificioService.put(edificio, this.selectedEdificio?.id).subscribe(
        response => {
          this.edificios[this.edificios.findIndex((obj => obj.id == this.selectedEdificio?.id))] = edificio;
          this.getEdificios();
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedEdificio && this.selectedEdificio.id) {
      this.edificioService.delete(this.selectedEdificio.id).subscribe(
        response => {
          this.edificios = this.edificios.filter(e => e.id !== this.selectedEdificio?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }

  onChange(event:any){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    
    this.agregarEdificio.patchValue({latitud: this.lat, longitud: this.lng});
  }

  onChangeE(event:any){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    
    this.editarEdificio.patchValue({latitud: this.lat, longitud: this.lng});
  }

}
