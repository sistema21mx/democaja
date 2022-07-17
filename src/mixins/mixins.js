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
      getFocus: function (val) {
        // await new Promise(resolve => setTimeout(resolve, 500)) // Pause
        setTimeout(() => { document.getElementById(val).focus(); }, 1000);
      },
      closeApp () { // param
        this.$store.dispatch('loadUserData', {name: ''});
        this.setToken('');
        this.loadRoute('Login', {});
      },
      loadRoute (route, param) {
        if(this.$route.name !== route){
          this.$router.push({ name: route, params: param });
        }
      },
      displayMsg (msgtxt, msgtype){
        this.$store.dispatch('loadMessage', {msg: msgtxt, type: msgtype});
      },
      setToken (val){
        this.$store.dispatch('loadToken', val);
        if(val === ''){
          sessionStorage.removeItem('localToken');
          this.$store.dispatch('loadLoggedIn', 0);
        } else {
          sessionStorage.setItem('localToken', JSON.stringify(val));
          this.$store.dispatch('loadLoggedIn', 1);
        }
      },
      async getApi (apiRoute, formData, token) {
        let msgError = await '';
        let responseData = await '';
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
        if(await (responseData.status === 'Token is Invalid' || responseData.status === 'Authorization Token not found')){
          //
          let msg = await 'Aviso. Su sesion expiro. vuelva a ingresar.';
          let msgtype = await 'info';
          await this.displayMsg(msg, msgtype)
          await this.setToken('');
          await this.loadRoute('Login', {});
        } else {
          // return responseData;
        }
        return responseData;
      },
      getOverlay (val){
        this.$store.dispatch('loadOverlay', 1);
        // await new Promise(resolve => setTimeout(resolve, val));
        setTimeout(() => { this.$store.dispatch('loadOverlay', 0); }, val);
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
