import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaColumnaComponent } from './tarea-columna.component';

describe('TareaColumnaComponent', () => {
  let component: TareaColumnaComponent;
  let fixture: ComponentFixture<TareaColumnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaColumnaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
