<template>
   <v-app>
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
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>      
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <br>
    <h3>Gender</h3>
    <v-radio-group
    v-model="gender"
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
      v-model="Hobbies"
        v-for="(C) in choice"
        :key="C.id"
        :label="C.name"
        :value="C.name"
        required
      ></v-checkbox>
      <v-autocomplete
        v-model="select"
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
  import Vue from 'vue';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  Vue.use(VueAxios,axios);
  var test
 export default {
      data: () => ({
        arr:[],
        id:'', 
        valid: true,
        name: '',
        nameRules: [ 
          name=>!!name||'Name is required',
          v=>/^[a-z A-Z]+$/.test(v) || 'name is not valid'
        ],
        email: '',
        emailRules: [
          email => !!email || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        gender:'',
        select: '',
        location: [
          'Tamil Nadu',
          'Kerala',
          'Karnataka',
          'Goa',
          'Telangana',
        ],
        choice: [
       {id :1,name:'cricket'},{id:2,name:'swiming'},{id:3,name:'other'}],
       Hobbies:[],
      dialogDelete:false,
      pop:false,
      buton:true,
      }),  
      mounted(){
        Vue.axios.get("http://127.0.0.1:3333/read").
           then((res)=>{
             this.arr=res.data;
             console.warn(res.data);
             })
      },    
      methods: {
        async insert(){
        await Vue.axios.post('http://127.0.0.1:3333/create',this.getData()).then((res)=>{
    console.warn(res)
  })

  this.pop=false
          this.buton=true
          this.reset()
          this.close()
        },
        getData(){
          return{
            id:this.id,
            name : this.name,
            email : this.email,
            gender :this.gender,
            Hobbies: this.Hobbies,
            select: this.select,
          }
        },
      change(item) {
      this.buton=false
      this.pop = true
      test = item
      this.name = item.name
      this.email = item.email
      this.gender = item.gender
      this.Hobbies = item.hobbies
      this.select=item.select
    
    },
    async save() {
      test.name = this.name
      test.email = this.email
      test.gender = this.gender
      test.hobbies = this.hobbies
      test.select=this.select
      await Vue.axios.put(`http://127.0.0.1:3333/upd/${test.id}`, {
           name : this.name,
           email : this.email,
           gender : this.gender,
           hobbies : this.Hobbies,
           select:this.select
      })
      .then(response => {
          console.log(response);
        });
      this.pop=false
       
        //  this.reset()
         this.cancel()
         this.$refs.form.reset()
      },
        deleteRow(id) {
        Vue.axios.delete(`http://127.0.0.1:3333/delete/${id}`)
      },
      // close() {
      //   this.dialogDelete = false
      // },
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
      }
    }
  }
 
</script>
