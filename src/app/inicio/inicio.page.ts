import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuarioUsuario = localStorage.getItem('usuarioUsuario');
  rolUsuario = localStorage.getItem('rolUsuario');
  lectura: string | undefined;
  showContent : boolean = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}
  


  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.toggleVisibility();
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.lectura = result.content;
    }
    this.toggleVisibility();
    
  } 

  async stopScan() {
    BarcodeScanner.showBackground();
    this.toggleVisibility();
    BarcodeScanner.stopScan();
  };

  toggleVisibility() {
    this.showContent  = !this.showContent ;
  }
  

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

  