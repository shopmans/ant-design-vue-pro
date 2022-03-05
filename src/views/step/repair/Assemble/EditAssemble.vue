<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1" v-if="!isGetTearDownData" @change="tabChange">
        <!-- 阀门组装 -->
        <a-tab-pane key="1" tab="阀门组装" :forceRender="true" v-if="valveAB">
          <a-card title="阀门组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <template slot="extra">
              <a-checkbox v-model="assemble_valve_not_applicable" @change="valveNaChange">
                不适用
              </a-checkbox>
            </template>
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
                  <div class="linehight">工时(min)</div>
                  <a-input-number
                    :disabled="assemble_valve_not_applicable"
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
                    :disabled="assemble_valve_not_applicable"
                    rows="6"
                    v-decorator="[
                      'valve_assemble_content',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <!-- 执行人 -->
          <br>
          <a-card v-if="flowID" title="执行人" :headStyle="{fontWeight:'bold'}">
            <dispatchUser :disableAll="assemble_valve_not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'1'" />
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg ref="uploadImg1" :disableAll="assemble_valve_not_applicable" :isMobile="isMobile" :queueType="'3'" :flag="'1'" />
          </a-card>
        </a-tab-pane>

        <!-- 执行机构组装 -->
        <a-tab-pane key="2" tab="执行机构组装" :forceRender="true" v-if="actuatorAB">
          <a-card title="执行机构组装" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <template slot="extra">
              <a-checkbox v-model="assemble_actuator_not_applicable" @change="actuatorNaChange">
                不适用
              </a-checkbox>
            </template>
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
              <a-col :span="8">
                <a-descriptions title="">
                  <a-descriptions-item>
                    弹簧设置压力:  {{ actuatorData.actu_spring_set_pressure + " " + getActuSpringSetPressureUnit(actuatorData.actu_spring_set_pressure_unit) }}<br>
                    执行机构行程:  {{ getActuInstallTravelUnit(actuatorData.actu_install_travel, actuatorData.actu_install_travel_unit) }}
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
                    :disabled="assemble_actuator_not_applicable"
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
                  <div class="linehight">气密性测试是否合格</div>
                  <a-radio-group :disabled="assemble_actuator_not_applicable" v-decorator="['valve_assemble_air_tightness_is_success', { } ]">
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
                  <div class="linehight">Bench Set测试是否合格</div>
                  <a-radio-group :disabled="assemble_actuator_not_applicable" v-decorator="['valve_assemble_benchset_is_success', { } ]">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="2">
                      否
                    </a-radio>
                    <a-radio :value="3">
                      N/A
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item>
                  <div class="linehight">工时(min)</div>
                  <a-input-number
                    :disabled="assemble_actuator_not_applicable"
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
                    :disabled="assemble_actuator_not_applicable"
                    rows="6"
                    v-decorator="[
                      'actuator_assemble_content',
                      {rules: []}
                    ]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <!-- 执行人 -->
          <br>
          <a-card v-if="flowID" title="执行人" :headStyle="{fontWeight:'bold'}">
            <dispatchUser :disableAll="assemble_actuator_not_applicable" :flowID="flowID" :currentStep="currentStep" :flag="'2'" />
          </a-card>
          <!-- 文件上传 -->
          <br>
          <a-card title="上传照片" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
            <uploadImg ref="uploadImg2" :disableAll="assemble_actuator_not_applicable" :isMobile="isMobile" :queueType="'3'" :flag="'2'" />
          </a-card>
        </a-tab-pane>
      </a-tabs>

      <template v-if="isGetTearDownData">拆解数据为空或不适用，直接保存后结束流程</template>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <!-- 工单详细 -->
    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="currentStep" :flowId="flowID" />

  </page-header-wrapper>
</template>

