<template>
  <div class="character-search">

    <div class="column is-three-fifths is-offset-one-fifth">
        <input  v-model="searchInput" @keyup.enter="listOfCharacters(searchInput)" type="text" class="input" placeholder="Search Characters">

        <div v-if="emptyUserInput">
           <p id="error">*No Character Name was searched! </p>
        </div>

        <div v-if="characterInfo.results == ''">
           <p id="error">*No Characters were found!</p>
        </div>

        <button id="character-button" class="button is-primary" @click="listOfCharacters(searchInput)">
        Search Characters
        </button>
    </div>
    <article class="message is-info" v-if="searching">
      <div class="message-header">
        Searching In Progress...
      </div>
    </article>
    <div class="search-results" v-show="search" v-if="!searching">
         <div class="tile is-ancestor">
           <div class="tile is-12 is-vertical is-parent">
             <div class="tile is-child box" v-for="info in characterInfo.results" :key="info.id" >
               <div id="character-names" class="title">
                 <div @click="getCharacterInfo(info)">
                   <p>{{info.name}}</p>
                   <img :src="info.thumbnail.path + '.' + info.thumbnail.extension" height="8%" width="8%">
                 </div>
               </div>
             </div>
           </div>
         </div>
    </div>

    <div v-show="characterResults" v-for="list in characterInfoList.results"  :key="list.id">
            
            <div id="result-container" class="tile is-parent is-8" >
              <div class="tile is-child box">
                <div class="columns is-mobile">
                  <div class="column is-6 is-offset-1 ">
                    <p class="title">{{list.name}}'s Infomation:</p>
                    <p class="subtitle" v-if="list.description == ''"> <strong>Description:</strong> --This character has no Description Available--</p>
                    <p class="subtitle" v-else > <strong>Description:</strong> {{list.description}}</p>
                     <!-- <div id="selected-character">  -->
                    <img  :src="list.thumbnail.path + '.' + list.thumbnail.extension" >
                     <!-- </div> -->     
                  </div>
                  <div id="character-comics" >
                        <p class="box"> Featured in <strong>{{list.comics.items.length}}</strong> Comics:</p>
                        <p v-if="list.comics.items == ''">--No Comics Avaliable--</p>
                        <ul v-else v-for="comics in list.comics.items" :key="comics.id">
                          {{comics.name}}
                          <hr>
                        </ul>
                  </div> 
                </div>  
              </div>
            </div>
            
            <button id="new-search-button" class="button is-primary" @click="newCharacterSearch()"> New Search </button>
    </div>
 
  </div>

</template>

<script>
import axios from "axios";
import Search from "./Search.vue";

export default {
  name: "character-search",
  data() {
    return { // booleans we used to hide/show the html
      search: false,
      characterResults: false,
      newSearch: false,
      categoriesOptions: true,
      emptyUserInput: false,
      searching: false,
      characterInfo: {}, // the search results
      characterInfoList: {}, // the ch chosen
      searchInput: ""
    };
  },
  props: ["characters"],
  components: {
    Search
  },
  watch: {
    $route(to, from) {
      this.prevQueryCheck()
    }
  },
  created: function(){
    this.prevQueryCheck()
  },
  methods: {
    listOfCharacters: function(searchInput) { // displays this to the user
      this.$router.push({ path: `/characters` }); // this is for the sockets
      let vm = this;

      this.searching = true; // loading
      this.characterResults = false;

      // validate input
      if (searchInput === "") { 
        this.emptyUserInput = true;
        this.searching = false; 
        return;
      } else {
        this.search = true;
        this.categoriesOptions = false;
        this.emptyUserInput = false;

        console.log("Search:");
        axios
          .get(`http://localhost:8080/api/characters?ch=${searchInput}`)
          .then(response => {
            vm.characterInfo = response.data; // result list that match the searchInput
            vm.searching = false;
            // adds to the history
            this.addQuery({
              query: `${vm.searchInput}`,
              option: "characters",
              results: response.data
            });
          });
      }
    },

    getCharacterInfo: function(name) { 
      console.log("Character choosen: " + name.name);
      console.log(name.name + "'s Id", name.id);
      this.search = false;
      this.newSearch = true; // display
      this.categoriesOptions = false;
      let vm = this;

      axios
        .get(`http://localhost:8080/api/characters/${name.id}`) // retrieve the ch by id the user chose
        .then(response => {
          vm.characterInfoList = response.data; // ch chose
          vm.characterResults = true; //display
        });
    },

    newCharacterSearch() { // this starts a new search 
      this.$router.push({ path: `/characters` });
      this.searchInput = "";
      this.search = false;
      this.characterResults = false;
      this.categoriesOptions = true;

      console.log("New Search");
    },
    addQuery(query) {
      this.$socket.emit("addQuery", query);
    },
    prevQueryCheck() {
      this.$emit("categoryMatch", "Characters");
      if (
        this.$route.params.index !== undefined &&
        this.$route.params.index >= 0
      ) {
        this.characterInfo = this.$root.$data.queries[
          this.$route.params.index
        ].results;
        this.search = true;
        this.characterResults = false;
        this.searchInput = this.$root.$data.queries[this.$route.params.index].query;
      }
    }
  }
};
</script>

<style scoped>
h1,
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
#character-results select option:hover {
  background-color: black;
  color: white;
}

#result-container {
  background: #e26868;
  width: 73vw;
}

.input {
  margin-bottom: 1em;
}

#character-comics {
  margin-left: 11%;
}

#error {
  color: red;
  margin-right: 500px;
}

#selected-character {
  float: right;
  height: 10px;
  width: 20%;
  margin-top: -20px;
  margin-left: 50px;
}

#character-names:hover {
  color: gray;
  cursor: pointer;
  margin-left: 20px;
}

#character-button {
  background-color: red;
}

#character-button:hover {
  color: black;
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
