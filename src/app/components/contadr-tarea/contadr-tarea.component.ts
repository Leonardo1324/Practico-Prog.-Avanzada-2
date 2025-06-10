import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-contadr-tarea',
  imports: [CommonModule ],
  templateUrl: './contadr-tarea.component.html',
  styleUrl: './contadr-tarea.component.css'
})
export class ContadrTareaComponent implements OnChanges {
  @Input() allTareas: Tarea[] = [];

  tareaMasProxima: Tarea | undefined;
  diasRestantes: number | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTareas'] && this.allTareas?.length) {
      this.calcularTareaMasProxima();
    } else {
      this.tareaMasProxima = undefined;
      this.diasRestantes = undefined;
    }
  }

  private calcularTareaMasProxima(): void {
    // Filtrar tareas activas
    const tareasActivas = this.allTareas.filter(
      tarea => tarea.estado === 'pendiente' || tarea.estado === 'en-proceso'
    );

    if (!tareasActivas.length) {
      this.tareaMasProxima = undefined;
      this.diasRestantes = undefined;
      return;
    }

    // Ordenar por fecha límite
    tareasActivas.sort((a, b) =>
      new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()
    );

    this.tareaMasProxima = tareasActivas[0];

    const hoy = new Date();
    const fechaLimite = new Date(this.tareaMasProxima.fechaLimite);
    const diferenciaTiempo = fechaLimite.getTime() - hoy.getTime();

    this.diasRestantes = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
  }
}
