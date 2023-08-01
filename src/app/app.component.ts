import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Configuraciones } from 'src/app/shared/constants/configuraciones';
import { tipoSesion } from './shared/constants/tipoSesion';
import { StorageService } from './services/storageService';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /*// Estado de los toggles (estan bindeados en el html)
  toggles: {
    togglePush: boolean;
    toggleMail: boolean;
  }
  // Modo notificacion actual
  modoNotificacion: number;
  */
  // Tipo de sesion (tipo de usuario logueado)



  constructor(private platform: Platform,
    private router: Router,
    ) {
    /*
    Este código elimina todas las entradas del caché de la aplicación cuando se carga la plataforma. De esta manera,
    se asegura de que la aplicación siempre esté utilizando los archivos más recientes y no los archivos almacenados en caché.
    */
    this.initializeApp();
    this.platform.ready().then(() => {
      if (window.caches) {
        caches.keys().then(function (names) {
          for (let name of names) caches.delete(name);
        });
      }
    });
  }
  // Mantengo actualizado este json acá en el javascript
  public usuarioActivo: { tipo: string; nombre: string; } | undefined;
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  public appPages = [

    { title: 'Posición de día', url: '/resumen', icon: 'boat' },
    { title: 'Descarga', url: '#', icon: 'sync' },
    { title: 'Buscar Carta', url: '/#', icon: 'search' },
    { title: 'Salir', url: '/logout', icon: 'log-out' },

  ];
  public temp = "";

  public labels = ["etiquetas 1", 'etiqueta 2'];



  initializeApp() {
    this.usuarioActivo = { tipo: '', nombre: '' };
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.refreshUsuarioActivo();
    });
  }

  refreshUsuarioActivo() {

    if (typeof this.usuarioActivoJson === 'string') {
      const usuario = JSON.parse(this.usuarioActivoJson);

         //  ver el tipo de sesion que inicia aqui (traer desde el storage el tipo de sesion)
      let tipo =  "NORMAL";
      // Si tipo es nromal, entonces el usaurio logueadoe es normal
      if (tipo === tipoSesion.NORMAL || tipo === tipoSesion.PUERTOS) {
        this.usuarioActivo = {
          tipo: usuario.tipo.descripcion,
          nombre: usuario.nombre
        };
      } else {
        // Sino, es tipo invitado (camionero)
        this.usuarioActivo = {
          tipo: tipoSesion.INVITADO,
          nombre: usuario.nombre
        };
      }
    ;

  }

  }




  onClickCamionesDescarga() {
    this.router.navigateByUrl('http://www.cerealnet.com.ar/movil/CamionesDescargaH.aspx');
  }

}
