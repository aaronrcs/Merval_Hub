<template>
  <div class="search">
    <h1><strong>{{ welcome_message }}</strong></h1>

    <hr>
    <div class="columns">
      <div class="column is-3">
        <PrevQueries/>
      </div>
      <div class="column is-9">
        <div class="select">
          <select name="drop-down" v-model="searchOpt" v-on:change="changeRoute(searchOpt)">
            <option disabled value="">Select a Category</option>
            <option>Characters</option>
            <option>Events</option>
            <option>Comics</option>
            <option>Creators</option>
          </select>
        </div>
          <router-view v-on:categoryMatch="matchOption"></router-view>
      </div>
    </div>   
  </div>
</template>

<script>
import axios from "axios";
import PrevQueries from "./PrevQueries.vue";

export default {
  name: "search",
  data() {
    return {
      welcome_message: "Welcome to the Merval App",
      searchOpt: ""
    };
  },
  components: {
    PrevQueries
  },

  props: ["categories"],

  methods: {
    changeRoute(option) {
      if (option == "Comics" || option == "Characters" || option == "Events" || option == "Creators") {
        this.$router.push({ path: `/${option}` });
      }
      else {
        this.$router.push({ path: `/` });
      }
    },
    matchOption(option) {
      this.searchOpt = option
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
