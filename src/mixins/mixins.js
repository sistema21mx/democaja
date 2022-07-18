import axios from 'axios';
export default {
    data: () => ({
      buttoncolor: 'primary',
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
      makeString (length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      },
      isEmpty: function (dat, message, textfield) { // dat, message, textfield
        // alert(typeof dat)
        let error = 0;
  
        if((typeof dat)==='number'){
          if(dat===0){
            error = 1;
          // } else {
          //   error = 0;
          }
        }
  
        if((typeof dat)==='undefined'){
          error = 1;
        }
  
        if((typeof dat)==='object'){
          error = 1;
        }
  
        if((typeof dat)==='string'){
          dat.replace(/^\s+|\s+$/gm,'')
          if(dat.length===0){
            error = 1;
          } else {
            error = 0;
          }
        } else {
          // error = 1;
        }
        //
        if(error===0){
          return true;
        } else {
          this.$store.dispatch('loadMessage', { msg: message, type: 'error' });
          if(textfield.length !== 0){
            const ElementById = document.getElementById(textfield);
            // alert(JSON.stringify(ElementById));
            if(ElementById !== null){
              document.getElementById(textfield).focus();
            } else {
              // rev this.$refs.text_movil.focus();
              this.$refs[textfield].focus();
            }
          }
          return false;
        }
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
        if(await (responseData.status === 'Token is Invalid' ||
                  responseData.status === 'Authorization Token not found' ||
                  responseData.status === 'Token is Expired')){
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
      searchArray: function (nameKey, myArray){
        //
        let dat = {};
        for (var i=0; i < myArray.length; i++) {
          // alert(myArray[i].link);
          if (myArray[i].link === nameKey) {
            // return myArray[i];
            dat = myArray[i];
          }
        }
        return dat;
      },
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
      timeOverlay () {
        return this.$store.getters.getOverlay
      },
      loggedIn () {
        return this.$store.getters.getLoggedIn
      },
      titleForm () {
        return this.$store.getters.getTitleForm
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
      menuItemList () {
        return this.$store.getters.getMenuItemList
      },
      classform() {
        if (this.$vuetify.breakpoint.name === 'xs'){
            return 'text-h5 pa-6 text-center';
        } else {
            return 'text-h2 pa-12 text-center';
        }
      },
      classappbarform() {
        if (this.$vuetify.breakpoint.name === 'xs'){
            return 'caption ma-0 pa-0 text-center';
        } else {
            return 'Subtitle 2 ma-0 pa-0 text-center';
        }
      },
    }
}
