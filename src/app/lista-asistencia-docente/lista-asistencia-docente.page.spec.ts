import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAsistenciaDocentePage } from './lista-asistencia-docente.page';

describe('ListaAsistenciaDocentePage', () => {
  let component: ListaAsistenciaDocentePage;
  let fixture: ComponentFixture<ListaAsistenciaDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaAsistenciaDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
