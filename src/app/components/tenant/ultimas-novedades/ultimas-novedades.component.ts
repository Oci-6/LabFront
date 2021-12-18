import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ultimas-novedades',
  templateUrl: './ultimas-novedades.component.html',
  styleUrls: ['./ultimas-novedades.component.css']
})
export class UltimasNovedadesComponent implements OnInit {

  novedades: Novedad[] | undefined;
  apiURL = environment.apiURL.slice(0, environment.apiURL.length-4);;
  constructor(
    private novedadService: NovedadService
  ) { }

  ngOnInit(): void {
    this.novedadService.getUltimas().subscribe(
      response => {
        console.log(response);
        
        this.novedades = response;

      }

    )
  }

}
