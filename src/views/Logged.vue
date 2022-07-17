<template>
  <div>
    <v-flex>
      <v-img
        :src="require('@/assets/logo.png')"
        class="ma-0"
        contain
        height="100"
      ></v-img>
    </v-flex>
    <v-btn
      @click.stop = "initialize();"
      >
      <span>Buscar</span>
    </v-btn>
    <v-text-field label="Token" v-model="token"></v-text-field>
    RESPONSEDATA
    {{responseData}}
  </div>
</template>
<script>
  export default {
    name: 'Logged',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
      responseData: '',
    }),
    methods: {
      initialize: async function () {
        let formData = await {};
        let apiRoute = await 'user'; // userall
        let token = await this.token;
        this.responseData = await this.getApi(apiRoute, formData, token);
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
      this.initialize();
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
