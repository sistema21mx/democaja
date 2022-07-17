<template>
  <div>
    <Loginform/>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h1 class="display-1 font-weight-bold mb-3 font-italic">
          Inicia sesión
        </h1>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Loginform from '@/components/Loginform.vue'
  export default {
    name: 'Login',
    props: {
      //
    },
    components: {
      Loginform
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
      if (this.loggedIn == 1){
        this.loadRoute('Logged', {});
      }
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
