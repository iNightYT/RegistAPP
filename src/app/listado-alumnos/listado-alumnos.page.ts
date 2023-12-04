import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../Servicios/sqlite.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.page.html',
  styleUrls: ['./listado-alumnos.page.scss'],
})
export class ListadoAlumnosPage implements OnInit {
  alumnosPresentes: any[] = [];

  constructor(private sqliteService: SqliteService) {
    this.inicializarBaseDeDatos();
   }
   private alumnosPresentesSubject = new BehaviorSubject<any[]>([]);
   alumnosPresentes$ = this.alumnosPresentesSubject.asObservable();
  ngOnInit() {
    this.obtenerAlumnosPresentes();
    // Refrescar la lista cada 5 segundos (5000 milisegundos)
  setInterval(() => this.obtenerAlumnosPresentes(), 5000);
  }
  async inicializarBaseDeDatos() {
    await this.sqliteService.inicializarBaseDeDatos();
  }

  obtenerAlumnosPresentes() {
    // Llamar al servicio de SQLite para obtener todos los resultados de escaneo
    this.sqliteService.obtenerEscaneos2().then(resultados => {
      this.alumnosPresentes = resultados;
    });
  }
}