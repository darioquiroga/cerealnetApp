
import { Injectable } from '@angular/core';
import { tiposUsuarios } from '../shared/constants/tiposUsuarios';
import { CartaPortePosicion } from '../modelo/cartaPortePosicion';
import { CartaPorteHistoria } from '../modelo/cartaPorteHistoria';
import { UiService } from './ui.service';
import { PuertosService } from './puertos.service';
import { LoginService } from './login.service';
import { Login } from '../modelo/login';
import { StorageService } from './storageService';




@Injectable()
export class DescargaService {
    constructor(
        private loginService: LoginService,
        private storageService: StorageService,
        private uiService: UiService,
        private puertosService: PuertosService
    ) { }


}
