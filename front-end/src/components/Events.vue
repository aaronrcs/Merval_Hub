<template>
    <div class="events">
        <div class="column is-three-fifths is-offset-one-fifth" v-if="categoriesOptions">
            <input class="input" v-model="searchInput" @keyup.enter="listOfEvents(searchInput)" type="text" placeholder="Search Events">
            
            <div v-if="emptyUserInput">
              <p id="error">*Enter a search value! </p>
            </div>
            <button id="event-button" class="button is-primary" @click="listOfEvents(searchInput)">
            Search Event
            </button>  
        </div>

        <div v-if="emptyResults">
          <p id="error">*No Events were found!</p>
        </div>

        <article class="message is-info" v-if="searching && !emptyUserInput">
          <div class="message-header">
             Searching In Progress...
          </div>
        </article>

        <!-- <div id="event-results" class="select is-multiple" v-show="search" v-if="!searching && !emptyResults">
            <select multiple size="5">
                <option v-for="info in eventInfo.results" :key="info.id" @click="getEventInfo(info)">{{info.title}}</option>
            </select>
        </div> -->

         <div class="search-results" v-show="search" v-if="!searching && !emptyResults">
          <div class="tile is-ancestor">
            <div class="tile is-12 is-vertical is-parent">
              <div class="tile is-child box" v-for="info in eventInfo.results" :key="info.id" >
                <div id="event-names" class="title">
                  <div @click="getEventInfo(info)">
                    <p>{{info.title}}</p>
                    <img id="event_art" :src="info.thumbnail.path + '.' + info.thumbnail.extension">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="eventResults">
          <div id="result-container" class="tile is-parent is-8">
            <div class="tile is-child box">
              <div class="columns is-mobile">
                <div class="column is-6 is-offset-1 ">
                  <p>#{{eventInfoList.id}}</p>
                  <p class="title">{{eventInfoList.title}}</p>
                  <img :src="image" >
                </div>
                <div class="event-comics">
                  <p class="box"> Features in <strong>{{eventInfoList.comics.available}}</strong> Comics</p>
                  <p class="box"> Features <strong>{{eventInfoList.characters.available}}</strong> Characters</p>
                  <p class="box"> Features <strong>{{eventInfoList.creators.available}}</strong> Creators</p>
                  <p class="box"> Features <strong>{{eventInfoList.series.available}}</strong> Series</p>
                  <p class="box"> Features <strong>{{eventInfoList.stories.available}}</strong> Stories</p>
                </div>
              </div>
              <div class="columns is-mobile">
                  <p class="subtitle" v-if="eventInfoList.description == ''"> <strong>Description:</strong> --This event has no Description Available--</p>
                  <p class="subtitle" v-else > <strong>Description:</strong> {{eventInfoList.description}}</p>               
              </div>
            </div>
          </div>
          <button id="new-search-button" class="button is-primary" @click="newEventSearch()">New Search</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Search from "./Search.vue";

export default {
  name: "events",
  data() {
    return {
      search: false,
      eventResults: false,
      newSearch: false,
      categoriesOptions: true,
      emptyUserInput: false,
      searching: false,
      eventInfo: {},
      eventInfoList: {},
      image: "",
      searchInput: "",
      emptyResults: false
    };
  },
  props: ["events"],
  components: {
    Search
  },
  methods: {
    listOfEvents: function(searchInput) {
      this.$router.push({ path: `/events` });
      let vm = this;
      this.searching = true;
      this.emptyResults = false;
      if (searchInput.length == 0) {
        this.emptyUserInput = true;
        return;
      } else {
        this.search = true;
        this.categoriesOptions = false;
        this.emptyUserInput = false;
        this.eventResults = false;

        console.log("Search:");
        axios
          .get(`http://localhost:8080/api/events?e=${searchInput}`)
          .then(response => {
            vm.eventInfo = response.data;
            vm.searching = false;
            if (vm.eventInfo.results == undefined || vm.eventInfo.results.length < 1) {
              vm.emptyResults = true;
              vm.categoriesOptions = true;
              vm.search = false;
              vm.eventResults = false;
            }
            this.addQuery({
              query: `${vm.searchInput}`,
              option: "events",
              results: response.data
            });
          });
      }
    },

    getEventInfo: function(name) {
      console.log("Event choosen: " + name.title);
      console.log(name.title + "'s Id: ", name.id);
      this.search = false;
      this.eventResults = true;
      this.newSearch = true;
      this.categoriesOptions = false;

      let vm = this;
      vm.eventInfoList = name;

      vm.image = name.thumbnail.path + "." + name.thumbnail.extension;
    },

    newEventSearch() {
      this.$router.push({ path: `/events` });
      this.search = false;
      this.eventResults = false;
      this.categoriesOptions = true;
      this.searchInput = "";
      console.log("New Search");
    },

    addQuery(query) {
      this.$socket.emit("addQuery", query);
    },

    prevQueryCheck() {
      this.$emit("categoryMatch", "Events");
      if (
        this.$route.params.index !== undefined &&
        this.$route.params.index >= 0
      ) {
        this.eventInfo = this.$root.$data.queries[
          this.$route.params.index
        ].results;
        this.eventResults = false;
        this.search = false;
        this.emptyResults = true;
        this.categoriesOptions = true;
        this.searchInput = this.$root.$data.queries[this.$route.params.index].query;
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
ul {
  list-style-type: none;
  padding: 0;
}

.input {
  margin-bottom: 1em;
}

#event_art{
  width: 20vw;
}

#event-results select option:hover {
  background-color: black;
  color: white;
}

#event-names:hover {
  color: gray;
  cursor: pointer;
  margin-left: 20px;
}

#event-button {
  background-color: plum;
}

#result-container {
  background: #e26868;
  width: 73vw;
}

#event-descr {
  float: right;
  margin-left: 100px;
}

.event-comics{
  margin-left: 11%;
}

#error {
  color: red;
  margin-right: 500px;
}

#selected-event {
  float: right;
  height: 10px;
  width: 20%;
  margin-top: -20px;
  margin-left: 50px;
}

#new-search-button {
  background-color: black;
  color: whitesmoke;
}

#new-search-button:hover {
  color: gray;
}
/* Media Queries: */
@media (max-width: 1000px) {
    #result-container {
      width: 73vw;
  }
}
@media (max-width: 800px) and (min-width: 350px) {
    #result-container {
      width: 100vw;
  }
}
</style>