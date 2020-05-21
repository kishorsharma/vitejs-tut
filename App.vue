<template>
  <div>
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link active" to='/'>Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to='/profile'>profile</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to='/login'>Login</router-link>
      </li>  
    </ul>
    
    <router-view />
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
