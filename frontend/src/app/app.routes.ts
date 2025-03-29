import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { InicioSesionComponent } from './pages/inicioSesion/inicioSesion.component';
import { ConfirmarRegistroComponent } from './pages/confirmar-registro/confirmar-registro.component';

export const routes: Routes = [
    { path:"registro", component: RegistroComponent  },
    { path: "inicioSesion", component: InicioSesionComponent},
    {path: "confirmar-registro", component: ConfirmarRegistroComponent},
    {path: "**", component: InicioSesionComponent},
];
