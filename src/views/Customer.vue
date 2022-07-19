<template>
  <div>
    <CustomerList v-if="(Object.keys(itemRow).length) === 0" @clickItemRow="updateItemRow" class="pa-0 ma-0" />
    <CustomerEdit v-if="(Object.keys(itemRow).length) > 0" @clickItemRow="updateItemRow" :itemRow="itemRow" class="pa-0 ma-0" />
  </div>
</template>
<script>
import CustomerList from '@/components/CustomerList.vue'
import CustomerEdit from '@/components/CustomerEdit.vue'
  export default {
    name: 'Customer',
    props: {
      //
    },
    components: {
      CustomerList, CustomerEdit
    },
    data: () => ({
      //
      itemRow: {},
    }),
    methods: {
      initialize: function () {
        //
      },
      updateItemRow: function (val) {
        window.scrollTo(0,0);
        this.itemRow = val;
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
