<template>
  <div>
    <Loginform/>
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
