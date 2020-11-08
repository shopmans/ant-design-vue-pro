<template>
  <a-modal
    :title="projectTitle"
    :width="1024"
    :visible="visible"
    :confirmLoading="loading"
    :maskClosable="false"
    :destroyOnClose="true"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.detail.repairShop')">
              <a-select v-decorator="[ 'repair_plan', {rules: [{ required: true, message: $t('menu.project.new.repairShop.require')}]} ]">
                <a-select-option value="1">{{ $t('menu.project.detail.repairShop.item1') }}</a-select-option>
                <a-select-option value="2">{{ $t('menu.project.detail.repairShop.item2') }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.view.query.customerName')">
              <a-select
                show-search
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                @search="handleCustomerSearch"
                v-decorator="[ 'customer_id', {rules: [{ required: true, message: $t('menu.project.new.customerName.require')}]} ]"
              >
                <a-select-option v-for="d in customerData" :key="d.value">
                  {{ d.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.view.table.column.sales')">
              <a-select
                show-search
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                @search="handleSalesSearch"
                v-decorator="[ 'sales_id', {rules: [{ required: true, message: $t('menu.project.new.salesName.require')}]} ]"
              >
                <a-select-option v-for="d in salesData" :key="d.value">
                  {{ d.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.view.query.projectSerial')">
              <a-input
                v-decorator="[
                  'serial',
                  {rules: [{ required: true, message: $t('menu.project.new.projectNumber.require')}]}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.detail.contractNumber')">
              <a-input
                v-decorator="[
                  'contract_serial',
                  {rules: [{ message: $t('menu.project.detail.contractNumber')}]}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.new.valveNumber')">
              <a-input-number
                style="width:100%;"
                :precision="0"
                :min="0"
                v-decorator="[
                  'number',
                  {rules: [{ required: true, message: $t('menu.project.new.valveNumber.require')}]}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.new.contractTotal')">
              <a-input-number
                style="width:100%;"
                :min="0"
                :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\￥\s?|(,*)/g, '')"
                :precision="2"
                v-decorator="[
                  'total',
                  {rules: [{ required: false, message: $t('menu.project.new.contractTotal.require')}]}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.detail.estStartDate')">
              <a-date-picker
                :format="format"
                style="width:100%;"
                v-decorator="[
                  'ex_open_date',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.detail.estCloseDate')">
              <a-date-picker
                :format="format"
                style="width:100%;"
                v-decorator="[
                  'ex_close_date',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.detail.estMaterialCost')">
              <a-input-number
                style="width:100%;"
                :precision="2"
                :min="0"
                v-decorator="[
                  'ex_material_fee',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.new.estWorkTime')">
              <a-input-number
                style="width:100%;"
                :precision="0"
                :min="0"
                v-decorator="[
                  'ex_working_hours',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.new.partsPurchaseNumber')">
              <a-input
                style="width:100%;"
                v-decorator="[
                  'parts_order_no',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="12" :md="12" :sm="24">
            <a-form-item :label="$t('menu.project.view.query.projectState')">
              <a-select v-decorator="['state', { initialValue:'1' }, {rules: []}]" :disabled="projectStateDisable">
                <a-select-option value="1">
                  {{ $t('menu.project.view.query.projectState.item1') }}
                </a-select-option>
                <a-select-option value="2">
                  {{ $t('menu.project.view.query.projectState.item2') }}
                </a-select-option>
                <a-select-option value="3">
                  {{ $t('menu.project.view.query.projectState.item3') }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <input v-decorator="['id', {rules: []}]" value="" hidden />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import moment from 'moment'
import pick from 'lodash.pick'
import { fetch } from '../../../utils/inputSearch'
import SearchInput from '@/components/Flow/SearchInput'
import { getProjectSerial } from '@/api/project'

// 表单字段
const fields = ['id', 'repair_plan', 'customer_id', 'sales_id', 'serial', 'number', 'total', 'ex_open_date', 'ex_close_date', 'ex_working_hours',
'ex_material_fee', 'parts_order_no', 'contract_serial', 'state']

export default {
  components: {
    SearchInput
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.format = 'YYYY-MM-DD'
    this.formLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 1 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this),
      customerData: [],
      salesData: [],
      projectStateDisable: true,
      projectTitle: ''
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    handleCustomerSearch (value) {
      fetch(value, data => (this.customerData = data), this.$t('input.customer.search'))
    },
    handleSalesSearch (value) {
      fetch(value, data => (this.salesData = data), this.$t('input.user.search'))
    },
    createProjectSerial () {
      this.projectTitle = this.$t('menu.project.new')
      getProjectSerial().then(res => {
        let tmpRes = res + ''
        if (tmpRes.length <= 1) {
          tmpRes = '0' + tmpRes
        }
        this.form.setFieldsValue({ serial: moment().format('YYYYMMDD') + tmpRes })
      })
    },
    editProject (data) {
      fields.forEach(v => this.form.getFieldDecorator(v))
      this.form.setFieldsValue(pick(data, fields))

      this.customerData.length = 0
      this.salesData.length = 0
      this.customerData.push({
        value: data.customer_id,
        text: data.customer_name
      })
      this.salesData.push({
        value: data.sales_id,
        text: data.sales_name
      })
      this.projectStateDisable = false
      this.projectTitle = this.$t('menu.project.edit')
    }
    // createContractSerial () {
    //   getContractSerial().then(res => {
    //     this.form.setFieldsValue({ contract_serial: moment().format('YYYYMMDD') + res })
    //   })
    // }
  }
}
</script>
