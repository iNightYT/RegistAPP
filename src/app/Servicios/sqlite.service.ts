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
    await db.executeSql('CREATE TABLE IF NOT EXISTS asistencia (id INTEGER PRIMARY KEY AUTOINCREMENT, ramo TEXT, fecha TEXT, contenido TEXT, usuario_id INTEGER, FOREIGN KEY(usuario_id) REFERENCES usuarios(id))', []);

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
      return { autenticado: true, usuario: user.usuario, rol: user.rol, usuarioId: user.id };
    } else {
      return { autenticado: false, usuario: null, rol: null, usuarioId: null };
    }
    
  }
  async registrarEscaneo(usuarioId: string, contenido: string) {
    const db = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
    });

    // Reemplazar el contenido escaneado por "Presente"
    const nuevoContenido = 'Presente';
    const ramo = 'Programacion de apps moviles';
    let currentDate = new Date();
    const formattedDate = currentDate.toISOString();


    // Insertar el resultado del escaneo en la nueva tabla asociándolo con el usuario
    await db.executeSql('INSERT INTO asistencia (ramo, fecha, contenido, usuario_id) VALUES (?, ?, ?, ?)', [ramo, formattedDate, nuevoContenido, usuarioId]);
}
  
  async obtenerEscaneos(usuarioId: string) {
    const db = await this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });

     // Obtener los resultados de escaneos almacenados para el usuario actual
     const result = await db.executeSql('SELECT asistencia.*, usuarios.usuario as nombreUsuario FROM asistencia INNER JOIN usuarios ON asistencia.usuario_id = usuarios.id WHERE usuario_id = ?', [usuarioId]);

     const escaneos = [];
     for (let i = 0; i < result.rows.length; i++) {
         escaneos.push(result.rows.item(i));
     }
 
     return escaneos;
 }
 async obtenerEscaneos2() {
  const db = await this.sqlite.create({
    name: 'data.db',
    location: 'default'
  });

  // Obtener todos los resultados de escaneos almacenados sin filtrar por usuario
  const result = await db.executeSql('SELECT asistencia.*, usuarios.usuario as nombreUsuario FROM asistencia INNER JOIN usuarios ON asistencia.usuario_id = usuarios.id', []);

  const escaneos = [];
  for (let i = 0; i < result.rows.length; i++) {
    escaneos.push(result.rows.item(i));
  }

  return escaneos;
 }
 async obtenerContraseniaActual(usuarioId: string): Promise<string | null> {
  const db = await this.sqlite.create({
    name: 'data.db',
    location: 'default'
  });

  const result = await db.executeSql('SELECT contrasena FROM usuarios WHERE id = ?', [usuarioId]);
  if (result.rows.length > 0) {
    return result.rows.item(0).contrasena;
  } else {
    return null; // Usuario no encontrado, o la contraseña no está disponible
  }
}
async cambiarContrasenia(usuarioId: string, nuevaContrasenia: string) {
  const db = await this.sqlite.create({
    name: 'data.db',
    location: 'default'
  });

  // Actualizar la contraseña del usuario en la tabla 'usuarios'
  await db.executeSql('UPDATE usuarios SET contrasena = ? WHERE id = ?', [nuevaContrasenia, usuarioId]);
}

async eliminarCuenta(usuarioId: string) {
  const db = await this.sqlite.create({
    name: 'data.db',
    location: 'default'
  });

  // Eliminar la cuenta del usuario y sus datos de escaneo
  await db.transaction(async (tx) => {
    // Eliminar datos de escaneo del usuario
    await tx.executeSql('DELETE FROM asistencia WHERE usuario_id = ?', [usuarioId]);

    // Eliminar la cuenta del usuario
    await tx.executeSql('DELETE FROM usuarios WHERE id = ?', [usuarioId]);
  });
}

async eliminarDatosEscaneoPorUsuario(usuarioId: string) {
  const db = await this.sqlite.create({
    name: 'data.db',
    location: 'default'
  });

  // Eliminar los datos de escaneo asociados al usuario
  await db.executeSql('DELETE FROM asistencia WHERE usuario_id = ?', [usuarioId]);
}
}