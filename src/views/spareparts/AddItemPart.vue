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
          <!-- 阀门型号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.valve_model')">
              <a-input v-decorator="['valve_model', {}]" />
            </a-form-item>
          </a-col>
          <!-- 执行器型号 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.actuator_model')">
              <a-input v-decorator="['actuator_model', {}]" />
            </a-form-item>
          </a-col>
          <!-- 磅级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.pound_class')">
              <a-input v-decorator="['pound_class', {}]" />
            </a-form-item>
          </a-col>
          <!-- 特殊阀内件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.special_trims')">
              <a-input v-decorator="['special_trims', {}]" />
            </a-form-item>
          </a-col>
          <!-- 泄漏等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.leakage_level')">
              <a-input v-decorator="['leakage_level', {}]" />
            </a-form-item>
          </a-col>
          <!-- 用途 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.use')">
              <a-input v-decorator="['use', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐维修等级 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_maintenance_level')">
              <a-input v-decorator="['recommended_maintenance_level', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.packing') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['packing_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_number')">
              <a-input v-decorator="['packing_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.gasket') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['gasket_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_number')">
              <a-input v-decorator="['gasket_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.seatring') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['seatring_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['seatring_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.spoolsstem') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['spoolsstem_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['spoolsstem_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.bearing') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['bearing_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['bearing_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.cage') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['cage_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['cage_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-divider>{{ $t('menu.spare_parts.parts.diaphragm') }}</a-divider>
          <!-- 推荐备件 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['diaphragm_recommended_parts', {}]" />
            </a-form-item>
          </a-col>
          <!-- 推荐数量 -->
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.parts.recommended_parts')">
              <a-input v-decorator="['diaphragm_recommended_number', {}]" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input hidden v-decorator="['id', {}]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-form-item :label="$t('menu.spare_parts.valve.memo')">
              <a-input v-decorator="['memo', {}]" />
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
import { addParts } from '@/api/spareParts'

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
                addParts(values).then(res => {
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
