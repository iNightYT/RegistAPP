import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../Servicios/sqlite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  formularioCambioContrasenia: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, private SqliteService: SqliteService, private router: Router) { 
    this.formularioCambioContrasenia = this.fb.group({
      'antiguaContrasenia': new FormControl("", Validators.required),
      'nuevaContrasenia': new FormControl("", Validators.required),
      'confirmarNuevaContrasenia': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }
  async cambiarContrasenia() {
    const f = this.formularioCambioContrasenia.value;
  
    try {
      const usuarioId = localStorage.getItem('usuarioId') || ''; // Asegúrate de obtener el usuarioId correctamente
  
      const contraseniaActual = await this.SqliteService.obtenerContraseniaActual(usuarioId);
  
      if (contraseniaActual === null || f.antiguaContrasenia !== contraseniaActual) {
        const alert = await this.alertController.create({
          header: 'Mensaje',
          message: 'La contraseña antigua no es correcta',
          buttons: ['OK']
        });
  
        await alert.present();
        return;
      }
  
      if (f.nuevaContrasenia !== f.confirmarNuevaContrasenia) {
        const alert = await this.alertController.create({
          header: 'Mensaje',
          message: 'Las contraseñas nuevas no coinciden',
          buttons: ['OK']
        });
  
        await alert.present();
        return;
      }
  
      if (f.nuevaContrasenia.length < 6 || !/[A-Z]/.test(f.nuevaContrasenia) || !/\d/.test(f.nuevaContrasenia)) {
        const alert = await this.alertController.create({
          header: 'Mensaje',
          message: 'La nueva contraseña debe tener al menos 6 caracteres, incluir al menos una mayúscula y un número',
          buttons: ['OK']
        });
  
        await alert.present();
        return;
      }
  
      // Si todas las validaciones son exitosas, continúa al bloque final.
      // Aquí es donde llamarías a tu servicio para cambiar la contraseña en la base de datos.
      await this.SqliteService.cambiarContrasenia(usuarioId, f.nuevaContrasenia);
  
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Contraseña cambiada correctamente',
        buttons: ['OK']
      });
  
      await alert.present();
      this.router.navigate(["/opciones"])

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
  
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al cambiar la contraseña. Por favor, inténtalo nuevamente.',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
}
