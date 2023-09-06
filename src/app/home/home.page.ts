import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios = [
    { username: 'gust.martinez', password: 'alumnoduoc', redirectTo: '/inicio' },
    { username: 'profesor', password: 'docenteduoc', redirectTo: '/inicio-docente' },
  ];

  usuario!: string;
  password!: string;

  constructor(public toastController: ToastController, private router: Router) {}

  async onLogin() {
    const user = this.usuarios.find(
      (u) => u.username === this.usuario && u.password === this.password
    );

    if (user) {
      const toast = await this.toastController.create({
        message: 'Inicio de sesión exitoso',
        duration: 2000,
        position: 'top',
      });
      await toast.present();

      this.router.navigate([user.redirectTo]);
    } else {
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas',
        duration: 2000,
        position: 'top',
      });
      await toast.present();
    }
  }
}
