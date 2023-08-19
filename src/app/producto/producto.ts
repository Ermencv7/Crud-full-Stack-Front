export class Producto{
    id:number;
    nombre:string;
    precio:number;
    unidad:number;
    categoria:Categoria;
    
    
    

    public setCategoria(categoria:Categoria){
        this.categoria=categoria;
    }
    public getCategoria():Categoria{
        return this.categoria;
    }
  
    

    
}

export class Categoria{
   public id:number;
   public categoriaNombre:string;

    public getId():number{
        return this.id;
    }

    public getnombre():string{
        return this.categoriaNombre;
    }
}