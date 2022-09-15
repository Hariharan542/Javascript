<template>
  <div id="app">
    <nav>
      <router-link to="/HelloWorld">HelloWorld</router-link> |
      <router-link to="/FormTwo">FormTwo</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
//import FormTwo from "@/components/formTwo.vue";
export default{
  name:'App',
  // components:{
  //   HelloWorld,
  //   FormTwo
  //}
}
</script>
