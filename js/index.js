/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var identificador=new Object();
 var cargarDB={
   db:"",
   initialize:function(){
     this.db=window.openDatabase("localDB","1.0","Base de datos CRM",2*1024*1024);
     this.accederDB();
     //alert("hola");
   },
   accederDB:function(){
     console.log("cargar la base de datos");
     //elimino callback de success
     this.db.transaction(this.mostrarDB,this.mostrarDBError);
   },
   mostrarDB:function(tx){
     var sql="SELECT * FROM empleados ORDER BY nombre ASC;";
     console.log("lanzamos la consola");
     tx.executeSql(
       sql,
       [],
       //resultado OK
       function(tx,result){
         console.log("consulta DB exitosa");
         //existe más de una fila
         if(result.rows.length>0){
           console.log("2 consulta DB exitosa. "+result.rows.length);
           for(var i=0;i<result.rows.length;i++){
             var fila=result.rows.item(i);
             console.log("row "+i+" nombre: "+fila.nombre);
             if(fila.img==null){
               alert("sin imagen");
             }
             $("#principal ul").append("<li empleado-dni='"+fila.dni+"'><a href='#item'><img class='imgdatoslista' src="+fila.img+" /><div><h2>"+fila.nombre+"</h2><p>"+fila.cargo+"</p></div></a></li>").listview("refresh");
           }
         console.log("3 consulta DB exitosa");
       }
       $("#principal li a").click(cargarDB.consultaempleado);
     },
       //error consulta
       function(tx,err){
         console.log("se ha producido un error(1) en la consulta de la base de datos: "+err.code);
         console.log("mensaje de error "+err.message);
       }
     );
   },
   mostrarDBError:function(err){
     console.log("se ha producido un error(2) en la consulta de la base de datos: "+err.code);
     console.log("mensaje de error "+err.message);
   },
   consultaempleado:function(){
     console.log("funcion consultaempleado");
    identificador.dni=  $(this).parent().attr("empleado-dni");
    console.log("empleado id. "+identificador.dni);
    cargarDB.consultaId();
   },
   consultaId:function(){
     console.log("funcion consultadni:"+identificador.dni);
     this.db.transaction(this.consultaok,this.consultaerr);
   },
   consultaok:function(tx){
     $("#fichaimg").attr("src", "./img/use128.png");
     $("#fichanombre").text("cargando datos");
     $("#fichadni").text("");
     $("#fichacargo").text("");
     $("#fichaedad").text("");
     $("#fichadireccion").text("");
     $("#fichalocalidad").text("");
     $("#fichatel1").text("");
     $("#fichatel2").text("");
     $("#fichacorreo").text("");
     console.log("ficha. "+identificador.dni);
     console.log("funcion consulta ok");
     var sqlpersona="SELECT * FROM empleados WHERE dni='"+identificador.dni+"';";
     console.log(""+sqlpersona);
     tx.executeSql(sqlpersona,[],
       //consulta ok
       function(tx,result){
         if(result.rows.length>0){
           console.log(result.rows.length+"");
           var empleadofila=result.rows.item(0);
           console.log("ficha. "+empleadofila.nombre);
           $("#fichaimg").attr("src",empleadofila.img);
           $("#fichadni").text(empleadofila.dni);
           $("#fichanombre").text(empleadofila.nombre+" "+empleadofila.apellidos);
           $("#fichacargo").text(empleadofila.cargo);
           $("#fichaedad").text(empleadofila.edad+" años");
           $("#fichadireccion").text(empleadofila.direccion);
           $("#fichalocalidad").text(empleadofila.localidad);
           $("#fichatel1").text(empleadofila.telefono1);
           //comprueba que exista un segundo telefono
           if(empleadofila.tel2==null){
             $("#fichatel2").text("");
           }else{
             $("#fichatel2").text(empleadofila.telefono2);
           }
           $("#fichacorreo").text(empleadofila.correoelectronico);
           console.log("ficha modificada. "+empleadofila.nombre);
         }
       },
       //consulta error
       function(){
        alert("error al cargar ficha empleado");
       }
     );
   },
   consultaerr:function(){
      alert("error al cargar ficha empleado");
   }
/*
segun paco definirlo fuera no funciona

   resultadoDB:function(tx,result){
     console.log("se ha producido un error en la creacion de la base de datos: "+err.code);
     console.log("mensaje de error "+err.message);
   }
   */
 };
var confirmDB={
  db:"",
  existe_db:"",
  initialize:function(){
    //variable bd
    existe_db=window.localStorage.getItem("existe_db");
    //openDatabase(nombre de la base de datos,version,descriptivo,tamaño estimado)
    this.db=window.openDatabase("localDB","1.0","Base de datos CRM",2*1024*1024);

    if(existe_db!=1){
      console.log("no existe la base de datos");
      this.createDB();
      /*navigator.notification.confirm(
        'La base de datos no esta creada',
        this.onConfirm,
        'Base de Datos',
        ['Crear','Salir']
      );*/
      alert("No se ha detectado ninguna base de datos, por lo que se ha prodecido a crear una");
      cargarDB.initialize();
    }else {
      cargarDB.initialize();
    }

  },/*
  onConfirm:function(buttonIndex){
    if(buttonIndex==1){
      //window.localStorage.setItem("bd_creada",1);
      console.log("creamos la base de datos");
      this.createDB();
    }
  },*/
  createDB:function(){
    this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
  },
  createLocalDB:function(tx){
    console.log("tarariro");
    tx.executeSql("DROP TABLE IF EXISTS empleados");
    var sql="CREATE TABLE IF NOT EXISTS empleados (dni VARCHAR(10) PRIMARY KEY, nombre VARCHAR(100), apellidos VARCHAR(256),edad VARCHAR(10), cargo VARCHAR(128), direccion VARCHAR(500), localidad VARCHAR(128), telefono1 VARCHAR(50), telefono2 VARCHAR(50), correoelectronico VARCHAR(200),img VARCHAR(300));";
    tx.executeSql(sql);

  },
  createDBSucc:function(){
    window.localStorage.setItem("existe_db",1);
    console.log("se ha creado la base de datos");

  },
  createDBError:function(err){
    console.log("se ha producido un error en la creacion de la base de datos: "+err.code);
  }
};
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log(navigator.camera);
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      //  var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');//marca error en esta linea
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //console.log('Received Event: ' + id);
        //script mios
        confirmDB.initialize();

        /*
        navigator.notification.alert(
          'Dispositivo arrancado',  // message
          this.alertDismissed,         // callback
          'arranque',            // title
          'Done'                // buttonName
        );
        */
    },
    alertDismissed:function() {
      // do something
    }
};

app.initialize();
