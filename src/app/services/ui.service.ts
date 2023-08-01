import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { textos } from '../shared/textos/textos';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _alertCrontroller: AlertController,
    private _loadingController: LoadingController
    ) { }


  async presentAlertInfo(message: string) {
   const alert = document.createElement('ion-alert');
   alert.header = 'Atención !!!';
   alert.message = message;
   alert.buttons = ['OK'];

   document.body.appendChild(alert);
   await alert.present();
  }


  async presentLoading(msg:string) {
    const loading = await this._loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,
    });
    await loading.present();
  }

// Formatea una fecha y devuelve foramto DD/MM/AAAA
    // Puede recibir un Date o un string
   /* formatDate(fecha:  string) {
      let fechaDate;
      if (typeof fecha === 'string') {
          fechaDate = new Date(fecha);
      } else {
          fechaDate = fecha;
      };

      if (fechaDate && (typeof fechaDate == 'object')) {
          const mes = fechaDate.getMonth() + 1;
          return `${fechaDate.getDate() < 10 ? '0' : ''}${fechaDate.getDate()}/${mes < 10 ? '0' : ''}${mes}/${fechaDate.getFullYear()}`
      }
  }*/ 


  /**
     * Obtengo el id del estado de entrega segun el id de un estado en puertos
     */
  getIdEstadoEstregaByIdEstadoPuerto = (idEstadoPuerto: number) =>
  idEstadoPuerto === 1 ? 2 :  // Demorado      |       Demorado
  idEstadoPuerto === 2 ? 6 :  // A Descargar   |       A Descargar
  idEstadoPuerto === 4 ? 7 :  // Autorizado
  idEstadoPuerto === 7 ? 4 :  // Desvio/Desviado
  idEstadoPuerto === 10 ? 1 : // Pendiente Autorizacion | Entrega Autorizado
  idEstadoPuerto === 11 ? 9 : // Pendiente Desvio| Entrega Desvio
  1                           // Posicion para todo el resto

}
