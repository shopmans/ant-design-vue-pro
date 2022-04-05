<template>
  <page-header-wrapper>
    <template slot="extra">
      <a-checkbox key="1" v-model="not_applicable" @change="naChange">
        不适用
      </a-checkbox>
    </template>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card>
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="阀门评估" v-if="ValveAS" :forceRender="true">
            <ValveAssessment
              ref="valveAssessment"
              v-if="ValveAS"
              @valveNaChange="valveNaChange"
              :disableAll="disableAll_1"
              :isMobile="isMobile"
              :flowID="flowID"
              :currentStep="currentStep"
              :isDone="isValveAssessmentTabDone"
              @done="valveAssessmentTabDone"
              @edit="editValveAssessmentTab" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="执行机构评估" v-if="ActuatorAS" :forceRender="true">
            <ActuatorAssessment
              ref="actuatorAssessment"
              v-if="ActuatorAS"
              @actuatorNaChange="actuatorNaChange"
              :disableAll="disableAll_2"
              :isMobile="isMobile"
              :flowID="flowID"
              :currentStep="currentStep"
              :isDone="isActuatorASTabDone"
              @done="actuatorASTabDone"
              @edit="editActuatorASTab" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="附件评估" v-if="AccessoryAS" :forceRender="true">
            <AccessariesAssessment
              ref="accessariesAssessment"
              v-if="AccessoryAS"
              @accessariesNaChange="accessariesNaChange"
              :disableAll="disableAll_3"
              :isMobile="isMobile"
              :selectArea="selectArea"
              :otherSelectArea="otherSelectArea"
              :flowID="flowID"
              :currentStep="currentStep"
              :isDone="isAccessoryASTabDone"
              @done="accessoryASTabDone"
              @edit="editAccessoryASTab" />
          </a-tab-pane>
        </a-tabs>
      </a-card>

      <!-- 评估内容及结论 -->
      <br>
      <a-card title="评估内容及结论" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-form-item>
          <div class="linehight">评估内容及结论</div>
          <a-textarea
            :disabled="not_applicable"
            rows="6"
            v-decorator="[
              'assessment_content',
              {rules: []}
            ]" />
        </a-form-item>
      </a-card>

      <!-- 建议更换零部件清单 -->
      <br>
      <a-card title="建议更换零部件清单" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row class="form-row" :gutter="16">
          <a-table
            :disabled="not_applicable"
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_name', 'purchased_part_number', 'purchased_part_qty', 'purchased_part_key_number', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
              <a-input
                :disabled="not_applicable"
                :key="col"
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                :placeholder="columnsPurchased[i].title"
                @change="e => handleChange(e.target.value, record.key, col)"
              />
              <template v-else>{{ text }}</template>
            </template>
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <!--  ssssssssssssssssssssssssss -->
            <template slot="operation" slot-scope="record">
              <template v-if="selectTest">
                <template v-if="record.editable">
                  <span v-if="record.isNew">
                    <a :disabled="not_applicable" @click="saveRow(record)">添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm :disabled="not_applicable" title="是否要删除此行？" @confirm="removeRow(record.key)">
                      <a :disabled="not_applicable">删除</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a :disabled="not_applicable" @click="saveRow(record)">保存</a>
                  </span>
                </template>
                <span v-else>
                  <a-popconfirm :disabled="not_applicable" title="是否要删除此行？" @confirm="removeRow(record.key)">
                    <a :disabled="not_applicable">删除</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <a :disabled="not_applicable" @click="editRow(record)">编辑</a>
                </span>
              </template>
              <template v-else>
                无
              </template>
            </template>
          </a-table>
          <a-row>
            <template v-if="selectTest">
              <a-col :span="12"><a-button :disabled="not_applicable" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
              <a-col :span="12"><div class="upload-no-inline-block"><a-upload :disabled="not_applicable" accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" className=".ant-upload.ant-upload-select"><a-button :disabled="not_applicable" style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus">Excel导入</a-button></a-upload></div></a-col>
            </template>
            <template v-else>
              <a-col :span="24"><a-button
                disabled
                style="width: 100%; margin-top: 16px; margin-bottom: 8px"
                type="dashed"
                icon="plus"
                @click="newPartMember">新增部件</a-button></a-col>
            </template>
          </a-row>
        </a-row>
      </a-card>

      <br>

      <a-card title="工时" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row>
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="工时(min)">
              <a-input-number
                :disabled="not_applicable"
                style="width:100%;"
                :min="0"
                v-decorator="[
                  'work_time',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

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
  import { saveAssessmentData } from '@/api/assessment'
  import AccessariesAssessment from './AccessariesAssessment'
  import ActuatorAssessment from './ActuatorAssessment'
  import ValveAssessment from './ValveAssessment'
  import DispatchUser from '../../modules/DispatchUser'
  import UploadImg from '../../modules/UploadImg'
  import { stepDone, getColumnsPurchased, queryStepData } from '@/api/step'
  import pick from 'lodash.pick'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'
  import XLSX from 'xlsx'
  import { randomNum } from '@/api/utils'

  const assessmentFields = ['valve_body_state', 'valve_body_repair', 'valve_body_memo',
  'valve_flanges_state', 'valve_flanges_repair', 'valve_flanges_memo',
  'valve_bolting_state', 'valve_bolting_repair', 'valve_bolting_memo',
  'valve_gasket_surface_state', 'valve_gasket_surface_repair', 'valve_gasket_surface_memo',
  'valve_seat_area_state', 'valve_seat_area_repair', 'valve_seat_area_memo',
  'valve_bonnet_state', 'valve_bonnet_repair', 'valve_bonnet_memo',
  'valve_packing_box_state', 'valve_packing_box_repair', 'valve_packing_box_memo',
  'valve_plug_ball_disc_state', 'valve_plug_ball_disc_repair', 'valve_plug_ball_disc_memo',
  'valve_cage_guide_ret_state', 'valve_cage_guide_ret_repair', 'valve_cage_guide_ret_memo',
  'valve_seat_ring_state', 'valve_seat_ring_repair', 'valve_seat_ring_memo',
  'valve_stem_shaft_state', 'valve_stem_shaft_repair', 'valve_stem_shaft_memo',
  'valve_seal_piston_ring_state', 'valve_seal_piston_ring_repair', 'valve_seal_piston_ring_memo',
  'valve_bushing_bearing_state', 'valve_bushing_bearing_repair', 'valve_bushing_bearing_memo',
  'actuator_air_tightness_state', 'actuator_air_tightness_repair', 'actuator_air_tightness_memo',
  'actuator_clamp_oupling_state', 'actuator_clamp_oupling_repair', 'actuator_clamp_oupling_memo',
  'actuator_spring_state', 'actuator_spring_repair', 'actuator_spring_memo',
  'actuator_handwheel_state', 'actuator_handwheel_repair', 'actuator_handwheel_memo',
  'actuator_casing_tiston_state', 'actuator_casing_tiston_repair', 'actuator_casing_tiston_memo',
  'actuator_yoke_state', 'actuator_yoke_repair', 'actuator_yoke_memo',
  'actuator_stem_shaft_state', 'actuator_stem_shaft_repair', 'actuator_stem_shaft_memo',
  'actuator_diaphragm_state', 'actuator_diaphragm_repair', 'actuator_diaphragm_memo',
  'actuator_seals_orings_state', 'actuator_seals_orings_repair', 'actuator_seals_orings_memo',
  'actuator_bolting_state', 'actuator_bolting_repair', 'actuator_bolting_memo',
  'actuator_tagging_state', 'actuator_tagging_repair', 'actuator_tagging_memo',
  'accessaries_positioner_state', 'accessaries_positioner_repair', 'accessaries_positioner_memo',
  'accessaries_amplifier_state', 'accessaries_amplifier_repair', 'accessaries_amplifier_memo',
  'accessaries_feedback_state', 'accessaries_feedback_repair', 'accessaries_feedback_memo',
  'accessaries_pressure_gauge_state', 'accessaries_pressure_gauge_repair', 'accessaries_pressure_gauge_memo',
  'accessaries_airset_state', 'accessaries_airset_repair', 'accessaries_airset_memo',
  'accessaries_filter_state', 'accessaries_filter_repair', 'accessaries_filter_memo',
  'accessaries_solenoid_state', 'accessaries_solenoid_repair', 'accessaries_solenoid_memo',
  'accessaries_transmitter_state', 'accessaries_transmitter_repair', 'accessaries_transmitter_memo',
  'accessaries_ip_transducer_state', 'accessaries_ip_transducer_repair', 'accessaries_ip_transducer_memo',
  'accessaries_limitswitch_state', 'accessaries_limitswitch_repair', 'accessaries_limitswitch_memo',
  'accessaries_lockup_trip_valve_state', 'accessaries_lockup_trip_valve_repair', 'accessaries_lockup_trip_valve_memo',
  'accessaries_handwheel_state', 'accessaries_handwheel_repair', 'accessaries_handwheel_memo',
  'accessaries_bypass_valve_state', 'accessaries_bypass_valve_repair', 'accessaries_bypass_valve_memo',
  'accessaries_fittings_state', 'accessaries_fittings_repair', 'accessaries_fittings_memo',
  'accessaries_tubing_state', 'accessaries_tubing_repair', 'accessaries_tubing_memo', 'assessment_content',
  'assessment_check_or_repair', 'not_applicable', 'work_time',
  'actuator_cylinder_state', 'actuator_cylinder_repair', 'actuator_cylinder_memo',
  'actuator_bushing_state', 'actuator_bushing_repair', 'actuator_bushing_memo',
  'accessaries_pwb_state', 'accessaries_pwb_repair', 'accessaries_pwb_memo',
  'accessaries_housing_state', 'accessaries_housing_repair', 'accessaries_housing_memo',
  'accessaries_terminal_state', 'accessaries_terminal_repair', 'accessaries_terminal_memo',
  'accessaries_other_state', 'accessaries_other_repair', 'accessaries_other_memo',
  'actuator_state', 'actuator_repair', 'actuator_memo']

