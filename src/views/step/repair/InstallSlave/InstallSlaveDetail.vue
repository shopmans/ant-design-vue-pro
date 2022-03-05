<template>
  <page-header-wrapper>
    <installSlaveInfo />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import installSlaveInfo from '../../modules/InstallSlaveInfo'

export default {
  components: {
    installSlaveInfo
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
