import fs from "fs";
const sudor = require('sudo-prompt');
const copy = require('recursive-copy');
const {dialog} = require('electron').remote;
const remote = require('electron').remote;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const sudo = require('sudo-js');

 
export const services = {
    fs_path,
    construtor,
    getPassword,
    setPassword,
    closewindow,
    getConfig,
    getFiles,
    chooseFile,
    restorFile,
    verifiquede
};
function fs_path(){
  return fs
}


function construtor(){

      if(db.has('config').value()==false){
         db.defaults({ config:[],files:[]}).write()
         db.get('config').push({ id: 1, start:false}).write()
         db.get('config').push({ id: 2,directory: "/usr/share/sounds/deepin/stereo",root: null}).write()

         let init = JSON.parse(db.get('config.[0].start').value());
         if(init){
           console.log('Conexion exitosa')
         }
         else{  
           console.log('incializando')
           db.get('config').find({ id:1 }).assign({ start: true }).write()
         }

      }
      /*
      */
      //if () {}
      //db.get('config').push({ id: 1, start:false }).write()
}
function verifiquede(){
  return db.has('config').value();
}
function getConfig(){
return db.get('config').value()
}

function getFiles(){

	let lista;
    if(db.get('files').size().value()>0){
    	lista = db.get('files').value() 
    }else{
    	
        fs.readdir("/usr/share/sounds/deepin/stereo", function(err, items) {
	       	
	       
	        for (var i=0; i<items.length; i++) {
                 var j = i+1
            var data = {
	       		   id:j,
	       		   file:items[i],
	       		   change:false,
	       		   oldfile:null
	       	     };
	              db.get('files').push(data).write()
	           
	        }
	    });

    }



return lista
}

function chooseFile(oldfile){
  
        let password = getPassword()
          var pws = password

  dialog.showOpenDialog({
  	            title: `SoundLoad`,
                properties: ['openFile'], // openDirectory, multiSelection, openFile
                filters:
                    [
                        
                        {
                            "name": "*",
                            "extensions": ["wav"]
                        },
                    ],
  },function (newfile) {
      // do cool stuff here
      if(newfile && newfile.length > 0){
        //console.log(oldfile.change)
         if (oldfile.change==true) {
            
           sudo.setPassword(pws);
            let rutainput =  newfile[0] //ruta de donde se extra el nuevo archivo
            let namerutainput = db.get('config.[1].directory').value()+'/'+oldfile.file;//ruta donde se enviara el archivo renombrado
            
            
            var command = ['mv', rutainput, namerutainput];
            //console.log(command)
            sudo.exec(command, function(err, pid, result) {//Renombrando el antiguo archivo
              if(err){
               //console.log(err)
              }else{
               //console.log(result)
               Notify('Personalizado','Cambiado correctamente')
          
              } 
            });
            

           console.log('Remplazando el mismo archivo')
         }else{


        let rutainput =  newfile[0] //ruta de donde se extra el nuevo archivo
     	  let namerutainput = db.get('config.[1].directory').value()+'/'+oldfile.file;//ruta donde se enviara el archivo renombrado

       /* let newnamefile = newfile[0].split("/")
        newnamefile = newnamefile[newnamefile.length-1]*///nombre  el archvo nuevo


        let oldname = oldfile.file.split(".");//viejo archivo a remplazar
        let newoldname = oldname[0]+".old.wav";//se genera un nuevo nombre al archivo para no perderlo
      	console.log(newoldname)
      	let ruta = db.get('config.[1].directory').value()+'/'+oldfile.file; //ruta del archivp para renombralo
      	let oldnameruta = db.get('config.[1].directory').value()+'/'+newoldname;//ruta del archivo con otro nombre
        var mensaje;

       

        sudo.setPassword(pws);

       
        var command = ['mv', ruta, oldnameruta];
        console.log(command)
        sudo.exec(command, function(err, pid, result) {//Renombrando el antiguo archivo
          if(err){
           //console.log(err)
          }else{
           console.log('Nombre Cambiado')
           //Notify('Personalizado','Cambiado correctamente')
           db.get('files').find({ id: oldfile.id }).assign({ change: true,oldname:newoldname}).write()
      
          } 
        });
        
        
         var command = ['cp', rutainput, namerutainput];
         console.log(command)

          sudo.exec(command, function(err, pid, result) {//Renombrando el antiguo archivo
          if(err){
           //console.log(err)
          }else{
           console.log('Copiando Archivo')
           Notify('Personalizado','Cambiado correctamente')
           db.get('files').find({ id: oldfile.id }).assign({ change: true,oldname:newoldname}).write()
      
          } 
        });
        }
      


		    	//Notify('Cambiado',"Sonido de deepin personalizado")
	
        
      }else{
      	//console.log("no selecionado")


          //Notify('Cambiado',"Sonido de deepin personalizado")
	        
        	
      }
  });

 




}

function restorFile(item){
         //Elimnar el audio primero luego resturar el viejo
        //let oldname = item.oldname.split(".");
        //let restorname = oldname[0]+"."+oldname[2];
         let password = getPassword()
        var pws = password[1].root

      	if (item.change) {

      	let ruta = db.get('config.[1].directory').value()+'/'+item.oldname;
      	let restornameruta = db.get('config.[1].directory').value()+'/'+item.file;
        
        sudo.setPassword(pws);

        var command = ['mv', ruta, restornameruta];
      
          sudo.exec(command, function(err, pid, result) {//Renombrando el antiguo archivo
          if(err){
           console.log(err)
          }else{
            db.get('files').find({ id: item.id }).assign({ change: false,oldname:null}).write()
            //console.log('nombre resturado')
            Notify('Restaurado',"Sonido de deepin restaurado")
   
          } 
        });
       }else{
         
           Notify('De Fabrica',"Sonido de deepin sin personalizar")
   
       }





}


function getPassword(){

      let config =  db.get('config').find({ id: 2 }).value()
      return config;
}

function getStart(){

      let config = db.get('config[1].start').value()
      return config;
}

function setPassword(password){ 

      //remote.getCurrentWindow().toggleDevTools();
      Notify('password',"cambiado")
      db.get('config').find({ id: 2 }).assign({ root:password }).write()
}

function Notify(title,mensaje) {
	var path = require('path');
  var options = [
  {
    title: title,
    body: mensaje,
    icon: path.join(__dirname, 'v.png')
  }
]

  
    new Notification(options[0].title, options[0]);
  
}
function closewindow(){

  var window = remote.getCurrentWindow();
       window.close();
}