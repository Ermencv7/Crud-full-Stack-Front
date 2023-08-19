import { Component, OnInit } from '@angular/core';
import { Venta } from './Venta';
import { VentaService } from './venta.service';


@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  ventas: Venta[];
  visible: boolean = false;
  nombre: string;
  historialVentas:Venta[];
  constructor(private service: VentaService) {

  }
  ngOnInit(): void {
    this.service.getVentas().subscribe(ventas => {
      this.ventas = ventas;
    })
  }

  estadoVisible(nombre: string) {
    this.nombre = nombre
    this.service.getHistorial(nombre).subscribe(ventas=>{
      this.historialVentas=ventas;
      console.log(this.historialVentas.length)
    })
    this.visible = this.visible == false ? true : false;
  }

}
