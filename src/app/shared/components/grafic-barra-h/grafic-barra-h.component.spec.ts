import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficBarraHComponent } from './grafic-barra-h.component';

describe('GraficBarraHComponent', () => {
  let component: GraficBarraHComponent;
  let fixture: ComponentFixture<GraficBarraHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficBarraHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficBarraHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
