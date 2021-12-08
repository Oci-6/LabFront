import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { AccesoService } from 'src/app/services/acceso/acceso.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent implements OnInit {

  //Camara
  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage | null = null;
  public errors: WebcamInitError[] = [];

  //Acceso
  edificioId: string | null = null;

  constructor(
    private accesoService: AccesoService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.edificioId = this.route.snapshot.paramMap.get('idEdificio');
    console.log(this.edificioId);

  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    if (this.webcamImage) {
      let dataURI = webcamImage.imageAsDataUrl;
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });

      let formData: FormData = new FormData();
      formData.append("Foto", blob);
      if (this.edificioId) formData.append("EdificioId", this.edificioId);

      this.accesoService.reconocer(formData).subscribe(
        (response) => {
          console.log(response);
          this.toastService.showSuccess("Acceso correcto");
        },
        (error) => {
          if (error.status == 404) {
            this.toastService.showStandard("Usuario no encontrado");
          }
          else
            this.toastService.showError("Error");
        }

      )
    }else{
      this.toastService.showError("E");

    }
  }

  send() {
    if (this.webcamImage) {
      let dataURI = this.webcamImage.imageAsDataUrl;
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });

      let formData: FormData = new FormData();
      formData.append("Foto", blob);
      if (this.edificioId) formData.append("EdificioId", this.edificioId);

      this.accesoService.reconocer(formData).subscribe(
        (response) => {
          console.log(response);
          this.toastService.showSuccess("Acceso correcto");
        },
        (error) => {
          this.toastService.showStandard("Vuelva a intentarlo");

        }

      )
    }
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
