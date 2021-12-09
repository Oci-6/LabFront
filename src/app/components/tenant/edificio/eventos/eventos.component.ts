import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/common';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Evento } from 'src/app/models/Evento';
import { Salon } from 'src/app/models/Salon';
import { EventoService } from 'src/app/services/evento/evento.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { faCalendar, faCheckSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TenantService } from 'src/app/services/tenant/tenant.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  @ViewChild('agregar', { static: false }) modalTemp: ElementRef | undefined;
  @ViewChild('info', { static: false }) modalInfo: ElementRef | undefined;


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: false,
    locale: 'es',
    select: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [
      // { title: 'event 1', date: '2021-11-23' },
      // { title: 'event 2', date: '2021-11-27' },
      // {
      //   groupId: 'blueEvents', // recurrent events in this group move together
      //   daysOfWeek: ['4', '5'],
      //   startR: '2021-11-4',
      //   endRecur: '2021-11-23',
      //   startTime: '10:45:00',
      //   endTime: '12:45:00'
      // }
    ]
  };

  agregarEvento: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', Validators.required),
      fechaInicio: new FormControl(new Date(), Validators.required),
      fechaFin: new FormControl(new Date()),
      horaInicio: new FormControl({ hour: 0, minute: 0 }, Validators.required),
      horaFin: new FormControl({ hour: 0, minute: 0 }, Validators.required),
      semanalmente: new FormControl(false),
      mensualmente: new FormControl(false),
      lunes: new FormControl(false),
      martes: new FormControl(false),
      miercoles: new FormControl(false),
      jueves: new FormControl(false),
      viernes: new FormControl(false),
      sabado: new FormControl(false),
      domingo: new FormControl(false),
    }
  )

  editarEvento: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', Validators.required),
      fechaInicio: new FormControl(new Date(), Validators.required),
      fechaFin: new FormControl(new Date()),
      horaInicio: new FormControl({ hour: 0, minute: 0 }, Validators.required),
      horaFin: new FormControl({ hour: 0, minute: 0 }, Validators.required),
      semanalmente: new FormControl(false),
      mensualmente: new FormControl(false),
      lunes: new FormControl(false),
      martes: new FormControl(false),
      miercoles: new FormControl(false),
      jueves: new FormControl(false),
      viernes: new FormControl(false),
      sabado: new FormControl(false),
      domingo: new FormControl(false),
    }
  )

  //Iconos
  faCheckSquare = faCheckSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  faCalendar = faCalendar;

  salonId: string | null | undefined;
  salones: Salon[] = [];
  selectedEvento: Evento | undefined;
  eventos: Evento[] = [];

  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;

  //Control de roles
  miTenant: boolean = false;
  portero: boolean = false;
  gestor: boolean = false;
  admin: boolean = false;

  constructor(
    private eventoService: EventoService,
    private toastService: ToastService,
    config: NgbModalConfig, private modalService: NgbModal,
    private route: ActivatedRoute,
    public authService: AuthService,
    private tenantService: TenantService
  ) { }

  handleDateClick(arg: any) {
    this.agregarEvento = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        fechaInicio: new FormControl(new Date(), Validators.required),
        fechaFin: new FormControl(new Date()),
        horaInicio: new FormControl({ hour: 0, minute: 0 }, Validators.required),
        horaFin: new FormControl({ hour: 0, minute: 0 }, Validators.required),
        semanalmente: new FormControl(false),
        mensualmente: new FormControl(false),
        lunes: new FormControl(false),
        martes: new FormControl(false),
        miercoles: new FormControl(false),
        jueves: new FormControl(false),
        viernes: new FormControl(false),
        sabado: new FormControl(false),
        domingo: new FormControl(false),
      });
    this.modalService.open(this.modalTemp);
    this.agregarEvento.controls.fechaInicio.setValue(arg.start);
    this.agregarEvento.controls.fechaFin.setValue(arg.end);
    console.log(this.agregarEvento.value);

    if (this.soloUnDia(this.agregarEvento.value as Evento)) {
      this.agregarEvento.patchValue(this.convertirDiasSemanaToBoolean(this.agregarEvento.value as Evento));
    }
    else
      this.agregarEvento.patchValue(this.convertirDiaSemanaToBoolean(this.agregarEvento.value as Evento, moment(arg.start).day()));
    this.verDias(this.agregarEvento.value as Evento)
  }

  handleEventClick(arg: any) {

    this.selectedEvento = this.eventos.find(element => element.id == arg.event.id);
    if (this.selectedEvento) {
      this.selectedEvento.fechaInicio = moment(this.selectedEvento.fechaInicio).toDate();
      this.selectedEvento.fechaFin = moment(this.selectedEvento.fechaFin).toDate();
    }

    this.modalService.open(this.modalInfo);
  }

  editarModal(content: any, evento: Evento) {
    this.editarEvento = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        fechaInicio: new FormControl(new Date(), Validators.required),
        fechaFin: new FormControl(new Date()),
        horaInicio: new FormControl({ hour: 0, minute: 0 }, Validators.required),
        horaFin: new FormControl({ hour: 0, minute: 0 }, Validators.required),
        semanalmente: new FormControl(false),
        mensualmente: new FormControl(false),
        lunes: new FormControl(false),
        martes: new FormControl(false),
        miercoles: new FormControl(false),
        jueves: new FormControl(false),
        viernes: new FormControl(false),
        sabado: new FormControl(false),
        domingo: new FormControl(false),
      }
    )
    this.editarEvento.patchValue(evento);
    this.editarEvento.controls.horaInicio.setValue({ hour: evento.fechaInicio?.getHours(), minute: evento.fechaInicio?.getMinutes() });
    this.editarEvento.controls.horaFin.setValue({ hour: evento.fechaFin?.getHours(), minute: evento.fechaFin?.getMinutes() });
    this.verDias(this.editarEvento.value as Evento)

    this.modalService.open(content);

  }

  borrarModal(content: any) {
    this.modalService.open(content);
  }


  ngOnInit() {
    this.salonId = this.route.snapshot.paramMap.get('idSalon');
    this.getEventos();

    let auth = this.authService.getAuth();
    let tenant = this.tenantService.getTenant();

    if (auth) {
      this.miTenant = auth.usuario.tenantInstitucionId == tenant || auth.roles.find((element: string) => element == 'SuperAdmin') != undefined;
      this.admin = auth.roles.find((element: string) => element == 'Admin' || element == 'SuperAdmin') != undefined;
      this.gestor = auth.roles.find((element: string) => element == 'Gestor' || element == 'SuperAdmin') != undefined;
      this.calendarOptions.selectable = this.miTenant && this.gestor;
    }

  }

  getEventos() {
    this.eventoService.getAll().subscribe(
      response => {
        this.eventos = response
        this.calendarOptions.events = this.convertirEventosToCalendarEvents(this.eventos);
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )
  }

  onSubmit() {
    if (this.agregarEvento.valid && this.salonId) {

      let evento = new Evento(this.agregarEvento.value)

      evento.fechaInicio?.setHours(this.agregarEvento.controls.horaInicio.value.hour, this.agregarEvento.controls.horaInicio.value.minute);
      evento.fechaFin?.setHours(this.agregarEvento.controls.horaFin.value.hour, this.agregarEvento.controls.horaFin.value.minute);
      evento.fechaInicio = moment(evento.fechaInicio).utc().toDate();
      evento.fechaFin = moment(evento.fechaFin).utc().toDate();
      evento.salonId = this.salonId;
      // if (this.soloUnDia(evento)) //{
      // //   if (!evento.domingo && !evento.lunes && !evento.martes && !evento.miercoles && !evento.jueves && !evento.viernes && !evento.sabado)
      // //     this.convertirDiasSemanaToBoolean(evento);
      // // }
      // // else
      //   this.convertirDiaSemanaToBoolean(evento, moment(evento.fechaInicio).day());
      // console.log(evento);

      this.eventoService.post(evento).subscribe(
        response => {
          this.toastService.showSuccess("Evento agregado");
          this.getEventos();
        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    }
  }

  onEdit() {
    if (this.editarEvento.valid && this.salonId && this.selectedEvento?.id) {

      let evento = new Evento(this.editarEvento.value)

      console.log(evento);

      evento.id = this.selectedEvento.id;
      evento.fechaInicio?.setHours(this.editarEvento.controls.horaInicio.value.hour, this.editarEvento.controls.horaInicio.value.minute);
      evento.fechaFin?.setHours(this.editarEvento.controls.horaFin.value.hour, this.editarEvento.controls.horaFin.value.minute);

      evento.salonId = this.salonId;
      if (!this.soloUnDia(evento)) {
        this.convertirDiaSemanaToBoolean(evento, moment(evento.fechaInicio).day());
      }

      this.eventoService.put(evento, this.selectedEvento.id).subscribe(
        response => {
          this.selectedEvento = evento;

          this.toastService.showSuccess("Evento Modificado");
          this.getEventos();
        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    }
  }

  onDelete() {
    if (this.selectedEvento && this.selectedEvento.id) {
      this.eventoService.delete(this.selectedEvento.id).subscribe(
        response => {
          this.getEventos();
          this.modalService.dismissAll();

          this.selectedEvento = undefined;
        },
        error => {
          console.error(error);

        }

      )
    }
  }

  soloUnDia(evento: Evento): boolean {
    return !moment(moment(evento.fechaInicio).add(1, 'day').toDate()).isSame(evento.fechaFin, 'day');
  }

  convertirEventosToCalendarEvents(eventos: Evento[]): any[] {
    let res: any[] = [];
    eventos.forEach((element) => {
      let fechaInicio = moment(element.fechaInicio);
      let fechaFin = moment(element.fechaFin);
      if (this.soloUnDia(element)) {
        //Semanalmente
        if (element.semanalmente) {
          res.push
            (
              {
                id: element.id,
                title: element.nombre,
                startRecur:fechaInicio.format('yyyy-MM-DD'),
                daysOfWeek: this.convertirBooleanToArray(element),
                startTime: this.localTimeString(fechaInicio.toDate()),
                endTime: this.localTimeString(fechaFin.toDate()),
              }
            )
        } else {
          //Varios dias de la semana entre determinadas fechas
          res.push
            (
              {
                id: element.id,
                title: element.nombre,
                daysOfWeek: this.convertirBooleanToArray(element),
                startRecur: fechaInicio.format('yyyy-MM-DD'),
                endRecur: fechaFin.format('yyyy-MM-DD'),
                startTime: this.localTimeString(fechaInicio.toDate()),
                endTime: this.localTimeString(fechaFin.toDate()),
              }
            )
        }
      } else {
        //Solo un dia semanalamente
        if (element.semanalmente) {
          res.push
            (
              {
                id: element.id,
                title: element.nombre,
                startRecur: fechaInicio.format('yyyy-MM-DD'),
                daysOfWeek: this.convertirBooleanToArray(element),
                startTime: this.localTimeString(fechaInicio.toDate()),
                endTime: this.localTimeString(fechaFin.toDate()),
              }
            )
        } else {
          //Evento Unico
          res.push
            (
              {
                id: element.id,
                title: element.nombre,
                start: fechaInicio.toDate(),
                end: fechaFin.subtract(1, 'days').toDate(),

              }
            )
        }
      }

    }


    )

    console.log(res);

    return res;
  }

  convertirDiasSemanaToBoolean(evento: Evento) {
    for (let inicio = moment(evento.fechaInicio); inicio.isBefore(moment(evento.fechaFin)) && (!evento.domingo || !evento.lunes || !evento.martes || !evento.miercoles || !evento.jueves || !evento.viernes || !evento.sabado); inicio.add(1, 'days')) {
      switch (inicio.day()) {
        case 0: evento.domingo = true;
          break;
        case 1: evento.lunes = true;
          break;
        case 2: evento.martes = true;
          break;
        case 3: evento.miercoles = true;
          break;
        case 4: evento.jueves = true;
          break;
        case 5: evento.viernes = true;
          break;
        case 6: evento.sabado = true;
          break;

      }
    }
    return evento;
  }

  verDias(evento: Evento) {
    this.lunes = false;
    this.martes = false;
    this.miercoles = false;
    this.jueves = false;
    this.viernes = false;
    this.sabado = false;
    this.domingo = false;
    for (let inicio = moment(evento.fechaInicio); inicio.isBefore(moment(evento.fechaFin)) && (!this.domingo || !this.lunes || !this.martes || !this.miercoles || !this.jueves || !this.viernes || !this.sabado); inicio.add(1, 'days')) {
      switch (inicio.day()) {
        case 0: this.domingo = true;
          break;
        case 1: this.lunes = true;
          break;
        case 2: this.martes = true;
          break;
        case 3: this.miercoles = true;
          break;
        case 4: this.jueves = true;
          break;
        case 5: this.viernes = true;
          break;
        case 6: this.sabado = true;
          break;

      }
    }
    return evento;
  }

  convertirDiaSemanaToBoolean(evento: Evento, dia: number) {
    switch (dia) {
      case 0: evento.domingo = true;
        break;
      case 1: evento.lunes = true;
        break;
      case 2: evento.martes = true;
        break;
      case 3: evento.miercoles = true;
        break;
      case 4: evento.jueves = true;
        break;
      case 5: evento.viernes = true;
        break;
      case 6: evento.sabado = true;
        break;


    }
    return evento;
  }

  convertirBooleanToArray(evento: Evento): string[] {
    let daysOfWeek = [];
    if (evento.domingo) daysOfWeek.push('0');
    if (evento.lunes) daysOfWeek.push('1');
    if (evento.martes) daysOfWeek.push('2');
    if (evento.miercoles) daysOfWeek.push('3');
    if (evento.jueves) daysOfWeek.push('4');
    if (evento.viernes) daysOfWeek.push('5');
    if (evento.sabado) daysOfWeek.push('6');
    return daysOfWeek;
  }

  localTimeString(date: Date | undefined): string | undefined {
    return date ? new Date(date).toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) : undefined;
  }

  onChange(form: FormGroup) {
    this.verDias(form.value as Evento);
  }
}
