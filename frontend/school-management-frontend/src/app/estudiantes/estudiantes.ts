import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Estudiante {
  codigo: string;
  identificacion: string;
  nombre: string;
  grado: string;
  grupo: string;
  estado: string;
  cursos: { codigo: string; ano: number; grado: string; grupo: string; estado: string; notaPromedio: string }[];
  identificacionTipo?: string;
  documento?: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  sexo?: string;
  fechaNacimiento?: string;
  telefono?: string;
  celular?: string;
  email?: string;
  ciudad?: string;
  direccion?: string;
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css']
})
export class EstudiantesComponent {
  estudiantes = signal<Estudiante[]>([]);
  cursos = signal<Estudiante['cursos']>([]);
  filtroGrado = '';
  filtroGrupo = '';
  filtroIdentificacion = '';
  filtroDocumento = '';
  mostrarFormulario = signal(false);
  nuevoEstudiante = signal<Estudiante>({ codigo: '', identificacion: '', nombre: '', grado: '', grupo: '', estado: '', cursos: [], direccion: 'Calle 12 #45-78 Piso 2' });
  mostrarModal = signal(false);
  estudianteSeleccionado = signal('');

  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.http.get<Estudiante[]>(this.apiUrl).subscribe(data => {
      this.estudiantes.set(data);
    });
  }

  buscarEstudiantes() {
    const filtros = {
      grado: this.filtroGrado,
      grupo: this.filtroGrupo,
      identificacion: this.filtroIdentificacion,
      documento: this.filtroDocumento
    };
    this.http.get<Estudiante[]>(`${this.apiUrl}/filtrar`, { params: filtros }).subscribe(data => {
      this.estudiantes.set(data);
    });
  }

  limpiarFiltros() {
    this.filtroGrado = '';
    this.filtroGrupo = '';
    this.filtroIdentificacion = '';
    this.filtroDocumento = '';
    this.cargarEstudiantes();
  }

  openNewStudentForm() {
    this.mostrarFormulario.set(true);
    this.nuevoEstudiante.set({ codigo: '', identificacion: '', nombre: '', grado: '', grupo: '', estado: '', cursos: [], direccion: 'Calle 12 #45-78 Piso 2' });
  }

  guardarEstudiante() {
    this.http.post(this.apiUrl, this.nuevoEstudiante()).subscribe(() => {
      this.mostrarFormulario.set(false);
      this.cargarEstudiantes();
      alert('Estudiante guardado');
    });
  }

  mostrarDetalles(estudiante: Estudiante) {
    this.cursos.set(estudiante.cursos || []);
    alert(`Detalles de ${estudiante.nombre}`);
  }

  mostrarEliminarModal(nombre: string) {
    this.estudianteSeleccionado.set(nombre);
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  eliminarEstudiante() {
    this.http.delete(`${this.apiUrl}/${this.estudianteSeleccionado()}`).subscribe(() => {
      this.cerrarModal();
      this.cargarEstudiantes();
      alert(`Estudiante ${this.estudianteSeleccionado()} eliminado`);
    });
  }
}