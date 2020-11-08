<template>
  <page-header-wrapper>
    <finalCheckInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
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
        this.$router.push({ path: '/step/steplist' })
    }
  }
}
</script>

<style>

</style>
