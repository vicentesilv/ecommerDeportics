import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/auth/registro/registro.component';
import { InicioSesionComponent } from './pages/auth/inicioSesion/inicioSesion.component';
import { ConfirmarRegistroComponent } from './pages/auth/confirmar-registro/confirmar-registro.component';
import { RecuperarContrasenaComponent } from './pages/auth/recuperar-contrasena/recuperar-contrasena.component';
import { ResetearContrasenaComponent } from './pages/auth/resetear-contrasena/resetear-contrasena.component';
import { AdminPanelComponent } from './pages/admin/admin-panel/admin-panel.component';
import { InfoComponent } from './views/info/info.component';
import { ProductosComponent } from './views/productos/productos.component';
import { DetalleProductoComponent } from './views/detalle-producto/detalle-producto.component';
import { CarritoComponent } from './pages/client/carrito/carrito.component';

export const routes: Routes = [
    // auth routes
    { path:"registro", component: RegistroComponent },
    { path: "inicioSesion", component: InicioSesionComponent },
    { path: "confirmar-registro", component: ConfirmarRegistroComponent },
    { path: "recuperar-contrasena", component: RecuperarContrasenaComponent },
    { path: "resetear-contrasena", component: ResetearContrasenaComponent },
    

    //admin
    { path: "admin/panel", component: AdminPanelComponent },

    // client routes
    { path: "carrito", component:  CarritoComponent},


    // generals routes
    { path: "info", component: InfoComponent },
    { path: "productos" ,component: ProductosComponent},
    { path: "detallesProducto", component: DetalleProductoComponent },
    // { path: "productos", component:  },


    // default route
    { path: "**", component: InicioSesionComponent },
];
