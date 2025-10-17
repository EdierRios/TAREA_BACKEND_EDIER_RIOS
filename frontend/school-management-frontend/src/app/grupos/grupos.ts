import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Grupo {
  nombre: string;
  grado: string;
  estudiantes: number;
  profesor: string;
}

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grupos.html',
  styleUrls: ['./grupos.css']
})
export class GruposComponent {
  grupos = signal<Grupo[]>([]);
  filtroGrado = '';
  mostrarFormulario = signal(false);
  nuevoGrupo = signal<Grupo>({ nombre: '', grado: '', estudiantes: 0, profesor: '' });

  private apiUrl = 'http://localhost:3000/api/grupos';

  constructor(private http: HttpClient) {
    this.cargarGrupos();
  }

  cargarGrupos() {
    this.http.get<Grupo[]>(this.apiUrl).subscribe(data => {
      this.grupos.set(data);
    });
  }

  filtrarGrupos() {
    this.http.get<Grupo[]>(`${this.apiUrl}/filtrar`, { params: { grado: this.filtroGrado } }).subscribe(data => {
      this.grupos.set(data);
    });
  }

  openNewGroupForm() {
    this.mostrarFormulario.set(true);
    this.nuevoGrupo.set({ nombre: '', grado: '', estudiantes: 0, profesor: '' });
  }

  guardarGrupo() {
    this.http.post(this.apiUrl, this.nuevoGrupo()).subscribe(() => {
      this.mostrarFormulario.set(false);
      this.cargarGrupos();
      alert('Grupo creado');
    });
  }

  verDetalles(grupo: Grupo) {
    alert(`Detalles de ${grupo.nombre}: Ver lista de estudiantes y más información.`);
  }
}