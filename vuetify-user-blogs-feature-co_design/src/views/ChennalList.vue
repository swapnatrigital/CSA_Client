<template>
  <v-container>
    <div class="eb-pending">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col sm="12" md="2">
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-select
                v-model="priceValue"
                :items="priceList"
                attach
                label="Price"
                item-text="name"
                item-value="id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="2">
              <v-select
                v-model="genreValue"
                :items="genreList"
                attach
                label="Genre of Channels"
                item-text="name"
                item-value="id"
                multiple
              >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ genreValue.length - 1 }})</span>
              </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="2">
              <v-select
                v-model="broadCastValue"
                :items="broadCasterList"
                label="Broadcaster"
                item-text="name"
                item-value="id"
                hide-details
                multiple
              >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ broadCastValue.length - 1 }})</span>
              </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="2">
              <v-select
                v-model="languageValue"
                :items="languageList"
                item-text="name"
                label="Language"
                item-value="id"
                multiple
                hide-details
              >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item.name }}</span>
                </v-chip>
                <span
                  v-if="index === 1"
                  class="grey--text caption"
                >(+{{ languageValue.length - 1 }})</span>
              </template>
              </v-select>
            </v-col>
            <v-col sm="12" md="1">
               <v-select
                  item-text="text"
                  item-value="id"
                  v-model="sortBy"
                  hide-details
                  :items="sortItem"
                  label="Sort by"
                ></v-select>
            </v-col>
             <v-col sm="12" md="1">
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn class="mr-0 ml-0 mt-4" tile  outlined fab x-small depressed color="primary"> 
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn class="mr-0 ml-0 mt-4" tile  outlined fab x-small depressed color="primary">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>

      <v-data-iterator class="mt-3"
        :search="search"
        :items="filterChannelList"
        :items-per-page.sync="itemsPerPage"
        :footer-props="{ itemsPerPageOptions }"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(item, i) in props.items"
              :key="i"
              cols="12"
              sm="4"
              md="2"
              lg="2"
            >
              <v-card class="mx-auto">
                <div class="img-con">
                  <img :src="item.image" class="img-w-100"/>
                </div>
              <v-card-text class="text--primary eb-p0">
                  <div align="center" class="font-weight-bold">
                    {{ item.name }}
                  </div>
                  <div>
                    <v-row>
                      <v-col cols="12" sm="^6" md="6" lg="6">
                        {{ item.genreName }}
                      </v-col>
                      <v-col cols="12" sm="^6" md="6" lg="6">
                        &#x20b9; {{ item.price }}
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-row align="center" justify="center" class="mb-2">
                    <v-btn color="primary" small @click="addCart(item)" v-if="!item.isCart">
                      Add to Bag
                    </v-btn>
                    <v-btn color="error" small @click="removeCart(item)" v-else>
                      Remove to Bag
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { getChannelListEndpoint, getGenreChannelsList, getBroadCasterList, getLanguagelsList } from "../services/channel";

export default {
  name: "UserList",
  data() {
    return {
      itemsPerPage: 20,
      itemsPerPageOptions: [20, 40, 60, 80, 100],
      text: "",
      userList: [],
      cartList: [],
      headers: [
        {
          text: "Channel",
          value: "channel"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Description",
          value: "description"
        },
        {
          text: "Price",
          value: "price"
        },
        {
          text: "Broadcaster Name",
          value: "broadcasterName"
        },
        {
          text: "Quality",
          value: "quality"
        }
      ],
      search: "",
      genreList: [],
      broadCasterList: [],
      languageList: [],
      priceList:[
        {
          id:[1,2,3,4,5],
          name: 'Below ₹ 5'
        },
        {
          id: [1,2,3,4,5,6,7,8,9,10],
          name: 'Below ₹ 10'
        },
        {
          id: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
          name: 'Below ₹ 20'
        },
        {
          id: 'ALL',
          name: 'All Channels'
        }
      ],
      priceValue: 'ALL',
      genreValue: [],
      broadCastValue: [],
      languageValue: [],
      channelsList:[],
      sortItem: [
        {
          id:'name',
          text:'Name'
        },
        {
          id:'broadcasterName',
          text:'Broadcaster Name'
        },
        {
          id:'genreName',
          text:'Genre Name'
        },
        {
          id:'quality',
          text:'Quality'
        },
        {
          id:'price',
          text:'Price'
        }
      ],
      sortBy:'price',
      sortDesc: false
    };
  },
  computed: {
    filterChannelList(){
      const gen = this.genreValue;
      const broadcarst = this.broadCastValue;
      const price = this.priceValue;

      const result = this.$store.getters["channel/getChannelList"];
      const genreSet = new Set(gen)
      const broadcastSet = new Set(broadcarst)
      const priceChannelSet = new Set(price)
      
      const response = result.filter(post => {
        const validGenre = gen.length == 0 ? true : genreSet.has(post.genreId)
        const validBroadcast = broadcarst.length == 0 ? true : broadcastSet.has(post.broadcasterId)
        const validPriceChannel = price == 'ALL' ? true : priceChannelSet.has(post.price);
        return validGenre && validBroadcast && validPriceChannel
      });
      return response;
    },
    cartUpdate: {
      get: function() {
        return this.$store.getters["channel/getCartList"];
      },
      set: function(newal) {
        this.setCart(newal);
      }
    },
  },
  methods: {
    ...mapActions("channel", ["setCart", "setChannel"]),
    optimization() {
      this.$router.push({ path: "/optimization" });
    },
    setChannelList(){
      const result = this.$store.getters["channel/getChannelList"];
      this.channelsList = result;
    },
    async getChannelItem() {
      const result = await getChannelListEndpoint();
      const { data } = result;
      if (data){
        const newData = data.map(e => { e.isCart = false; return e})
        this.setChannel(newData);
      }
    },
    async getGenreChannel() {
      const result = await getGenreChannelsList();
      const { data } = result;
      if (data){
        this.genreList = data
        // this.genreList.push({
        //   id: 'ALL',
        //   name: 'All'
        // })
      }
    },
    async getBroadCaster() {
      const result = await getBroadCasterList();
      const { data } = result;
      if (data){
        this.broadCasterList = data;
        // this.broadCasterList.push({
        //   id: 'ALL',
        //   name: 'All '
        // })
      }
    },
    async getLanguage() {
      const result = await getLanguagelsList();
      const { data } = result;
      if (data){
        this.languageList = data;
        // this.languageList.push({
        //   id: 'ALL',
        //   name: 'All'
        // })
      }
    },
    addCart(payload){
      payload.isCart = true;
    },
    removeCart(payload){
      payload.isCart = false;
    }
  },
  mounted(){
     this.setChannelList();
  },
  created(){
    this.setChannelList();
    this.getChannelItem();
    this.getGenreChannel();
    this.getBroadCaster();
    this.getLanguage();
  }
};
</script>

<style scoped>
.eb-scale {
  width: 9.5%;
  margin-top: 2%;
  transition: 0.5s ease-in-out;
}
.eb-scale:hover {
  transform: scale(1.5);
}
.eb-p0{
  padding-bottom: 0px !important;
  padding-top: 5px;
}
</style>

<style>
.eb-pending {
  padding: 10px !important;
}
.img-con{
  width: 70px;
  height: 70px;
  margin: 0 auto;
  padding-top: 15px;
}
.img-w-100{
  width: 100%;
}
</style>
