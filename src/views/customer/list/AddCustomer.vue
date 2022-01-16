<template>
  <div>
    <page-header-wrapper>
      <a-card title="收货" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-form class="permission-form" :form="form">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.query.companyType')">
                <a-select v-decorator="['class', { rules: [{}] }]" :allowClear="true" >
                  <a-select-option value="1">{{ $t('menu.customer.query.companyType.item1') }}</a-select-option>
                  <a-select-option value="2">{{ $t('menu.customer.query.companyType.item2') }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.query.businessCode')">
                <a-input v-decorator="['code', { rules: [{required: true, message: $t('menu.customer.new.businessCode.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.group')">
                <a-select v-decorator="['group_name', { initialValue: '1', rules: [{required: true, message: $t('menu.customer.new.group.require')}] }]" :allowClear="true">
                  <a-select-option value="1">{{ $t('menu.customer.new.finallyUser') }}</a-select-option>
                  <a-select-option value="2">OEM</a-select-option>
                  <a-select-option value="3">EPC</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.companyName')">
                <a-input v-decorator="['customer_name', { rules: [{required: true, message: $t('menu.customer.new.companyName.require')}] }]" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item :label="$t('menu.customer.new.companyEnName')">
                <a-input v-decorator="['customer_en_name', { rules: [{required: false, message: $t('menu.customer.new.companyEnName.requir')}] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-input hidden v-decorator="['id', {rules: []}]"></a-input>
          </a-form-item>
        </a-form>

        <div style="float: right">
          <footer-tool-bar>
            <a-button htmlType="submit" type="primary" @click="handleOk">保存</a-button>
          </footer-tool-bar>
        </div>
      </a-card>
    </page-header-wrapper>
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { addCustomer } from '@/api/customer'

export default {
  components: {
    FooterToolBar
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleOk (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          addCustomer(values).then(res => {
              this.$message.info(this.$t('menu.user.manager.new.newSuccessful'))
              // 重置表单数据
              this.form.resetFields()
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
