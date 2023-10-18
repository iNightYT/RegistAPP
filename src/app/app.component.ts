import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from '@capacitor/share';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private menu: MenuController) {}


  closeMenuAndNavigate(page: string) {
    this.menu.close().then(() => {
      this.router.navigate([page]);
    });
  }

compartirContenido() {
    Share.share({
      title: 'RegistrAPP Duoc UC',
      text: 'Descarga la app para pasar la asistencia de Duoc UC!!',
      url: 'https://github.com/iNightYT/RegistAPP',
      dialogTitle: 'Comparte RegistrAPP',
    })
    .then(result => {
      console.log('Compartido con éxito', result);
    })
    .catch(error => {
      console.error('Error al compartir', error);
    });
  }
}

