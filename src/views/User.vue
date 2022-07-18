<template>
  <div>
    <UserList v-if="(Object.keys(itemRow).length) === 0" @clickItemRow="updateItemRow"/><BR/>
    <UserEdit v-if="(Object.keys(itemRow).length) > 0" @clickItemRow="updateItemRow" :itemRow="itemRow"/>
  </div>
</template>
<script>
import UserList from '@/components/UserList.vue'
import UserEdit from '@/components/UserEdit.vue'
  export default {
    name: 'viewEmpty',
    props: {
      //
    },
    components: {
      UserList, UserEdit
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
