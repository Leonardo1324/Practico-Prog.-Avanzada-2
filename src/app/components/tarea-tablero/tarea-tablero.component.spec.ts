import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaTableroComponent } from './tarea-tablero.component';

describe('TareaTableroComponent', () => {
  let component: TareaTableroComponent;
  let fixture: ComponentFixture<TareaTableroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaTableroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
