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
      v-model="field.doorNo"
      :rules="idRules"
      label="DoorNo"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.street"
      :rules="nameRules"
      label="Street Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.landmark"
      :rules="nameRules"
      label="landmark"
      required
    ></v-text-field>
    <v-text-field
      v-model="field.area"
      :rules="nameRules"
      label="area"
      required
    ></v-text-field>  
    <v-text-field
      v-model="field.pincode"
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
        <th>Hotel ID<v-icon v-if="hotelIdArrow" @click="hotelIdA" small>mdi-arrow-up</v-icon>
        <v-icon v-if="!hotelIdArrow" @click="hotelIdD" small>mdi-arrow-down</v-icon></th>
        <th>Hotel Name<v-icon v-if="nameArrow" @click="nameA" small>mdi-arrow-up</v-icon>
        <v-icon v-if="!nameArrow" @click="nameD" small>mdi-arrow-down</v-icon></th>
        <th>Hotel Address</th>
          <!-- <v-icon v-if="addressArrow" @click="addressA" small>mdi-arrow-up</v-icon>
        <v-icon v-if="!addressArrow" @click="addressD" small>mdi-arrow-down</v-icon></th> -->
        <th>customer Id<v-icon v-if="idArrow" @click="idA" small>mdi-arrow-up</v-icon>
        <v-icon v-if="!idArrow" @click="idD" small>mdi-arrow-down</v-icon></th>
        <th>Customer Name</th>
    </tr>
     <tr v-for="item in arr"
       :key="item.hotelId">
       <td>{{item.hotel_id}}</td>
       <td>{{item.hotel_name }}</td>
       <td>{{JSON.stringify(item.door_no +','+item.street +','+item.landmark +','+item.area  +','+item.pincode) }}</td>
       <td>{{item.customer_id}}</td>
       <td>{{item.customer_name }}</td>
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
        idArrow:true,
        nameArrow:true,
        // addressArrow:true,
        hotelIdArrow:true,
        temp:{},
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
            doorNo:'',
            street:'',
            landmark:'',
            area:'',
            pincode:''
          
        },
          }),  
          mounted(){
              Vue.axios.get('http://127.0.0.1:3333/hotel/custName')
              .then((res)=>{
                 this.arr=res.data;
                 console.log(this.arr)
                 })
          }, 
             
          methods: {
            async insert(){
              Vue.axios.post('http://127.0.0.1:3333/hotel/create',this.field).then((res)=>{
            console.warn(res)
            })
            this.buton=true
            this.dialog=true            
            this.cancel()    
          },
          change(item) {
            this.dialog = true
            this.buton = false
            this.temp=item
            this.field={
              customerId:item.customer_id,
              hotelId:item.hotel_id,
              hotelName:item.hotel_name,
              doorNo:item.door_no,
              street:item.street,
              landmark:item.landmark,
              area:item.area,
              pincode:item.pincode
            }
            console.log(this.field)
          },
          save() {
            this.formTwo= this.item
            this.dialog = false
            this.buton = true
            Vue.axios.put('http://127.0.0.1:3333/hotel/update',this.field)
            this.cancel()
          },
          deleteRow(hotel_id) {
          Vue.axios.delete(`http://127.0.0.1:3333/hotel/drop/${hotel_id}`).then((res)=>console.log(res))
          },
          cancel () {
          this.dialog = false
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
      idA(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/idA').then((res)=>{this.arr=res.data})
        this.idArrow=false
      },
      idD(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/idD').then((res)=>{this.arr=res.data})
        this.idArrow=true
      },
      hotelIdA(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/hotelIdA').then((res)=>{this.arr=res.data})
        this.hotelIdArrow=false
      },
      hotelIdD(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/hotelIdD').then((res)=>{this.arr=res.data})
        this.hotelIdArrow=true
      },
      nameA(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/nameA').then((res)=>{this.arr=res.data})
        this.nameArrow=false
      },
      nameD(){
        Vue.axios.get('http://127.0.0.1:3333/hotel/nameD').then((res)=>{this.arr=res.data})
        this.nameArrow=true
      },
      // emailA(){
      //   Vue.axios.get('http://127.0.0.1:3333/customer/emailA').then((res)=>{this.arr=res.data})
      //   this.emailArrow=false
      // },
      // emailD(){
      //   Vue.axios.get('http://127.0.0.1:3333/customer/emailD').then((res)=>{this.arr=res.data})
      //   this.emailArrow=true
      // },
      // phoneA(){
      //   Vue.axios.get('http://127.0.0.1:3333/customer/phoneA').then((res)=>{this.arr=res.data})
      //   this.phoneArrow=false
      // },
      // phoneD(){
      //   Vue.axios.get('http://127.0.0.1:3333/customer/phoneD').then((res)=>{this.arr=res.data})
      //   this.phoneArrow=true
      // },
      }
    }
  
  </script>
  