import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Edificio } from 'src/app/models/Edificio';
import { EdificioService } from 'src/app/services/EdificioService/edificio.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { Novedad } from 'src/app/models/Novedad';
import * as moment from 'moment';

@Component({
  selector: 'app-lista-novedades',
  templateUrl: './lista-novedades.component.html',
  styleUrls: ['./lista-novedades.component.css']
})
export class ListaNovedadesComponent implements OnInit {

  constructor(
    private novedadService: NovedadService,
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

  novedades: Novedad[] = [];
  selectedNovedad: Novedad | undefined;
  edificioId: string | undefined;
  edificio: Edificio = {};

  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.edificioId = String(routeParams.get('id'));

    if(this.edificioId) this.novedadService.getNovedadesEdificio(this.edificioId).subscribe(
      response => {
        this.novedades = response;
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

  borrarModal(content: any, novedad: Novedad) {
    this.modalService.open(content);
    this.selectedNovedad = novedad;
  }

  onDelete(modal: any) {
    if (this.selectedNovedad && this.selectedNovedad.id) {
      this.novedadService.delete(this.selectedNovedad.id).subscribe(
        response => {
          this.novedades = this.novedades.filter(e => e.id !== this.selectedNovedad?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }
  
}
