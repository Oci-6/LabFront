import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash, faDoorOpen, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
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

  edificios: Edificio[] = [];
  selectedEdificio: Edificio | undefined;

  agregarEdificio: FormGroup = new FormGroup({
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  editarEdificio: FormGroup = new FormGroup({
    latitud: new FormControl('', Validators.required),
    longitud: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
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
  }

  borrarModal(content: any, edificio: Edificio) {
    this.modalService.open(content);
    this.selectedEdificio = edificio;
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
    if (this.editarEdificio.valid && this.editarEdificio.touched && this.selectedEdificio && this.selectedEdificio.id) {

      let edificio = new Edificio(this.editarEdificio.value)


      this.edificioService.put(edificio, this.selectedEdificio?.id).subscribe(
        response => {
          console.log("Before update: ", this.edificios)

          this.edificios[this.edificios.findIndex((obj => obj.id == this.selectedEdificio?.id))] = edificio;

          console.log("After update: ", this.edificios)
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

}
