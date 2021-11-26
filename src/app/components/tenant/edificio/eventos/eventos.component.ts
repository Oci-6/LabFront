import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/common';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Evento } from 'src/app/models/Evento';
import { Salon } from 'src/app/models/Salon';
import { EventoService } from 'src/app/services/evento/evento.service';
import { SalonService } from 'src/app/services/SalonService/salon.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  @ViewChild('agregar', { static: false }) modalTemp: ElementRef | undefined;


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
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

  salonId: string | null | undefined;
  salones: Salon[] = [];

  constructor(
    private eventoService: EventoService,
    private toastService: ToastService,
    config: NgbModalConfig, private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  handleDateClick(arg: any) {
    this.modalService.open(this.modalTemp);
    this.agregarEvento.controls.fechaInicio.setValue(arg.start);
    this.agregarEvento.controls.fechaFin.setValue(arg.end);
  }

  handleEventClick(arg: any) {
    alert('Evento desde ' + arg.event.startStr + ' to ' + arg.event.endStr)
    console.log(arg.event);

  }

  ngOnInit() {
    this.eventoService.getAll().subscribe(
      response => {
        console.log(response);
        
        this.calendarOptions.events = this.convertirEventosToCalendarEvents(response);
      },
      error => {
        this.toastService.showError((error.message) ? error.message : 'Error del servidor');
      }

    )


    this.salonId = this.route.snapshot.paramMap.get('idSalon');


  }


  onSubmit() {
    if (this.agregarEvento.valid && this.salonId) {

      let evento = new Evento(this.agregarEvento.value)
      evento.salonId = this.salonId;

      if (!this.soloUnDia(evento) && evento.semanalmente) {
        this.convertirDiaSemanaToBoolean(evento, moment(evento.fechaInicio).day());
      }

      this.eventoService.post(evento).subscribe(
        response => {
          this.toastService.showSuccess("Evento agregado")
        },
        error => {
          this.toastService.showError((error.body) ? error.body : 'Error del servidor');
        }

      )
    }
  }

  soloUnDia(evento: Evento): boolean {
    return !moment(moment(evento.fechaInicio).add(1, 'day').toDate()).isSame(evento.fechaFin);
  }

  convertirEventosToCalendarEvents(eventos: Evento[]): any[] {
    let res: any[] = [];
    eventos.forEach((element) => {
      if (element.domingo || element.lunes || element.martes || element.miercoles || element.jueves || element.viernes || element.sabado) {
        //Semanalmente
        if (element.semanalmente) {
          res.push
            (
              {
                title: element.nombre,
                startRecur: moment(element.fechaInicio).format('yyyy-MM-DD'),
                daysOfWeek: this.convertirBooleanToArray(element),
                startTime: element.horaInicio&&element.horaInicio!=0 ? element.horaInicio?.hours.toString()+':0'+element.horaInicio?.minutes.toString(): undefined,
                endTime: element.horaFin&&element.horaFin!=0 ? element.horaFin?.hours.toString()+':0'+element.horaFin?.minutes.toString(): undefined,
              }
            )
        } else {
          //Varios dias de la semana entre determinadas fechas
          res.push
            (
              {
                title: element.nombre,
                daysOfWeek: this.convertirBooleanToArray(element),
                startRecur: moment(element.fechaInicio).format('yyyy-MM-DD'),
                endRecur: moment(element.fechaFin).format('yyyy-MM-DD'),
                startTime: element.horaInicio&&element.horaInicio!=0 ? element.horaInicio?.hours.toString()+':0'+element.horaInicio?.minutes.toString(): undefined,
                endTime: element.horaFin&&element.horaFin!=0 ? element.horaFin?.hours.toString()+':0'+element.horaFin?.minutes.toString(): undefined,
              }
            )
        }
      }
      else {
        if (this.soloUnDia(element)) {
          //Evento en periodo unico de tiempo
          res.push
            (
              {
                title: element.nombre,
                startRecur: moment(element.fechaInicio).format('yyyy-MM-DD'),
                endRecur: moment(element.fechaFin).format('yyyy-MM-DD'),
                startTime: element.horaInicio&&element.horaInicio!=0 ? element.horaInicio?.hours.toString()+':0'+element.horaInicio?.minutes.toString(): undefined,
                endTime: element.horaFin&&element.horaFin!=0 ? element.horaFin?.hours.toString()+':0'+element.horaFin?.minutes.toString(): undefined,
              }
            )
        } else {
          //Evento de dia unico
          res.push({ 
            title: element.nombre,
            date: moment(element.fechaInicio).format('yyyy-MM-DD'),
            startTime: element.horaInicio&&element.horaInicio!=0 ? element.horaInicio?.hours.toString()+':'+element.horaInicio?.minutes.toString(): undefined,
            endTime: element.horaFin&&element.horaFin!=0 ? element.horaFin?.hours.toString()+':'+element.horaFin?.minutes.toString(): undefined,
           })
        }
      }
    }
    )

console.log(res);

    return res;
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
}
