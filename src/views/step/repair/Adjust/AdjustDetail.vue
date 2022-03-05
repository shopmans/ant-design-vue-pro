<template>
  <page-header-wrapper>
    <adjustInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import adjustInfo from '../../modules/AdjustInfo'

export default {
  components: {
    adjustInfo
  },
  methods: {
      cancelDetail () {
        this.$router.back(-1)
    }
  }
}
</script>

<style>

</style>
