import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuarioUsuario = localStorage.getItem('usuarioUsuario');
  rolUsuario = localStorage.getItem('rolUsuario');

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesion',
      message: 'Usted esta apunto de cerrar sesion, estas seguro?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alerta cancelada');
          },
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: async () => {
            console.log('Redireccionando...');
            localStorage.removeItem('autenticado');
            window.history.back();
            const toast = await this.toastController.create({
              message: 'El usuario cerro sesion con exito!!!',
              duration: 1500,
              position: "top",});
              await toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}

const textElement = document.querySelector('#Bienvenida');
  if (textElement) {
    textElement.classList.add('start-animation');
  }