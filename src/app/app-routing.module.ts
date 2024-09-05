import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/products-list/products-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { HelpeComponent } from './components/helpe/helpe.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},

  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'product-create', component:ProductCreateComponent},
  {path: 'products-list', component:ProductListComponent },
  {path:'users-list', component:UsersListComponent },
  {path:'help', component:HelpeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
