import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor(private sqlite: SQLite) { }

  async inicializarBaseDeDatos() {
    const db = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

    await db.executeSql('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, email TEXT, contrasena TEXT, rol TEXT)', []);
  }

  async registrarUsuario(usuario: string, email: string, contrasena: string, rol: string) {
    const db = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

    await db.executeSql('INSERT INTO usuarios (usuario, email, contrasena, rol) VALUES (?, ?, ?, ?)', [usuario, email, contrasena, rol]);
  }

  async autenticarUsuario(usuario: string, contrasena: string) {
    const db = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

    const result = await db.executeSql('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
    if (result.rows.length > 0) {
      const user = result.rows.item(0);
      return { autenticado: true, usuario: user.usuario, rol: user.rol };
    } else {
      return { autenticado: false, usuario: null, rol: null };
    }
  }
}