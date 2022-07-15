<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
    >
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
      ROUTERNAME {{$route.name}} <BR/>
      PARAMS {{$route.params}} <BR/>
      BREAKPOINT {{this.$vuetify.breakpoint.name}} <BR/>
      LOGGEDIN {{loggedIn}} <BR/>
      USERDATA {{userData}} <BR/>
      TOKEN {{token}} <BR/>
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
        //
        this.closeApp();
      },
      getback: async function () {
        await this.$store.dispatch('loadLoggedIn', 1);
        let localToken = await JSON.parse(sessionStorage.getItem('localToken'));
        await this.setToken(localToken);
        // await this.getTokenInfo();
        // await this.getMenuItemList();
      },
      processData: function () {
        //
      }
    },
    created () {
      //
    },
    mounted () {
      if (sessionStorage.getItem('localToken')) {
        this.getback();
      }
      if (this.loggedIn == 1 && this.$route.name !== 'Logged'){
        this.loadRoute('Logged', {});
      }
      if (this.loggedIn == 0 && this.$route.name !== 'Home'){
        this.loadRoute('Home', {});
      }
    },
    updated () {
      //
    },
    watch: {
      //
      overlay () {
        // this.getOverlay(5000);
      }
    },
    computed: {
      //
    }
  }
</script>

