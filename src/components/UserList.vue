<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="itemlist"
      :items-per-page="5"
      :search="search"
      item-key="id"
      sort-by=""
      class="elevation-1"
      :disable-sort = "disableSort"
      dense
      multi-sort
      :footer-props="footerProps"
      :header-props="headerProps"
      @page-count="pageCount = $event"
      >

      <template v-slot:top>
        <v-toolbar
          flat dense
          >
          <v-toolbar-title :class="classform">{{titleForm}}</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
            >
          </v-divider>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="mdi-close-circle"
            label="Buscar"
            id="text_search"
            name="text_search"
            class="px-1 mx-1"
            single-line
            hide-details
            @click:append="showFilter = false"
            v-show="showFilter === true"
            >
          </v-text-field>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn fab x-small v-on="on" 
                :color="buttoncolor"
                class="px-1 mx-1"
                @click.stop="showFilter = !showFilter"
                v-show="showFilter === false">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Buscar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn fab x-small v-on="on" 
                :color="buttoncolor" 
                class="px-1 mx-1"
                v-show="!showFilter"
                @click.stop = "$emit('clickItemRow', {id: 0});"
                >
                <v-icon>mdi-folder-plus-outline</v-icon>
              </v-btn>
            </template>
            <span>Nuevo</span>
          </v-tooltip>
        </v-toolbar>
      </template>

      <template v-slot:item.itemActive="{ item }" v-if="itemlist[0].id !== ''">
        <v-icon class="ma-0" icon small color="green darken-2" v-if="item.active === '1' ">mdi-check-bold</v-icon>
        <v-icon class="ma-0" icon small color="red darken-2" v-else>mdi-close-thick</v-icon>        
      </template>
      <template v-slot:item.actions="{ item }" v-if="itemlist[0].id !== ''">

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              class="ma-0"
              icon
              x-small
              color="light-green"
              @click.stop = "$emit('clickItemRow', item);"
              v-on="on"
              >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Editar</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-btn
          color="primary"
          >
          Sin informacion
        </v-btn>
      </template>
      <template v-slot:no-results>
        <v-btn
          color="primary"
          @click.stop="showFilter = false"
          >
          Sin informacion
        </v-btn>
      </template>
      <template #footer.page-text="props">
        {{props.pageStart}}-{{props.pageStop}} de {{props.itemsLength}}
      </template>
    </v-data-table>
    
  </v-container>
</template>
<script>
  export default {
    name: 'UserList',
    props: {
      //
    },
    components: {
      //
    },
    data: () => ({
      //
      headers: [
        { text: 'Nombre', value: 'name' },
        {
            text: 'Usuario',
            align: 'start',
            value: 'email',
        },
        {
            text: 'email',
            align: 'left',
            sortable: true,
            value: 'personalemail',
        },      
        { text: 'movil', value: 'movil' },
        {
            text: 'Activo',
            align: 'left',
            sortable: true,
            value: 'itemActive',
        },
        { text: 'Accion', value: 'actions', sortable: false, align: 'center' },
      ],
      itemlist: [{
        id: '',
        name: '',
        email: '',
        personalemail: '',
        movil: ''
      }],
      search: '',
      disableSort: false,
      showFilter: false,
      footerProps:{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        itemsPerPageOptions:[5,10,-1],
        'items-per-page-text': 'Lineas por pagina',
        'items-per-page-all-text': 'Todas',
      },
      headerProps: {
        sortByText: 'Ordenar por...'
      },
      //
    }),
    methods: {
      initialize: function () {
        //
      },
      async userList () {
        let apiRoute = await 'userall';
        let formData = await {};
        let token = await this.token;
        let responseData = await this.getApi(apiRoute, formData, token);
        this.itemlist = await responseData.data;
      },
      processData: function () {
        //
      }
    },
    created () {
      //
    },
    mounted () {
      this.userList()
    },
    updated () {
      //
    },
    watch: {
      showFilter () {
        if(this.showFilter === true){
            this.getFocus('text_search');
        } else {
            this.search = '';
        }
      }
    },
    computed: {
      //
      classform() {
        if (this.$vuetify.breakpoint.name === 'xs'){
            return 'body-2 pa-0 ma-0 text-left';
        } else {
            return 'body-1 pa-0 ma-0 text-left';
        }
      }
      //
    }
  }
</script>
