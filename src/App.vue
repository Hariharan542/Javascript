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
export default{
  name:'App'
}
</script>
