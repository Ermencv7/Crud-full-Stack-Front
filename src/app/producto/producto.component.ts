import { Component, Input, OnInit, Output } from '@angular/core';
import { ProductoService } from './producto.service';
import { Categoria, Producto } from './producto';
//import {jsPDF} from 'jspdf'
import swal from 'sweetalert2';
import { style } from '@angular/animations';



interface Column {
  field: any;
  header: string;
  customExportHeader?: any;
}

interface ExportColumn {
  title: string;
  dataKey: any;
}



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  
 
 @Output()
  public productos:Producto[];
  public producto:Producto=new Producto();

  public visible=false;
  visibleDialog=false
 
  public formProducto:Producto=new Producto();
  public cols!: Column[];
  public categoria:Categoria=new Categoria();
  exportColumns!:ExportColumn[];
  public objetos:Object[];
  constructor(private service:ProductoService){}
  
  ngOnInit(){

    console.log("que pasa")
    
    this.formProducto;
    this.categoria;
    this.service.getProductos().subscribe(products=>this.productos=products);
    this.service.getJoin().subscribe(products=>this.objetos=products);
    
    this.cols = [
      { field: 'id', header: 'Code', customExportHeader: 'Product Code' },
      { field: '', header: 'Nombre' },
      { field: 'precio', header: 'precio' },
      { field: '', header: 'Unidad' },
      { field: 'categoria', header: 'Categoria' },

    ];
    
   this.exportColumns = this.cols.map((col) => ({ 
      title: col.header, dataKey: col.field 
      }));
    
    
    
  }

  getProducto(id:number){
    this.show() 
    this.service.buscarPorId(id).subscribe(producto=>{
      this.formProducto=producto
      this.categoria=this.formProducto.categoria
      
    }
    )
    
  }

  eliminar(producto:Producto){
  
    swal({
      title:'Seguro que deseas eliminar',
      text:`Eliminar Producto ${producto.nombre}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor:  '#d33',
      confirmButtonText: 'Si, eliminar'  
    },).then((result) => {
    
      if (result.value) {
        this.service.eliminar(producto.id).subscribe(
          response=>{
            this.productos=this.productos.filter(pro=>pro!==producto)
            swal(
              'Producto eliminado!',
              `producto ${producto.nombre} Eliminado con éxito.`,
              'success'
            )
          }
          
        )
      }
    })


   
  }

  show(){
    if(!this.visible){
      this.visible=true;
    }else{
      this.visible=false
    }
  }

  getvisible(visible:boolean){
    this.visible=visible;
    
    this.ngOnInit()

  }

  hide(){
    this.formProducto=new Producto()
    this.categoria=new Categoria()
    this.visible=false;
  }

  onclick(){
    let letra=document.querySelector("input").value;
    
    if(letra.length>0){
      this.service.buscarPorNombre(letra).subscribe(productos=>{
        this.productos=productos;
      })
    }else{
      this.service.getProductos().subscribe(
        productos=>this.productos=productos
      )
      console.log(letra)
    }
  }

  pdf() {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then((x) => {
            const doc = new jsPDF.default('p', 'px', 'a4').setFontSize(12);
            doc.text("Productos: "+this.productos.length,25,22);
            (doc as any).autoTable(this.exportColumns,this.objetos);
            doc.save('productos.pdf');
        });
    });
  }

  vender(producto:Producto){
    this.producto=producto;
    this.service.getProductos().subscribe(products=>this.productos=products);
    this.nuevo(producto.id);
    
    this.visibleDialog=this.visibleDialog==true?false:true;
   
  }
  nuevo(id: number) {
    this.service.buscarPorId(id).subscribe(producto=>{
      this.producto=producto
      
    })
   
  }
  

}
