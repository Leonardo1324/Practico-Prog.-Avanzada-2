export interface Tarea {
    id: string;
    nombre: string;
    descripcion: string;
    //fechaCreacion: Date;
    fechaLimite: Date;
    estado: 'pendiente' | 'en-proceso' | 'terminada';
}