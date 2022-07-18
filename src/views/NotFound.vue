<template>
  <center>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">P&aacute;gina no encontrada.</div>
            <BR/>
            <div class="display-1 grey--text lighten-5">
              La p&aacute;gina a la que intenta acceder no existe.
            </div>
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              to="/login"
              >
              Regresar
            </v-btn>
            <div class="paragraph-text mt-2">
              <br />
              <br />
              Intente volver a la p&aacute;gina de inicio. O bien, comun&iacute;quese con el servicio de asistencia.
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

  </center>
</template>
<script>
  export default {
    name: 'viewEmpty',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
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
      //
    },
    computed: {
      //
    }
  }
</script>
<style>
  .paragraph-text {
    font-size: 18px;
  }
</style>
