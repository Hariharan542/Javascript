
<template>
    <div>
        <v-text-field label="Find" @keyup="Search"  v-model="val" ></v-text-field>
        <!-- <v-btn @mousedown="">
            Search
        </v-btn> -->
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
          console.log(value)
          await Vue.axios.post(this.reg, value).then((res)=> {
            this.$emit('searchEmits', res);
          })
        
        },
    },
    props:{
        reg:String,
      
    }
}
</script>