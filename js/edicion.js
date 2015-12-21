var nombre="";
var apellidos="";
var edad="";
var cargo="";
var direccion="";
var localidad="";
var tel1="";
var tel2="";
var correoelectronico="";
var db="";
var dni="";
var img="";
function insertar(tx){
  sql="SELECT * FROM empleados where dni='"+dni+"';";
  console.log(sql);
  tx.executeSql(sql,[],
  //consulta ok
  function(tx,result){
    if(result.rows.length>0){
      var ficha=result.rows.item(0);
      nombre=ficha.nombre;
      console.log(nombre);
      apellidos=ficha.apellidos;
      console.log(apellidos);
      edad=ficha.edad;
      console.log(edad);
      cargo=ficha.cargo;
      console.log(cargo);
      direccion=ficha.direccion;
      console.log(direccion);
      localidad=ficha.localidad;
      console.log(localidad);
      tel1=ficha.telefono1;
      console.log(tel1);
      if(ficha.telefono2!=null){
        tel2=ficha.telefono2;
      }else {
        tel2="";
      }
      console.log(tel2);
      correoelectronico=ficha.correoelectronico;
      console.log(correoelectronico);
      if(ficha.img!=null){
        img=ficha.img;//obtener img del contacto de la base de datos
      }else{
        img="./img/user-64.png";
      }


      $("#fichaimg").attr("src",img);
      $("#inputdni").val(dni);
      $("#inputname").val(nombre);
      $("#inputsurname").val(apellidos);
      $("#inputage").val(edad);
      $("#inputjob").val(cargo);
      $("#inputaddress").val(direccion);
      $("#inputlocality").val(localidad);
      $("#inputphone1").val(tel1);
      $("#inputphone2").val(tel2);
      $("#inputmail").val(correoelectronico);
    }

  },
  function(){
    alert("error al cargar datos");
  }
  );

}
function errores(err){
  console.log("errores detectados al obtener datos de la base de datos para modificarlos");
  console.log("MENSAGE DE ERROR: "+err.message);
}

$("#edicionenlace").click(
  function(event){
    //location.href="#editnew";
    console.log("capturando datos para edición de la base de datos");
    dni=$("#fichadni").text();
    console.log("dni: "+dni);
    $("#inputdni").val("dni");
    $("#inputtipo").val("editar");
    db=window.openDatabase("localDB","1.0","Base de datos CRM",2*1024*1024);
    db.transaction(
      insertar,
      errores
    );
    console.log("captura de datos finalizada");

  }
)
