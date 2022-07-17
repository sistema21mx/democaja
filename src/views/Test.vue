<template>

    <v-card
      elevation="12"
      width="256"
    >
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          dense
          rounded
        >
          <v-list-item
            v-for="item in itemsMenu"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
</template>
<script>
  export default {
    data () {
      return {
        itemsMenu: [
          { title: 'Inicio', icon: 'mdi-view-dashboard' },
          { title: 'Salir', icon: 'mdi-forum' },
        ],
      }
    },
  }
</script>
