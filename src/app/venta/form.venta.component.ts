import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from '../producto/producto';
import { Venta } from './Venta';
import { VentaService } from './venta.service';
import { ProductoService } from '../producto/producto.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-venta',
  templateUrl: './form.venta.component.html',
  styleUrls: ['./form.venta.component.css']
})
export class FormVentaComponent implements OnInit{

  @Input()
  producto:Producto;

  categoria:string;

  productoE:Producto=new Producto();
  @Output()
  outputVisibleDialg=new EventEmitter<boolean>();
  @Output()
  outputProductos=new EventEmitter<Producto[]>();

 
  
  constructor(private service:VentaService,
    private servicePorducto:ProductoService
    ,private router:Router,private toastrService:ToastrService
    ){

  }
  ngOnInit(): void {
    
    this.producto=this.productoE;
    console.log("hola edtiven")
    
  }
  
  cantidad:number=0;
  valorTotal:number=0;

  operacion(cantidad:number){
    this.cantidad=cantidad
    console.log('cate '+this.producto.categoria.categoriaNombre)
    this.valorTotal=this.producto.precio*cantidad;
  }

  confirmar(){

    this.toastrService.success('Se vendieron '+this.cantidad+' '+this.producto.nombre,'Venta')

    let venta=new Venta();
    venta.producto=this.producto.nombre
    venta.cantidad=this.cantidad;
    venta.valorUnitario=this.producto.precio;
    venta.valorTotal=this.valorTotal
    this.producto.unidad=this.producto.unidad-venta.cantidad;
    
    this.servicePorducto.actualizar(this.producto.id,this.producto).subscribe(producto=>{
      this.producto=producto
    })
    this.servicePorducto.getProductos().subscribe(products=>{this.outputProductos.emit(products)})
    
    this.service.registrar(venta).subscribe(venta=>{
        this.outputVisibleDialg.emit(false)
        this.router.navigate(['/producto'])
    })

   
    
  }

}


