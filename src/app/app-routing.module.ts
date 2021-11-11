import { Input, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ColonyComponent } from './components/colony/colony.component';
import { ColonyFormComponent } from './components/colony-form/colony-form.component';
import { FeedingnComponent } from './components/feeding/feeding.component';



const routes: Routes = [
  { path: 'colonias', component: ColonyComponent },
  { path: 'colonia', component: ColonyFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'alimentar', component: FeedingnComponent },
  { path: 'alimentar/:id', component: FeedingnComponent },
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
