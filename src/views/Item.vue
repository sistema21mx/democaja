<template>
  <div>
    <ItemList v-if="(Object.keys(itemRow).length) === 0" @clickItemRow="updateItemRow" class="pa-0 ma-0" />
    <ItemEdit v-if="(Object.keys(itemRow).length) > 0" @clickItemRow="updateItemRow" :itemRow="itemRow" class="pa-0 ma-0" />
  </div>
</template>
<script>
import ItemList from '@/components/ItemList.vue'
import ItemEdit from '@/components/ItemEdit.vue'
  export default {
    name: 'Item',
    props: {
      //
    },
    components: {
      ItemList, ItemEdit
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
