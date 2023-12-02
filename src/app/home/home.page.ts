import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SqliteService  } from '../Servicios/sqlite.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, private toastController: ToastController, private router: Router, private SqliteService: SqliteService) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioRegistro.value;


    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Debes ingresar todos los datos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    } else {
      const resultadoAutenticacion = await this.SqliteService.autenticarUsuario(f.usuario, f.contrasena);

      if (resultadoAutenticacion.autenticado) {
        localStorage.setItem('autenticado', 'true');
        localStorage.setItem('usuarioUsuario', resultadoAutenticacion.usuario);
        localStorage.setItem('rolUsuario', resultadoAutenticacion.rol);
        this.router.navigate(["/inicio"]);
  
        const toast = await this.toastController.create({
          message: 'El usuario inició sesión con éxito!!',
          duration: 1500,
          position: "top",
        });

        await toast.present();  
    } else {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Datos incorrectos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
  }
  }
}