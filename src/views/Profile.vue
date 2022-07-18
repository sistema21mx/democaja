<template>
  <div class="pa-0 ma-0">
    <UserList v-if="(Object.keys(itemRow).length) === 0" @clickItemRow="updateItemRow" class="pa-0 ma-0" />
    <UserProfile v-if="(Object.keys(itemRow).length) > 0" @clickItemRow="updateItemRow" :itemRow="itemRow" class="pa-0 ma-0" />
  </div>
</template>
<script>
import UserList from '@/components/UserList.vue'
import UserProfile from '@/components/UserProfile.vue'
  export default {
    name: 'viewEmpty',
    props: {
      //
    },
    components: {
      UserList, UserProfile
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
