<template>
    <v-app>
       <SearchBar :reg="link"  @searchEmits="Search"/>  
      <div width="500px">
      <v-flex text-right align-right >
        <v-btn
        @click="(()=>dialog=true)"
            color="primary"  
          ><v-icon >mdi-plus</v-icon>
          </v-btn>
        </v-flex> 
      </div>
       <v-form
     refs="form"
     v-model="fill"
     lazy-validation
   >
     <v-dialog 
   v-model="dialog" 
   persistent
     > 
  <v-card text class="white"> 
    <v-text-field
      v-model="field.hotelId"
      :rules="idRules"
      label="HotelId"
      required
    ></v-text-field>  
    <v-text-field
       v-model="field.hotelName"
       :rules="nameRules"
       label="HotelName"
       required
    ></v-text-field>     
    <v-text-field
      v-model="field.customerId"
      :rules="idRules"
      label="customerId"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.address.doorNo"
      :rules="idRules"
      label="DoorNo"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.address.street"
      :rules="nameRules"
      label="Street Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.address.landmark"
      :rules="nameRules"
      label="landmark"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.address.area"
      :rules="nameRules"
      label="area"
      required
    ></v-text-field>  
    <v-text-field
      v-model="field.address.pincode"
      :rules="idRules"
      label="Pincode"
      required
    ></v-text-field>       
    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
    <v-btn
    v-if="buton"
    :disabled="!fill"
    color="success"
    @click="insert"
    >Insert</v-btn>
    <v-btn
    v-if="!buton"
    :disabled="!fill"
    color="success"
    @click="save"
    >save</v-btn>
  </v-card> 
  </v-dialog> 
  </v-form>
     <v-simple-table>
     <tr>
      <th>Hotel ID<v-icon @click="sort('hotelId','asc')" small>mdi-arrow-up</v-icon>
        <v-icon  @click="sort('hotelId','desc')" small>mdi-arrow-down</v-icon></th>
        <th>Hotel Name<v-icon  @click="sort('hotelName','asc')" small>mdi-arrow-up</v-icon>
        <v-icon  @click="sort('hotelName','desc')" small>mdi-arrow-down</v-icon></th>
        <th>Hotel Address</th>
        <th>customer Id<v-icon  @click="sort('customerId','asc')" small>mdi-arrow-up</v-icon>
        <v-icon  @click="sort('customerId','desc')" small>mdi-arrow-down</v-icon></th>
        <th>Customer Name</th>
    </tr>
     <tr v-for="item in arr"
       :key="item.i">
       <td>{{item.hotel_id}}</td>
       <td>{{item.hotel_name }}</td>
       <td>{{item.address }}</td>
       <td>{{item.customer_id}}</td>
       <td>{{item.customerName }}</td>
       <td><v-btn @click="change(item)"><v-icon small
         >mdi-pencil</v-icon></v-btn></td>
       <td><v-btn @click="deleteRow(item.hotel_id)"><v-icon small
         >mdi-delete</v-icon></v-btn></td>
     </tr>
    </v-simple-table>
    </v-app>
  </template>
  <script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
    Vue.use(VueAxios,axios);
    export default {
      data: () => ({
        arr:[],
        link:'http://127.0.0.1:3333/hotel/search',
        fill: true,
        dialog:false,
        buton:true,
        idRules:[
          name=>!!name||'id is required',
          v=>/^[0-9]+$/.test(v) || 'id is not valid'
        ],
        nameRules: [ 
          name=>!!name||'Name is required',
          v=>/^[a-z A-Z]+$/.test(v) || 'name is not valid'
        ],
        
        field:{
          customerId:'', 
          hotelId:'',
          hotelName: '',
          address:{
            doorNo:'',
            street:'',
            landmark:'',
            area:'',
            pincode:''}
          
        },
          }),  
          mounted(){
            Vue.axios.get('http://127.0.0.1:3333/hotel/address')
              .then((res)=>{
                this.arr=res.data
                 console.log(res.data)
                  })
          }, 
             
          methods: {
            read()
            {
              Vue.axios.get('http://127.0.0.1:3333/hotel/address')
              .then((res)=>{
                this.arr=res.data
                 console.log(res.data)
                  })
  
            },
            async insert(){
              Vue.axios.post('http://127.0.0.1:3333/hotel/create',this.field).then((res)=>{
            console.warn(res)
            })
            this.buton=true
            this.dialog=true  
            this.read()          
            this.cancel()    
          },
          change(item) {
            this.dialog = true
            this.buton = false
            this.field={
              customerId:item.customer_id,
              hotelId:item.hotel_id,
              hotelName:item.hotel_name,
              address:item.address
            }
          },
          async save() {
            this.dialog = false
            this.buton = true
             console.log(this.field)
            await axios.put('http://127.0.0.1:3333/hotel/update',this.field).then((response) => {
              this.arr = response.data
            })
           this.read() 
            this.cancel()
          },
          deleteRow(hotel_id) {
          Vue.axios.delete(`http://127.0.0.1:3333/hotel/drop/${hotel_id}`).then((res)=>console.log(res))
          },
          cancel () {
          this.dialog = true
          this.buton=true
          this.reset()
          },
          reset(){
          this.field={}
          },
          
          Search(val) {
          console.log(val.data)
            this.arr= val.data
          },
          sort(val,order){
            let assign={
          val:val,
          order:order        
      } 
      console.log(assign),
            Vue.axios.post('http://127.0.0.1:3333/hotel/sort',assign).then((res)=>{this.arr=res.data})
          },
      }
    }
  
  </script>
  