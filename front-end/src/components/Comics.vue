<template>
	<div class="comic-search">
    <div class="column is-three-fifths is-offset-one-fifth">
      <input class="input" type="text" placeholder="Search Comics" width="50px" v-model="userInput" @keyup.enter="getComics()" />
		  <button class="button is-primary" @click="getComics()">
       Search Comics
		  </button>
    </div>
    <div>
      <article class="message is-info" v-if="searching">
        <div class="message-header">
          Searching In Progress...
        </div>
      </article>
      <article class="message is-danger" v-if="emptyInput">
        <div class="message-header">
          Search Field Cannot Be Empty!
        </div>
      </article>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <Result v-if="!searching" v-for="result in results" :key="result.title" 
            :result="result" />
        </div>
      </div>
      <article class="message is-danger" v-if="noResults">
        <div class="message-header">
          No Results Found
        </div>
      </article>
    </div>
	</div>
</template>

<script>
import axios from "axios";
import Result from "./Result.vue";
export default {
  name: "comic-search",
  data() {
    return {
      results: [],
      userInput: "",
      searching: false,
      noResults: false,
      emptyInput: false
    };
  },
  components: {
    Result
  },
  methods: {
    getComics() {
      this.$router.push({ path: `/comics` });
      let vm = this;
      vm.noResults = false;
      if (vm.userInput == "") {
        this.emptyInput = true;
        return;
      } else {
        vm.searching = true;
        this.emptyInput = false;
        axios
          .get(`http://localhost:8080/api/comics?co=${vm.userInput}`)
          .then(response => {
            vm.results = response.data.results;
            vm.searching = false;
            if (response.data.results.length < 1) {
              vm.noResults = true;
            }
            this.addQuery({
              query: `${vm.userInput}`,
              option: "comics",
              results: response.data.results
            });
          });
      }
    },
    addQuery(query) {
      this.$socket.emit("addQuery", query);
    },
    prevQueryCheck() {
      this.$emit("categoryMatch", "Comics");
      if (
        this.$route.params.index !== undefined &&
        this.$route.params.index >= 0
      ) {
        this.results = this.$root.$data.queries[
          this.$route.params.index
        ].results;
        if (this.results.length < 1) {
          this.noResults = true
        } else {
          this.noResults = false
        }
        this.userInput = this.$root.$data.queries[
          this.$route.params.index
        ].query;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.prevQueryCheck();
    }
  },
  created: function() {
    this.prevQueryCheck();
  }
};
</script>

<style scoped>
input {
  margin-bottom: 1em;
}
.is-parent {
  flex-wrap: wrap;
}
</style>