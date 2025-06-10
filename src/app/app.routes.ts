import { Routes } from '@angular/router';
import { TareaTableroComponent } from './components/tarea-tablero/tarea-tablero.component';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tablero', pathMatch: 'full' },
  { path: 'tablero', component: TareaTableroComponent },
  // Si el formulario fuera una página separada, podrías tener:
  { path: 'nueva-tarea', component: TareaFormComponent },
  { path: 'editar/:id', component: TareaFormComponent },
  { path: '**', redirectTo: '/tablero' } // Redirigir a tablero para rutas no encontradas
];