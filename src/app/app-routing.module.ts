import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuntenticadoGuard } from './guard/auntenticado.guard';
import { AuthGuard } from './guard/auth.guard';
import { AlumnoGuard } from './guard/alumno.guard';
import { DocenteGuard } from './guard/docente.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuntenticadoGuard, AuthGuard],
  },
  {
    path: 'restablecer-contrasena',
    loadChildren: () => import('./restablecer-contrasena/restablecer-contrasena.module').then( m => m.RestablecerContrasenaPageModule)
  },
  {
    path: 'lista-asistencia',
    loadChildren: () => import('./lista-asistencia/lista-asistencia.module').then( m => m.ListaAsistenciaPageModule),
    canActivate: [AuntenticadoGuard, AlumnoGuard]
  },
  {
    path: 'lista-asistencia-docente',
    loadChildren: () => import('./lista-asistencia-docente/lista-asistencia-docente.module').then( m => m.ListaAsistenciaDocentePageModule),
    canActivate: [AuntenticadoGuard, DocenteGuard]
  },
  {
    path: 'listado-cursos',
    loadChildren: () => import('./listado-cursos/listado-cursos.module').then( m => m.ListadoCursosPageModule),
    canActivate: [AuntenticadoGuard, DocenteGuard]
  },
  {
    path: 'codigo-qr',
    loadChildren: () => import('./codigo-qr/codigo-qr.module').then( m => m.CodigoQRPageModule),
    canActivate: [AuntenticadoGuard, DocenteGuard]
  },
  {
    path: 'listado-alumnos',
    loadChildren: () => import('./listado-alumnos/listado-alumnos.module').then( m => m.ListadoAlumnosPageModule),
    canActivate: [AuntenticadoGuard, DocenteGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'clima',
    loadChildren: () => import('./clima/clima.module').then( m => m.ClimaPageModule),
    canActivate: [AuntenticadoGuard, AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
