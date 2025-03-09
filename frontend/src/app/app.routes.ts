import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicioSesion/inicioSesion.component';

export const routes: Routes = [
    { path:"registro", component: RegistroComponent  },
    { path: "inicioSesion", component: InicioSesionComponent}
];
