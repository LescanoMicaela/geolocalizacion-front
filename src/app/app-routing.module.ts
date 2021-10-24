import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoniaComponent } from './components/colonia/colonia.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'colonias',
    component: ColoniaComponent,
    data: { title: 'Colonias Felinas Madrid' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: '',
    redirectTo: '/colonias',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
