import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/Producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public listaProductos:any;
  private min:number = 0;
  private max:number = 12;

  public currentPage:number=1;

  public editProduct!:Producto;

  constructor(private _prodServices:ProductosService) { }

  public nextPage(){
    this.currentPage++;
    this.min+=10;
    this.loadProducts();
  }

  public prevPage(){
    if(this.min>=10){
      this.currentPage--;
      this.min-=10;
      this.loadProducts();
    }

  }

  public async loadProducts(){
    await this._prodServices.obtainProducts(this.min,this.max).subscribe(response=>{
      this.listaProductos = response;
    });



  }

  public editModal(i:number){
    const modal = document.querySelector('.editModal');
    modal?.setAttribute("style","display:block");
    this.editProduct = this.listaProductos[i];
  }

  public detailsModal(i:number){
    const modal = document.querySelector('.detailsModal');
    modal?.setAttribute("style","display:block");
    this.editProduct = this.listaProductos[i];
  }

  public closeModal(modalName:string){
    const modal = document.querySelector(`.${modalName}`);
    modal?.setAttribute("style","display:none");
  }

  public actualizar(){
    this._prodServices.updateProduct(this.editProduct).subscribe(response=>{
      alert("Producto actualizado");
      this.closeModal("editModal");
    });
  }

  public borrar(i:number){
    this.editProduct = this.listaProductos[i];
    if(confirm("Desea Borrar este producto? Esta accion no se puede deshacer")){
      this._prodServices.deleteProduct(this.editProduct).subscribe((response:any)=>{
        if(response.rta){
          alert("Producto eliminado");
        }else{
          alert("Error al borrar producto")
        }
        this.loadProducts();
      });


    }
  }

  public addCart(product:Producto){
    let str:any = localStorage.getItem("cart");
    let currentItems:any = [];
    let exists:boolean = false;


    if(str){
      currentItems = JSON.parse(str);
      exists = currentItems.some((item:any) => item.id==product.id);
      console.log(exists);
    }


    if(!exists){
      currentItems.push(product);
      let item:any = JSON.stringify(currentItems);
      localStorage.setItem("cart",item);
      alert("Item agregado con exito al carrito");
    }else{
      alert("Este item ya existe en tu carrito");
    }

  }


  ngOnInit(): void {
    this.loadProducts();

    this.editProduct = this._prodServices.initProducto();
  }

}
