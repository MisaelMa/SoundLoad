<template>
  <div id="app">
    <v-app >
      <Menu/>
       
       <v-parallax :src="require('@/assets/desktop.jpg')" height="100%">
         <v-content>
            <router-view></router-view>
          </v-content>

      </v-parallax>

    </v-app>
  </div>
</template>

<script>
import Menu from './components/Menu/Menu'
 import {services} from './services/services.js'
 

  export default {
    name: 'deezermusic',
    components: {Menu},
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }),
    mounted(){
      this.open();
    },
    methods: {
      open:function() {
        //services.getPassword();
        services.construtor();
        services.getFiles();
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
