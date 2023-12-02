import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SqliteService } from '../Servicios/sqlite.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private router: Router, public fb: FormBuilder, private alertController: AlertController, private SqliteService: SqliteService) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'rol': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required),
      'confirmar_contrasena': new FormControl("", Validators.required)
    })
   }

  async ngOnInit() {
  await this.SqliteService.inicializarBaseDeDatos();

  }



  async registrar() {
    const formularioRegistro = this.formularioRegistro;
  const f = this.formularioRegistro.value;

  if (this.formularioRegistro.invalid) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Debes ingresar todos los datos',
      buttons: ['OK']
    });

    await alert.present();
    return;
  } else if (f.contrasena !== f.confirmar_contrasena) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Las contraseñas no coinciden',
      buttons: ['OK']
    });

    await alert.present();
    return;
  } else if (f.contrasena.length < 6 || !/[A-Z]/.test(f.contrasena) || !/\d/.test(f.contrasena)) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'La contraseña debe tener al menos 6 caracteres, incluir al menos una mayúscula y un número',
      buttons: ['OK']
    });

    await alert.present();
    return;
  } else if (!f.email.includes('@') || !/\.(com|cl)$/.test(f.email)) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'El correo electrónico debe contener el símbolo "@" y una extensión de dominio válida (por ejemplo, ".com" o ".cl")',
      buttons: ['OK']
    });

    await alert.present();
    return;
  } else {
    await this.SqliteService.registrarUsuario(f.usuario, f.email, f.contrasena, f.rol);


    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Registrado correctamente',
      buttons: ['OK']
    });

    await alert.present();
    this.router.navigate(["/home"]);
  }
}
}
