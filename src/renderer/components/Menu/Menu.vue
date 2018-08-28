
<template>
 <div>
 <!--     <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >

      <span  @mouseleave="hoveroutmenu">
        <v-list @mouseleave="hoveroutmenu">
          <v-list-tile  router :to="item.to" :key="i"  v-for="(item, i) in items" exact @mouseleave="hoveroutmenu">
            <v-list-tile-action>
              <v-icon v-html="item.icon"  @mouseover="hovermenu"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"  @mouseover="hovermenu"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
       </span> 
      </v-navigation-drawer>-->
      <v-toolbar fixed app :clipped-left="clipped" height="54" color="light-blue darken-4" dark>
       <!--<v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn 
          icon
          @click.native.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>-->
       <!-- <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>-->
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon   @click="dialog=true">
          <v-icon>settings_applications</v-icon>
        </v-btn>
      </v-toolbar>
      <v-navigation-drawer
        temporary
        fixed
        :right="right"
        v-model="rightDrawer"
        app
      >
        <v-list>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

        
         <v-dialog v-model="dialog" width="500"  persistent >
     
  
        <v-card>
       <v-toolbar color="light-blue darken-4" dark height="35" >
      <v-toolbar-title>Cambiar Contraseña</v-toolbar-title>

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
 </div>

</template>

<script>

  import {services} from '../../services/services.js'
  export default {
    name: 'Menu',
    data: () => ({
      dialog:false,
      password:null,
      Rules: [v => !!v || 'Name is required',],
      miniVariant: true,
      menufull:false,
      right: true,
      rightDrawer: false,
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'apps', title: 'Welcome', to: '/' }
      ],
  
      title: 'SoundLoad'
    }),
    computed: {
    menu: function(){
       this.menufull = this.$session.get('menufull')
       if (this.menufull) {
       this.miniVariant = false
       }else{
        this.miniVariant = true
        
       }
    }
    
  },
    methods: {
    
  hovermenu: function(){ 
      if (this.menufull) {
       this.miniVariant = false
      }else{
      if (this.miniVariant) {
         this.miniVariant = false
      } 
      }
     },
  hoveroutmenu: function(){ 
      if (this.menufull) {
          this.miniVariant = false
      }
      else{
        if (!this.miniVariant) {
         this.miniVariant = true
        }
      }
    },
    setPasswor:function() {
        if (this.$refs.form.validate()) {
                services.setPassword(this.password)
                this.dialog=false
                //this.$refs.form.reset()
        }
    },
    close:function(){
      this.dialog=false
    },
}
//administracion@enlacesplaya.com.mx 14787  
  }
</script>


