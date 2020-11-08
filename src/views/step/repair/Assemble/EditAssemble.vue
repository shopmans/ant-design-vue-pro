<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <!-- 阀门组装 -->
      <a-card v-if="valveAB" title="阀门组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-descriptions title="阀盖">
              <a-descriptions-item>
                阀盖螺栓扭矩标准值:  {{ getValveCoverBoltTorqueUnitText(baseData.valve_cover_bolt_torque, baseData.valve_cover_bolt_torque_unit) }}<br>
                阀盖螺栓材质:  {{ getValveCoverBoltMaterialUnitNA() }}<br>
                阀盖螺栓尺寸:  {{ getValveSizeUnitTextNA(baseData.valve_cover_bolt_size, baseData.valve_cover_bolt_size_unit) }}<br>
                阀盖螺栓工具:  {{ getValveSizeUnitTextNA(baseData.valve_cover_bolt_tool, baseData.valve_cover_bolt_tool_unit) }}<br>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
          <a-col :span="8">
            <a-descriptions title="阀座">
              <a-descriptions-item>
                阀座螺栓扭矩标准值: {{ getValveSeatBoltTorque() }}<br>
                阀座螺栓工具: {{ getValveSeatBoltTool() }}
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
        <a-divider style="margin-bottom: 32px"/>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item>
              <div class="linehight">工时(分钟)</div>
              <a-input-number
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'assemble_valve_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="23">
            <a-form-item label="组装内容">
              <a-textarea
                rows="6"
                v-decorator="[
                  'valve_assemble_content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <template v-if="isGetTearDownData">拆解数据为空</template>
      <template v-else><br><br></template>

      <!-- 执行机构组装 -->
      <a-card v-if="actuatorAB" title="执行机构组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-descriptions title="">
              <a-descriptions-item>
                膜盖/缸盖螺栓扭矩标准值:  {{ getValveCoverBoltTorqueUnitTextNA(actuatorData.actu_cover_bolt_torque, actuatorData.actu_cover_bolt_torque_unit) }}<br>
                膜盖/缸盖螺栓材质:  {{ getValveCoverBoltMaterialUnit(actuatorData.actu_cover_bolt_material) }}<br>
                膜盖/缸盖螺栓尺寸:  {{ getValveSizeUnitTextNA(actuatorData.actu_cover_bolt_size, actuatorData.actu_cover_bolt_size_unit) }}<br>
                膜盖/缸盖螺栓工具:  {{ getActuCoverBoltToolItemUnitTextNA(actuatorData.actu_cover_bolt_tool, actuatorData.actu_cover_bolt_tool_unit, actuatorData.actu_cover_bolt_tool_item) }}<br>
              </a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
        <a-divider style="margin-bottom: 32px"/>
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item
              label="气源压力测试">
              <a-input
                v-decorator="[
                  'valve_assemble_air_pressed',
                  {rules: [{ message: '请输入口径'}]}
                ]">
                <a-select v-decorator="[ 'valve_assemble_air_pressed_unit', {rules: [{ message: '请选择单位'}]}]" slot="addonAfter" style="width: 80px">
                  <a-select-option value="1">
                    PSI
                  </a-select-option>
                  <a-select-option value="2">
                    BAR
                  </a-select-option>
                  <a-select-option value="3">
                    MPa
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">气密性测试</div>
              <a-radio-group v-decorator="['valve_assemble_air_tightness_is_success', { } ]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item>
              <div class="linehight">Bench Set测试</div>
              <a-radio-group v-decorator="['valve_assemble_benchset_is_success', { } ]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="2">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item>
              <div class="linehight">工时(分钟)</div>
              <a-input-number
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'assemble_actuator_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="23">
            <a-form-item label="组装内容">
              <a-textarea
                rows="6"
                v-decorator="[
                  'actuator_assemble_content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br><br>

      <!-- 执行机构组装
      <a-card v-if="accessoryAB" title="附件组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item>
              <div class="linehight">工时(分钟)</div>
              <a-input-number
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'assemble_accessory_total_minute',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="23">
            <a-form-item label="组装内容">
              <a-textarea
                rows="6"
                v-decorator="[
                  'accessory_assemble_content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card> -->

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br><br>

    <!-- 文件上传 -->
    <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
      <UploadImg ref="uploadImg" :QueueType="3" :isMobile="isMobile" />
    </a-card>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData, getValveCoverBoltTorqueUnit, getValveCoverBoltMaterialUnit, getValveSizeUnit,
  getValveSeatLeakTestUnit, getActuSpringSetPressureUnit, getActuCoverBoltToolItemUnit, getValveCoverBoltTorqueUnitText, getValveSizeUnitText,
  getActuCoverBoltToolItemUnitTextNA, getValveCoverBoltTorqueUnitTextNA, getValveSizeUnitTextNA } from '@/api/step'
  import { saveAssembleData } from '@/api/assemble'
  import UploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const assembleFields = ['assemble_valve_total_minute', 'assemble_actuator_total_minute', 'assemble_accessory_total_minute',
  'valve_assemble_content', 'actuator_assemble_content', 'accessory_assemble_content', 'valve_assemble_air_pressed', 'valve_assemble_air_pressed_unit',
  'valve_assemble_air_tightness_is_success', 'valve_assemble_benchset_is_success']

  export default {
    name: 'Assemble',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      UploadImg,
      stepDetail,
      stepAllDetailModel
    },
    methods: {
      getValveCoverBoltTorqueUnit,
      getValveCoverBoltMaterialUnit,
      getValveSizeUnit,
      getValveSeatLeakTestUnit,
      getActuSpringSetPressureUnit,
      getActuCoverBoltToolItemUnit,
      getValveCoverBoltTorqueUnitText,
      getValveSizeUnitText,
      getActuCoverBoltToolItemUnitTextNA,
      getValveCoverBoltTorqueUnitTextNA,
      getValveSizeUnitTextNA,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.uploads = this.$refs.uploadImg.imgFileList

            saveAssembleData(values).then(res => {
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
        this.$refs.stepAllDetailModel.showSetpDetailData(this.flowID, this.currentStep)
      },
      handleStepDone () {
        const letThis = this
        this.$confirm({
          title: '结束流程',
          content: '确定要结束流程？',
          okText: '确认',
          cancelText: '取消',
          onOk () {
            stepDone({ id: letThis.flowID, current_step: letThis.currentStep }).then(res => {
                // 刷新表格
                letThis.$message.info('结束流程成功')
                letThis.$router.push({ path: '/step/steplist' })
            })
          }
        })
      },
      getValveSeatBoltTorque () {
        if (!this.baseData.valve_seat_bolt_torque || this.baseData.valve_seat_bolt_torque.length <= 0) {
          return 'N/A'
        }
        return this.baseData.valve_seat_bolt_torque + ' ' + getValveCoverBoltTorqueUnit(this.baseData.valve_seat_bolt_torque_unit)
      },
      getValveSeatBoltTool () {
        if (!this.baseData.valve_seat_bolt_tool || this.baseData.valve_seat_bolt_tool.length <= 0) {
          return 'N/A'
        }
        return this.baseData.valve_seat_bolt_tool + ' ' + getValveSizeUnit(this.baseData.valve_seat_bolt_tool_unit)
      },
      getValveCoverBoltMaterialUnitNA () {
        const tmpValue = getValveCoverBoltMaterialUnit(this.baseData.valve_cover_bolt_material)
        if (tmpValue.length <= 0) {
          return 'N/A'
        }

        return tmpValue
      }
    },
    mounted () {
      // 防止表单未注册
      assembleFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step

      if (editData.step_data.length > 0) {
        const uploadFiles = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(uploadFiles, assembleFields))
        this.$refs.uploadImg.imgFileList = uploadFiles.uploads
      }

      // 根据拆解的工时》0的结果决定组装显示内容
      queryStepData({ id: this.flowID, current_step: 'TearDown' }).then(res => {
        if (!res.result.step_data || res.result.step_data.length <= 0) {
          this.isGetTearDownData = true
          return
        }
        this.tearDownData = JSON.parse(res.result.step_data[0].JSON)

        this.valveAB = this.tearDownData.teardown_valve_total_minute && this.tearDownData.teardown_valve_total_minute > 0
        this.actuatorAB = this.tearDownData.teardown_actuator_total_minute && this.tearDownData.teardown_actuator_total_minute > 0
        this.accessoryAB = this.tearDownData.teardown_accessory_total_minute && this.tearDownData.teardown_accessory_total_minute > 0

        queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
          res.result.step_data.forEach(stepItem => {
            switch (stepItem.DataNum) {
              case 2: // 阀
                if (this.valveAB) { this.baseData = JSON.parse(stepItem.JSON) }
                break
              case 3: // 执行机构
                if (this.actuatorAB) { this.actuatorData = JSON.parse(stepItem.JSON) }
                break
              case 4: // 附件
                if (this.accessoryAB) { this.accessorData = JSON.parse(stepItem.JSON) }
                break
            }
          })
        })
      })

      // // 获取引用数据（维修前测试选择的维修东东）
      // getSelectRepairData({ FlowID: this.flowID }).then(res => {
      //   // 阀门 "1"
      //   // 执行机构 "2"
      //   // 阀门+执行机构 "3"
      //   // 阀门+执行机构+附件 "4"
      //   // 零部件 "5"
      //   // 执行机构+附件 "6"
      //   switch (res.select_repair) { // 与 baseInfo 选择的维修部件下拉列表一致
      //     case '1': { // 阀门维修
      //       this.valveAB = true
      //       break
      //     }
      //     case '2': { // 执行机构维修
      //       this.actuatorAB = true
      //       break
      //     }
      //     case '3': { // 阀门+执行机构
      //       this.valveAB = true
      //       this.actuatorAB = true
      //       break
      //     }
      //     case '4': { // 阀门+执行机构+附件
      //       this.valveAB = true
      //       this.actuatorAB = true
      //       this.accessoryAB = true
      //       break
      //     }
      //     case '6': { // 执行机构+附件
      //       this.accessoryAB = true
      //       this.actuatorAB = true
      //       break
      //     }
      //   }
      // })
    },
    data () {
      return {
        form: this.$form.createForm(this),
        accessoryAB: false,
        actuatorAB: false,
        valveAB: false,
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        stepDetailvisible: false,
        baseData: {},
        actuatorData: {},
        accessorData: {},
        tearDownData: {},
        isGetTearDownData: false
      }
    }
  }
</script>

<style>

</style>
