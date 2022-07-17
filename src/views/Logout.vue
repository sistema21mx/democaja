<template>
  <div>
    <v-row>
      <v-col col="12">
        <v-row justify="center">
          <v-dialog transition="dialog-top-transition" v-model="formDialog" max-width="auto" persistent>
            <v-card>
              <v-card-title class="Body-1">Confirmar</v-card-title>
              <v-card-text>
                <div :class="classform">Salir del Sistema?</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click.stop="formDialog=false">Cancelar</v-btn>
                <v-btn color="primary" text @click.stop="closeApp();">Aceptar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-flex>
      <v-img
        :src="require('@/assets/logo.png')"
        class="ma-0"
        contain
        height="100"
      ></v-img>
    </v-flex>
  </div>
</template>
<script>
  export default {
    name: 'Logout',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      formDialog: true,
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
      formDialog () {
        if(this.formDialog === false){
            this.$router.push('logged');
        }
      }
    },
    computed: {
        classform() {
        if (this.$vuetify.breakpoint.name === 'xs'){
            return 'text-h5 pa-6 text-center';
        } else {
            return 'text-h2 pa-12 text-center';
        }
        }
      //
    }
  }
</script>