<script>
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import pick from 'lodash.pick'
  import { stepDone, queryStepData, getValveCoverBoltTorqueUnit, getValveCoverBoltMaterialUnit, getValveSizeUnit,
  getValveSeatLeakTestUnit, getActuSpringSetPressureUnit, getActuCoverBoltToolItemUnit, getValveCoverBoltTorqueUnitText, getValveSizeUnitText,
  getActuCoverBoltToolItemUnitTextNA, getValveCoverBoltTorqueUnitTextNA, getValveSizeUnitTextNA, getActuInstallTravelUnit } from '@/api/step'
  import { saveAssembleData } from '@/api/assemble'
  import uploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import dispatchUser from '@/views/step/modules/DispatchUser'

  const assembleFields = ['assemble_valve_total_minute', 'assemble_actuator_total_minute', 'assemble_accessory_total_minute',
  'valve_assemble_content', 'actuator_assemble_content', 'accessory_assemble_content', 'valve_assemble_air_pressed', 'valve_assemble_air_pressed_unit',
  'valve_assemble_air_tightness_is_success', 'valve_assemble_benchset_is_success',
  'assemble_valve_not_applicable', 'assemble_actuator_not_applicable', 'not_applicable']

  export default {
    name: 'Assemble',
    mixins: [baseMixin],
    components: {
      FooterToolBar,
      uploadImg,
      stepDetail,
      stepAllDetailModel,
      dispatchUser
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
      getActuInstallTravelUnit,
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.not_applicable = this.not_applicable
            values.assemble_valve_not_applicable = this.assemble_valve_not_applicable
            values.assemble_actuator_not_applicable = this.assemble_actuator_not_applicable

            var tmpUpload = []
            // 阀门组装
            if (this.$refs.uploadImg1) {
              this.$refs.uploadImg1.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 执行机组装
            if (this.$refs.uploadImg2) {
              this.$refs.uploadImg2.imgFileList.forEach(e => {
                tmpUpload.push(e)
              })
            }
            values.uploads = tmpUpload

            saveAssembleData(values).then(res => {
              this.$message.info('保存成功')
              // eslint-disable-next-line no-undef
              callFlutterBacktoList.postMessage('save_step_ok') // 告诉移动端vue页面本流程已经保存成功
            })
          }
        })
      },
      cancelSubmit () {
        this.$router.back(-1)
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
      },
      refreshUploads () {
        queryStepData({ id: this.flowID, current_step: this.currentStep }).then(res => {
          if (res.result.step_data && res.result.step_data.length > 0) {
            const tmpData = JSON.parse(res.result.step_data[0].JSON)
            this.refreshImageList(tmpData.uploads)
            this.$message.info('上传照片成功')
          }
        })
      },
      getCurrentImgFlag () {
        return this.currentImgFlag
      },
      naChange (e) {
        this.not_applicable = e.target.checked
        if (this.not_applicable) {
          this.assemble_valve_not_applicable = true
          this.assemble_actuator_not_applicable = true
        } else {
          this.assemble_valve_not_applicable = false
          this.assemble_actuator_not_applicable = false
        }
      },
      tabChange (activeKey) {
        this.currentImgFlag = activeKey
      },
      valveNaChange (e) {
        this.assemble_valve_not_applicable = e.target.checked
        this.checkDiskableAll()
      },
      actuatorNaChange (e) {
        this.assemble_actuator_not_applicable = e.target.checked
        this.checkDiskableAll()
      },
      checkDiskableAll () {
        if (this.assemble_valve_not_applicable && this.assemble_actuator_not_applicable) {
          this.not_applicable = true
        } else {
          this.not_applicable = false
        }
      },
      refreshImageList (uploadFiles) {
        var imgList1 = []
        var imgList2 = []
        uploadFiles.forEach(e => {
          if (e.flag === '1') {
            imgList1.push(e)
          }
        })
        uploadFiles.forEach(e => {
          if (e.flag === '2') {
            imgList2.push(e)
          }
        })

        setTimeout(() => {
          assembleFields.forEach(v => this.form.getFieldDecorator(v))
          if (this.$refs.uploadImg1) {
            this.$refs.uploadImg1.imgFileList = imgList1
          }
          if (this.$refs.uploadImg2) {
            this.$refs.uploadImg2.imgFileList = imgList2
          }
        }, 0)
      }
    },
    mounted () {
      // 防止表单未注册
      assembleFields.forEach(v => this.form.getFieldDecorator(v))
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag
      var uploadFiles = null

      if (editData.step_data.length > 0) {
        uploadFiles = JSON.parse(editData.step_data[0].JSON)
        this.form.setFieldsValue(pick(uploadFiles, assembleFields))
        this.not_applicable = uploadFiles.not_applicable
      }

      // 根据拆解的工时》0的结果决定组装显示内容
      queryStepData({ id: this.flowID, current_step: 'TearDown' }).then(res => {
        if (!res.result.step_data || res.result.step_data.length <= 0) {
          this.isGetTearDownData = true
          return
        }
        this.tearDownData = JSON.parse(res.result.step_data[0].JSON)

        if (this.tearDownData.teardown_valve_not_applicable && this.tearDownData.teardown_valve_not_applicable) {
          this.valveAB = false
        }
        if (this.tearDownData.teardown_actuator_not_applicable && this.tearDownData.teardown_actuator_not_applicable) {
          this.actuatorAB = false
        }
        this.accessoryAB = false // this.tearDownData.teardown_accessory_total_minute && this.tearDownData.teardown_accessory_total_minute > 0

        if (!this.valveAB && !this.accessoryAB) {
          this.isGetTearDownData = true
        }

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

          if (uploadFiles !== null) {
            this.assemble_valve_not_applicable = uploadFiles.assemble_valve_not_applicable
            this.assemble_actuator_not_applicable = uploadFiles.assemble_actuator_not_applicable
            this.refreshImageList(uploadFiles.uploads)
          }
        })
      })
    },
    data () {
      return {
        form: this.$form.createForm(this),
        accessoryAB: true,
        actuatorAB: true,
        valveAB: true,
        flowID: '',
        currentStep: '',
        baseInfoData: null,
        stepDetailvisible: false,
        baseData: {},
        actuatorData: {},
        accessorData: {},
        tearDownData: {},
        isGetTearDownData: false,
        not_applicable: false,
        assemble_valve_not_applicable: false,
        assemble_actuator_not_applicable: false,
        currentImgFlag: '1'
      }
    }
  }
</script>

<style>

</style>
