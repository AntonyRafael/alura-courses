<template>
  <nav>
    <ul>
      <li v-for="(route, index) in routes" :key="index">
        <router-link :to="route.path ? route.path : '/'">{{
          route.name
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>