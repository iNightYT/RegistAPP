import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuarioUsuario = localStorage.getItem('usuarioUsuario');
  rolUsuario = localStorage.getItem('rolUsuario');
  
  constructor() { }

  ngOnInit() {
  }

}
