var nombre="";
var apellidos="";
var edad="";
var cargo="";
var direccion="";
var localidad="";
var tel1="";
var tel2="";
var correoelectronico="";
var dni="";
var img="";
var db="";

function actualizar(tx){
  sql="UPDATE empleados set nombre='"+nombre+"',apellidos='"+apellidos+"',edad='"+edad+"',cargo='"+cargo+"',direccion='"+direccion+"',localidad='"+localidad+"',telefono1='"+tel1+"',telefono2='"+tel2+"',correoelectronico='"+correoelectronico+"',img='"+img+"' where dni='"+dni+"';"
  console.log(sql);
  tx.executeSql(sql);
  $("#principal ul").empty();
  cargarDB.accederDB();//esta linea no tira
  location.href="#principal";
  }

function insertarregistro(tx){
  sql="INSERT INTO empleados(dni,nombre,apellidos,edad,cargo,direccion,localidad,telefono1,telefono2,correoelectronico,img) VALUES('"+dni+"','"+nombre+"','"+apellidos+"','"+edad+"','"+cargo+"','"+direccion+"','"+localidad+"','"+tel1+"','"+tel2+"','"+correoelectronico+"','"+img+"');";
  tx.executeSql(sql);
  console.log("datos insertados");
  $("#principal ul").append("<li empleado-dni='"+dni+"'><a href='#item'><img class='imgdatoslista' src='"+img+"' /><div><h2>"+nombre+"</h2><p>"+cargo+"</p></div></a></li>").listview("refresh");
  $("#principal li a").click(cargarDB.consultaempleado);
  location.href="#principal";
}
function erroresregistro(err){
  console.log("errores detectados al insertar datos del formulario");
  console.log("MENSAGE DE ERROR: "+err.message);
}
$("#nuevaficha").click(
  function(event){
    console.log("se inicia la captura de datos");
    dni=$("#inputdni").val();
    console.log(dni);
    nombre=$("#inputname").val();
    console.log(nombre);
    apellidos=$("#inputsurname").val();
    console.log(apellidos);
    edad=$("#inputage").val();
    console.log(edad);
    cargo=$("#inputjob").val();
    console.log(cargo);
    direccion=$("#inputaddress").val();
    console.log(direccion);
    localidad=$("#inputlocality").val();
    console.log(localidad);
    tel1=$("#inputphone1").val();
    console.log(tel1);
    tel2=$("#inputphone2").val();
    console.log(tel2);
    correoelectronico=$("#inputmail").val();
    console.log(correoelectronico);
    img=foto;
    console.log(correoelectronico);

    //conexion con la base de datos
    console.log("abriendo base de datos para insercion");
    db=window.openDatabase("localDB","1.0","Base de datos CRM",2*1024*1024);
      if($("#inputtipo").val()=="nuevo"){
        db.transaction(insertarregistro,erroresregistro);
      }else {
        db.transaction(actualizar,erroresregistro);
      }

  }
);

$("#eliminarRegistro").click(

  function(event){
    console.log("eliminando registro");
    dni=$("#fichadni").text();
    console.log("eliminando "+dni);
    db=window.openDatabase("localDB","1.0","Base de datos CRM",2*1024*1024);
    db.transaction(
      deleteregistro,
      erroresdeleteregistro
    );
  }
);
function deleteregistro(tx){
  console.log(dni);
  tx.executeSql("delete from empleados where dni='"+dni+"';");
  alert("El empleado ha sido eliminado");
  $("#principal ul").empty();
  cargarDB.accederDB();//esta linea no tira
}
function erroresdeleteregistro(err){
  console.log("errores detectados al eliminar el registro");
  console.log("MENSAGE DE ERROR: "+err.message);
}
