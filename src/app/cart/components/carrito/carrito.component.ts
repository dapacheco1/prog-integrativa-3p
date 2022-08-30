import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor() { }

  public listaProds!:Producto[];
  public tax:number = 12;
  private total:number = 0;

  public loadCart(){
    let prods = localStorage.getItem("cart");
    if(prods){
      this.listaProds = JSON.parse(prods);
    }else{
      this.listaProds = [];
    }
  }

  public calcularSubTotal(){
    this.total = 0;
    this.total = this.listaProds.map((item:Producto)=>item.price).reduce((prev:number,curr:number)=>prev+curr,0);
    return this.total;
  }

  public calcularTotal(){

    return Math.trunc(this.total*(this.tax/100)) + this.total;
  }

  public realizarPago(){
    localStorage.clear();
    alert("Pago Realizado de forma exitosa");
    this.loadCart();
  }

  public quitarItem(i:number){
    this.listaProds.splice(i,1)
    localStorage.setItem("cart",JSON.stringify(this.listaProds));
    this.loadCart();
  }

  ngOnInit(): void {
    this.loadCart();
  }

}
