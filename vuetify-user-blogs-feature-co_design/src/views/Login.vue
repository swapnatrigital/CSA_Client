<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary white--text text--lighten-1" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field label="User" name="user" type="text" v-model="username" />

              <v-text-field label="Password" name="password" type="password" v-model="password" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary white--text text--lighten-1" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" bottom="bottom" color="error" right="right" :timeout="timeout">
      {{ msg }}
      <v-btn dark text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  props: {
    source: String
  },
  data() {
    return {
      username: "",
      password: "",
      snackbar: false,
      msg: "",
      timeout:3000
    };
  },
  methods: {
    async login() {
      if (this.username === "admin" && this.password === "admin") {
        const user = {
          userName: "admin",
          password: "admin",
          isLogin: true,
          region: 'Mumbai',
          customerType: 'DP',
          quality: 'SD',
        };

        this.setUser(user);
        localStorage.setItem('in:user', JSON.stringify(user));
        this.$router.push({
          name: "login"
        });
      } else {
        this.snackbar = true;
        this.msg = "somthing went wrong";
      }
    },
    ...mapActions("auth", ["setUser"])
  }
};
</script>