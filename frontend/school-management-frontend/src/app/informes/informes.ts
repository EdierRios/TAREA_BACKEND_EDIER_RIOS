import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


interface Informe {
  id: string;
  grado: string;
  grupo: string;
  fecha: string;
}

@Component({
  selector: 'app-informes',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './informes.html',
  styleUrls: ['./informes.css']
})
export class InformesComponent {
  informes = signal<Informe[]>([]);
  filtroGrado = '';
  mostrarFormulario = signal(false);
  nuevoInforme = signal<Informe>({ id: '', grado: '', grupo: '', fecha: '' }); 
  private apiUrl = 'http://localhost:3000/api/informes';

  constructor(private http: HttpClient) {
    this.cargarInformes();
  }

  cargarInformes() {
    this.http.get<Informe[]>(this.apiUrl).subscribe(data => {
      this.informes.set(data);
    });
  }

  filtrarInformes() {
    this.http.get<Informe[]>(`${this.apiUrl}/filtrar`, { params: { grado: this.filtroGrado } }).subscribe(data => {
      this.informes.set(data);
    });
  }

  openNewInformeForm() {
    this.mostrarFormulario.set(true);
    this.nuevoInforme.set({ id: '', grado: '', grupo: '', fecha: '' });
  }

  guardarInforme() {
    this.http.post(this.apiUrl, this.nuevoInforme()).subscribe(() => {
      this.mostrarFormulario.set(false);
      this.cargarInformes();
      alert('Informe creado');
    });
  }

  verInforme(id: string) {
    alert(`Detalles del Informe ${id}: Contenido del informe aquí.`);
  }

  eliminarInforme(id: string) {
    if (confirm(`¿Estás seguro de eliminar el informe ${id}?`)) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.cargarInformes();
        alert(`Informe ${id} eliminado`);
      });
    }
  }
}