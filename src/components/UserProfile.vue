<template>
  <v-container>
    <v-card>
      <v-card-title class="py-2 my-2">
        <span :class="classform">{{titleForm}}</span>
        <v-divider class="mx-4" inset vertical></v-divider>
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
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="!isEditing"
              @click.stop = "$emit('clickItemRow', {})">
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
            <v-btn fab x-small v-on="on" :color="buttoncolor" class="px-1 mx-1" v-show="isEditing"
              @click.stop = "$emit('clickItemRow', {})">
              <v-icon>mdi-close-thick</v-icon>
            </v-btn>
          </template>
          <span>Cancelar</span>
        </v-tooltip>
      </v-card-title>
    </v-card>
    <v-layout wrap justify-center>
      <v-flex xs2 sm1 md1>
        <v-text-field
          id="id"
          name="id"
          :readonly="true"
          v-model="itemRow.id"
          label="Id"
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs6 sm5 md5>
        <v-text-field
          id="usuario"
          name="usuario"
          :readonly="true"
          v-model="itemRow.email"
          label="Usuario"
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs2 sm1 md1>
        <v-text-field
          id="activo"
          name="activo"
          :readonly="true"
          v-model="itemRow.active"
          label="Activo"
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex xs10 sm5 md5>
        <v-text-field
          id="nombre"
          name="nombre"
          :readonly="true"
          v-model="itemRow.name"
          label="Nombre"
          outlined
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout v-show="isEditing" wrap justify-center>
      <v-flex xs10 sm3 md3>
        <v-checkbox
          v-model="checkAll"
          label="Elegir todos?"
          primary
          hide-details
          :input-value="checkAll"
          :disabled="!isEditing"
          @change="selectAll();"
        ></v-checkbox>
      </v-flex>
    </v-layout>
    <v-layout wrap justify-center>
      <v-flex xs10 sm10 md10 v-show="mnuItems.length>1">
        <v-layout wrap >
          <v-flex xs10 sm3 md3 v-for="mainOpc in mnuItems" :key="mainOpc.opcId">
            <v-switch v-model="checkedOptions" :label="mainOpc.etiqueta" :value="mainOpc.opcId"
              :input-value="mainOpc.opcId" :id="mainOpc.opcId" :disabled="!isEditing"
              >
            </v-switch>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>
<script>
  export default {
    name: 'UserProfile',
    props: [
      'itemRow'
    ],
    components: {
      //
    },
    data: () => ({
      titleDetail: '',
      isEditing: null,
      isSave: null,
      checkAll: false,
      checkedOptions: [],
      mnuItems: [
        { opcId: '1', etiqueta: 'Opcion 1' }
      ],
    }),
    methods: {
      initialize: function () {
        //
      },
      listOptions: async function () {
        let apiRoute = await 'menuprofile';
        let formData = await {};
        let token = await this.token;
        let responseData = await this.getApi(apiRoute, formData, token);
        this.mnuItems = await responseData.data;
      },
      userRules: async function () {
        let apiRoute = await 'profiluser';
        let formData = await {'user_id': this.itemRow.id};
        let token = await this.token;
        let responseData = await this.getApi(apiRoute, formData, token);
        this.checkedOptions = await responseData.data;
      },
      selectAll: function () {
        let selectAll = []
        if ( this.checkAll === true ) {
          let myObj = this.mnuItems
          for (var i = 0; i < myObj.length; i++){
              selectAll[i] = myObj[i].opcId.toString()
          }
        }
        this.checkedOptions = selectAll
      },
      savEdit: async function () {
        let apiRoute = await 'profilsave';
        let formData = await await {
          user_id: this.itemRow.id,
          employee_id: this.userData.id,
          checkedOptions: this.checkedOptions
        };
        let token = await this.token;
        if(await apiRoute.trim().length !== 0){
          // await this.calldata(apiRoute, formData, token);
          let responseData = await this.getApi(apiRoute, formData, token);
          await this.$store.dispatch('loadMessage', { msg: responseData.message, type: 'info' });
          this.isEditing = await false;
          // await alert(JSON.stringify(await this.responseData));
        }
      },
      processData: function () {
        //
      }
    },
    created () {
      this.titleDetail = this.itemRow;
    },
    mounted () {
      this.listOptions()
      this.userRules()
    },
    updated () {
      //
    },
    watch: {
      checkedOptions () {
        if(this.mnuItems.length === this.checkedOptions.length){this.checkAll = true;} else {this.checkAll = false;}
      },
      isEditing () {
        if(this.mnuItems.length === this.checkedOptions.length){this.checkAll = true;} else {this.checkAll = false;}
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
      //
    }
  }
</script>
