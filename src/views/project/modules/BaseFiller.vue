<template>
  <a-modal
    :width="800"
    :visible="showModel"
    title="填料信息"
    @ok="() => { showModel=false }"
    @cancel="() => { showModel=false }">
    <a-card title="填料信息" :headStyle="{fontWeight:'bold'}" >
      <a-table
        :columns="BaseFillerColumnNames()"
        :dataSource="baseFillerSource"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in BaseFillerColumns()" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="BaseFillerColumnNames()[i].title"
            @change="e => handleBaseFillerChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
      </a-table>
    </a-card>
  </a-modal>
</template>

<script>
import { BaseFillerColumns, BaseFillerColumnNames } from '@/api/step'

export default {
    methods: {
      BaseFillerColumns,
      BaseFillerColumnNames,
      show (data) {
          this.baseFillerSource = data
          this.showModel = true
      }
    },
    data () {
      return {
        memberLoading: false,
        showModel: false,
        baseFillerSource: []
      }
    }
}
</script>

<style>

</style>
