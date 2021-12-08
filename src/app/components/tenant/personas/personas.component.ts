import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, faEdit, faTrash, faFileImport, faCheck } from '@fortawesome/free-solid-svg-icons';
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
  faFileImport = faFileImport;
  faCheck = faCheck;

  //Variables
  personas: any = {};
  selectedPersona: Usuario | undefined;
  excel: File | undefined;
  foto: File | undefined;
  page: number = 1;
  query: string = '';

  //Forms
  agregarPersona: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.pattern('[- +()0-9]+')),
  });

  editarPersona: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.pattern('[- +()0-9]+')),

  });

  ngOnInit(): void {
    this.getPersonas();

  }

  getPersonas() {
    // this.personaService.getAll().subscribe(
    //   response => {
    //     this.personas = response;
    //   },
    //   error => {
    //     this.toastService.showError((error.message) ? error.message : 'Error del servidor');
    //   }

    // )
    console.log(this.query);
    
    this.personaService.search(this.query,this.page.toString()).subscribe(
      response=>{
        this.personas = response;
        console.log(response);
        
      },
      error =>{
        console.error(error);
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
    if (this.agregarPersona.valid&&this.foto) {

      let persona = new Usuario(this.agregarPersona.value)
      let formData = new FormData();
      
      Object.entries(persona).forEach((entry)=> {
        formData.append(entry[0],entry[1]);        
      })

      formData.append('foto',this.foto)

      
       

      this.personaService.post(formData).subscribe(
        response => {
          this.getPersonas();
          this.toastService.showSuccess("Persona agregada")

        },
        error => {

          this.toastService.showError((error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error');
        }

      )
    }else{
      console.log(this.agregarPersona);
      
      console.log(this.foto);
      this.toastService.showError('Datos incorrectos');
    }
  }

  onEdit() {
    if (this.editarPersona.valid && this.editarPersona.touched && this.selectedPersona && this.selectedPersona.id) {

      let persona = new Usuario(this.editarPersona.value)


      this.personaService.put(persona, this.selectedPersona?.id).subscribe(
        response => {

          this.toastService.showSuccess("Persona modificada")
          this.getPersonas();
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
          this.getPersonas();
          modal.close();
          this.toastService.showSuccess("Persona borrado")
        },
        error => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor');
        }

      )
    }
  }

  onExcelSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.excel = file;


    }
  }
  
  onFotoSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.foto = file;


    }
  }

  importar() {
    if (this.excel) {

      let formData: FormData = new FormData();
      formData.append("excel", this.excel);

      this.personaService.importar(formData).subscribe(
        (response) => {
          this.getPersonas();
          this.toastService.showSuccess("Personas importadas")

        },
        (error) => {
          this.toastService.showError((error.message) ? error.message : 'Error del servidor')
        }

      )
    }
  }
}
