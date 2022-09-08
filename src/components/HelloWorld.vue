<template>
   <v-app>
      <v-form
    ref="form"
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
        @click="validate"
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
      <th>Name</th>
      <th>Email</th>
      <th>Gender</th>
      <th>Hobbies</th> 
      <th>Location</th>
      <th>Action</th>
      
         </tr>
    <tr v-for="(item,i) in arr"
      :key="i">
      <td>{{item.name}}</td>
      <td>{{item.email}}</td>
      <td>{{item.gender}}</td>
      <td>{{item.Hobbies}}</td>
      <td>{{item.select}}</td>
      <td><v-btn @click="change(item)"><v-icon small
        >mdi-pencil</v-icon></v-btn></td>
      <td><v-btn @click="deleteRow(item)"><v-icon small
        >mdi-delete</v-icon></v-btn></td>
    </tr>
   </v-simple-table>
    <v-dialog v-model="dialogDelete" max-width="250px">
          <v-card>
            <v-card-title ><center>Click OK for delete?</center></v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="close">Cancel</v-btn>
              <v-btn color="blue" text @click="deleteConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
   
     </v-app>
</template>
<script>
 export default {
      data: () => ({
        tempObj: {}, 
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
        gender:null,
        select: null,
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
       arr:[],
      dialogDelete:false,
      pop:false,
      buton:true,
      }),      
      methods: {
        validate () {
          if(this.$refs.form.validate()){
          this.arr.push( {
            name : this.name,
            email : this.email,
            gender :this.gender,
            Hobbies: this.Hobbies,
            select: this.select,
          })}
          this.pop=false
          this.buton=true
          this.reset()
          this.close()
          //console.log(JSON.stringify(arr))
        },
        change (item) {
        this.pop = true
        this.buton=false
        this.tempObj = item 
        this.name = item.name
        this.email = item.email
        this.gender=item.gender
        this.Hobbies= item.Hobbies
        this.select= item.select
      },
        deleteRow(item){
          this.edit = this.arr.indexOf(item)
          this.editItem = Object.assign({}, item)
          this.dialogDelete = true
        },
        deleteConfirm () {
        this.arr.splice(this.edit, 1)
        this.close()
      },
      close() {
        this.dialogDelete = false
      },
      cancel () {
        this.pop = false
      },
      save () {
        let test = this.arr.findIndex(temp => temp.id == this.tempObj.id)
        
          this.arr[test].name = this.name
          this.arr[test].email = this.email
          this.arr[test].gender =this.gender
          this.arr[test].Hobbies= this.Hobbies
          this.arr[test].select= this.select
         this.buton=true
         this.reset()
         this.cancel()
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
