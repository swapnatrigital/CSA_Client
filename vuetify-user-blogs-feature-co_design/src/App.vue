<template>
  <v-app>
    <navBar />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import navBar from "@/components/navBar.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    navBar
  }
};
</script>
