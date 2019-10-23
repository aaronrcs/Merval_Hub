<template>
  <div class="search">
    <h1>{{ welcome_message }}</h1>
    <h1>Searched Results: </h1>

  <!-- <div >
    <CharacterSearch
    :option="searchOpt"
    />
  </div> -->
    
    <select v-model="searchOpt">
      <option selected>Characters</option>
      <option>Events</option>
      <option>Comics</option>
      <option>Series</option>
    </select>   
  </div>

</template>

<script>
import axios from 'axios'
// import CharacterSearch from './CharacterSearch.vue'

export default {
  name: 'search',
  data () {
    return {
      welcome_message: 'Welcome to the Merval App',
      search:false,
      characterResults: false,
      newSearch: false,
      characterButtons:false,
      userInput: true,
      characterInfo: {},
      characterInfoList: {},
      image: '',
      searchInput: '',
      searchOpt: 'Characters',
      image_urls: ''
    }
  },
  components: {
    // CharacterSearch
  },
  
  methods: {
    listOfCharacters: function(searchInput, searchOpt) {
      // this.CharacterSearch.listOfCharacters(searchInput, searchOpt)
      this.search = true
      this.userInput = false
      let vm = this
      this.characterButtons = true
      const searchKey = vm.searchOptionKey(searchOpt)
      console.log("Search:");
      axios.get(`http://localhost:8080/api/${searchOpt}?${searchKey}=${searchInput}`)
      .then(response => {  
        vm.characterInfo = response.data
      })
    },
    searchOptionKey: function(searchOpt){
      if (searchOpt === "Characters")
        return "ch"
      if (searchOpt === "Events")
        return "e"
      if (searchOpt === "Comics")
        return "co"
      if (searchOpt === "Series")
        return "se"
    },

    getCharacterInfo: function(name, searchOpt){      
      console.log("Character choosen: " + name.name);
      console.log(name.id + "'s Id");
      this.search = false
      this.characterResults = true
      this.newSearch = true

      let vm = this

      axios.get(`http://localhost:8080/api/${searchOpt}/${name.id}`)
      .then(response =>{
        vm.characterInfoList = response.data // object of data properties. you can access the name, id, and results
      })

    },

    newCharacterSearch(){
     this.search = true
     this.characterResults = false
     this.userInput = true
     this.characterButtons = false

      console.log("New Search")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
