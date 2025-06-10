import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-item',
  imports: [CommonModule],
  templateUrl: './tarea-item.component.html',
  styleUrl: './tarea-item.component.css'
})
export class TareaItemComponent {
 @Input() tarea!: Tarea;
  @Output() edit = new EventEmitter<Tarea>();
  @Output() delete = new EventEmitter<number>();

  onEdit(): void {
    this.edit.emit(this.tarea);
  }

  //ngOnInit(): void { // Agregue ngOnInit para registrar la entrada
    //console.log('Tarea recibida en TareaItemComponent:', this.tarea);
    //if (this.tarea) {
      //console.log('Nombre de la Tarea (tarea.nombre):', this.tarea.nombre);
      //console.log('Descripción de la Tarea (tarea.descripcion):', this.tarea.descripcion);
    //}
  //}

  onDelete(): void {
    this.delete.emit(Number(this.tarea.id));
  }

  // Método para determinar la clase de urgencia (se puede mejorar con un pipe)
  getUrgenciaClass(): string {
    const hoy = new Date();
    const fechaLimite = new Date(this.tarea.fechaLimite);
    const diffTime = fechaLimite.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (this.tarea.estado === 'terminada') {
        return 'border-success'; // Verde para terminadas
    } else if (diffDays <= 0) {
        return 'border-danger'; // Roja si vencida
    } else if (diffDays <= 3) {
        return 'border-warning'; // Naranja si quedan 3 días o menos
    }
    return 'border-primary'; // Azul por defecto
  }
}
