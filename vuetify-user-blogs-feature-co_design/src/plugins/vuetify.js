import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);


export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: false,
  },
  themes: {
    light: {
      primary: colors.brown,
      secondary: colors.grey.darken1,
      accent: colors.shades.black,
      error: colors.red.accent3,
    },
    dark: {
      primary: colors.blue.lighten3,
    },
  },
});
