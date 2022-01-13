//@Autor: Antonio Torres
//@Fecha: 10/11/2021

let fs = require("fs");
let path = require("path");

class Contenedor{
  constructor(archivo){
    this.archivo = archivo;
  }
  // Método que guarda nuevo producto
  async save(product){
    try{
      let arregloGlobal = await this.getAll();
      let currentId =  arregloGlobal.length + 1;
      let p = {
        "id": currentId,
        "timestamp": Date.now(),
        ... product
      };
      //product.id = currentId;
      arregloGlobal.push(p);
      let producto = JSON.stringify(arregloGlobal,null,2);
      await fs.promises.writeFile(`${this.archivo}`,`${producto}`);
      this.contadorId+=1;
      return currentId;
    }
    catch(error){
     // console.log(error)
    }
    
  }


  // Función que permite guardar nuevos objetos

  async getAll() {
    try {
        let all = await fs.promises.readFile(this.archivo, `utf-8`);
        let arr = JSON.parse(all);
        this.arreglo = arr;
        return (arr);
    }
    catch (error) {
        console.log('No se pudo leer el archivo',error);
    }
  }

  async getById(id) {
    try {
        let all = await fs.promises.readFile(this.archivo, `utf-8`);
        let arr = JSON.parse(all);
        this.arreglo = arr;
        for(let i = 0; i < this.arreglo.length; i++){
          if(this.arreglo[i].id == id){
            return this.arreglo[i];
          }
        }
        return null
    }
    catch (error) {
        console.log('No se pudo leer el archivo',error);
    }
  }

  async deleteById(id){
    try{
        let arr = await this.getAll();
        for(const i in arr){
            if(arr[i].id == id){
                arr.splice(i, 1);
            }
            console.log(arr);
        }
        let content = JSON.stringify(arr, null,2);
        await fs.promises.writeFile(this.archivo, content);
        return arr;
    }catch(error){
        console.log(error);
    }
}
}

module.exports = Contenedor