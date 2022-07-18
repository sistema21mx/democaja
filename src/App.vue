<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      dense
      >
      <v-app-bar-nav-icon @click.stop="drawer = true" v-show="loggedIn === 1"></v-app-bar-nav-icon>
      <!-- v-toolbar-title>{{userData.name}}</v-toolbar-title -->
      <div :class="classappbarform">{{userData.name}}</div>
      <div :class="classappbarform" v-show="titleForm !== ''">&nbsp;-&nbsp;{{titleForm}}</div>
      

      <v-spacer></v-spacer>
      <!-- v-btn
        v-show="($route.name === 'Logged')"
        text
        @click.stop = "exitApp();"
        >
        <span>Salir</span>
      </v-btn -->
      <v-btn
        v-show="($route.name === 'Login')"
        text
        to="/"
        >
        <span>Regresar</span>
      </v-btn>
      <v-btn
        v-show="($route.name === 'Home')"
        text
        to="/login"
        >
        <span>Ingresar</span>
      </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn fab x-small v-on="on" :color="buttoncolor" 
              class="px-1 mx-1" v-show="titleForm !== ''" to="/logged">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </template>
          <span>Cerrar</span>
        </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      >
      <v-list
        nav
        dense
        >
        <v-list-item-group
          v-model="group"
          active-class="blue-grey--text text--accent-4"
          >
          <v-list-item to="/logged">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-for="item in itemsMenu"
            :to="{ name: item.link, params: {title: item.title} }"
            :key="item.id"
            link
            >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/logout">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view/>
    </v-main>
    <DIV v-show="urlApi.includes('localhost')">
      <v-btn
        x-small
        color="secondary"
        to="/test"
        >
        Test Form
      </v-btn> <BR/>
      LOGGEDIN {{loggedIn}} / ROUTERNAME {{$route.name}} / BREAKPOINT {{this.$vuetify.breakpoint.name}} <BR/>
      PARAMS {{$route.params}} <BR/>
      USERDATA {{userData}} <BR/>
      <v-text-field label="Token" v-model="token" disabled></v-text-field><BR/>
    </DIV>
    <v-overlay :value="timeOverlay">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="json_snackbar.snackbar"
      :bottom="false"
      :color="json_snackbar.color"
      :left="false"
      :multi-line="false"
      :right="false"
      :timeout="json_snackbar.timeout"
      :top="true"
      :vertical="false"
      >
      {{ json_snackbar.text }}
    </v-snackbar>
  </v-app>
</template>
<script>
  export default {
    name: 'App',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
      drawer: false,
      group: null,
      itemsMenu: [{
        id:"0",
        label: 'label',
        icon: 'mdi-emoticon-happy-outline',
        link: 'Home',
      }]
    }),
    methods: {
      initialize: function () {
        //
      },
      exitApp: async function () {
        this.closeApp();
      },
      getback: function () {
        this.$store.dispatch('loadLoggedIn', 1);
        let localToken = JSON.parse(sessionStorage.getItem('localToken'));
        this.setToken(localToken);
        // await this.getTokenInfo();
        // await this.getMenuItemList();
      },
      processData: function () {
        //
      }
    },
    created () {
      if (sessionStorage.getItem('localToken')) {
        this.getback();
      }
    },
    mounted () {
      if (this.loggedIn == 1 && this.$route.name !== 'Logged'){
        this.loadRoute('Logged', {});
      }
    },
    updated () {
      //
    },
    watch: {
      //
      menuItemList () {
        if(this.$route.name !== 'Home' || this.$route.name !== 'login'){
          this.itemsMenu = this.menuItemList;
        }
      },
      '$route.name' (val) {
        this.$store.dispatch('loadTitleForm', '');
        if((Object.keys(this.menuItemList).length) > 0 ){
          for (var i=0; i < this.menuItemList.length; i++) {
            if (this.menuItemList[i].link === val) {
              this.$store.dispatch('loadTitleForm', this.menuItemList[i].title);
            }
          }
        }
        // alert(JSON.stringify(val))
      }
    },
    computed: {
      //
    }
  }
</script>
