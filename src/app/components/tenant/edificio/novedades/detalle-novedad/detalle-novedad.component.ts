import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-novedad',
  templateUrl: './detalle-novedad.component.html',
  styleUrls: ['./detalle-novedad.component.css']
})
export class DetalleNovedadComponent implements OnInit {

  novedad: Novedad = {};
  novedadId: string | undefined;
  imagenNovedad: string = "";
  url: string = environment.apiURL.slice(0, environment.apiURL.length-4);

  constructor(
    private novedadService: NovedadService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {

    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.novedadId = String(routeParams.get('id'));    
    
    if(this.novedadId) this.getNovedad(this.novedadId);
    console.log(this.url);
    
  }

  getNovedad(novedadId: string){
    this.novedadService.get(novedadId).subscribe(
      response => {
        this.novedad = response;
        console.log(this.novedad);
        
      },
      error => {
        this.toastService.showError('Error interno del sistema');
      }
    )
  }

  convertirFecha(fecha: Date | undefined) {
    return moment(fecha).format("DD/MM/YYYY");
  }

}
