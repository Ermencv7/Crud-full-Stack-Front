import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Venta } from './Venta';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private httpHeader=new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient) { }

  registrar(venta:Venta):Observable<Object>{
    
    return this.http.post<Venta>("http://localhost:8080/api/venta",venta,{headers:this.httpHeader})
    .pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error,'error')
        return throwError(e)
      }))    
  }
  getVentas():Observable<Venta[]>{
    return this.http.get<Venta[]>("http://localhost:8080/api/ventas")
  }

  getHistorial(nombre:string):Observable<Venta[]>{
    return this.http.get<Venta[]>("http://localhost:8080/api/historial/"+nombre)
  }
}
