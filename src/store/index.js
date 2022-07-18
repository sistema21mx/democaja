import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: 0,
    token: '',
    overlay: false,
    titleForm: '',
    upPage: 0,
    json_Snackbar: {
      snackbar: false,
      y: 'top',
      color: 'green',
      mode: '',
      timeout: 3000,
      text: '',
      autoheight: true
    },
    menuItemList: [{
      id:"1",
      label: 'label', 
      icon: 'mdi-emoticon-happy-outline', 
      link: 'Home'
    }],
    userData: {
      name: ''
    },
    protocol: location.protocol + '//', 
    hostName: location.hostname, 
    appName: 'democaja',
    apiName: 'democajapi',
    apiRoute: '/api',
    portNumber: ':8000',
  },
  mutations: {
    setLoggedIn (state, payload) {
      state.loggedIn = payload
    },
    setTitleForm (state, payload) {
      state.titleForm = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setUserData (state, payload) {
      state.userData = payload
    },
    setMessage (state, payload) {
      state.json_Snackbar.snackbar = true
      state.json_Snackbar.text = payload.msg
      state.json_Snackbar.color = payload.type
      if(state.loggedIn === 0){state.json_Snackbar.timeout = 3500}
      if ( payload !== '') {
        //
      }
    },
    setMenuItemList (state, payload) {
      state.menuItemList = payload
    },
    setOverlay (state, payload) {
      state.overlay = payload
    },
    setUpPage (state, payload) {
      state.upPage = payload
    },
  },
  actions: {
    loadLoggedIn ({commit}, payload) {
      commit('setLoggedIn', payload)
    },
    loadTitleForm ({commit}, payload) {
      commit('setTitleForm', payload)
    },
    loadToken ({commit}, payload) {
      commit('setToken', payload)
    },
    loadMessage ({commit}, payload) {
      commit('setMessage', payload)
    },
    loadOverlay ({commit}, payload) {
      commit('setOverlay', payload)
    },
    loadMenuItemList ({commit}, payload) {
      commit('setMenuItemList', payload)
    },
    loadUserData ({commit}, payload) {
      commit('setUserData', payload)
    },
    loadUpPage ({commit}, payload) {
      commit('setUpPage', payload)
    },
    getUpPage (state) {
      return state.upPage
    },
  },
  modules: {
  },
  getters: {
    getLoggedIn (state) {
      return state.loggedIn
    },
    getTitleForm (state) {
      return state.titleForm
    },
    getToken (state) {
      return state.token
    },
    getJson_Snackbar (state) {
      return state.json_Snackbar
    },
    getUrlApi (state) {
      if (state.hostName === 'localhost'){
        return (state.protocol + state.hostName + 
                state.portNumber + state.apiRoute)
      } else {
        return (state.protocol + 
          state.hostName.replace(state.appName, state.apiName) + 
          state.apiRoute)
      }
    },
    getUserData (state) {
      return state.userData
    },
    getMenuItemList (state) {
      return state.menuItemList
    },
    getOverlay (state) {
      return state.overlay
    },
  }
})
