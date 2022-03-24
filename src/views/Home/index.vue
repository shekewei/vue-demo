<template>
  <div class="home">
    {{ message }}
  </div>
</template>

<script>
export default {
  nmae: 'home',
  data() {
    return {
      message: 'Hello Vue',
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.home {
  color: red;
  user-select: none;
  font-size: 20px;
  font-weight: 700;
}
</style>
