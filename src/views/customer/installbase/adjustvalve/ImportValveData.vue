<template>
  <a-modal
    :width="500"
    :visible="visible"
    :maskClosable="false"
    :destroyOnClose="true"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-row :gutter="24">
      <a-col>
        <a-form-item :label="$t('menu.project.view.query.customerName')">
          <a-select
            show-search
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            @search="handleCustomerSearch"
            @change="handleCustomerChange"
            v-decorator="[ 'customer_id', {rules: [{ required: true, message: $t('menu.project.new.customerName.require')}]} ]"
            style="width:100%;"
          >
            <a-select-option v-for="d in customerData" :key="d.value">
              {{ d.text }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col>
        <a-form-item :label="$t('import.data.options')">
          <a-radio-group v-model="dataOption" name="valveDataPolicy" :default-value="1">
            <a-radio :value="1">
              相同序列号数据覆盖
            </a-radio>
            <a-radio :value="2">
              相同序列号数据忽略
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import { fetch } from '../../../../utils/inputSearch'

export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            customerData: [],
            selectCustomerId: 0,
            dataOption: 1
        }
    },
    methods: {
        handleCustomerSearch (value) {
            fetch(value, data => (this.customerData = data), this.$t('input.customer.search'))
        },
        handleCustomerChange (customerId) {
            this.selectCustomerId = customerId
        }
    }
}
</script>

<style>

</style>
