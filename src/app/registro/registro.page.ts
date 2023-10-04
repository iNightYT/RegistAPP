import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private router: Router, public fb: FormBuilder, private alertController: AlertController) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      'rol': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required),
      'confirmar_contrasena': new FormControl("", Validators.required)
    })
   }

  ngOnInit() {
  }



  async registrar() {
    const formularioRegistro = this.formularioRegistro;
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Debes ingresar todos los datos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    } else if (f.contrasena != f.confirmar_contrasena) {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });

      await alert.present();
      return;
    } else {
      var usuarioUsuario = f.usuario;
      var emailUsuario = f.email;
      var contrasenaUsuario = f.contrasena;
      var rolUsuario = formularioRegistro.controls['rol'].value;
      

      localStorage.setItem('usuarioUsuario', usuarioUsuario);
      localStorage.setItem('emailUsuario', emailUsuario);
      localStorage.setItem('contrasenaUsuario', contrasenaUsuario);
      localStorage.setItem('rolUsuario', rolUsuario);
  


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
