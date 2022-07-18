<template>
  <div class="pa-0 ma-0">
    <UserList v-if="(Object.keys(itemRow).length) === 0" @clickItemRow="updateItemRow" class="pa-0 ma-0" />
    <UserEdit v-if="(Object.keys(itemRow).length) > 0" @clickItemRow="updateItemRow" :itemRow="itemRow" class="pa-0 ma-0" />
  </div>
</template>
<script>
import UserList from '@/components/UserList.vue'
import UserEdit from '@/components/UserEdit.vue'
  export default {
    name: 'User',
    props: {
      //
    },
    components: {
      UserList, UserEdit
    },
    data: () => ({
      itemRow: {},
    }),
    methods: {
      initialize: function () {
        //
      },
      updateItemRow: function (val) {
        window.scrollTo(0,0);
        // this.$store.dispatch('loadUpPage', 1);
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
