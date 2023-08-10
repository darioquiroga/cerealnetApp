
import { Injectable } from '@angular/core';
import { tiposUsuarios } from '../shared/constants/tiposUsuarios';
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
import { CartaPorteHistoria } from '../modelo/cartaPorteHistoria';
import { UiService } from './ui.service';
import { PuertosService } from './puertos.service';
import { LoginService } from './login.service';
import { Login } from '../modelo/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuraciones } from '../shared/constants/configuraciones';





@Injectable({
  providedIn: 'root'
})
export class DescargaService {
    constructor(public http: HttpClient,
        private loginService: LoginService,
        private uiService: UiService,
        private puertosService: PuertosService
    ) { }

  //---------------------------------------------//
  // DECLARACION DE LAS PROPIEDADES QUE NECESITO //
  //---------------------------------------------//
  public static URLSERVICIO: string = Configuraciones.urlBase;
     /**
     * A partir del array de los intervinientes y un nombre de interviniente, obtiene ese interviniente.
     */
         getIntervinienteOfArray(arrayIntervi: any[], nombreIntervi: any) {
        const titular = arrayIntervi.filter(interArray => interArray.tipoInterviniente.nombre === nombreIntervi);
        // Como filter retorna un array, retorno el 1er elemento de ese array
        return titular[0];
    }
    async openImagenUrl(cartaPorte: CartaPorteHistoria)  {
      try {
          // Hago la consulta
          //const respImageUrl = await this.loginService.getImagenUrl(cartaPorte.entregador.idEntregador, cartaPorte.nroCarta);
          // Abro la url del pdf
          //const browser = this.inAppBrowser.create(respImageUrl.imagenUrlPdf, '_system');
      } catch (err) {
          console.log(err);
          //this.loginService.handleGenericError(err, 'Error');
      }
  }

/**
     * Obtiene la descarga del día, dado un intervalo de fechas
     */
    //getDescarga = (fechaDesde: Date) => async (fechaHasta: Date) => {
 async  getDescarga  (fechaDesde: any, fechaHasta: any) {

  // Mapeo el array posicionDia de la respuesta en otro array de modelos CartaPorte, y lo retorno

  const isPuertos = this.puertosService.getIfPuertos();
  const currentToken = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    try {

     const token: any = currentToken;
     let parameters:URLSearchParams = new URLSearchParams();
      parameters.set("puertos", isPuertos);
      let op = "descarga"
      if (isPuertos == true){
        op = "historia";
      }else{
        op = "descarga";
      }
      const url = `${this.getURLServicio()}?`+parameters+`&`+op;

      const httpOptions = {
        headers: new HttpHeaders({
            token: token.replace(/['"]+/g, ''),
        }),

      };

      this.http.get(url,  httpOptions).subscribe({
        next: (data: any) => {

           resolve (
              {
                data
              }
            );


        },

        error: (error: any) => {
          // ourrio algun error en el login
          resolve(error);
        },
      });
    } catch (error: any) {
      alert('Error: Ocurrio un error general, intente nuevamente más tarde.');
      const dataError = JSON.parse(error.error);
      reject(dataError.control.descripcion);
    }
  });
/*

   const descarga = await this.authService.getDescarga(currentToken, fechaDesde, fechaHasta, isPuertos)
      .map((descargaResponse: any[]) => {
          return descargaResponse.map(
              cp => isPuertos ? new CartaPortePosicion(cp, isPuertos) : new CartaPorteHistoria(cp)
          )
      }
      )
      .toPromise()

  return ""; //descarga
*/




}


  // Obtiene un string con el destino y la planta fusionados, lo que sería el puerto
  getPuerto(carta: any) {

    // Si es puertos hace una cosa, si es cerealnet hace otra (si la carta es CartaPortePosicion, es PUERTOS. Sino, es CEREALNET)
    // const isPuertos = !(carta && carta.getIntervinienteByTipo);

    // if (isPuertos) {
    //     return 'fafa'
    // } else {
        let nombreDestinoAcortado = this.uiService.getFirstWordOfString(carta.getIntervinienteByTipo('DESTINO').nombre);

        if (nombreDestinoAcortado && carta.plantaDestino.descripcion) {
            return `${nombreDestinoAcortado}, ${carta.plantaDestino.descripcion}`;
        } else if (nombreDestinoAcortado && !carta.plantaDestino.descripcion) {
            return `${nombreDestinoAcortado}`;
        } else if (!nombreDestinoAcortado && carta.plantaDestino.descripcion) {
            return `${carta.plantaDestino.descripcion}`;
        } else {
            return '';
        }
    // }
}
  /**
    * Esta funcion devuelve la URL del servicio
    */
  private getURLServicio() {
    const puertos = this.puertosService.getIfPuertos();

    return DescargaService.URLSERVICIO + `/cartaPorte/`;

  }

}
