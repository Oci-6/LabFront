import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Novedad } from 'src/app/models/Novedad';
import { NovedadService } from 'src/app/services/NovedadService/novedad.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agregar-novedad',
  templateUrl: './agregar-novedad.component.html',
  styleUrls: ['./agregar-novedad.component.css']
})
export class AgregarNovedadComponent implements OnInit {

  faClipboard = faClipboard;
  file: File | undefined;
  novedad: Novedad = {};

  constructor(
    config: NgbModalConfig, private modalService: NgbModal,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private novedadService: NovedadService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  agregarNovedad: FormGroup = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
  });

  edificioId: string | undefined;

  ngOnInit(): void {

    // Route params
    const routeParams = this.route.snapshot.paramMap;
    this.edificioId = String(routeParams.get('id'));

  }

  async onSubmit(): Promise<any>{
    console.log(this.agregarNovedad);

    if (this.agregarNovedad.valid&&this.edificioId) {

      const formData = new FormData();
      formData.append("edificioId", this.edificioId);
      formData.append("titulo", this.agregarNovedad.controls.titulo.value);
      formData.append("contenido", this.agregarNovedad.controls.contenido.value);

      if (this.file) {
        formData.append("ImagenFile", this.file);
      }

      try {
        await this.novedadService.post(formData).toPromise();
        this.agregarNovedad.reset;
        this.toastService.showSuccess('Datos guardados correctamente');
        return true;

      } catch (error) {
        this.toastService.showError('Error');
        return false;
      }

    }
  }

  get f() { return this.agregarNovedad.controls; }

  onFileSelected(event: any) {   

    const file: File = event.target.files[0];

    if (file) {

      this.file = file;
      this.novedad.imagen = URL.createObjectURL(file);

    }
  }

}
