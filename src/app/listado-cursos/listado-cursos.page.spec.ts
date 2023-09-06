import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCursosPage } from './listado-cursos.page';

describe('ListadoCursosPage', () => {
  let component: ListadoCursosPage;
  let fixture: ComponentFixture<ListadoCursosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListadoCursosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
