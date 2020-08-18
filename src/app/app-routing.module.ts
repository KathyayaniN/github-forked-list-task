import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForksComponent } from './pages/forks/forks.component';

const routes: Routes = [
  {path: '', redirectTo: 'forks', pathMatch: 'full'},
  {path: 'forks', component: ForksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
