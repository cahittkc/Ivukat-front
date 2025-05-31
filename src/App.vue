<template>
  <Header v-if="user != null"></Header>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";
import Header from "./components/header.vue";

export default {
  computed: {
    ...mapState(["expTime", "expirationDate", "user"]),
  },
  components : {
    Header
  },
  data() {
    return {
      refreshTokenTimer: null,
    };
  },
  watch : {
    user(value){
      if(value == null){
        this.refreshTokenTimer = null
      }
    },
  },
  methods: {
    async session(){
      if(!this.user){
        return;
      }
      const session = await this.$appAxios.get('auth/session')
        if(session.success){
          this.$store.commit('setUser', session.data)
          return;
        }
    },
    async refreshToken(){
      const response = await this.$appAxios.get('auth/refresh')
      console.log(response);
      
      if(response.success){
        this.$store.commit('setToken', response.data);
        const now = new Date();
        const expTime = new Date(response.data.expiresIn);

        const time2 = (expTime.getTime() - now.getTime()) - 30000;
        this.$store.commit('setExpTime',time2);
        this.$store.commit('setExpirationDate',new Date().getTime() + time2);
        this.setRefreshTokenTime();
      }
    },
    async setRefreshTokenTime() {
      if (this.user != null && this.expTime != null) {
        let now = new Date().getTime();
        if (now >= this.expirationDate) {
          this.$store.dispatch('logout');
        } else {
          let newTime = this.expirationDate - now;
          this.$store.commit("setExpTime", newTime);
          this.refreshTokenTimer = setTimeout(async () => {
            console.log('başladı', this.expTime);
            if(this.expTime == null){
              return;
            }
            this.refreshToken();
          }, this.expTime);
        }
      }
    },
  },

  async created() {
    await this.session();
    this.setRefreshTokenTime();
  },

  


};
</script>

<style scoped></style>
