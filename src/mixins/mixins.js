import axios from 'axios';
export default {
    data: () => ({
      userDataDefault: {
        id: '',
        name: '',
        email: '',
      },
    }),
    methods: {
      getFocus: async function (val) {
        await new Promise(resolve => setTimeout(resolve, 500)) // Pause
        await document.getElementById(val).focus()
      },
      async closeApp () { // param
        await this.setToken('');
        await this.loadRoute('Login', {});
      },
      async loadRoute (route, param) {
        if(await this.$route.name !== route){
          await this.$router.push({ name: route, params: param });
        }
      },
      async getOverlay (val){
        await this.$store.dispatch('loadOverlay', 1);
        await new Promise(resolve => setTimeout(resolve, val));
        await this.$store.dispatch('loadOverlay', 0);
      },
      async displayMsg (msgtxt, msgtype){
        await this.$store.dispatch('loadMessage', {msg: msgtxt, type: msgtype});
      },
      async setToken (val){
        await this.$store.dispatch('loadToken', val);
        if(await val === ''){
          await sessionStorage.removeItem('localToken');
          await this.$store.dispatch('loadLoggedIn', 0);
        } else {
          await sessionStorage.setItem('localToken', JSON.stringify(val));
          await this.$store.dispatch('loadLoggedIn', 1);
        }
      },
      async getApi (apiRoute, formData, token) {
        let msgError = '';
        let responseData = '';
        await axios({
          method: 'post', url: this.urlApi + '/' + apiRoute,
          responseType: 'json',
          data: formData,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
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
        if(responseData.status == 'Token is Invalid'){
          //
          let msg = 'Aviso. Su sesion expiro. vuelva a ingresar.';
          let msgtype = 'info';
          this.displayMsg(msg, msgtype)
          this.setToken('');
          setTimeout(() => (
            this.loadRoute('Login', {})
          ), 1000)
        } else {
          return responseData;
        }
      },
      //
      //
      //
      //
      //
      //
      //
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
    }
}
