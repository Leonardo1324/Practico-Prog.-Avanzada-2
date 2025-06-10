import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadrTareaComponent } from './contadr-tarea.component';

describe('ContadrTareaComponent', () => {
  let component: ContadrTareaComponent;
  let fixture: ComponentFixture<ContadrTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadrTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadrTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
