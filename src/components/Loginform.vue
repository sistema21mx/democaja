<template>
  <v-container>
    <v-flex>
      <v-img
        :src="require('@/assets/tulogo.png')"
        class="my-3"
        contain
        height="100"
        >
      </v-img>
    </v-flex>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        >
        <v-text-field
          id="usuario"
          name="usuario"
          v-model="username"
          label="Usuario"
          dense outlined
          v-on:keyup="keymonitor"
          >
        </v-text-field>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        >
          <v-text-field
            id="password"
            name="password"
            v-model="password"
            label="Contraseña"
            type="password"
            dense outlined
            v-on:keyup="keymonitor"
          >
        </v-text-field>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn
        rounded
        color="primary"
        @click.stop="checkLogin();"
        :disabled="logButton === 1"
        >
        Aceptar
      </v-btn>
    </div>

  </v-container>
</template>
<script>
  export default {
    name: 'Loginform',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
      username: '',
      password: '',
      showPass: false,
      //
      // logButton: 1,
    }),
    methods: {
      initialize: function () {
        //
      },
      async checkLogin () {
        //
        await this.$store.dispatch('loadMessage', {
            msg: 'Validando Usuario. Por favor espere...', type: 'success'
        });
        await this.$store.dispatch('loadOverlay', 1);
        //
      },
      keymonitor: function (event) {
        if (event.key === 'Enter' &&
            ((this.username !== "" && this.username !== null) && 
            (this.password !== "" && this.password !== null))
        ){
            this.checkLogin();
        }
      },
      processData: function () {
        //
      }
    },
    created () {
      setTimeout(() => {
        if (this.loggedIn === 0 && this.$route.name === 'Login') { 
            this.getFocus('usuario');
        }
      }, 500)
      //
    },
    mounted () {
      if (this.loggedIn === 1) {
        this.loadRoute('Logged', {});
      }
      if(this.urlApi.includes('localhost')){
        this.username = 'user';
        this.password = 'admin';
      }
      //
    },
    updated () {
      //
    },
    watch: {
      //
    },
    computed: {
      //
      logButton () {
        if ( ((this.username !== "" && this.username !== null) && 
              (this.password !== "" && this.password !== null) // &&
              // (this.processing === 0) 
              )){
          return 0;
        } else {
          return 1;
        }
      }
      //
    }
  }
</script>
