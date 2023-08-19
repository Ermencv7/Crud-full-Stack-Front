import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Categoria, Producto } from './producto';
import { ProductoService } from './producto.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent  implements OnInit {

  @Output()
  outputEmiter=new EventEmitter<boolean>();

  @Input()
  public producto:Producto=new Producto();
  
  @Input()
  public categoria:Categoria=new Categoria();

  public categorias:Categoria[];

  public errors:String[]
  
  constructor(private service:ProductoService,private router:Router){

  }
  ngOnInit(): void {
    this.getCategorias();
  }

  guardar():void{
    
    this.producto.setCategoria(this.categoria)

    this.service.guardarProducto(this.producto).subscribe(
      response=>{
        this.visible()
        this.router.navigate[("/producto")]
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
      this.visible()
      this.router.navigate[("/producto")]
    })
  }

  visible(){
    this.outputEmiter.emit(false);
  }

 
}
