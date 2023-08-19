import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';


import { AppComponent } from './app.component';

import { ProductoComponent } from './producto/producto.component';
import { FormProductoComponent } from './producto/form-producto.component';
import { VentaComponent } from './venta/venta.component';
import { FormVentaComponent } from './venta/form.venta.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {SidebarModule}from 'primeng/sidebar';
import {InputTextModule}from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TreeSelectModule } from 'primeng/treeselect';

import { VentaHistorialComponent } from './venta/venta.historial.component';

import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr';

const routes:Routes=[
  {path:'',redirectTo:'/producto',pathMatch:'full'},
  {path:'producto',component:ProductoComponent},
  {path:'producto/formulario',component:FormProductoComponent},
  {path:'producto/formulario/:id',component:FormProductoComponent},
  {path:'ventas',component:VentaComponent}

  
]

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    FormProductoComponent,
    VentaComponent,
    FormVentaComponent,
    VentaHistorialComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    SidebarModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
    TreeSelectModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
   
  ],
  providers: [provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
