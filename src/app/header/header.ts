import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen:boolean = false;
  
  menuItems = [
    { label: 'Home', link: '/home' },
    { label: 'Consultas', link: '/consultas' },
    { label: 'Pacientes', link: '/pacientes' },
    { label: 'Médicos', link: '/medicos' },
    { label: 'Login', link: '/login' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
