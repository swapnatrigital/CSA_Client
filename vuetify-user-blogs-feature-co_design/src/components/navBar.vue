<template>
  <v-app-bar app color="primary white--text text--lighten-1" light>
    <v-toolbar-title class="headline">
      <router-link to="/">
        <h4 class="white--text">NTO</h4>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/" v-if="isUserLogin">
      <v-badge color="red darken-4" left>
        <template v-slot:badge>{{ getCartList.length }}</template>
        <v-icon color="white lighten-1">mdi-cart</v-icon>
      </v-badge>
    </router-link>
    <v-icon color="white lighten-1 ml-3" @click="logout" v-if="isUserLogin">mdi-logout</v-icon>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["setUser"]),
    logout() {
      const user = {
        userName: "",
        password: "",
        region: "Mumbai",
        customerType: "DP",
        quality: "SD",
        isLogin: false
      };

      this.setUser(user);
      localStorage.setItem("in:user", JSON.stringify(user));
      this.$router.push({
        name: "Login"
      });
    }
  },
  computed: {
    ...mapGetters("channel", ["getCartList"]),
    ...mapGetters("auth", ["isUserLogin"])
  }
};
</script>
<style scoped></style>
