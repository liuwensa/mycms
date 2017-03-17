<template>
  <div class="wrapper">
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <div class="content-wrapper">
      <section class="content">
        <router-view></router-view>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name      : 'app',
    components: {
      'app-header' : require('./components/header.vue'),
      'app-sidebar': require('./components/sidebar.vue')
    }
  }
</script>
