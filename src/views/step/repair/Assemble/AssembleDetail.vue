<template>
  <page-header-wrapper>
    <assembleInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">取消</a-button>
  </page-header-wrapper>
</template>

<script>
import assembleInfo from '../../modules/AssembleInfo'

export default {
  components: {
    assembleInfo
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
