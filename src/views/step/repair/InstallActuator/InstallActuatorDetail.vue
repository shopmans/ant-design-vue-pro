<template>
  <page-header-wrapper>
    <installActuator />
    <br>
    <a-button type="primary" @click="cancelDetail">返回</a-button>
  </page-header-wrapper>
</template>

<script>
import installActuator from '../../modules/InstallActuatorInfo'

export default {
  components: {
    installActuator
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
