import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SqliteService } from '../Servicios/sqlite.service';



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
    private router: Router,
    private sqliteService: SqliteService
  ) {}

  ngOnInit() {}
  


  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.toggleVisibility();
   // Obtener el usuarioId del localStorage
  const usuarioId = localStorage.getItem('usuarioId');

  if (!usuarioId) {
    // Si no hay usuarioId, podrías manejar esto de alguna manera (por ejemplo, redirigir a la página de inicio de sesión)
    console.log('No hay usuarioId en el localStorage. Manejar esto según tu lógica.');
    this.toggleVisibility();
    return;
  }

  const result = await BarcodeScanner.startScan();

  if (result.hasContent) {
    this.lectura = result.content;

    // Utiliza el usuarioId obtenido para asociar el escaneo al usuario correcto
    this.sqliteService.registrarEscaneo(usuarioId, result.content);
  }

  this.toggleVisibility();
}

  async stopScan() {
    const alert = await this.alertController.create({
      header: 'Parar escaneo',
      message: 'Usted quiere parar de escanear el codigo?',
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
            console.log('parando...');
            BarcodeScanner.showBackground();
            this.toggleVisibility();
            BarcodeScanner.stopScan();
          },
        },
      ],
    });
    await alert.present();
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
            localStorage.removeItem('usuarioUsuario');
            localStorage.removeItem('rolUsuario');
            localStorage.removeItem('usuarioId');
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

  