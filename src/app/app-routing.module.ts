import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then(m => m.MiCuentaPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'resumen',
    loadChildren: () => import('./pages/resumen/resumen.module').then(m => m.ResumenPageModule)

  },

  {
    path: 'acerca',
    loadChildren: () => import('./pages/acerca/acerca.module').then(m => m.AcercaPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./pages/popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },

  {
    path: 'politica',
    loadChildren: () => import('./pages/info/politica/politica.module').then( m => m.PoliticaPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./pages/info/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'legales',
    loadChildren: () => import('./pages/info/legales/legales.module').then( m => m.LegalesPageModule)
  },

  {
    path: 'descarga',
    loadChildren: () => import('./pages/descarga/descarga.module').then( m => m.DescargaPageModule)
  },
  {
    path: 'buscar-carta',
    loadChildren: () => import('./pages/buscar-carta/buscar-carta.module').then( m => m.BuscarCartaPageModule)
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
