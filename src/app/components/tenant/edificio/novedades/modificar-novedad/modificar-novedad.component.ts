import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';


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
    titulo: new FormControl(''),
    contenido: new FormControl(''),
  });

  novedadId: string | undefined;
  selectedNovedad: Novedad = {};
  submitted: boolean | undefined = false;
  url: string = environment.apiURL.slice(0, environment.apiURL.length-4);

  faClipboard = faClipboard;
  file: File | undefined;
  novedad: Novedad = {};

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

  async onSubmit(): Promise<any>{
    
    if (this.editarNovedad.valid) {

      const formData = new FormData();
      formData.append("titulo", this.editarNovedad.controls.titulo.value);
      formData.append("contenido", this.editarNovedad.controls.contenido.value);

      if (this.file) {
        formData.append("ImagenFile", this.file);
      }

      try {
        await this.novedadService.put(formData, this.novedadId).toPromise();
        this.editarNovedad.reset;
        this.toastService.showSuccess('Datos guardados correctamente');
        this.router.navigate(['../../novedades/' + this.selectedNovedad.edificioId], {relativeTo: this.route});
        return true;
        

      } catch (error) {
        this.toastService.showError('Error');
        return false;
      }

    }
  }

  onFileSelected(event: any) {   

    const file: File = event.target.files[0];

    if (file) {

      this.file = file;
      this.novedad.imagen = URL.createObjectURL(file);

    }
  }

  get f() { return this.editarNovedad.controls; }

}
