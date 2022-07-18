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
          v-model="password"
          label="Contrasena"
          id="password"
          name="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock"
          outlined
          clearable
          dense
          v-on:keyup="keymonitor"
          @click:append="showPass = !showPass"
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
      username: '',
      password: '',
      showPass: false,
    }),
    methods: {
      initialize: function () {
        //
      },
      async checkLogin () {
        let msg = await 'Validando Usuario. Por favor espere...';
        let msgtype = await 'info';
        await this.displayMsg(msg, msgtype);
        await this.getOverlay(3000);
        await this.setToken('');
        let formData = await {
          email: this.username, 
          password: this.password,
          evento: ''
        };
        
        let apiRoute = await 'login';
        let token = await '';
        let responseData = await this.getApi(apiRoute, formData, token);
        // await alert(responseData);
        // await  console.log(responseData);
        if(await responseData.token){
          msg = await 'Acceso permitido. Por favor espere...';
          msgtype = await 'success';
          await this.setToken(responseData.token);
          await this.loadRoute('Logged', {});
        } else {
          msg = await 'Error. Usuario o contraseña no valida. Acceso NO permitido.';
          msgtype = await 'error';
        }
        await this.displayMsg(msg, msgtype);
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
    },
    mounted () {
      /* rev
      if (this.loggedIn === 1 && sessionStorage.getItem('localToken')) {
        this.loadRoute('Logged', {});
      }
      */
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
