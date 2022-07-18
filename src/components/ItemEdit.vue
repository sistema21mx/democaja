<template>
  <v-container>
    <v-img
      :src="require('@/assets/logo.png')"
      class="ma-0"
      contain
      height="100"
      >
    </v-img>
    {{itemRow}}
  </v-container>
</template>
<script>
  export default {
    name: 'ItemEdit',
    props: [
      'itemRow'
    ],
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
