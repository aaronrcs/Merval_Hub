<template>
  <div class="creators-search">

    <div class="column is-three-fifths is-offset-one-fifth">
        <input  v-model="searchInput" @keyup.enter="listOfCreators(searchInput)" type="text" class="input" placeholder="Search Creators">

        <div v-if="emptyUserInput">
           <p id="error">*No Creator Name was searched! </p>
        </div>

        <div v-if="creatorInfo.results == ''">
           <p id="error">*No Creators were found!</p>
        </div>

        <button id="character-button" class="button is-primary" @click="listOfCreators(searchInput)">
        Search Creators
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
             <div class="tile is-child box" v-for="info in creatorInfo.results" :key="info.id" >
               <div id="character-names" class="title">
                 <div @click="getCreatorInfo(info)">
                   <p> {{info.fullName}}</p>
                   <img :src="info.thumbnail.path + '.' + info.thumbnail.extension" height="8%" width="8%">
                 </div>
               </div>
             </div>
           </div>
         </div>
    </div>

    <div v-show="creatorResults" v-for="list in creatorListInfo.results"  :key="list.id">
            
            <div id="result-container" class="tile is-parent is-8" >
              <div class="tile is-child box">
                <div class="columns is-mobile">
                  <div class="column is-6 is-offset-1 ">
                    <p class="title">{{list.fullName}}'s Infomation:</p>
                    <p class="subtitle" v-if="list.description == '' || list.description == null"> <strong>Description:</strong> --This Creator has no Description Available--</p>
                    <p class="subtitle" v-else > <strong>Description:</strong> {{list.description}}</p>
                     <!-- <div id="selected-character">  -->
                    <img  :src="list.thumbnail.path + '.' + list.thumbnail.extension" >
                     <!-- </div> -->     
                  </div>
                  <div id="character-comics" >
                        <p class="box"> Created <strong>{{list.comics.items.length}}</strong> Comics:</p>
                        <p v-if="list.comics.items == ''">--No Comics Avaliable--</p>
                        <ul v-else v-for="comics in list.comics.items" :key="comics.id">
                          {{comics.name}}
                          <hr>
                        </ul>
                  </div> 
                </div>  
              </div>
            </div>
            
            <button id="new-search-button" class="button" @click="newCreatorSearch()"> New Search </button>
    </div>
 
  </div>

</template>

<script>
import axios from "axios";
import Search from "./Search.vue";

export default {
  name: "creators-search",
  data() {
    return {
      search: false,
      creatorResults: false,
      newSearch: false,
      categoriesOptions: true,
      emptyUserInput: false,
      searching: false,
      creatorInfo: {},
      creatorListInfo: {},
      image: "",
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
    listOfCreators: function(searchInput) {
      this.$router.push({ path: `/Creators` });
      let vm = this;
      this.searching = true;
      this.creatorResults = false;
      if (searchInput === "") {
        this.emptyUserInput = true;
        this.searching = false;
        return;
      } else {
        this.search = true;
        this.categoriesOptions = false;
        this.emptyUserInput = false;

        axios
          .get(`http://localhost:8080/api/Creators?cr=${searchInput}`)
          .then(response => {
            vm.creatorInfo = response.data;
            vm.searching = false;
            this.addQuery({
              query: `${vm.searchInput}`,
              option: "Creators",
              results: response.data
            });
          });
      }
    },

    getCreatorInfo: function(name) {
      this.search = false;
      this.newSearch = true;
      this.categoriesOptions = false;
      let vm = this;

      axios
        .get(`http://localhost:8080/api/Creators/${name.id}`)
        .then(response => {
          vm.creatorListInfo = response.data;
          vm.creatorResults = true;
        })
        .catch(err=>{console.log(err)});
    },

    newCreatorSearch() {
      this.$router.push({ path: `/Creators` });
      this.searchInput = "";
      this.search = false;
      this.creatorResults = false;
      this.categoriesOptions = true;

      console.log("New Search");
    },
    addQuery(query) {
      this.$socket.emit("addQuery", query);
    },
    prevQueryCheck() {
      this.$emit("categoryMatch", "Creators");
      if (
        this.$route.params.index !== undefined &&
        this.$route.params.index >= 0
      ) {
        this.creatorInfo = this.$root.$data.queries[
          this.$route.params.index
        ].results;
        this.search = true;
        this.creatorResults = false;
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
  margin-left: 200px;
}

.input {
  margin-bottom: 1em;
}

#character-comics {
  float: right;
  margin-left: 100px;
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

.button{
	background-color: blue;
}
</style>
