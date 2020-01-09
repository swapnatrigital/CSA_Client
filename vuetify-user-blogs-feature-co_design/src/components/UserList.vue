<template>
    <v-container>
        <v-card>
            <v-card-title>
                User List
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :items="userList"
                    item-key="id"
                    :search="search"
                    :headers="headers"
                    @click="openDetail"
                >
                <template v-slot:item.avatar="{ item }">
                    <img src="https://cdn.britannica.com/99/155499-050-864E622E/oil-lamps.jpg" height="50%" />
                    <!-- <img :src="item.avatar | makeImage" height="50%" /> -->
                </template>

                 <template v-slot:item.name="{ item }">
                  <a><span @click=openDetail(item)> {{ item.name }}</span></a>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name:"UserList",
    data() {
        return {
            text: '',
            userList: [],
            headers: [
                {
                    text: 'avatar',
                    value: 'avatar'
                },
                {
                    text: 'id',
                    value: 'id'
                },
                {
                    text: 'name',
                    value: 'name'
                },
                {
                    text: 'phone',
                    value: 'phone'
                },
                {
                    text: 'country',
                    value: 'country'
                },
                {
                    text: 'state',
                    value: 'state'
                },
                {
                    text: 'city',
                    value: 'city'
                },
                {
                    text: 'pincode',
                    value: 'pincode'
                },
                {
                    text: 'address',
                    value: 'address'
                },
            ],
            search: '',
        }
    },
    methods: {
        async getUserList(){
            const result =  await axios.get('http://5d43de032c6da100147e3512.mockapi.io/api/v1/users');
            this.userList = result.data;
        },
        async openDetail(data){
            this.text = data;
        }
    },
    filters:{
        async makeImage(){
            return  await axios.get("https://cdn.britannica.com/99/155499-050-864E622E/oil-lamps.jpg");
        }
    },
    mounted() {
        this.getUserList();
    }
}
</script>

<style scoped> 

</style>
