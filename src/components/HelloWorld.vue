<template>
   <v-app>
    <div>
      <SearchBar :reg="link"  @searchEmits="Search"/>
      
    </div>
      <v-form
    refs="form"
    v-model="valid"
    lazy-validation
  >
    <v-dialog 
  v-model="pop" 
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
      v-model="input.name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>      
    <v-text-field
      v-model="input.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <br>
    <h3>Gender</h3>
    <v-radio-group
    v-model="input.gender"
    row
    >
    <v-radio
    label="male"
    value="Male"
    ></v-radio>
    <v-radio
    label="female"
    value="Female"
    ></v-radio>
  </v-radio-group>
    <h2>Hobbies</h2>
       <v-checkbox
      v-model="input.Hobbies"
        v-for="(C) in choice"
        :key="C.id"
        :label="C.name"
        :value="C.name"
        required
      ></v-checkbox>
      <v-autocomplete
        v-model="input.select"
        :items="location"
        :rules="[v => !!v || 'Location is required']"
        label="location"
        required
      >
      </v-autocomplete>      
      <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn
      v-if="buton"
        :disabled="!valid"
        color="success"
        @click="insert"
      >
        Validate
      </v-btn>
      <v-btn
      v-if="!buton"
        :disabled="!valid"
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
      <th>Email</th>
      <th>Gender</th>
      <th>Hobbies</th> 
      <th>Location</th>
      <th>Action</th>
      
         </tr>
    <tr v-for="item in arr"
      :key="item.id">
      <td>{{item.id}}</td>
      <td>{{item.name | place}}</td>
      <td>{{item.email}}</td>
      <td>{{item.gender}}</td>
      <td>{{item.hobbies}}</td>
      <td>{{item.select}}</td>
      <td><v-btn @click="change(item)"><v-icon small
        >mdi-pencil</v-icon></v-btn></td>
      <td><v-btn @click="deleteRow(item.id)"><v-icon small
        >mdi-delete</v-icon></v-btn></td>
    </tr>
   </v-simple-table>
   
     </v-app>
</template>
<script>
  import {readData,insertData,editData} from '../components/service/api.js'
  import Vue from 'vue';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  Vue.use(VueAxios,axios);
  var test
 export default {
      data: () => ({
        arr:[],
        test:{},
        link:'http://127.0.0.1:3333/sear',
        input:{
          id:'',
          name: '',
          email: '',
          gender:'',
          select: '',
          Hobbies:[],
        },
        valid: true,
        nameRules: [ 
          name=>!!name||'Name is required',
          v=>/^[a-z A-Z]+$/.test(v) || 'name is not valid'
        ],
        emailRules: [
          email => !!email || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        location: [
          'Tamil Nadu',
          'Kerala',
          'Karnataka',
          'Goa',
          'Telangana',
        ],
        choice: [
       {id :1,name:'cricket'},{id:2,name:'swiming'},{id:3,name:'other'}],
      dialogDelete:false,
      pop:false,
      buton:true,
      }),  
      mounted(){
        readData()
        .then((res)=>{
             this.arr=res
             console.log(res)
             })
      },    
      methods: {
        async insert(){
        await insertData(this.input)
          this.pop=false
          this.buton=true
          this.reset()
          this.close()
        },
      change(item) {
      this.buton=false
      this.pop = true
      this.test = item
      this.name = test.name
      this.email = test.email
      this.gender = test.gender
      this.Hobbies = test.hobbies
      this.select=test.select
    
    },
    async save() {
      test.name = this.name
      test.email = this.email
      test.gender = this.gender
      test.hobbies = this.hobbies
      test.select=this.select
    editData(this.input)
      .then(response => {
          console.log(response);
        });
      // this.pop=false
      
      //    this.cancel()
      //    this.$refs.form.reset()
       },
        deleteRow(id) {
        Vue.axios.delete(`http://127.0.0.1:3333/delete/${id}`)
      },
       cancel () {
        this.pop = false
        this.reset()
        this.buton=true
       },
     
      reset(){

        this.name = ''
        this.email =''
        this.gender =''
        this.Hobbies=''
        this.select= ''
      },
      Search(val) {
        console.log(val.data)
          this.arr= val.data
    }
  }
}
 
</script>
