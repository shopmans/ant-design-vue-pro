<template>
  <page-header-wrapper>
    <adjustInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
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
        this.$router.push({ path: '/step/steplist' })
    }
  }
}
</script>

<style>

</style>
