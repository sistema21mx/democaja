import axios from 'axios';
export default {
    data: () => ({
      //
      userDataDefault: {
        id: '',
        name: '',
        email: '',
      },
      // processing: 0,
      // disabledButton: 0,
      //
    }),
    methods: {
      //
      getFocus: async function (val) {
        await new Promise(resolve => setTimeout(resolve, 500)) // Pausa
        await document.getElementById(val).focus()
      },
      //
      async getToken (formData) { // formData
        let apiRoute = await 'login';
        let Token = await '';
        await this.$store.dispatch('loadToken', '');
        await sessionStorage.removeItem('localToken');
        await this.calldata(apiRoute, formData, Token);
        if(await this.responseData.length !== 0){
          if(await this.responseData.error ==='invalid_credentials'){
            let msgError = await 'Aviso: Usuario o contraseña invalida.';
            await this.$store.dispatch('loadMessage',
              { msg: msgError, type: 'error' }
            );
            await this.getFocus('usuario');
            this.processing = 0;
          }
          if(await this.responseData.token){
            let msgError = await 'Accesando...';
            await this.$store.dispatch('loadMessage',
              { msg: msgError, type: 'info' }
            );
            await this.$store.dispatch('loadToken', this.responseData.token);
            await sessionStorage.setItem('localToken',
              JSON.stringify(this.responseData.token
            ));
            // await this.createLog(await formData.email,'Login ' + await formData.email);
            await this.createLogUser(formData.email,'Login ' + formData.email);
            // await alert(JSON.stringify(this.responseData));
          }
          // this.processing = 0;
        }
      },
      //
      async getTokenInfo () {
        await this.$store.dispatch('loadUserData', this.userDataDefault);
        if(await this.token === '' && await sessionStorage.getItem('localToken') ){
            try {
            let localToken = await JSON.parse(sessionStorage.getItem('localToken'));
            await this.$store.dispatch('loadToken', localToken);
            await this.$store.dispatch('loadMessage', {
              msg: 'Aviso: Volviendo a cargar la pagina', type: 'success'
            });
          } catch (e) {
            await this.closeApp('TokenInvalid');
          }
        }
        if(await sessionStorage.getItem('localToken')){
          let apiRoute = await 'user';
          let formData = await {};
          let Token = await this.token;
          await this.calldata(apiRoute, formData, Token);
          // await alert(JSON.stringify(this.responseData));
          // await alert(JSON.stringify(this.responseData));
          if(await this.responseData.active === '0'){
            await this.$store.dispatch('loadMessage', {
              msg: 'Aviso: Acceso no permitido, usuario deshabilitado', type: 'error'
            });
            await this.closeApp('UserOff');
          } else {
            await this.$store.dispatch('loadMessage', {
              msg: 'Aviso: Acceso permitido...', type: 'success'
            });
            await this.$store.dispatch('loadUserData', this.responseData);
          }
        }
      },
      //
      async getMenuItemList () {
        if(await this.token !== '' && await sessionStorage.getItem('localToken') ){
          /*
          let apiRoute = await 'profile/' + this.userData.id; // 'menugetactive'
          let formData = await {};
          let Token = await this.token;
          await this.calldata(apiRoute, formData, Token);
          // await alert(JSON.stringify(this.responseData));
          await this.$store.dispatch('loadMenuItemList', this.responseData.data);
          */
          await this.$store.dispatch('loadLoggedIn', 1);
          await this.loadRoute('Logged', {});
        }
      },
      //
      async closeApp (param) {
        if(await param === 'Logout'){
          await this.createLogUser(
            await this.userData.email, param + ' ' + await this.userData.email
          );
        }
        /*
        if(await param === 'CancelLogin'){
          await this.createLogUser(
            await 'user', param + ' ' + await this.formData.email
          );
        }
        */
        await this.$store.dispatch('loadLoggedIn', 0);
        await this.$store.dispatch('loadToken', '');
        await this.$store.dispatch('loadUserData', this.userDataDefault);
        this.responseData = await [];
        await sessionStorage.removeItem('localToken');
        await this.loadRoute('Login', {});
      },
      //
      async loadRoute (route, param) {
        if(await this.$route.name !== route){
          await this.$router.push({ name: route, params: param });
        }
      },
      //
      async calldata (apiRoute, formData, Token ) {
        this.responseData = await [];
        let msgError = '';
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
            console.log(response.data);
            this.responseData = response.data;
            // console.log(response.data);
            // console.log( '*** ' + this.$route.name + ' *** is good !! '  )
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
                // this.responseData = JSON.stringify(e.response.data);
                this.responseData = e.response.data;
              }
              console.log( '*** ' + this.$route.name + ' *** an error occurred !! ' + e );
            }
            console.log('Status: ' + this.errorStatus);
          });
        await console.log("it was success " + this.urlApi + '/' + apiRoute);
        if(await this.responseData.status === 'Token is Expired' ||
          await this.responseData.status === 'Token is Invalid' ||
          await this.responseData[0] === 'user_not_found'){
            await this.$store.dispatch('loadMessage', {
              msg: 'Aviso: La sesion expiro. vuelva a ingresar', type: 'error'
            });
            // await this.createLogUser('userr','Expiro ' + 'user');
            await this.closeApp('Expired');
        }
      },
      //
      async createLogUser (email, event) {
        let apiRoute = await 'loguser';
        let formData = await {'email': email, 'event': event};
        let Token = await this.token;
        await this.calldata(apiRoute, formData, Token);
      },
      async getOverlay (val){
        await new Promise(resolve => setTimeout(resolve, val));
        await this.$store.dispatch('loadOverlay', 0);
      }
      //
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
    },
    computed: {
      //
      json_snackbar () {
        return this.$store.getters.getJson_Snackbar
      },
      overlay () {
        return this.$store.getters.getOverlay
      },
      loggedIn () {
        return this.$store.getters.getLoggedIn
      },
      urlApi: function () {
        return this.$store.getters.getUrlApi
      },
      token () {
        return this.$store.getters.getToken
      },
      userData () {
        return this.$store.getters.getUserData
      },
      //
    }
}
