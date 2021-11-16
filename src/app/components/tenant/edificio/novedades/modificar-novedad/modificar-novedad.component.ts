import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modificar-novedad',
  templateUrl: './modificar-novedad.component.html',
  styleUrls: ['./modificar-novedad.component.css']
})
export class ModificarNovedadComponent implements OnInit {

  constructor(
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private novedadService: NovedadService,
  ) 
  { 
  config.backdrop = 'static';
  config.keyboard = false;
  }

  editarNovedad: FormGroup = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
  });

  novedadId: string | undefined;
  selectedNovedad: Novedad = {};
  submitted: boolean | undefined = false;
  url: string = environment.apiURL.slice(0, environment.apiURL.length-4);


  ngOnInit(): void {
    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.novedadId = String(routeParams.get('idNovedad'));

    this.novedadService.get(this.novedadId).subscribe(
      result=>{
        this.selectedNovedad = result;
        this.editarNovedad.patchValue(result);
      },
      error=>{
        console.log(error);
      }
    )

    


  }

  onSubmit() {
    // if (this.editarNovedad.valid) {

    //   let novedad = new Novedad(this.editarNovedad.value)
    //   novedad.edificioId = this.selectedNovedad.edificioId;

    //   this.novedadService.post(novedad).subscribe(
    //     response => {
    //       this.router.navigate(['/edificios/novedades/:id'])
    //     },
    //     error => {
    //       console.error(error);
    //     }

    //   )
    // }
  }

  get f() { return this.editarNovedad.controls; }

}