export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      AccessariesAssessment,
      ActuatorAssessment,
      ValveAssessment,
      DispatchUser,
      UploadImg,
      FooterToolBar,
      stepDetail,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        AccessoryAS: false,
        ActuatorAS: false,
        ValveAS: false,
        flowID: '',
        currentStep: '',
        showDispatchUser: false,
        baseInfoData: null,
        selectTest: true,
        columnsPurchased: getColumnsPurchased(),
        dataPurchased: [],
        not_applicable: false,
        selectArea: [],
        otherSelectArea: [],
        disableAll_1: false,
        disableAll_2: false,
        disableAll_3: false,
        currentImgFlag: '1',
        isValveAssessmentTabDone: false,
        isActuatorASTabDone: false,
        isAccessoryASTabDone: false
      }
    },
    methods: {
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            values.flow_id = this.flowID
            values.current_step = this.currentStep
            values.save_user_id = this.$store.state.user.info.id
            values.purchased_parts = this.dataPurchased
            values.not_applicable = this.not_applicable
            values.valve_not_applicable = this.disableAll_1
            values.actuator_not_applicable = this.disableAll_2
            values.accessaries_not_applicable = this.disableAll_3

            var tmpUpload = []
            // 阀门评估
            if (this.$refs.valveAssessment) {
              this.$refs.valveAssessment.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 执行机构评估
            if (this.$refs.actuatorAssessment) {
              this.$refs.actuatorAssessment.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 附件评估
            if (this.$refs.accessariesAssessment) {
              this.$refs.accessariesAssessment.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            values.uploads = tmpUpload
            // 标签操作完毕
            values.is_valve_assessment_tab_done = this.isValveAssessmentTabDone
            values.is_actuator_as_tab_done = this.isActuatorASTabDone
            values.is_accessory_as_tab_done = this.isAccessoryASTabDone

            saveAssessmentData(values).then(res => {
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
        // })
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
      repairRadioChange (e) {
        // this.repairRadioChangeImpl(e.target.value)
      },
      repairRadioChangeImpl (val) {
        if (val === 1) {
          if (this.dataPurchased) {
            this.dataPurchased.forEach(e => {
              e.editable = false
              e.isNew = false
            })
          }
          this.selectTest = true
        } else {
          this.selectTest = false
        }
      },
      handleChange (value, key, column) {
        const newData = [...this.dataPurchased]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.dataPurchased = newData
        }
      },
      saveRow (record) {
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = false
          target.isNew = false
          this.dataPurchased = editData
        }
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
      },
      editRow (record) {
        const editData = [...this.dataPurchased]
        const { key } = record
        const target = editData.find(item => item.key === key)
        if (target) {
          target.editable = true
          target.isNew = false
          this.dataPurchased = editData
        }
      },
      newPartMember () {
        const length = this.dataPurchased.length
        this.dataPurchased.push({
          key: length === 0 ? '1' : (parseInt(this.dataPurchased[length - 1].key) + 1).toString(),
          purchased_part_no: '',
          purchased_part_key_number: '',
          purchased_part_number: '',
          purchased_part_name: '',
          purchased_part_qty: '',
          purchased_part_memo: '',
          editable: true,
          isNew: true
        })
      },
      importExcel (file) {
        // console.log(file)
        this.readExcel(file)
        return false
      },
      readExcel (file) { // 表格导入
          var that = this

          if (file.length <= 0) { // 如果没有文件名
            return false
          }

          const fileReader = new FileReader()
          fileReader.onload = (ev) => {
            try {
              const data = ev.target.result
              const workbook = XLSX.read(data, {
                  type: 'binary'
              })
              const wsname = workbook.SheetNames[0] // 取第一张表
              const sheet2JSONOpts = {
                /** Default value for null/undefined values */
                defval: ''// 给defval赋值为空的字符串
              }
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], sheet2JSONOpts) // 生成json表格内容
              // console.log(ws)

              // 查找件号单元格并取得件号属性名称
              var keyNumberPropName = '' // 件号属性名称
              ws.forEach(wsItem => {
                for (var wsItemProp of Object.keys(wsItem)) {
                  if (wsItem[wsItemProp] === '零件号码') {
                    keyNumberPropName = wsItemProp
                    break
                  }
                }
              })
              if (keyNumberPropName.length !== 9) {
                this.$message.error('导入Excel文件没有找到“零件号码”单元格')
                return
              }

              var tmpDataItemArray = []
              for (let i = 9; i < ws.length; i++) {
                var tmpDataItem = []
                var tmpDataObject = ws[i]

                const col1 = tmpDataObject['__EMPTY']
                const col2 = tmpDataObject['__EMPTY_4']
                const col3 = tmpDataObject['__EMPTY_6']
                const col4 = tmpDataObject['__EMPTY_7']
                const col5 = tmpDataObject['__EMPTY_8']

                if (col1 || col2 || col3 || col4 || col5) {
                  tmpDataItem.push(i - 8)
                  tmpDataItem.push(col1)
                  tmpDataItem.push(col2)
                  tmpDataItem.push(col3)
                  tmpDataItem.push(col4)
                  tmpDataItem.push(col5)

                  tmpDataItemArray.push(tmpDataItem)
                }
              }

              // 合并导入数据，以件号为key
              // var keyIndex = 2 // 件号index
              tmpDataItemArray.forEach(item => {
                // 在已有备件数据中查找相同件号
                var isFind = false
                var findIndex = 0
                // for (var i = 0; i < that.dataPurchased.length; i++) {
                //   if (item[keyIndex] === that.dataPurchased[i].purchased_part_key_number) {
                //     isFind = true
                //     findIndex = i
                //     break
                //   }
                // }

                const memo = typeof item[5] === 'undefined' ? '' : item[5] + ''
                console.log(memo)
                if (isFind) {
                  that.dataPurchased[findIndex].purchased_part_key_number = item[4] + ''
                  that.dataPurchased[findIndex].purchased_part_number = item[2] + ''
                  that.dataPurchased[findIndex].purchased_part_name = item[1] + ''
                  that.dataPurchased[findIndex].purchased_part_qty = item[3] + ''
                  that.dataPurchased[findIndex].purchased_part_memo = memo
                } else {
                  that.dataPurchased.push({
                    key: randomNum(1000, 9999999) + '',
                    purchased_part_no: item[0] + '',
                    purchased_part_key_number: item[4] + '',
                    purchased_part_number: item[2] + '',
                    purchased_part_name: item[1] + '',
                    purchased_part_qty: item[3] + '',
                    purchased_part_memo: memo
                  })
                }
              })

              // console.log(that.dataPurchased)

              // that.peopleArr = [];//清空接收数据
              // if(that.peopleArr.length == 1 && that.peopleArr[0].roleName == "" && that.peopleArr[0].enLine == ""){
              //     that.peopleArr = [];
              // }
              // 重写数据
              // try {

              // } catch (err) {
              //     console.log(err)
              // }
            } catch (e) {
                return false
            }
          }
          fileReader.readAsBinaryString(file)
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
          this.disableAll_1 = true
          this.disableAll_2 = true
          this.disableAll_3 = true
        } else {
          this.disableAll_1 = false
          this.disableAll_2 = false
          this.disableAll_3 = false
        }
      },
      tabChange (activeKey) {
        this.currentImgFlag = activeKey
      },
      valveNaChange (e) {
        this.disableAll_1 = e.target.checked
        this.checkDiskableAll()
      },
      actuatorNaChange (e) {
        this.disableAll_2 = e.target.checked
        this.checkDiskableAll()
      },
      accessariesNaChange (e) {
        this.disableAll_3 = e.target.checked
        this.checkDiskableAll()
      },
      checkDiskableAll () {
        if (this.disableAll_1 && this.disableAll_2 && this.disableAll_3) {
          this.not_applicable = true
        } else {
          this.not_applicable = false
        }
      },
      refreshImageList (uploadFiles) {
        var imgList1 = []
        var imgList2 = []
        var imgList3 = []
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
        uploadFiles.forEach(e => {
          if (e.flag === '3') {
            imgList3.push(e)
          }
        })

        setTimeout(() => {
          assessmentFields.forEach(v => this.form.getFieldDecorator(v))
          if (this.$refs.valveAssessment) {
            this.$refs.valveAssessment.setUploadImgData(imgList1)
          }
          if (this.$refs.actuatorAssessment) {
            this.$refs.actuatorAssessment.setUploadImgData(imgList2)
          }
          if (this.$refs.accessariesAssessment) {
            this.$refs.accessariesAssessment.setUploadImgData(imgList3)
          }
        }, 0)
      },
      // 标签操作完毕
      valveAssessmentTabDone () { this.isValveAssessmentTabDone = true },
      editValveAssessmentTab () { this.isValveAssessmentTabDone = false },
      actuatorASTabDone () { this.isActuatorASTabDone = true },
      editActuatorASTab () { this.isActuatorASTabDone = false },
      accessoryASTabDone () { this.isAccessoryASTabDone = true },
      editAccessoryASTab () { this.isAccessoryASTabDone = false }
    },
    mounted () {
      const that = this
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      this.showDispatchUser = true
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag

      queryStepData({ id: this.flowID, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 1: { // 基本信息
              that.baseInfo = JSON.parse(stepItem.JSON)
              break
            }
            case 4: {
              const tmpData = JSON.parse(stepItem.JSON)
              this.selectArea = tmpData.other_slave_select_area
              this.otherSelectArea = tmpData.other_slave_target
              if (!this.selectArea) {
                this.selectArea = () => ([])
              }
            }
          }
        })

        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (this.baseInfo.repair_part) { // 与 baseInfo 选择的维修部件下拉列表一致
          case '1': { // 阀门维修
            this.ValveAS = true
            break
          }
          case '2': { // 执行机构维修
            this.ActuatorAS = true
            break
          }
          case '3': { // 阀门+执行机构
            this.ValveAS = true
            this.ActuatorAS = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.ValveAS = true
            this.ActuatorAS = true
            this.AccessoryAS = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryAS = true
            this.ActuatorAS = true
            break
          }
        }

        // 防止表单未注册
        assessmentFields.forEach(v => this.form.getFieldDecorator(v))

        if (editData.step_data.length > 0) {
          const assessmentData = JSON.parse(editData.step_data[0].JSON)
          if (assessmentData.purchased_parts && assessmentData.purchased_parts.length > 0) {
            this.dataPurchased = assessmentData.purchased_parts
          } else {
            // 加载收货时选中的项
            queryStepData({ id: this.flowID, current_step: 'Receipt' }).then(res => {
              const receiptData = JSON.parse(res.result.step_data[0].JSON)

              // 采购清单加checked属性
              that.baseInfo.valve_purchased_parts.forEach(v => {
                receiptData.receipt_parts.forEach(k => {
                  if (v.key === k.key && k.check) {
                    this.dataPurchased.push(v)
                  }
                })
              })
            })
          }
          if (assessmentData) {
            that.form.setFieldsValue(pick(assessmentData, assessmentFields))
            if (assessmentData.not_applicable) {
              that.not_applicable = assessmentData.not_applicable
            }
            if (assessmentData.valve_not_applicable) {
              this.disableAll_1 = assessmentData.valve_not_applicable
            }
            if (assessmentData.actuator_not_applicable) {
              this.disableAll_2 = assessmentData.actuator_not_applicable
            }
            if (assessmentData.accessaries_not_applicable) {
              this.disableAll_3 = assessmentData.accessaries_not_applicable
            }
            this.refreshImageList(assessmentData.uploads)

            // 标签操作完毕
            if (assessmentData.is_valve_assessment_tab_done) {
              this.isValveAssessmentTabDone = assessmentData.is_valve_assessment_tab_done
            }
            if (assessmentData.is_actuator_as_tab_done) {
              this.isActuatorASTabDone = assessmentData.is_actuator_as_tab_done
            }
            if (assessmentData.is_accessory_as_tab_done) {
              this.isAccessoryASTabDone = assessmentData.is_accessory_as_tab_done
            }
          }
          // this.repairRadioChangeImpl(this.form.getFieldsValue(['assessment_check_or_repair']).assessment_check_or_repair)
        }
      })
    }
}
</script>

<style>

</style>
