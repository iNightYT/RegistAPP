import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../Servicios/sqlite.service';
import { AlertController } from '@ionic/angular'; // Asegúrate de importar el AlertController
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})
export class OpcionesPage implements OnInit {

  constructor(
    private sqliteService: SqliteService,
    private alertController: AlertController,
    private router: Router
  ) { 
    this.inicializarBaseDeDatos();
  }

  ngOnInit() {
  }
  async inicializarBaseDeDatos() {
    await this.sqliteService.inicializarBaseDeDatos();
  }
  async confirmarAccion(mensaje: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmar Acción',
        message: mensaje,
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
            role: 'cancel',
            handler: () => {
              console.log('Acción cancelada');
              resolve(false);
            },
          },
          {
            text: 'Sí',
            cssClass: 'alert-button-confirm',
            handler: () => {
              console.log('Acción confirmada');
              resolve(true);
            },
          },
        ],
      });
  
      await alert.present();
    });
  }
  async eliminarCuenta() {
    const mensaje = '¿Está seguro de que desea eliminar su cuenta y todos sus datos?';
    const confirmacion = await this.confirmarAccion(mensaje);
  
    if (confirmacion) {
      try {
        const usuarioId = localStorage.getItem('usuarioId') || '';
        await this.sqliteService.eliminarCuenta(usuarioId);
        console.log('Cuenta eliminada correctamente');
        this.router.navigate(["/home"])
        localStorage.removeItem('autenticado');
        localStorage.removeItem('usuarioUsuario');
        localStorage.removeItem('rolUsuario');
        localStorage.removeItem('usuarioId');
      } catch (error) {
        console.error('Error al eliminar la cuenta', error);
      }
    }
  }
  
  async eliminarDatosEscaneo() {
    const mensaje = '¿Está seguro de que desea eliminar todos los datos de escaneo asociados a su cuenta?';
    const confirmacion = await this.confirmarAccion(mensaje);
  
    if (confirmacion) {
      try {
        const usuarioId = localStorage.getItem('usuarioId') || '';
        await this.sqliteService.eliminarDatosEscaneoPorUsuario(usuarioId);
        console.log('Datos de escaneo eliminados correctamente');
      } catch (error) {
        console.error('Error al eliminar datos de escaneo', error);
      }
    }
  }
}  