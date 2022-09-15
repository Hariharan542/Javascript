
<template>
    <div>
        <v-text-field label="Find"  v-model="val" ></v-text-field>
        <v-btn @click="Search">
            Search
        </v-btn>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
export default{
    data() {
        return{
            val:'', 
            
        }
    },
    methods:{
        async Search() {
          let value = {val:this.val}
          console.log(this.reg)
          await Vue.axios.post(this.reg, value).then((res)=> {
              console.log(res)
            this.$emit('searchEmits', res);
          })
          
            this.val = ''
        
        },
    },
    props:{
        reg:String,
      
    }
}
</script>