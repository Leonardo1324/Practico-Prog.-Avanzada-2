import { Component, EventEmitter, Input, Output, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Tarea } from '../../models/tarea';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-tarea-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.css'
})
export class TareaFormComponent {
@Input() tareaParaEditar: Tarea | null = null;
  @Output() tareaGuardada = new EventEmitter<Tarea>();

  tareaForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: DialogRef<Tarea>) { } // El tipo genérico puede ser el tipo de datos que se devolverán

  ngOnInit(): void {
  const tareaRecibida = this.dialogRef.config?.data as Tarea | null;

  this.isEditMode = !!tareaRecibida;

  this.tareaForm = this.fb.group({
    id: [tareaRecibida?.id || null],
    nombre: [tareaRecibida?.nombre || '', Validators.required],
    descripcion: [tareaRecibida?.descripcion || '', Validators.required],
    estado: [tareaRecibida?.estado || 'pendiente', Validators.required],
    fechaLimite: [tareaRecibida?.fechaLimite || this.getCurrentDate(), Validators.required]
  });}

  getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      // CAMBIO: Cierra el diálogo y pasa la tarea como resultado
      this.dialogRef.close(this.tareaForm.value as Tarea);
      // Ya no necesitas emitir 'tareaGuardada', el padre se suscribirá al 'afterClosed' del diálogo
    } else {
      this.tareaForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
