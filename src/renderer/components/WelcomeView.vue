<template>
  <v-container fluid class="pt-5">

    <v-snackbar 
      dark
      :timeout="timenotification"
      :top="true"
      :right="true"
      :color="notificationcolor"
      v-model="snackbar">
      {{ notificationtext  }}
    <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  
  <v-layout row wrap justify-center id="wrapper">

    <v-flex xs12 sm8 md8  class="mt-4">
      <v-card>
          
         <v-list two-line>
          <template v-for="(item, index) in files">  
            <v-divider ></v-divider>
            <v-list-tile  :key="item.title" avatar @click="">
              <v-list-tile-avatar @click="playSound(item)">
                <img :src="require('@/assets/deepin-music.svg')">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.file"></v-list-tile-title>
                <v-list-tile-sub-title>{{infoItem(item.change)}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
               <v-menu bottom left>
                <v-btn slot="activator"  icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>

                <v-list>
                  <v-list-tile v-for="(accion, i) in items" :key="i" @click="option(accion.accion,item)">
                    <v-list-tile-title>{{ accion.accion }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
  
     <v-bottom-sheet inset v-model="player">

      <v-card tile>
        <v-progress-linear
          :value="50"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>The Walker</v-list-tile-title>
              <v-list-tile-sub-title>Fitz & The Trantrums</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-spacer></v-spacer>

            <v-list-tile-action>
              <v-btn icon>
                <v-icon>fast_rewind</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>pause</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>fast_forward</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-bottom-sheet>
     

    </v-flex>
  </v-layout>

         <v-dialog v-model="dialog" width="500"  persistent >
     
  
        <v-card>
       <v-toolbar color="light-blue darken-4" dark height="35" >
      <v-toolbar-title>Contraseña requerida</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon @click="close()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
          <v-card-text>
            Para poder relizar cambios a directorios se necesita permisos.
           <v-form ref="form" lazy-validation>

             <v-flex xs12 sm12>
              <v-text-field :rules="Rules" v-model="password" type="password" label="Password"  outline ></v-text-field>
             </v-flex>
          </v-form>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"  @click="setPasswor()">
              Conceder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</v-container>
        
</template>

<script>
  import SystemInformation from './WelcomeView/SystemInformation'
  import {services} from '../services/services.js'
  export default {
    name: 'welcome',
    components: { SystemInformation },
    data: () => ({
     files:{},
     list:[],
     player:false,
     items: [
        { accion: 'Cambiar' },
        { accion: 'Restaurar' },
      ],
      snackbar: false,
      timenotification:6000,
      notificationtext:'',
      notificationcolor:'',
      dialog:false,
      password:null,
      Rules: [v => !!v || 'Name is required',],

     }),
    mounted(){
    this.construtor()
    },
    methods: {
      playSound:function (sound) {
        let config = services.getConfig()
        var ruta = config[1].directory+"/"+sound.file
    
       const player = require('node-wav-player');
        player.play({
          path: ruta,
          sync: true
        }).then((data) => {
          console.log( player);
        }).catch((error) => {
          console.error(error);
        });     /*console.log(ruta)
         console.log(play)
         console.log(load)*/
           //this.player=true;
    
      
      },
      construtor:function() {
    /*
    fs.readFile("/var/www/html/proyectos/SoundLoad/package.json", "utf8",  (err, data)  => {
    console.log(JSON.parse(data))
    });*/
    
    if (services.verifiquede) {
    var password = services.getPassword()
    console.log(password)
    
    if(password.root=="" || password.root==null ){
       this.dialog=true;
    }else{
      //services.construtor();
      this.files = services.getFiles()
      //alert(this.files)
    }
    }else{
      construtor();
    }
    
    
   
    },
     option:function(accion,item){
       if (accion=="Cambiar") {
        services.chooseFile(item,function(resul){
          console.log(resul)
           this.construtor();
        });
        /*if(resul.save==true){
          console.log(resul)
          this.newnotification(resul.msj,'green')
          this.construtor();
        }else{
          this.newnotification(resul.msj,'oranges')
        }*/
        
       }else{
        services.restorFile(item);
        
       
       }
        
    },
    infoItem:function(item){
         var status
         if (item) {
          status="Personalizado"
         }else{
           status="De Fabrica"
         }

        return status
    },
    setPasswor:function() {
        if (this.$refs.form.validate()) {
                services.setPassword(this.password)
                this.construtor()
                this.dialog=false
                //this.$refs.form.reset()
        }
      },
    close:function(){
     services.closewindow();
    },
    newnotification:function(msj,color){
           
           this.notificationtext = msj;
           this.notificationcolor= color;
           this.snackbar = true;
    },
   }
  }
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
