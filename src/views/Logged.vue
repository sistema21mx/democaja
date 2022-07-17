<template>
  <div>
    <v-flex>
      <v-img
        :src="require('@/assets/tulogo.png')"
        class="my-3"
        contain
        height="100"
        >
      </v-img>
    </v-flex>
    <v-row class="text-center">
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3 font-italic">
          Principal
        </h1>
      </v-col>
    </v-row>
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
        let apiRoute = await 'user';
        let token = await this.token;
        let responseData = await this.getApi(apiRoute, formData, token);
        await this.$store.dispatch('loadUserData', responseData);
        formData = await {};
        apiRoute = await 'profile/' + this.userData.id;
        // responseData = await {};
        responseData = await this.getApi(apiRoute, formData, token);
        await this.$store.dispatch('loadMenuItemList', responseData.data);
        // console.log(responseData);



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
