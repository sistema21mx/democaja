<template>
  <v-container>
    <v-card>
      <v-card-title class="py-2 my-2">
        <span :class="classform">{{titleForm}}</span>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="!isEditing" @click.stop="isEditing = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="!isEditing" @click.stop = "$emit('clickItemRow', {})">
              <v-icon>mdi-keyboard-return</v-icon>
            </v-btn>
          </template>
          <span>Regresar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="isEditing" @click.stop="savEdit();">
              <v-icon>mdi-check-bold</v-icon>
            </v-btn>
          </template>
          <span>Salvar</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="isEditing" @click.stop = "$emit('clickItemRow', {})">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span>Cancelar</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form>
            <v-row>

              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_firstname" ref="text_firstname" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.firstname" label="Nombre(s)*" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_midname" ref="text_midname" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.midname" label="Paterno*" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_lastname" ref="text_lastname" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.lastname" label="Materno" v-on:keyup="keymonitor"></v-text-field>
              </v-col>

              <!-- v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_name" ref="text_name" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.name" label="Nombre" v-on:keyup="keymonitor"></v-text-field>
              </v-col -->
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_email" ref="text_email" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.email" label="Usuario*" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_personalemail" ref="text_personalemail" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.personalemail" label="Email" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_movil" ref="text_movil" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.movil" label="Movil" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_password" ref="text_password" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.password" label="Password" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
                <v-text-field id="text_comment" ref="text_comment" :disabled="!isEditing" dense class="py-0 my-0"
                  v-model="formData.comment" label="Comentarrio" v-on:keyup="keymonitor"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="py-1 my-1">
              </v-col>

            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
    <DIV v-show="urlApi.includes('localhost')">
      FORMDATA {{formData}} <BR/>
    </DIV>
  </v-container>
  
</template>
<script>
  export default {
    name: 'UserEdit',
    props: [
      'itemRow'
    ],
    components: {
      //
    },
    data: () => ({
      //
      isEditing: false,
      formData: {},
      formDataDefault: {
        "id": 0,
        "firstname": '',
        "midname": '',
        "lastname": "",
        "email": "",
        "personalemail": '',
        "movil": '',
        "comment": "",
        "active": "1",
        "name": "",
        "password": "",
      },
    }),
    methods: {
      initialize: function () {
        //
      },
      savEdit: async function () {
        if(await this.validationFields()){
          await this.getOverlay(2000);
          let apiRoute = this.formData.id === 0? 'usercreate' : 'userupdate';
          this.formData.name = (await this.formData.firstname + ' ' + 
            await this.formData.midname).trim();
          if(this.formData.lastname !== '' || this.formData.lastname !== null){
            this.formData.name = (await this.formData.name + ' ' + await this.formData.lastname).trim();
          }
          if(await this.formData.password.length === 0 &&
           await this.formData.id === 0){
           this.formData.password = await this.makeString(6);
          }
          let formData = await this.formData;
          formData.employee_id = await this.userData.id;
          let token = await this.token;
          let responseData = await this.getApi(apiRoute, formData, token);
          this.response = await responseData;
          let message = await '';
          let type =  await 'info';
          if(await responseData.error === 0){
            this.isEditing = await false;
            if(await responseData.data.id !== await this.formData.id){
              this.formData.id = await responseData.data.id;
            }
          } else {
            type = await 'error';
          }
          message = await responseData.message;
          await this.$store.dispatch('loadMessage', { msg: message, type: type });
          /* rev if(await responseData.gotocolumn){
            if(await responseData.gotocolumn.length!==0){
              await document.getElementById(responseData.gotocolumn).focus();
            }
          }
          */
        }
      },
      validationFields: function () {
        let isValid = true;

        if(isValid===true){
            isValid = this.isEmpty(
            this.formData.firstname,
            'El Campo Nombre no puede ser blanco',
            'text_firstname'
            );
        }

        if(isValid===true){
            isValid = this.isEmpty(
            this.formData.midname,
            'El Campo Paterno no puede ser blanco',
            'text_midname'
            );
        }

        if(isValid===true){
            isValid = this.isEmpty(
            this.formData.email,
            'El Campo Usuario no puede ser blanco',
            'text_email'
            );
        }

        return isValid;
      },
      keymonitor: function (event) {
        if (event.key === 'Enter') {
            this.savEdit()
        }
      },
      processData: function () {
        //
      }
    },
    created () {
      // this.formData = JSON.parse(JSON.stringify(this.itemRow));
      if(this.itemRow.id === 0){
        this.formData = Object.assign({},this.formDataDefault);
        // this.formData.created = this.getToday();
        this.isEditing = true;
      } else {
        this.formData = JSON.parse(JSON.stringify(this.itemRow));
      }
    },
    mounted () {
      //
    },
    updated () {
      //
    },
    watch: {
      isEditing () {
        if (this.isEditing === true){
            this.getFocus("text_firstname");
        }
      },
    },
    computed: {
      classform() {
        if (this.$vuetify.breakpoint.name === 'xs'){
            return 'body-2 pa-0 ma-0 text-left';
        } else {
            return 'body-1 pa-0 ma-0 text-left';
        }
      },
    }
  }
</script>
