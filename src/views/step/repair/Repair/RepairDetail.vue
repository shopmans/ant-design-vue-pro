<template>
  <page-header-wrapper>
    <repairInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import repairInfo from '../../modules/RepairInfo'

export default {
  components: {
    repairInfo
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
