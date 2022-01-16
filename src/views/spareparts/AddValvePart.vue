<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <a-form class="permission-form" :form="form">
        <a-row :gutter="24">
          <!-- 序列号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.serial')">
              <a-input v-decorator="['serial', { rules: [{required: true, message: $t('menu.spare_parts.valve.serial')}] }]" />
            </a-form-item>
          </a-col>
          <!-- 位号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.tag')">
              <a-input v-decorator="['tag', { rules: [{required: true, message: $t('menu.spare_parts.valve.tag')}] }]" />
            </a-form-item>
          </a-col>
          <!-- 阀门尺寸 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.size')">
              <a-input v-decorator="['size', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀型 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.model')">
              <a-input v-decorator="['model', {}]" />
            </a-form-item>
          </a-col>
          <!-- 执行机构 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.actuator')">
              <a-input v-decorator="['actuator', {}]" />
            </a-form-item>
          </a-col>
          <!-- 介质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.medium')">
              <a-input v-decorator="['medium', {}]" />
            </a-form-item>
          </a-col>
          <!-- 压力等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.pressure_level')">
              <a-input v-decorator="['pressure_level', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀体材质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.body_material')">
              <a-input v-decorator="['body_material', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀杆材质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.stem_material')">
              <a-input v-decorator="['stem_material', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀芯材质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.spool_material')">
              <a-input v-decorator="['spool_material', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀座材质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.seat_material')">
              <a-input v-decorator="['seat_material', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀笼材质 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.cage_material')">
              <a-input v-decorator="['cage_material', {}]" />
            </a-form-item>
          </a-col>
          <!-- 流量特性 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.flow_characteristics')">
              <a-input v-decorator="['flow_characteristics', {}]" />
            </a-form-item>
          </a-col>
          <!-- 泄漏等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.leakage_level')">
              <a-input v-decorator="['leakage_level', {}]" />
            </a-form-item>
          </a-col>
          <!-- 填料类型 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.packing_type')">
              <a-input v-decorator="['packing_type', {}]" />
            </a-form-item>
          </a-col>
          <!-- 行程 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.travel')">
              <a-input v-decorator="['travel', {}]" />
            </a-form-item>
          </a-col>
          <!-- Benchset -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.benchset')">
              <a-input v-decorator="['benchset', {}]" />
            </a-form-item>
          </a-col>
          <!-- 装置 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.device')">
              <a-input v-decorator="['device', {}]" />
            </a-form-item>
          </a-col>
          <!-- 用途 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.use')">
              <a-input v-decorator="['use', {}]" />
            </a-form-item>
          </a-col>
          <!-- 附件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.attachment')">
              <a-input v-decorator="['attachment', {}]" />
            </a-form-item>
          </a-col>
          <!-- 阀门订单号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.order_number')">
              <a-input v-decorator="['order_number', {}]" />
            </a-form-item>
          </a-col>
          <!-- 备注 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.memo')">
              <a-input v-decorator="['memo', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input hidden v-decorator="['id', {}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <div style="float: right">
          <footer-tool-bar>
            <a-button htmlType="submit" type="primary" @click="handleOk">保存</a-button>
          </footer-tool-bar>
        </div>
      </a-form>
    </a-card>
  </page-header-wrapper>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
import { addSpareParts } from '@/api/spareParts'

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
      this.form.validateFields((errors, values) => {
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
                addSpareParts(values).then(res => {
                    this.$message.info(this.$t('menu.user.manager.new.successful'))
                    // 重置表单数据
                    this.form.resetFields()
                })
            }
        })
      })
    }
  }
}
</script>

<style>

</style>
