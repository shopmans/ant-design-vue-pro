<template>
  <page-header-wrapper>
    <finalCheckInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import finalCheckInfo from '../../modules/FinalCheckInfo'

export default {
  components: {
    finalCheckInfo
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
