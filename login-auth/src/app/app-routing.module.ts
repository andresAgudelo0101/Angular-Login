import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SecretComponent } from './components/secret/secret.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'secret',component:SecretComponent},
  {path:'**', pathMatch:'full', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
