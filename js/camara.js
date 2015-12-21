var foto="";
$("#imgfile").click(
  function cargarCamara(){
    navigator.camera.getPicture(
      function(imageURI){
        foto=imageURI;
        var image=document.getElementById('imgfile');
        
        image.src=imageURI;
      },
      function(message){
        alert("error camara : "+message);
      },
      {
        quality:50,
        destinationType: Camera.DestinationType.File_URI
      }
    );
  }
);
