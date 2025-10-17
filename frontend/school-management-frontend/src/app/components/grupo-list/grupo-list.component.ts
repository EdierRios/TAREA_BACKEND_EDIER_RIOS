

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 


interface Grupo {
  id: number;
  nombre: string;
  grado: string;
  profesor: string;
}

@Component({
  selector: 'app-grupo-list',
  standalone: true,

  imports: [CommonModule], 
  templateUrl: './grupo-list.component.html',
  styleUrls: ['./grupo-list.component.css']
})
export class GrupoListComponent implements OnInit {

  grupos: Grupo[] = []; 
  
  constructor() { }

  ngOnInit(): void {
    this.cargarGrupos();
  }
  
  cargarGrupos(): void {
    this.grupos = [
      { id: 1, nombre: 'Grupo A', grado: '1° Primaria', profesor: 'Sra. Martínez' },

    ];
  }
  
  eliminarGrupo(id: number): void {
    this.grupos = this.grupos.filter(g => g.id !== id);
  }
}