import { Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Tarea } from '../../models/tarea';
import { TareaFormComponent } from '../tarea-form/tarea-form.component';
import { TareaServiceService } from '../../services/tarea-service.service';
import { ContadrTareaComponent } from '../contadr-tarea/contadr-tarea.component';
import { CommonModule } from '@angular/common';
import { TareaColumnaComponent } from '../tarea-columna/tarea-columna.component';

@Component({
  selector: 'app-tarea-tablero',
  imports: [CommonModule, ContadrTareaComponent, TareaColumnaComponent],
  templateUrl: './tarea-tablero.component.html',
  styleUrl: './tarea-tablero.component.css'
})
export class TareaTableroComponent {
  private dialog = inject(Dialog);
  private tareaService = inject(TareaServiceService);

  allTareas: Tarea[] = [];
  tareasPendientes: Tarea[] = [];
  tareasEnProceso: Tarea[] = [];
  tareasTerminadas: Tarea[] = [];

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas(): void {
    this.tareaService.getTareas().subscribe(
      (tareas: Tarea[]) => {
        this.allTareas = tareas;
        this.filterTareasByEstado();
      },
      (error: any) => {
        console.error('Error al cargar las tareas:', error);
      }
    );
  }

  filterTareasByEstado(): void {
    this.tareasPendientes = this.allTareas.filter(t => t.estado === 'pendiente');
    this.tareasEnProceso = this.allTareas.filter(t => t.estado === 'en-proceso');
    this.tareasTerminadas = this.allTareas.filter(t => t.estado === 'terminada');
  }

  openTareaFormModal(tarea?: Tarea): void {
    // Usar CDK Dialog
    const dialogRef = this.dialog.open(TareaFormComponent, {
      data: tarea, // Pasar la tarea si es una edición
      width: '500px',
      maxWidth: '90vw',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-dialog-backdrop'
    });

    // Escuchar cuando se cierre el dialog
    dialogRef.closed.subscribe((value: unknown) => {
      const tareaGuardada = value as Tarea | undefined;
      if (tareaGuardada) {
        if (tareaGuardada.id) {
          // Es una edición
          this.tareaService.updateTarea(tareaGuardada).subscribe(
            () => this.loadTareas(),
            (error: any) => console.error('Error al actualizar tarea:', error)
          );
        } else {
          // Es una nueva tarea
          tareaGuardada.id = Math.floor(Math.random() * 10000).toString(); // Generar un ID aleatorio
          this.tareaService.addTarea(tareaGuardada).subscribe(
            () => this.loadTareas(),
            (error: any) => console.error('Error al añadir tarea:', error)
          );
        }
      }
    });
  }

  onDeleteTarea(id: number): void {
    this.tareaService.deleteTarea(id.toString()).subscribe(
      () => {
        this.loadTareas();
      },
      (error: any) => {
        console.error('Error al eliminar tarea:', error);
      }
    );
  }

  onTareaMovida(event: { tarea: Tarea, nuevoEstado: 'pendiente' | 'en-proceso' | 'terminada' }): void {
    const tareaActualizada = { ...event.tarea, estado: event.nuevoEstado };
    this.tareaService.updateTarea(tareaActualizada).subscribe(
      () => {
        console.log('Tarea movida y actualizada:', tareaActualizada);
        this.loadTareas(); 
      },
      (error: any) => console.error('Error al mover tarea:', error)
    );
  }
}