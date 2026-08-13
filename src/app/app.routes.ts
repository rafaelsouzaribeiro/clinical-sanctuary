import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Consultas } from './consultas/consultas';
import { Pacientes } from './pacientes/pacientes';
import { Medicos } from './medicos/medicos';
import { Login } from './login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'consultas', component: Consultas },
    { path: 'pacientes', component: Pacientes },
    { path: 'medicos', component: Medicos },
    { path: 'login', component: Login },
];