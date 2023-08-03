import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NavController, IonContent } from '@ionic/angular';
// Constantes
import { estadosCartaPosicion } from '../../shared/constants/estadosCartaPorte';
import { Configuraciones } from '../../shared/constants/configuraciones';

// Services
import { UiService } from 'src/app/services/ui.service';
import { CartaPortePosicion } from 'src/app/modelo/cartaPortePosicion';
import { Usuario } from 'src/app/modelo/usuario';
import { Perfil } from 'src/app/modelo/perfil';
import { Tipo } from 'src/app/modelo/tipo';
import { StorageService } from 'src/app/services/storageService';
import { ResponsiveTableService } from 'src/app/services/responsive-table.service';
//import { DescargaService } from '../../services/descargaService/descargaService';
import { PuertosService } from 'src/app/services/puertos.service';
import { state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.page.html',
  styleUrls: ['./descarga.page.scss'],
  animations: [
    trigger('extraInfoState', [
        state('false',
            style(({
                transform: 'scaleY(0)',
                //overflow: 'hidden',
                display: 'none'
            }))
        ),
        state('true',
            style({
                transform: 'scaleY(1)',
                display: 'block'
            })
        ),

    ])
]
})
export class DescargaPage implements OnInit {
 // Content para scrollear al bottom
 //@ViewChild(IonContent) ionContent: IonContent;
 // Spinner
 loading: boolean = false;
 // Estado de la busqeuda, si esta activa o no
 busquedaActiva: boolean = false;
 // Texto buscado (esta bindeado con el input)
 inputSearchBar: string | undefined;
 // Estados de cartas expandidas o contraidas
 estadosToggleCarta: boolean[] = [];
 // Tabla de cartas mutada (filtrada, achicada, etc)
 parcialTableData: CartaPortePosicion[] = [];
 // Tabla de cartas inicial completa
 completeTableData: CartaPortePosicion[] = [];
 // Cantidad de camiones en posición
 tituloCantidad: string | undefined;
 // Guardo el usuario activo en una variable
 usuarioActivo: Usuario | undefined;
 // Necesario para asegurarse que el user no se desplaza hacia abajo (infiniteScrollTop)
 lastScrollTop : any | undefined;
 // Fecha para filtrar la descarga
 filtroFecha: Date | undefined;

 // Spinner imagen descarga
 descargandoImagen: any;
  constructor() { }

  ngOnInit() {
  }

}
