import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../Servicios/sqlite.service';



@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.page.html',
  styleUrls: ['./lista-asistencia.page.scss'],
})
export class ListaAsistenciaPage implements OnInit{
  resultadosEscaneo: any[] = [];

  constructor(private sqliteService: SqliteService) {
    // Asegúrate de inicializar la base de datos antes de usarla
    this.inicializarBaseDeDatos();
  }

  ngOnInit() {
    // Obtener los resultados de escaneo almacenados
    this.obtenerResultadosEscaneo();
  }

  async inicializarBaseDeDatos() {
    await this.sqliteService.inicializarBaseDeDatos();
  }

  obtenerResultadosEscaneo() {
    // Obtener el ID del usuario actual desde el localStorage
    const usuarioId = localStorage.getItem('usuarioId');

    if (!usuarioId) {
        // Manejar la situación donde no hay usuarioId (puede redirigir a la página de inicio de sesión, por ejemplo)
        console.log('No hay usuarioId disponible.');
        return;
    }

    // Llamar al servicio de SQLite para obtener los resultados de escaneo para el usuario actual
    this.sqliteService.obtenerEscaneos(usuarioId).then(resultados => {
        this.resultadosEscaneo = resultados;
    });
}
}