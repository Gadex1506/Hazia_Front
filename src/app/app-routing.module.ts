import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './components/animal/animal.component';
import { LiderComponent } from './components/liderSemillero/lider.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path: '',component: LoginComponent},
  {path: 'animal',component: AnimalComponent},
  {path: 'lider',component: LiderComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'logout',component: AppComponent},
  {path: 'menu',component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
