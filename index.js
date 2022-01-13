let express = require("express");
let path = require("path");
let fs = require("fs");
let {Router} = express;
let app = express();
let PORT = 8081;

// Routers
let router_productos = new Router();
let formulario = new Router();

app.set("views",path.join(__dirname,"views","ejs","partials"));
app.set("view engine", "ejs");

//Base de datos
const db_obj= require("./config/db");
const db = db_obj.client;

// Clases
//let Contenedor = require("./contenedor");
//let classProductos = new Contenedor('./productos.txt');

let Contenedor = require("./contenedorDB");
let classProductos = new Contenedor('items',db);

// Rutas productos
router_productos.get("/:id?",(req,res,next)=>{
    let id = (req.params.id);
    if(id == undefined){
      classProductos.getAll().then(data=>{
        res.render("historial1",{data});
      }).catch(error=>{
        res.send(error);
      });
    }
    else{
          let id = (req.params.id);
          classProductos.getById(id).then(datos=>{
            let data = []
            data.push(datos)
            res.render("historial1",{data});
          }).catch(error=>{
            res.send(error);
          });
        }
      });


  

app.use(express.urlencoded({extended: true}));
app.use(express.json());


//post
formulario.get("/",(req,res,next)=>{
  res.render("formulario")
});

formulario.post("/",(req,res,next)=>{
  console.log(req.body);
  classProductos.save(req.body.producto).then(data=>{
    console.log(data);
    res.json(data);
  }).catch(error=>{
    res.send(error);
  });
});

// Sección de put
router_productos.put("/:id",(req,res,next)=>{
  console.log(req.body);
});

// Sección de delete
router_productos.delete("/:id",(req,res,next)=>{
  let id = (req.params.id);
  classProductos.deleteById(id).then(datos=>{
    res.render("index",{data});
  }).catch(error=>{
    res.send(error);
  });
});

app.get("/", (req,res,next) => {
  res.render("home");
});

////////////////////////////////////////////////////////////////////////////////

//                                  CARRITO                                   //

////////////////////////////////////////////////////////////////////////////////

app.use("/api/productos",router_productos);
app.use("/admin/formulario",formulario);
//app.use("/api",express.static(path.join(__dirname,"public","html")));

app.listen(PORT,()=>{
    console.log(`Conexión hecha en http://localhost:${PORT}`);
})