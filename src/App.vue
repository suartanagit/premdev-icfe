<script setup>
import MainNavbar from './components/MainNavbar.vue'
import MainFooter from './components/MainFooter.vue'
import CartView from './views/CartView.vue';
</script>

<template>
  <MainNavbar />

  <RouterView />  

  <MainFooter />
</template>