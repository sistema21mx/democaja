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
import axios from 'axios';
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
      // responseData: 'RESPONSEDATA',
      // showPass: false,
      //
      
    }),
    methods: {
      initialize: function () {
        //
      },
      async checkLogin () {
        let msg = 'Validando Usuario. Por favor espere...';
        let msgtype = 'info';
        await this.displayMsg(msg, msgtype);
        await this.getOverlay(3000);
        let formData = await {
          email: this.username, 
          password: this.password,
          evento: ''
        };
        await this.setToken('');
        let responseData = await this.getToken(formData);
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
      async getToken (formData) {
        //
        let apiRoute = await 'login';
        let Token = await '';
        let msgError = '';
        let responseData = '';
        await axios({
          method: 'post', url: this.urlApi + '/' + apiRoute,
          responseType: 'json',
          data: formData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Token
          }
          })
          .then(response => {
            responseData = response.data;
          })
          .catch(e => {
            if (!e.response) {
              // network error
              this.errorStatus = 'Error: Network Error';
              this.$store.dispatch('loadMessage', {
                msg: this.errorStatus, type: 'error'
              });
            } else {
              this.errorStatus = e.response.data.message;
              if (e.response.status){
                msgError = 'Error: ' + e.response.status + ' ' + e.response.data.error;
                console.log(msgError);
                this.responseData = e.response.data;
              }
              console.log( '*** ' + this.$route.name + ' *** an error occurred !! ' + e );
            }
        });
        return responseData;
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
