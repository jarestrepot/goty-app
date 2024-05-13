import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, NavbarComponent ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
