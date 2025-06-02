import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import appAxios from './utils/appAxios'
import router from './router'

const store = createStore({
    state: {
        accessToken: {
            token: null,
            expiresIn: null,
        },
        expTime : null,
        expirationDate : null,
        user : null,
        isAuthenticated : false,
    },
    mutations: {
        setToken(state, data) {
            state.accessToken.token = data.accessToken
            state.accessToken.expiresIn = data.expiresIn
        },
        setExpTime(state,time) {
            state.expTime = time
        },
        setExpirationDate(state,time) {
            state.expirationDate = time
        },
        setUser(state,user){
            state.isAuthenticated = user ? true : false;
            state.user = user
        },
        clearTokenAndUser(state){
            state.accessToken = {
                token : null,
                expiresIn : null
            }
            state.user = null;
            state.expTime = null;
            state.expirationDate = null;
            router.push({name : 'Login'})
        }
    },
    getters: {
        getToken(state) {
            return state.accessToken.token;
        },
        getIsAuthenticated(state){
            return state.isAuthenticated
        },
    },

    actions : {
        async login({commit}, user){
            try {
                const loginResponse = await appAxios.post('auth/login', user);
        
                console.log(loginResponse);
                
        
                if(loginResponse.success){
                    commit('setToken', loginResponse.data);
                    commit("setUser",loginResponse.data)
                    const now = new Date();
                    const expTime = new Date(loginResponse.data.expiresIn);
        
                    const time2 = (expTime.getTime() - now.getTime()) - 15000;
                    commit('setExpTime',time2);
                    commit('setExpirationDate',new Date().getTime() + time2);
        
                    const session = await appAxios.get('auth/session')
        
                    if(session.success){
                      //this.$root.setRefreshTokenTime();
                      commit('setUser', session.data)
                      router.push({ name: 'Dashboard' });
                    }

                    return {
                        success : true,
                        message : 'Login işlemi başarılı',
                    }
                }
                else{
                  return {
                    success : false,
                    message : loginResponse.message
                  }
                }
              } catch (error) {
                console.error('Giriş hatası detayları:', error);
              } 
        },
        async logout({commit}){
            await appAxios.get('auth/logout')
            commit('setUser', null)
            commit('setExpTime', null)
            commit('setExpirationDate', null)
            commit('setToken', {accessToken : null, expiresIn : null})
            router.push({name : 'Home'})
        }
    },

    plugins: [
        createPersistedState()
    ]
})

export default store