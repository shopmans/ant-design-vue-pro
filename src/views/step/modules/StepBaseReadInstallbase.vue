<template>
  <a-modal @ok="selectInstallbaseOk" @cancel="handleCancel" :width="1224" :visible="visible" title="读取Installbase">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="阀门序列号/批次号">
              <a-input v-model="queryParam.serial" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item :label="$t('menu.customer.new.finallyUser')">
              <a-input v-model="queryParam.customerName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item :label="$t('menu.customer.installbase.factory')">
              <a-input v-model="queryParam.factroy" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="queryInstallbase">{{ this.$t('menu.project.view.query.query') }}</a-button>
              <a-button style="margin-left: 8px" @click="resetQuery">{{ this.$t('menu.project.view.query.reset') }}</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      :data="loadData"
      :loading="false"
      :scroll="{ x: 7500 }"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :columns="getInstallbaseCloumes()"
      rowKey="ID"
    >
      <template v-for="(item) in getInstallbaseCloumes()" :slot="item.slotName">
        <span :key="item.ID">{{ $t(item.slotName) }}</span>
      </template>
    </s-table>
  </a-modal>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getInstallbaseCloumes } from '@/api/step'
import { sparePartsList } from '@/api/spareParts'

export default {
    name: 'StepbaseQueryInstallbase',
    components: {
        STable,
        Ellipsis
    },
    data () {
        return {
            selectedRowKeys: [],
            visible: false,
            // 查询参数
            queryParam: {},
            loadData: parameter => {
                const requestParameters = Object.assign({}, parameter, this.queryParam)

                return sparePartsList(requestParameters).then(res => {
                    return res.result
                })
            }
        }
    },
    methods: {
        getInstallbaseCloumes,
        handleCancel () {
            this.visible = false
        },
        selectInstallbaseOk () {
            this.$emit('selectInstallbase', this.selectedRowKeys[0])
            this.visible = false
        },
        onSelectChange (selectedRowKeys) {
            if (selectedRowKeys.length > 1) {
                this.selectedRowKeys.length = 0
                this.selectedRowKeys.push(selectedRowKeys[selectedRowKeys.length - 1])
            } else {
                this.selectedRowKeys = selectedRowKeys
            }
        },
        resetQuery () {
            this.queryParam = {}
            this.$refs.table.refresh(true)
        },
        queryInstallbase () {
            this.$refs.table.refresh(true)
        }
    }
}
</script>

<style>

</style>
