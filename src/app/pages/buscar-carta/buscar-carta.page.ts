import { timeout } from 'rxjs';
import { tiposErrores } from './../../shared/textos/tiposErrores';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CartaPorteHistoria } from 'src/app/modelo/cartaPorteHistoria';
import { Pipe } from '@angular/core';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { BuscarCartaPorteService } from 'src/app/services/buscar-carta-porte.service';
import { textos } from 'src/app/shared/textos/textos';

@Component({
  selector: 'app-buscar-carta',
  templateUrl: './buscar-carta.page.html',
  styleUrls: ['./buscar-carta.page.scss'],
})
export class BuscarCartaPage implements OnInit {
  // Spinner
  loading: boolean = false;
  // Carta buscada bindeada en html
  nroCartaOPatenteBuscada: string = '';
  // Intervalo de fechas activo (badges que aparecen arriba)
  filtroFechas: { desde: Date; hasta: Date };

  // Textos
  buscaCartaTitulo = textos.buscarCarta.html.titulo;
  buscarCartaBtnBuscar = textos.buscarCarta.html.btnBuscar
  buscarCartaTipPatente = textos.buscarCarta.html.tipPatente
  buscarCartaTipNroCarta = textos.buscarCarta.html.tipNroCarta


  //  tiposErrores: any;
  constructor(
    private navCtrl: NavController,
    private buscarCartaPorteService: BuscarCartaPorteService,
    private uiService: UiService,
    private loadingController: LoadingController

  ) {
    const ayer = new Date(Date.now() - 86400000); // that is: 24 * 60 * 60 * 1000
    this.filtroFechas = {
      desde: ayer,
      hasta: ayer,
    };
  }



  async onClickBuscar() {

    try {
      // Pongo el spinner
      this.loading = true;
      await this.uiService.presentLoading("Buscando carta "+this.nroCartaOPatenteBuscada);
      // await this.loadingController.dismiss();
      // Busco las cartas


      await this.buscarCartaPorteService
        .getCartaPorte(this.nroCartaOPatenteBuscada, this.filtroFechas)
        .then(async (cartasEncontradas: any) => {
          // Me fijo si trajo más de una
          await this.loadingController.dismiss();
          if (cartasEncontradas.length > 1) {

            // Mnando las cartas a mostrar en CartasEncontradasPage
            //this.navCtrl.push(CartasEncontradasPage, {cartasEncontradas: cartasEncontradas});
          } else {
            // Como es una sola se la mando a detalleCartaPortePage para que la presente
            // this.navCtrl.push(DetalleCartaPortePage, {cartaDePorte: cartasEncontradas[0]});
          }
        });
    } catch (err: any) {
      debugger
      if (err.name == tiposErrores.timeoutError) {
        this.uiService.presentAlertInfo(
          'Error: ' +
            textos.buscarCarta.timeOutError.titulo +
            ': ' +
            textos.buscarCarta.timeOutError.descripcion
        );
      } else if (err.name === tiposErrores.unauthorized) {
        this.uiService.presentAlertInfo(
          'Error: ' +
            textos.buscarCarta.unauthorized.titulo +
            ': ' +
            textos.buscarCarta.unauthorized.descripcion
        );
      }else{
         // No hay cartas: En la descripcion del mensaje checkeo: Si NO es un número, es una patente.
         this.uiService.presentAlertInfo(textos.buscarCarta.noHayCartas.titulo+" - "+isNaN(parseInt(this.nroCartaOPatenteBuscada)) ?
         textos.buscarCarta.noHayCartas.descripcion.patente :
         textos.buscarCarta.noHayCartas.descripcion.nroCarta);

      }


    }
  }



  // Checkear si nroCartaBuscada tiene una letra (esto implicaría que es una patente, por lo cual debo mostrar las fechas de intervalo)
  checkIfIsPatente() {
    if (this.nroCartaOPatenteBuscada.match(/[a-z]/i)) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {

  }

}
