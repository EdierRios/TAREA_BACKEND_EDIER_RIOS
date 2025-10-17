// C:\proyectos\school-management\frontend\src\app\app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Necesario para usar <router-outlet>

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importa RouterOutlet para enrutamiento
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school-management';
}