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
    LOGGED
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
    }),
    methods: {
      initialize: async function () {
        let formData = await {};
        let apiRoute = await 'user'; // userall
        let token = await this.token;
        let responseData = await this.getApi(apiRoute, formData, token);
        await this.$store.dispatch('loadUserData', responseData);
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
