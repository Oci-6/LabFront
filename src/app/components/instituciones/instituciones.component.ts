import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Institucion } from 'src/app/models/Institucion';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit {

  constructor(
    private institucionService: InstitucionesService,
    config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  };

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;



  instituciones: Institucion[] = [];
  selectedInstitucion: Institucion | undefined;

  agregarInstitucion: FormGroup = new FormGroup({
    rut: new FormControl('', Validators.required),
    razonSocial: new FormControl('', Validators.required),
  });

  editarInstitucion: FormGroup = new FormGroup({
    rut: new FormControl('', Validators.required),
    razonSocial: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.institucionService.getAll().subscribe(
      response => {
        this.instituciones = response;
      },
      error => {
        console.error(error);
      }

    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, institucion: Institucion) {
    this.editarInstitucion.patchValue(institucion);
    this.selectedInstitucion = institucion;
    this.modalService.open(content);
  }

  borrarModal(content: any, institucion: Institucion) {
    this.modalService.open(content);
    this.selectedInstitucion = institucion;
  }

  onSubmit() {
    if (this.agregarInstitucion.valid) {

      let institucion = new Institucion(this.agregarInstitucion.value)


      this.institucionService.post(institucion).subscribe(
        response => {
          this.instituciones.push(response);
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onEdit() {
    if (this.editarInstitucion.valid && this.editarInstitucion.touched && this.selectedInstitucion && this.selectedInstitucion.id) {

      let institucion = new Institucion(this.editarInstitucion.value)


      this.institucionService.put(institucion, this.selectedInstitucion?.id).subscribe(
        response => {
          console.log("Before update: ", this.instituciones)

          this.instituciones[this.instituciones.findIndex((obj => obj.id == this.selectedInstitucion?.id))] = institucion;

          console.log("After update: ", this.instituciones)
        },
        error => {
          console.error(error);
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedInstitucion && this.selectedInstitucion.id) {
      this.institucionService.delete(this.selectedInstitucion.id).subscribe(
        response => {
          this.instituciones = this.instituciones.filter(e => e.id !== this.selectedInstitucion?.id);
          modal.close();
        },
        error => {
          console.error(error);

        }

      )
    }
  }
}
