<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="阀座泄漏测试" v-if="SeatLeakTest">
          <SeatLeakTest :valveData="valveData" v-if="SeatLeakTest" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="执行机构测试" v-if="ActuatorLeakTest">
          <ActuatorLeakTest v-if="ActuatorLeakTest" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="附件功能测试" v-if="AccessoryTest">
          <AccessoryTest v-if="AccessoryTest" />
        </a-tab-pane>
      </a-tabs>
      <a-card title="结论">
        <a-row class="form-row" :gutter="16">
          <a-col :span="24">
            <a-form-item>
              <div class="linehight"></div>
              <a-textarea
                rows="6"
                v-decorator="[
                  'prerepair_content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <br><br>

      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>

      <!-- 与首页 baseInfo 一致 -->
      <a-card title="选择维修部件">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="维修部件">
              <a-select
                v-decorator="[ 'prerepair_test_select_repair', {rules: [{ required: true, message: '请选择维修部件'}]}]" >
                <a-select-option value="1">阀门</a-select-option>
                <a-select-option value="2">执行机构</a-select-option>
                <a-select-option value="3">阀门+执行机构</a-select-option>
                <a-select-option value="4">阀门+执行机构+附件</a-select-option>
                <a-select-option value="6">执行机构+附件</a-select-option>
                <a-select-option value="5">零部件</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 文件上传 -->
      <br><br>
      <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <UploadImg ref="uploadImg" :QueueType="3" :isMobile="isMobile" />
      </a-card>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import { savePreRepairTest, getReferencePreRepairTestData } from '@/api/preRepairTest'
  import AccessoryTest from './AccessoryTest'
  import ActuatorLeakTest from './ActuatorLeakTest'
  import SeatLeakTest from './SeatLeakTest'
  import { stepDone } from '@/api/step'
  import UploadImg from '../../modules/UploadImg'
  import pick from 'lodash.pick'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const intoPreRepairFields = ['seat_leak_test_is_success', 'seat_leak_test_real_value', 'seat_leak_test_total_minute',
  'actuator_leak_test_is_success', 'actuator_leak_test_total_minute', 'accessory_locator_is_success', 'accessory_test_filter_reducing_valve_is_success',
  'accessory_test_position_switch_is_success', 'accessory_test_elec_valve_is_success', 'accessory_test_pneumatic_amplifier_is_success',
  'accessory_test_retaining_valve_is_success', 'accessory_test_other_is_success', 'prerepair_test_select_repair',
  'seat_leak_test_real_value_unit', 'seat_leak_test_real_pressed_unit', 'seat_leak_test_real_pressed', 'seat_leak_test_test_real_time',
  'actuator_leak_test_travel_is_success', 'actuator_leak_test_air_is_success', 'actuator_leak_test_benchset_is_success', 'prerepair_content',
  'accessory_test_memo']

  export default {
    name: 'PreRepairTest',
    mixins: [baseMixin],
    components: {
      AccessoryTest,
      ActuatorLeakTest,
      SeatLeakTest,
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        SeatLeakTest: false,
        ActuatorLeakTest: false,
        AccessoryTest: false,
        flow_id: '',
        current_step: '',
        baseInfoData: null,
        valveData: null
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flow_id
            values.current_step = this.current_step
            values.perrepair_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList
            savePreRepairTest(values).then(res => {
              // 清空数据
              this.$store.commit('SET_STEP_EDIT_DATA', null)
              // 刷新表格
              this.$router.push({ path: '/step/steplist' })
              this.$message.info('保存成功')

              // 重置表单数据
              this.form.resetFields()
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.push({ path: '/step/steplist' })
      },
      handleStepDetail () {
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flow_id, this.current_step)
      },
      handleStepDone () {
        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flow_id, current_step: letThis.current_step }).then(res => {
                // 刷新表格
                letThis.$message.info('结束流程成功')
                letThis.$router.push({ path: '/step/steplist' })
            })
          }
        })
      }
    },
    mounted () {
      // 防止表单未注册
      intoPreRepairFields.forEach(v => this.form.getFieldDecorator(v))
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData
      this.flow_id = editData.flow_id
      this.current_step = editData.current_step
      // 获取引用数据
      getReferencePreRepairTestData({ id: this.flow_id, current_step: '(start)' }).then(res => {
        const baseInfo = res.result.step_data
        baseInfo.forEach(item => {
          switch (item.DataNum) {
            case 2: { // 阀维修
              this.valveData = JSON.parse(item.JSON)
              this.SeatLeakTest = true
              break
            }
            case 3: { // 执行机构维修
              this.ActuatorLeakTest = true
              break
            }
            case 4: { // 附件
              this.AccessoryTest = true
              break
            }
          }
        })

        if (editData.step_data.length > 0) {
          const uploadFiles = JSON.parse(editData.step_data[0].JSON)
          this.form.setFieldsValue(pick(uploadFiles, intoPreRepairFields))
          this.$refs.uploadImg.imgFileList = uploadFiles.uploads
        }
      })
    }
  }
</script>

<style>

</style>
