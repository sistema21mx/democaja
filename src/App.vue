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
      USERDATA {{userData}}
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
      processData: function () {
        //
      }
    },
    created () {
      //
    },
    mounted () {
      //
    },
    updated () {
      //
    },
    watch: {
      //
      overlay () {
        this.getOverlay(5000);
      }
    },
    computed: {
      //
    }
  }
</script>

