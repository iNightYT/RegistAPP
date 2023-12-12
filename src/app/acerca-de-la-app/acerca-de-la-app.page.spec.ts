import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercaDeLaAppPage } from './acerca-de-la-app.page';

describe('AcercaDeLaAppPage', () => {
  let component: AcercaDeLaAppPage;
  let fixture: ComponentFixture<AcercaDeLaAppPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcercaDeLaAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
