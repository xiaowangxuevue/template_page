<template>
  <div>
    temp1-hh
  </div>
</template>

<script>


export default {
  name: "Index",
  components: {
  },
  data() {
    return {};
  },

  computed: {},
  watch: {},

  async created() {
    this.pageData = deepClone(image);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
