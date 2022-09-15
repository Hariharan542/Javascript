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
     elevation='5'
         color="primary"
         v-bind="attr"
         v-on="on"
       >
         <h3><v-icon>mdi-plus</v-icon></h3>
       </v-btn>
     </v-flex>     
       </template>
   <v-card text class="white"> 
     <v-text-field
       v-model="departmentId"
       :rules="idRules"
       label="departmentId"
       required
     ></v-text-field>      
     <v-text-field
       v-model="departmentName"
       :rules="nameRules"
       label="departmentName"
       required
     ></v-text-field>
     <v-text-field
     v-model="departmentStaff"
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
         Validate
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
        <th>Id</th>
        <th>Name</th>
        <th>Staff</th>
    </tr>
     <tr v-for="item in arr"
       :key="item.departmentId">
       <td>{{item.department_id}}</td>
       <td>{{item.department_name }}</td>
       <td>{{item.department_staff }}</td>
       <td><v-btn @click="change(item)"><v-icon small
         >mdi-pencil</v-icon></v-btn></td>
       <td><v-btn @click="deleteRow(item.id)"><v-icon small
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
    var test
   export default {
        data: () => ({
          arr:[],
          link:'http://127.0.0.1:3333/search',
          departmentId:'', 
          idRules:[
            name=>!!name||'id is required',
            v=>/^[0-9]+$/.test(v) || 'id is not valid'
          ],
          fill: true,
          departmentName: '',
          departmentStaff:'',
          nameRules: [ 
            name=>!!name||'Name is required',
            v=>/^[a-z A-Z]+$/.test(v) || 'name is not valid'
          ],
        dialog:false,
        buton:true,
        }),  
        mounted(){
          Vue.axios.get('http://127.0.0.1:3333/view').
             then((res)=>{
               this.arr=res.data;
               console.warn(res)
               })
        },    
        methods: {
          async insert(){
          await Vue.axios.post('http://127.0.0.1:3333/insert',this.getData()).then((res)=>{
      console.warn(res)
    })
  
    this.pop=false
            this.buton=true
            // this.reset()
            this.close()
          },
          getData(){
            return{
              departmentId:this.departmentId,
              departmentName:this.departmentName,
              departmentStaff : this.departmentStaff,
            }
          },
        change(item) {
        this.buton=false
        this.pop = true
        test = item
        this. departmentName= item.departmentName
        this.departmentStaff = item.departmentStaff
      
      },
      async save() {
        test.departmentName = this.departmentName
        test.departmentStaff = this.departmentStaff
        await Vue.axios.put(`http://127.0.0.1:3333/update/${test.department_id}`, {
             departmentName : this.departmentName,
             departmentStaff : this.departmentStaff,
        })
        .then(response => {
            console.log(response);
          });
        this.pop=false
         
          //  this.reset()
           this.cancel()
           this.$refs.form.reset()
        },
          deleteRow(department_id) {
          Vue.axios.delete(`http://127.0.0.1:3333/drop/${department_id}`)
        },
        // close() {
        //   this.dialogDelete = false
        // },
         cancel () {
          this.pop = false
        //   this.reset()
          this.buton=true
         },
       
        // reset(){
  
        //   this.name = ''
        //   this.email =''
        //   this.gender =''
        //   this.Hobbies=''
        //   this.select= ''
        // }
        
        Search(val) {
        console.log(val.data)
          this.arr= val.data
    }
    }
  }
   
  </script>
  