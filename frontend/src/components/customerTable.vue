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
     v-model="field.customerId"
     :rules="idRules"
     label="customerId"
     required
   ></v-text-field>      
   <v-text-field
     v-model="field.customerName"
     :rules="nameRules"
     label="customerName"
     required
   ></v-text-field>
   <v-text-field
   v-model="field.customerEmail"
   :rules="emailRules"
   label="customerEmail"
   required
 ></v-text-field>
 <v-text-field
     v-model="field.customerPhone"
     :rules="phoneRules"
     label="customerPhone"
     required
   ></v-text-field> 
     <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
     <v-btn
     v-if="buton"
     :disabled="!fill"
       color="success"
       @click="insert"
       
     >
       Insert
     </v-btn>
     <v-btn
     v-if="!buton"
       :disabled="!fill"
       color="success"
       @click="save"
     >
       save
     </v-btn>
     
     </v-card> 
     </v-dialog> 
   </v-form>
   <v-simple-table>
   <tr>
    <th>customerId<v-icon  @click="sort('customerId','asc')" small>mdi-arrow-up</v-icon>
      <v-icon @click="sort('customerId','desc')" small>mdi-arrow-down</v-icon></th>
      <th>customer name<v-icon  @click="sort('customerName','asc')" small>mdi-arrow-up</v-icon>
        <v-icon @click="sort('customerName','desc')" small>mdi-arrow-down</v-icon></th>
      <th>customer emailA<v-icon  @click="sort('customerEmail','asc')" small>mdi-arrow-up</v-icon>
        <v-icon @click="sort('customerEmail','desc')" small>mdi-arrow-down</v-icon></th>
      <th>customer phone<v-icon  @click="sort('customerPhone','asc')" small>mdi-arrow-up</v-icon>
        <v-icon @click="sort('customerPhone','desc')" small>mdi-arrow-down</v-icon></th>
      <th>Total Hotel</th>
  </tr>
   <tr v-for="item in arr"
     :key="item.customerId">
     <td>{{item.customer_id}}</td>
     <td>{{item.customer_name }}</td>
     <td>{{item.customer_email }}</td>
     <td>{{item.customer_phone}}</td>
     <td>{{item.count}}</td>
     <td><v-btn @click="change(item)"><v-icon small
       >mdi-pencil</v-icon></v-btn></td>
     <td><v-btn @click="deleteRow(item.customer_id)"><v-icon small
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
      
      temp:{},
      arr:[],
      link:'http://127.0.0.1:3333/customer/search',
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
      emailRules: [ 
        name=>!!name||'Email is required',
        v=>/.+@.+\..+/.test(v) || 'Email is not valid'
      ],
      phoneRules: [ 
        name=>!!name||'phone number is required',
        v=>/^[0-9]+$/.test(v) ||'phoneNumber is not valid'
      ],
      field:{
        customerId:'', 
        customerName: '',
        customerEmail:'',
        customerPhone:'',
        count:''
      },
        }),  
        mounted(){
          Vue.axios.get('http://127.0.0.1:3333/customer/count')
            .then((res)=>{
               this.arr=res.data;
               })
        },    
        methods: {
          async insert(){
            Vue.axios.post('http://127.0.0.1:3333/customer/create',this.field).then((res)=>{
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
            customerName:item.customer_name,
            customerEmail:item.customer_email,
            customerPhone:item.customer_phone
          }
          console.log(this.field)
        },
        save() {
          this.formTwo= this.item
          this.dialog = false
          this.buton = true
          Vue.axios.put('http://127.0.0.1:3333/customer/update',this.field)
          this.cancel()
          this.mounted()
        },
        deleteRow(customer_id) {
        Vue.axios.delete(`http://127.0.0.1:3333/customer/drop/${customer_id}`).then((res)=>console.log(res))
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
    sort(val,order){
      let assign={
          val:val,
          order:order        
      }
      Vue.axios.post('http://127.0.0.1:3333/customer/sort',assign).then((res)=>{
        this.arr=res.data})
    },
    }
  }

</script>
