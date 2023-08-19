import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Categoria, Producto } from './producto';
import { ProductoService } from './producto.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent  implements OnInit {
 
  public producto:Producto=new Producto();
  
  public categoria:Categoria=new Categoria();

  public categorias:Categoria[];

  public errors:String[]
  
  constructor(private service:ProductoService,private router:Router
    ,private activateRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.getCategorias();
    this.cargarProducto();
  }

  guardar():void{
    
    this.producto.setCategoria(this.categoria)

    this.service.guardarProducto(this.producto).subscribe(
      response=>{
        this.router.navigate(['/producto'])
        swal("Registro","Exito al registrar el producto","success")
      },
      err=>{
        this.errors=err.error.errors as string[];
        console.error('Codigó del error desde el backend: '+err.status)
        console.error(err.error.errors)
      }
    );
  }

  getCategorias(){
    this.service.getCategorias().subscribe(categorias=>{
      this.categorias=categorias;
    })
    
  }

  actualiza(id:number){
    this.service.actualizar(id,this.producto).subscribe( response=>{
      this.router.navigate(['/producto'])
      swal("Bien","Se actualizo Correcta mente","success")
    },
    err=>{
      this.errors=err.error.errors as string[];
      console.error('Codigó del error desde el backend: '+err.status)
      console.error(err.error.errors)
    })
  }

  cargarProducto(){
  this.activateRoute.params.subscribe(parms=>{
    let id =parms['id']
    if(id){
      this.service.buscarPorId(id).subscribe(producto=>{
        this.producto=producto
        this.categoria=this.producto.categoria
      })
    }
  })
  }

}
