<template>
  <page-header-wrapper>
    <assembleInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
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
        this.$router.back(-1)
    }
  }
}
</script>

<style>

</style>
