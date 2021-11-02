import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PuertaService } from 'src/app/services/PuertaService/puerta.service';
import { Puerta } from 'src/app/models/Puerta';
import { ActivatedRoute } from '@angular/router';

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
  ) 
  { 
  config.backdrop = 'static';
  config.keyboard = false;
  }

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  puertas: Puerta[] = [];
  selectedPuerta: Puerta | undefined;
  edificioId: string | undefined;
  edificio: Edificio = {};

  agregarPuerta: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  editarPuerta: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.edificioId = String(routeParams.get('id'));

    if(this.edificioId) this.puertaService.getPuertasEdificio(this.edificioId).subscribe(
      response => {
        this.puertas = response;
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

}
