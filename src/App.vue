<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/> -->
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default{
  name:'App',
  components:{
    HelloWorld,
  }
}
</script>
