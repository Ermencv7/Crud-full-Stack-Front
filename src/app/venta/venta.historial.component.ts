import { Component, Input, OnInit } from '@angular/core';
import { Venta } from './Venta';
import { VentaService } from './venta.service';
import { noop } from 'rxjs';



@Component({
  selector: 'app-venta-historial',
  templateUrl: './venta.historial.component.html',
  styleUrls: ['./venta.historial.component.css']
})
export class VentaHistorialComponent implements OnInit {
  @Input()
  historialVentas:Venta[]
  
  
  producto:string;

  constructor(private service:VentaService){
    
  }
  
  ngOnInit(): void {
    
     
  }

    
}
