<template>
  <div class="home">
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
          Bienvenido
        </h1>
      </v-col>
    </v-row>
    <!-- img alt="Vue logo" src="../assets/logo.png" -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    mounted () {
      
      if (this.loggedIn == 1){
        this.loadRoute('Logged', {});
      }
      
    },
  }
</script>
