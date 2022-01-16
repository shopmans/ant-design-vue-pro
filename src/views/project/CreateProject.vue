<template>
  <a-spin :spinning="loading">
    <page-header-wrapper>
      <a-card title="新建工程" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-form :form="form" v-bind="formLayout">
          <a-row :gutter="16">
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.detail.repairShop')">
                <a-select v-decorator="[ 'repair_plan', {rules: [{ required: true, message: $t('menu.project.new.repairShop.require')}]} ]" :allowClear="true">
                  <a-select-option value="1">{{ $t('menu.project.detail.repairShop.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.project.detail.repairShop.item2') }}</a-select-option>
                  <a-select-option value="3">{{ $t('menu.project.detail.repairShop.item3') }}</a-select-option>
                  <a-select-option value="4">{{ $t('menu.project.detail.repairShop.item4') }}</a-select-option>
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
                  @change="handleCustomerChange"
                  v-decorator="[ 'customer_id', {rules: [{ required: true, message: $t('menu.project.new.customerName.require')}]} ]"
                >
                  <a-select-option v-for="d in customerData" :key="d.value">
                    {{ d.text }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.customer.new.finallyUser')">
                <a-input
                  v-decorator="[
                    'finally_user',
                    {rules: [{}]}
                  ]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.view.table.column.sales')">
                <a-select
                  :default-active-first-option="false"
                  :show-arrow="false"
                  :filter-option="false"
                  :not-found-content="null"
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
                  :maxLength="10"
                  v-decorator="[
                    'serial',
                    {rules: [{ required: true, message: $t('menu.project.new.projectNumber.require')}]}
                  ]" />
              </a-form-item>
            </a-col>
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
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.view.query.projectState')">
                <a-select v-decorator="['state', { initialValue:'1' }, {rules: []}]" :disabled="projectStateDisable" :allowClear="true">
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
            <!-- 负责人1 -->
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.principal1')">
                <a-input
                  v-decorator="[
                    'principal1',
                    {rules: [{ }]}
                  ]" />
              </a-form-item>
            </a-col>
            <!-- 负责人2 -->
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.principal2')">
                <a-input
                  v-decorator="[
                    'principal2',
                    {rules: [{ }]}
                  ]" />
              </a-form-item>
            </a-col>
            <!-- 负责人3 -->
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item :label="$t('menu.project.principal3')">
                <a-input
                  v-decorator="[
                    'principal3',
                    {rules: [{ }]}
                  ]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <input v-decorator="['id', {rules: []}]" value="" hidden />
          </a-form-item>

          <div style="float: right">
            <footer-tool-bar>
              <a-button @click="handleReturn" style="margin-right: 20px;">返回</a-button>
              <a-button htmlType="submit" type="primary" @click="handleOk">保存</a-button>
            </footer-tool-bar>
          </div>
        </a-form>
      </a-card>
    </page-header-wrapper>
  </a-spin>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import moment from 'moment'
import pick from 'lodash.pick'
import { fetch } from '../../utils/inputSearch'
import SearchInput from '@/components/Flow/SearchInput'
import { getProjectSerial, newProject } from '@/api/project'
import { getCustomerById } from '@/api/customer'
import { getUserList } from '@/api/user'

// 表单字段
const fields = ['id', 'repair_plan', 'customer_id', 'sales_id', 'serial', 'number', 'total', 'ex_open_date', 'ex_close_date', 'ex_working_hours',
'ex_material_fee', 'parts_order_no', 'contract_serial', 'state', 'finally_user', 'principal1', 'principal2', 'principal3']

export default {
  components: {
    SearchInput,
    FooterToolBar
  },
  props: {
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

    // 查询所有销售
    getUserList({ position: 1, pageSize: 9999999, pageNo: 1 }).then(e => {
      e.result.data.forEach(item => {
        this.salesData.push({ value: item.id, text: item.user_name })
      })
    })

    getProjectSerial().then(res => {
      let tmpRes = res + ''
      if (tmpRes.length <= 1) {
        tmpRes = '0' + tmpRes
      }
      this.form.setFieldsValue({ serial: moment().format('YYYYMMDD') + tmpRes })
    })
  },
  methods: {
    handleCustomerSearch (value) {
      fetch(value, data => (this.customerData = data), this.$t('input.customer.search'))
    },
    handleCustomerChange (customerId) {
      getCustomerById(customerId).then(e => {
        this.form.setFieldsValue({ finally_user: e.customer_name })
      })
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
    handleOk () {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          // 新增
          values.create_user_id = this.$store.state.user.info.id
          newProject(values).then(res => {
            // 重置表单数据
            this.form.resetFields()
            this.$router.push({ path: '/project/project-list' })
          })
          this.confirmLoading = false
        }
      })
    },
    handleReturn () {
      this.$router.push({ path: '/project/project-list' })
    }
  }
}
</script>
