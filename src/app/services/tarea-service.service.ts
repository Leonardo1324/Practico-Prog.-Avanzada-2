import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareaServiceService {

  private apiurl = 'http://localhost:3000/tareas'; // URL del API de tareas
  
  constructor(private http: HttpClient) { }

  getTareas() {
    return this.http.get<any[]>(this.apiurl); // Devuelve un observable con la lista de tareas
  } 
  addTarea(tarea: any) {
    return this.http.post<any>(this.apiurl, tarea); // Envía una nueva tarea al servidor
  }
  updateTarea(tarea: any) {
    return this.http.put<any>(`${this.apiurl}/${tarea.id}`, tarea); // Actualiza una tarea existente
  }
  deleteTarea(tareaId: string) {
    return this.http.delete<any>(`${this.apiurl}/${tareaId}`); // Elimina una tarea por su ID
  }

}
