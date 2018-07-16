<template>
    <div class="tile is-child is-4 box" @click="showOnClick()">
        <img :src="image" width="30%" height="30%" />
        <div >
            <strong>{{result.title}}</strong>
        </div>
        <div class="modal is-active" v-if="show">
            <div class="modal-background"></div>
            <div class="modal-content box">
                <p>
                    <strong>{{result.title}}</strong>
                </p>
                <p>
                    <strong>ID:</strong> {{result.id}}
                </p>
                <img :src="image" width="50%" height="50%"/>
                <p v-if="result.description"><strong>Description:</strong></p>
                <div v-if="result.description">
                    {{result.description}}
                </div>
                <p v-if="result.creators.items.length > 1"><strong>Creators:</strong></p>
                <div v-for="creator in result.creators.items" v-if="result.creators.items.length > 1" :key="creator.name">
                    <p>Name: {{creator.name}}</p>
                    <p>Role: {{creator.role}}</p>
                </div>
                <p v-if="result.series.name.length > 1"><strong>Series:</strong></p>
                <div>
                    {{result.series.name}}
                </div>
                <p v-if="result.stories.items.length > 1"><strong>Stories:</strong></p>
                <div v-if="result.stories.items.length > 1" v-for="(stories, index) in result.stories.items" :key="index">
                    {{stories.name}}
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>

<script>
export default {
  name: "result",
  created: function() {
    this.image = `${this.result.thumbnail.path}.${
      this.result.thumbnail.extension
    }`;
  },
  data() {
    return {
      image: "",
      show: false
    };
  },
  methods: {
    showOnClick() {
      this.show = !this.show;
    }
  },
  props: ["result"]
};
</script>

<style scoped>
.is-child:hover {
  background-color: lightblue;
}
</style>