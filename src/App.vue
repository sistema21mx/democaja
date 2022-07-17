<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
      <v-toolbar-title>{{userData.name}}</v-toolbar-title>
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-show="($route.name === 'Logged')"
        text
        @click.stop = "exitApp();"
        >
        <span>Salir</span>
      </v-btn>
      <v-btn
        v-show="($route.name === 'Login')"
        text
        to="/"
        >
        <span>Regresar</span>
      </v-btn>
      <v-btn
        v-show="($route.name === 'Home')"
        text
        to="/login"
        >
        <span>Ingresar</span>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <DIV v-show="urlApi.includes('localhost')">
      LOGGEDIN {{loggedIn}} / ROUTERNAME {{$route.name}} / BREAKPOINT {{this.$vuetify.breakpoint.name}} <BR/>
      PARAMS {{$route.params}} <BR/>
      USERDATA {{userData}} <BR/>
      <v-text-field label="Token" v-model="token" disabled></v-text-field><BR/>
      
    </DIV>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="json_snackbar.snackbar"
      :bottom="false"
      :color="json_snackbar.color"
      :left="false"
      :multi-line="false"
      :right="false"
      :timeout="json_snackbar.timeout"
      :top="true"
      :vertical="false"
      >
      {{ json_snackbar.text }}
    </v-snackbar>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
    }),
    methods: {
      initialize: function () {
        //
      },
      exitApp: async function () {
        this.closeApp();
      },
      getback: function () {
        this.$store.dispatch('loadLoggedIn', 1);
        let localToken = JSON.parse(sessionStorage.getItem('localToken'));
        this.setToken(localToken);
        // await this.getTokenInfo();
        // await this.getMenuItemList();
      },
      processData: function () {
        //
      }
    },
    created () {
      if (sessionStorage.getItem('localToken')) {
        this.getback();
      }
    },
    mounted () {
      /* rev
      if (this.loggedIn == 1 && this.$route.name !== 'Logged'){
        this.loadRoute('Logged', {});
      }
      if (this.loggedIn == 0 && this.$route.name !== 'Home'){
        this.loadRoute('Home', {});
      }
      */
    },
    updated () {
      //
    },
    watch: {
      //
      /* rev
      loggedIn (val) {
        if(val === 1){
          this.loadRoute('Logged', {});
        }
      },
      
      '$route.name' (val) {
        if(val === 'Login' && this.loggedIn === 1){
          // alert(val);
          this.loadRoute('Logged', {});
        }
      }
      */
    },
    computed: {
      //
    }
  }
</script>
