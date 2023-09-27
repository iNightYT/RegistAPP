import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {
  correo: string = '';
  correoValido: boolean = true;

  formularioRecuperarContrasena: FormGroup;


  constructor(private alertController: AlertController, public formBuilder: FormBuilder, private router: Router) {
    this.formularioRecuperarContrasena = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])]
    });
  }

  ngOnInit() {
  }

  async validarCorreo() {

    if (this.formularioRecuperarContrasena.invalid) {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Correo invalido, coloque uno de verdad!!',
        buttons: ['OK']
      });

      await alert.present();
  } else {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Se envio un correo con las instrucciones!!',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate(["/home"]);
  }
}
}