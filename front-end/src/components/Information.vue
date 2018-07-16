<template>
  <div class="search">
    <h1>{{ welcome_message }}</h1>
    <h1>Searched Results: </h1>

    <div v-for="info in characterInfo.results" class="results" v-show="search" :key="info">
        <div class="characters">
          <!-- <ul>
            <li>
                {{info.name}}
            </li>
         </ul> -->
         <button>
           {{info.name}}
         </button>
        </div>

        <!-- <div class="images" >
          <img :src="info.thumbnail.path + '.' + info.thumbnail.extension" width="20%">
       </div> -->

    </div>

    <input v-model="searchInput" type="text" id="search">

    <button v-on:click="searchCharacter(searchInput)">
      Search
    </button>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'search',
  data () {
    return {
      welcome_message: 'Welcome to the Merval App',
      image: '',
      characterInfo: {},
      search:false,
      searchInput: '',
      image_urls: ''
    }
  },
  methods: {
    searchCharacter: function(searchInput) {
      console.log("Search");
      axios.get(`http://localhost:8080/api/characters?ch=${searchInput}`)
      .then(response => {

        vm.characterInfo = response.data.data


      })
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
