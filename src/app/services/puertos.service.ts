import { Injectable } from '@angular/core';
import { tiposUsuarios } from '../shared/constants/tiposUsuarios';
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
@Injectable({
  providedIn: 'root'
})
export class PuertosService {
  public usuarioActivoJson = localStorage.getItem('usuarioActual')?.toString();
  constructor() { }
  /**
     * Retorna TRUE si el usuario activo es tipo PUERTOS
     */

  getIfPuertos = () => {
    if (typeof this.usuarioActivoJson === 'string') {
      const usuario = JSON.parse(this.usuarioActivoJson);
      const usuarioActivo: any = localStorage.getItem("UsuarioActual");
      return usuarioActivo && usuarioActivo.tipo && usuarioActivo.tipo.id === tiposUsuarios.PUERTOS;
    }

}

checkIfAccionable = (carta: CartaPortePosicion) => {
    return (
        this.getIfPuertos() &&
        (!carta.entreCp || carta.entreCp.length === 0) &&
        (
            (carta.porteEstado === 5 && carta.estadoCarta.idEstadoCarta === 0) ||
            (carta.porteEstado === 3 && carta.estadoCarta.idEstadoCarta === 1)
        ) &&
        (carta.porteTipo !== 3)
    )
}





}
