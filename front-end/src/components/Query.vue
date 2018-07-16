<template>
	<div class="box" @click="showPrevQuery()">
        <p>
            Query: {{obj.query}}
        </p>
        <p>
            Option: {{obj.option}}
        </p>
	</div>
</template>

<script>
export default {
  name: "query",
  created: function() {
    this.obj = this.objIn;
    this.index = this.indexIn;
  },
  data() {
    return {
      obj: {},
      index: -1
    };
  },
  props: ["objIn", "indexIn"],
  methods: {
    showPrevQuery(index) {
      this.$router.push({ path: `/${this.obj.option}/${this.index}` });
    }
  }
};
</script>

<style scoped>
.box:hover {
  background-color: lightgray;
}
</style>