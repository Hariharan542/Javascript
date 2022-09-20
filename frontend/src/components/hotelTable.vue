<!-- <template>
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
        <th>customer ID</th>
        <th>customer Name</th>
        <th>customer Email</th>
        <th>customer Phone</th>
    </tr>
     <tr v-for="item in arr"
       :key="item.customerId">
       <td>{{item.customer_id}}</td>
       <td>{{item.customer_name }}</td>
       <td>{{item.customer_email }}</td>
       <td>{{item.customer_phone}}</td>
       <td><v-btn @click="change(item)"><v-icon small
         >mdi-pencil</v-icon></v-btn></td>
       <td><v-btn @click="deleteRow(item.customer_id)"><v-icon small
         >mdi-delete</v-icon></v-btn></td>
     </tr>
    </v-simple-table>
    </v-app>
  </template> -->