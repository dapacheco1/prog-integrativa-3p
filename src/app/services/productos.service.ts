import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/Producto';
import { Category } from '../interfaces/Category';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private conn:string;
  private producto!:Producto;
  private category!:Category;

  constructor( private _htttp:HttpClient) {
    this.conn = environment.api;
  }

  public initCategory(){
    this.category = {
      id:0,
      name:"",
      image:"",
    }

  }

  public initProducto(){
    this.initCategory();
    return this.producto={
      id:0,
      title:"",
      price:0,
      description:"",
      category:this.category,
      images:null,
      categoryId:0
    };
  }

  public obtainProducts(offset:number,limit:number){
    const route = `${this.conn}?offset=${offset}&limit=${limit}`;
    return this._htttp.get<Producto>(route);
  }

  public updateProduct(product:Producto){
    const route = `${this.conn}/${product.id}`;
    return this._htttp.put<Producto>(route,product);
  }

  public deleteProduct(product:Producto){
    const route = `${this.conn}/${product.id}`;
    return this._htttp.delete(route);
  }

}
