<template>
  <page-header-wrapper>
    <leakPressureTestInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import leakPressureTestInfo from '../../modules/LeakPressureTestInfo'

export default {
  components: {
    leakPressureTestInfo
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
