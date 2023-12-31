
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, MenuController } from '@ionic/angular';
import { Login } from 'src/app/modelo/login';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { InterceptorService } from './../../services/interceptor.service';
import { textos } from 'src/app/shared/textos/textos';
import { tipoSesion } from '../../shared/constants/tipoSesion';
import { Configuraciones }  from '../../shared/constants/configuraciones';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public rememberMe = false;
  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  loginForm: FormGroup;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  cerealnetVersion : String | null = "";
  cerealnetUrl : String | null = "";
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  iconcuenta = 'person';
  nombreEmpresa : string | null = "";
  emailEmpresa  : string | null = "";
  direccionEmpresa  : string | null = "";
  telefonoEmpresa  : string | null = "";
  public registerCredentials = { usuario: '', clave: '' };  // Usado para el inicio de sesion

  @ViewChild('passwordEyeRegister') passwordEye: any;

  constructor(private uiService: UiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navController: NavController,
    private activateRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,
    private interceptorService: InterceptorService,


  ) {
    this.testError = this.activateRoute.snapshot.queryParamMap.get("refreshToken");
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required]],
      clave: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.menuCtrl.enable(false)
    this.cerealnetVersion = Configuraciones.version;
    this.cerealnetUrl = Configuraciones.urlBase;
    this.nombreEmpresa =textos.login.html.cerealnet.nombre;
    this.emailEmpresa = textos.login.html.cerealnet.mail;
    this.direccionEmpresa = textos.login.html.cerealnet.direccion;
    this.telefonoEmpresa = textos.login.html.cerealnet.telefono;
    //this.doLoadLogin();
  }
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
}
  get isValidForm() { return true; }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  /**
   * Login de usuario
   */
  async loginUser(tipo: string) {


    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '' && tipo === tipoSesion.NORMAL) {
      this.uiService.presentAlertInfo('Por favor ingrese eL usuario y la contraseña');
      return;
    }
    await this.uiService.presentLoading("Conectando...");
    if (tipo === tipoSesion.NORMAL){
      // Si no es camionero, entonces me logueo

   await this.loginService.loginUser(login, this.rememberMe).then(

      async (resp : any) => {
        const respuesta = resp;

        if (resp == true) {

          await this.loadingController.dismiss();
          this.navController.navigateRoot('/resumen', { animated: true });
        } else {

          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo(respuesta.error.descripcion);

      }
    }
    ).catch(
      async error => {
        this.uiService.presentAlertInfo(error);
        await this.loadingController.dismiss();
      }
    );
    }else{
      //
      // Busco si el camionero ya existe en la BD
      /*const camioneroActual = await this.loginService.getCamioneroOfBD();
      if (camioneroActual){
          // Logueo al camionero
          this.loginService.doLoginCamionero(camioneroActual);
          // Habilito el menu
          this.menuCtrl.enable(true);
          // Redirijo a buscarCamionPage
          this.app.getActiveNav().setRoot(BuscarCamionPage);
      } else {
          // No existe en la bd, redirecciono a RegisterCamioneroPage
          this.app.getActiveNav().setRoot(RegisterCamioneroPage);
      }*/
    }
  }

  async doLoadLogin() {
    await this.uiService.presentLoading("Ingresando...");
      this.loginService.trySavedLogin().then(
        async returnValue => {
          //Si hay login guardado.
          await this.loadingController.dismiss();
          if (returnValue) {
           //Redirijo al resumen
            this.navController.navigateRoot('/resumen', { animated: true });
          } else {

            this.navController.navigateRoot('/login', { animated: true });
          }

          console.log(returnValue);
        },
        (error: any) => {
           this.loadingController.dismiss();
          console.log(error);
          this.navController.navigateRoot('/login', { animated: true });
        }
      )

  }

  /**
  * Este metodo se usa para la recuperacion de contraseñas
  */
  async recuperarClave() {

    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo('Por favor ingrese su usuario para la recuperación de clave');
      return;
    }

    await this.uiService.presentLoading("Cargando...");
    this.loginService.recuperarClave(login)
      .then(
        async (resp: any) => {
          await this.loadingController.dismiss();
          if (resp) {
            console.log(resp.email);
            this.uiService.presentAlertInfo(`Recuperación realizada con éxito. Un email fue enviado a: ${ resp.email }`);
          }
        }
      ).catch(
        async error => {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo(error);
        }
      );
  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      usuario: loginFrom.usuario,
      clave: loginFrom.clave,
    };
    return login;
  }


















}

