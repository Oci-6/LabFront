import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/Usuario';
import { InstitucionesService } from 'src/app/services/instituciones/instituciones.service';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
 
  constructor(
    //Inyecciones
    private personaService: PersonaService,
    private institucionesService: InstitucionesService,
    private toastService: ToastService,

    //Bootstrap
    config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  };

  //Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  //Variables
  personas: Usuario[] = [];
  selectedPersona: Usuario | undefined;

  //Forms
  agregarPersona: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  editarPersona: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  ngOnInit(): void {
    this.getPersonas();
    
  }

  getPersonas() {
    this.personaService.getAll().subscribe(
      response => {
        this.personas = response;
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )
  }

  agregarModal(content: any) {
    this.modalService.open(content);
  }

  editarModal(content: any, Persona: Usuario) {
    this.editarPersona.patchValue(Persona);
    this.selectedPersona = Persona;
    this.modalService.open(content);
  }

  borrarModal(content: any, Persona: Usuario) {
    this.modalService.open(content);
    this.selectedPersona = Persona;
  }

  onSubmit() {
    if (this.agregarPersona.valid) {

      let Persona = new Usuario(this.agregarPersona.value)


      this.personaService.post(Persona).subscribe(
        response => {
          this.getPersonas();
          this.toastService.showSuccess("Persona agregada")

        },
        error => {

          this.toastService.showError((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        }

      )
    }
  }

  onEdit() {
    if (this.editarPersona.valid && this.editarPersona.touched && this.selectedPersona && this.selectedPersona.id) {

      let persona = new Usuario(this.editarPersona.value)


      this.personaService.put(persona, this.selectedPersona?.id).subscribe(
        response => {

          this.personas[this.personas.findIndex((obj => obj.id == this.selectedPersona?.id))] = persona;
          this.toastService.showSuccess("Persona modificada")

        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  onDelete(modal: any) {
    if (this.selectedPersona && this.selectedPersona.id) {
      this.personaService.delete(this.selectedPersona.id).subscribe(
        response => {
          this.personas = this.personas.filter(e => e.id !== this.selectedPersona?.id);
          modal.close();
          this.toastService.showSuccess("Persona borrado")
        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

}
