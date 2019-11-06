<template>
	<aside class="menu">
    <p class="menu-label">
      <strong>Previous Queries</strong>
    </p>
		<div v-for="(obj, index) in this.$root.$data.queries" :key="index">
      <Query :objIn="obj" :indexIn="index" />
    </div>
	</aside>
</template>

<script>
import Query from "./Query.vue";
export default {
  name: "prev-queries",
  data() {
    return {};
  },
  sockets: {
    // replace the root queries with the backend queries to sync them
    refreshQueries(prevQueries) {
      this.$root.$data.queries = prevQueries;
    },
    // add the newest query to the list
    successfulQuery(data) {
      this.$root.$data.queries.push(data);
    }
  },
  methods: {},
  components: {
    Query
  }
};
</script>

<style scoped>
.menu {
  background-color: white;
}
</style>