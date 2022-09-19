<template>
    <v-app>
      <SearchBar :reg="link"  @searchEmits="Search"/> 
       <v-form
     refs="form"
     v-model="fill"
     lazy-validation
   >
     <v-dialog 
   v-model="dialog" 
     > 
   <template v-slot:activator="{ on,attr }">
   <v-flex text-right align-right>
     <v-btn
     @click="close"
     elevation='5'
         color="primary"
         v-bind="attr"
         v-on="on"
         
       >
         <v-icon >mdi-plus</v-icon>
       </v-btn>
     </v-flex>     
       </template>
   <v-card text class="white"> 
     <v-text-field
       v-model="field.departmentId"
       v-comma="field.departmentId"
       :rules="idRules"
       label="departmentId"
       required
     ></v-text-field>      
     <v-text-field
       v-model="field.departmentName"
       :rules="nameRules"
       label="departmentName"
       required
     ></v-text-field>
     <v-text-field
     v-model="field.departmentStaff"
     :rules="nameRules"
     label="departmentStaff"
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
        <th>departmentId<v-icon v-if="idArrow" @click="idA" small>mdi-arrow-up</v-icon>
          <v-icon v-if="!idArrow" @click="idD" small>mdi-arrow-down</v-icon></th>
        <th>Department Name<v-icon v-if="nameArrow" @click="nameA" small>mdi-arrow-up</v-icon>
          <v-icon v-if="!nameArrow" @click="nameD" small>mdi-arrow-down</v-icon></th>
        <th>Department Staff<v-icon v-if="StaffArrow" @click="staffA" small>mdi-arrow-up</v-icon>
          <v-icon v-if="!StaffArrow" @click="staffD" small>mdi-arrow-down</v-icon></th>
    </tr>
     <tr v-for="item in arr"
       :key="item.departmentId">
       <td>{{item.department_id}}</td>
       <td>{{item.department_name }}</td>
       <td>{{item.department_staff }}</td>
       <td><v-btn @click="change(item)"><v-icon small
         >mdi-pencil</v-icon></v-btn></td>
       <td><v-btn @click="deleteRow(item.department_id)"><v-icon small
         >mdi-delete</v-icon></v-btn></td>
     </tr>
    </v-simple-table>
    
      </v-app>
 </template>

 <script>
    import Vue from 'vue';
    import axios from 'axios';
    import VueAxios from 'vue-axios';
import { readData,insertData,editData,deleteData,sortIdAsc,sortIdDesc,sortNameAsc,sortNameDesc,sortStaffAsc,sortStaffDesc } from './service/api';
    Vue.use(VueAxios,axios);
   export default {
        data: () => ({
          inputField:'',
          idArrow:true,
          nameArrow:true,
          StaffArrow:true,
          temp:{},
          arr:[],
          link:'http://127.0.0.1:3333/search',
          idRules:[
            name=>!!name||'id is required',
            v=>/^[0-9]+$/.test(v) || 'id is not valid'
          ],
          fill: true,
          
          nameRules: [ 
            name=>!!name||'Name is required',
            v=>/^[a-z A-Z]+$/.test(v) || 'name is not valid'
          ],
        dialog:false,
        buton:true,
        
        field:{
          departmentId:'', 
          departmentName: '',
          departmentStaff:'',
        },
        }),  
        mounted(){
          readData().
             then((res)=>{
               this.arr=res.data;
               })
        },    
        methods: {
          async insert(){
          insertData(this.field).then((res)=>{
          console.warn(res)
          })
          readData().
             then((res)=>{
               this.arr=res.data;
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
            departmentId:item.department_id,
           departmentName:item.department_name,
          departmentStaff:item.department_staff
          }
        console.log(this.field)
      },
        save() {
            this.formTwo= this.item
            this.dialog = false
            this.buton = true
            editData(this.field)
            this.cancel()
        },
        deleteRow(department_id) {
        deleteData(department_id).then((res)=>console.log(res))
        },
        close() {
          this.reset()
          this.buton=true
          this.dialog=true
          
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
      sortIdAsc().then((res)=>{this.arr=res.data})
      this.idArrow=false
    },
    idD(){
      sortIdDesc().then((res)=>{this.arr=res.data})
      this.idArrow=true
    },
    nameA(){
      sortNameAsc().then((res)=>{this.arr=res.data})
      this.nameArrow=false
    },
    nameD(){
      sortNameDesc().then((res)=>{this.arr=res.data})
      this.nameArrow=true
    },
    staffA(){
      sortStaffAsc().then((res)=>{this.arr=res.data})
      this.StaffArrow=false
    },
    staffD(){
      sortStaffDesc().then((res)=>{this.arr=res.data})
      this.StaffArrow=true
    },
    // Find(){
    //   console.log(data)
    // }
    }
  }
   
  </script>
  