<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="http://www.sinocontrols.com.cn" target="_blank">{{ $t('app.title') }} {{ $t('app.version') }}</a>
    </template>
    <template v-slot:copyright>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
