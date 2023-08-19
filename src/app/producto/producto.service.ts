import { Injectable } from '@angular/core';
import { Observable,catchError,of, throwError } from 'rxjs';
import { Producto } from './producto';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Categoria } from './producto';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 
  private httpHeaders=new HttpHeaders({'Content-Type': 'application/json'})
  constructor( private http:HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8080/api/productos");
  }

  guardarProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>("http://localhost:8080/api/producto",producto,{headers:this.httpHeaders}).pipe(
      catchError(e=>{

        if(e.status=400){
            return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error,'error')
        return throwError(e)
      }))    
  }

  buscarPorId(id:number):Observable<Producto>{
    return this.http.get<Producto>("http://localhost:8080/api/producto/"+id,{headers:this.httpHeaders});
  }

  actualizar(id:number,producto:Producto):Observable<Producto>{
    return this.http.put<Producto>("http://localhost:8080/api/producto/"+id,producto,{headers:this.httpHeaders})

  }

  eliminar(id:number):Observable<Producto>{
    console.log("id "+id)
    return this.http.delete<Producto>("http://localhost:8080/api/producto/"+id,{headers:this.httpHeaders})
  }

  buscarPorNombre(nombre:string):Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8080/api/productos/"+nombre,{headers:this.httpHeaders})
  }

  getJoin():Observable<Object[]>{
    return this.http.get<Object[]>("http://localhost:8080/api/productos/join")
  }

  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>("http://localhost:8080/api/categorias")
  }

 


  
}
