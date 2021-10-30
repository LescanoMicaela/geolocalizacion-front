import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ColoniaComponent } from './components/colonia/colonia.component';
import { ColoniaFormComponent } from './components/colonia-form/colonia-form.component';
import { AlimentacionComponent } from './components/alimentacion/alimentacion.component';



const routes: Routes = [
  { path: 'colonias', component: ColoniaComponent },
  { path: 'colonia', component: ColoniaFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alimentar', component: AlimentacionComponent },
  { path: 'alimentar/:id', component: AlimentacionComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'colonias', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

    
  @Input()
  isLoggedIn: boolean = false;
 }
