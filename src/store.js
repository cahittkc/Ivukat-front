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
        user : null
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
            state.user = user
        }
    },
    getters: {
        getToken(state) {
            return state.accessToken.token;
        }
    },

    actions : {
        async logout({commit}){
            await appAxios.get('auth/logout')
            commit('setUser', null)
            commit('setExpTime', null)
            commit('setExpirationDate', null)
            commit('setToken', {accessToken : null, expiresIn : null})
            router.push({name : 'Login'})
        }
    },

    plugins: [
        createPersistedState()
    ]
})

export default store