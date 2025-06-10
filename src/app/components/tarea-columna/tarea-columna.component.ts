import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, DragDropModule ,moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Tarea } from '../../models/tarea';
import { TareaItemComponent } from "../tarea-item/tarea-item.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-columna',
  imports: [TareaItemComponent,DragDropModule,CommonModule],
  templateUrl: './tarea-columna.component.html',
  styleUrl: './tarea-columna.component.css'
})
export class TareaColumnaComponent {
@Input() titulo: string = '';
  @Input() tareas: Tarea[] = [];
  @Input() estado: 'pendiente' | 'en-proceso' | 'terminada' = 'pendiente';
  @Output() tareaModificada = new EventEmitter<Tarea>();
  @Output() tareaEliminada = new EventEmitter<number>();
  @Output() tareaMovida = new EventEmitter<{ tarea: Tarea, nuevoEstado: 'pendiente' | 'en-proceso' | 'terminada' }>();

  onEdit(tarea: Tarea): void {
    this.tareaModificada.emit(tarea);
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.tareaEliminada.emit(id);
    }
  }

  drop(event: CdkDragDrop<Tarea[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const tareaMovida = event.previousContainer.data[event.previousIndex];
      // Asegúrate de que la tareaMovida sea una copia para evitar mutar el array original directamente
      const tareaActualizada = { ...tareaMovida, estado: this.estado };
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.tareaMovida.emit({ tarea: tareaActualizada, nuevoEstado: this.estado });
    }
  }

  // Para Drag and Drop: Define los IDs de las listas conectadas
  getConnectedList(): string[] {
    return ['columna-pendiente', 'columna-en-proceso', 'columna-terminada'].filter(id => id !== `columna-${this.estado}`);
  }
}

