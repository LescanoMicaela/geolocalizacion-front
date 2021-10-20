import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColoniaComponent } from './components/colonia/colonia.component';

const routes: Routes = [
  {
    path: 'colonias',
    component: ColoniaComponent,
    data: { title: 'Colonias Felinas Madrid' }
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
