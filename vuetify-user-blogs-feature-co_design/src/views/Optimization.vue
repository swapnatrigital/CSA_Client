<template>
  <div class="eb-container">
    <v-row>
      <v-col sm="12" md="6" lg="6">
        <v-card>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>User Selection</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-cloud-print</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-gmail</v-icon>
            </v-btn>

            <template v-slot:extension>
              <v-tabs
                v-model="tab"
                align-with-title
                background-color="transparent"
                slider-color="white"
              >
                <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Description</th>
                          <th class="text-left">Qty</th>
                          <th class="text-left">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in getCartChannelsCost"
                          :key="item.name"
                        >
                          <td>{{ item.desc }}</td>
                          <td>{{ item.qty }}</td>
                          <td>{{ item.price }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Broadcaster</th>
                          <th class="text-left">Genre</th>
                          <th class="text-left">Language</th>
                          <th class="text-left">HD/SD</th>
                          <th class="text-left">Price</th>
                          <th class="text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(payChannelItem, index) in getCart"
                          :key="index"
                        >
                          <td>{{ payChannelItem.name }}</td>
                          <td>{{ payChannelItem.broadcasterName }}</td>
                          <td>{{ payChannelItem.genreName }}</td>
                          <td>{{ payChannelItem.language }}</td>
                          <td>{{ payChannelItem.quality }}</td>
                          <td>{{ payChannelItem.price }}</td>
                          <td>
                            <v-btn class="mx-2" fab dark small color="primary">
                              <v-icon dark>mdi-delete</v-icon>
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>

      <v-col sm="12" md="6" lg="6">
        <v-card v-if="isResult">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Optimized Solution</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-download</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-cloud-print</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-gmail</v-icon>
            </v-btn>

            <template v-slot:extension>
              <v-tabs
                v-model="tab1"
                align-with-title
                background-color="transparent"
                slider-color="white"
              >
                <v-tab v-for="item in itemsOpt" :key="item">{{ item }}</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tab1">
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Description</th>
                          <th class="text-left">Qty</th>
                          <th class="text-left">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in optimizeResultCost"
                          :key="item.name"
                        >
                          <td>{{ item.desc }}</td>
                          <td>{{ item.qty }}</td>
                          <td>{{ item.price }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Quality</th>
                          <th class="text-left">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(payChannelItem,
                          index) in optimizeResult.channels"
                          :key="index"
                        >
                          <td>{{ payChannelItem.name }}</td>
                          <td>{{ payChannelItem.quality }}</td>
                          <td>{{ payChannelItem.price }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text v-if="optimizeResult.bouquets.length">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(bouquetItem, index) in optimizeResult.bouquets"
                      :key="index"
                    >
                      <v-expansion-panel-header
                        >{{ bouquetItem.bouquetDescription }}
                        <span align="right"
                          >Price: {{ bouquetItem.bouquetPrice }}</span
                        ></v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Description</th>
                                <th class="text-left">Paid</th>
                                <th class="text-left">Quality</th>
                                <th class="text-left">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(bouquetItem,
                                channelIndex) in bouquetItem.channels"
                                :key="channelIndex"
                              >
                                <td>{{ bouquetItem.name }}</td>
                                <td>{{ bouquetItem.description }}</td>
                                <td>{{ bouquetItem.paid }}</td>
                                <td>{{ bouquetItem.quality }}</td>
                                <td>{{ bouquetItem.price }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
                <v-card-text v-else>
                  <p>Bouquet Channels Not Found</p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <v-card v-else>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Optimized Solution</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text class="text--primary">
            <div class="text-center">
              Click optimize button to get the system optimized solution of your
              selected channels and bouquets.
            </div>
            <div class="text-center">
              <v-btn
                depressed
                class="ma-2 mt-5"
                color="primary"
                @click="optimizeAlgorithm"
              >
                Optimized Result
              </v-btn>
            </div>
          </v-card-text>

          <v-card-text>
            <v-overlay :value="overlay">
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from "lodash";
import { getOptimizeAlgoritm } from "../services/channel";
export default {
  name: "UserBlogs",
  data() {
    return {
      overlay: false,
      isResult: false,
      tab: null,
      tab1: null,
      items: ["User Selection", "à la carte Channels (Pay Channels)"],
      itemsOpt: [
        "User Selection",
        "à la carte Channels (Pay Channels)",
        "Bouquet Channels"
      ],
      optimizeResult: null,
      optimizeResultCost: [
        {
          desc: "No. of Free Channels (Incl 25 M*)",
          qty: 25,
          price: "Free"
        },
        {
          desc: "No. of Pay Channels",
          qty: 0,
          price: 0
        },
        {
          desc: "No. of Bouquet",
          qty: 0,
          price: 0
        },
        {
          desc: "Total No. of unique Channels",
          qty: 0,
          price: 0
        },
        {
          desc: "Price(Channel+Bouquet)",
          qty: 0,
          price: 0
        },
        {
          desc: "Network Capacity Fees*",
          qty: null,
          price: "₹ 130"
        },
        {
          desc: "GST(18%)",
          qty: null,
          price: 0
        },
        {
          desc: "Total Price(Monthly)",
          qty: null,
          price: 0
        }
      ],
      payChannel: []
    };
  },
  methods: {
    async optimizeAlgorithm() {
      if (this.getCart.length > 0) {
        this.overlay = true;

        // const channels_id = _.map(this.getCart, "id");
        const payload = {
          //channelIds: channels_id,
          channelIds: [1,2,3,4,7,9,15,13,71,311,328,31,44,264,460,197,198,229,27,154,175,265],
          quality: this.getUser.quality,
          region: this.getUser.region
        };
        const result = await getOptimizeAlgoritm(payload);
        const { data } = result;
        /*eslint no-console: "off"*/
        console.log("got result", data);
        if (data) {
          this.optimizeResult = { ...data };
          const channelsPrice = _.sumBy(data.channels, "price");
          const bouquetsPrice = _.sumBy(data.bouquets, "bouquetPrice");

          this.optimizeResultCost[1].price = channelsPrice; // No. of Pay Channels
          this.optimizeResultCost[1].qty = data.channels.length; // No. of Pay Channels

          this.optimizeResultCost[2].price = bouquetsPrice; // No. of Bouquet
          this.optimizeResultCost[2].qty = data.bouquets.length; // No. of Bouquet

          this.optimizeResultCost[3].qty = 25 + data.channels.length; // Total No. of unique Channels
          this.optimizeResultCost[3].price = channelsPrice; // Total No. of unique Channels

          this.optimizeResultCost[4].qty = null // data.bouquets.length + this.optimizeResultCost[3].qty; // Price(Channel+Bouquet)
          this.optimizeResultCost[4].price = channelsPrice + bouquetsPrice; // Price(Channel+Bouquet)

          this.optimizeResultCost[5].price = 130; // Network Capacity Fees
          this.optimizeResultCost[6].price = ((this.optimizeResultCost[5].price + this.optimizeResultCost[4].price) * 18) / 100;
          this.optimizeResultCost[7].price = this.optimizeResultCost[6].price + this.optimizeResultCost[5].price +  + this.optimizeResultCost[4 ].price;
        }
        this.isResult = true;
        this.overlay = false;
      } else {
        console.log("cart value is zero");
      }
    }
  },
  mounted() {},
  computed: {
    getCart() {
      return this.$store.getters["channel/getCartList"];
    },
    getCartChannelsCost() {
      return this.$store.getters["channel/getCartChannelsCost"];
    },
    getUser() {
      const data = this.$store.getters["auth/getUserDetails"];
      return data;
    },
    
  },
};
</script>

<style scoped>
.eb-container {
  padding: 15px;
}
</style>
