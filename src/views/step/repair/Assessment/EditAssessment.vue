<template>
  <page-header-wrapper>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-card>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="阀门评估" v-if="ValveAS" :forceRender="true">
            <ValveAssessment v-if="ValveAS" />
          </a-tab-pane>
          <a-tab-pane key="2" tab="执行机构评估" v-if="ActuatorAS" :forceRender="true">
            <ActuatorAssessment v-if="ActuatorAS" />
          </a-tab-pane>
          <a-tab-pane key="3" tab="附件功能测试" v-if="AccessoryAS" :forceRender="true">
            <AccessariesAssessment v-if="AccessoryAS" />
          </a-tab-pane>
        </a-tabs>
        <a-row class="form-row" :gutter="16">
          <a-col :span="24">
            <a-form-item>
              <div class="linehight">评估内容及结论</div>
              <a-textarea
                rows="6"
                v-decorator="[
                  'assessment_content',
                  {rules: []}
                ]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <br>

      <!-- 检测\维修 -->
      <a-card title="阀检测\维修" :headStyle="{fontWeight:'bold'}">
        <a-form-item>
          <a-radio-group @change="repairRadioChange" v-decorator="[ 'assessment_check_or_repair', {rules: [{ required: true, message: '请选择阀检测\\维修' }]} ]">
            <a-radio :value="1">检测</a-radio>
            <a-radio :value="2">维修</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-card>

      <br>

      <!-- 建议更换零部件清单 -->
      <a-card title="建议更换零部件清单" :headStyle="{fontWeight:'bold'}" :bodyStyle="{padding:'30px 30px'}">
        <a-row class="form-row" :gutter="16">
          <a-table
            :columns="columnsPurchased"
            :dataSource="dataPurchased"
            :pagination="false"
          >
            <template v-for="(col, i) in ['purchased_part_no', 'purchased_part_name', 'purchased_part_number', 'purchased_part_qty', 'purchased_part_key_number', 'purchased_part_memo']" :slot="col" slot-scope="text, record">
              <a-input
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
                    <a @click="saveRow(record)">添加</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                      <a>删除</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a @click="saveRow(record)">保存</a>
                    <a-divider type="vertical" />
                    <a @click="cancel(record.key)">取消</a>
                  </span>
                </template>
                <span v-else>
                  <a-popconfirm title="是否要删除此行？" @confirm="removeRow(record.key)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
              </template>
              <template v-else>
                无
              </template>
            </template>
          </a-table>
          <a-row>
            <template v-if="selectTest">
              <a-col :span="12"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
              <a-col :span="12"><div class="upload-no-inline-block"><a-upload accept=".xls,.xlsx" :before-upload="importExcel" :show-upload-list="false" className=".ant-upload.ant-upload-select"><a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus">Excel导入</a-button></a-upload></div></a-col>
            </template>
            <template v-else>
              <a-col :span="24"><a-button disabled style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newPartMember">新增部件</a-button></a-col>
            </template>
          </a-row>
        </a-row>
      </a-card>

      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit">取消</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">工单详细</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <br>

    <!-- 评估人员 -->
    <a-card title="评估人员" :headStyle="{fontWeight:'bold'}">
      <DispatchUser v-if="showDispatchUser" :flowID="flowID" :currentStep="currentStep" />
    </a-card>

    <br>

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
  import { getSelectRepairData } from '@/api/preRepairTest'
  import { saveAssessmentData } from '@/api/assessment'
  import AccessariesAssessment from './AccessariesAssessment'
  import ActuatorAssessment from './ActuatorAssessment'
  import ValveAssessment from './ValveAssessment'
  import DispatchUser from '../../modules/DispatchUser'
  import UploadImg from '../../modules/UploadImg'
  import { stepDone, getColumnsPurchased } from '@/api/step'
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
  'assessment_check_or_repair']

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
        dataPurchased: []
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
            values.uploads = this.$refs.uploadImg.imgFileList
            values.purchased_parts = this.dataPurchased

            saveAssessmentData(values).then(res => {
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
        const { key } = record
        const target = this.dataPurchased.find(item => item.key === key)
        target.editable = false
        target.isNew = false
      },
      removeRow (key) {
        const newData = this.dataPurchased.filter(item => item.key !== key)
        this.dataPurchased = newData
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
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
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
                // 件号属性是否存在
                if (!tmpDataObject[keyNumberPropName]) {
                  continue
                }

                for (var key of Object.keys(tmpDataObject)) {
                  const tmpValue = tmpDataObject[key]
                  tmpDataItem.push(tmpValue === 'undefined' ? '' : tmpValue)
                }
                tmpDataItemArray.push(tmpDataItem)
              }
              console.log(tmpDataItemArray)

              // 合并导入数据，以件号为key
              var keyIndex = 2 // 件号index
              tmpDataItemArray.forEach(item => {
                // 在已有备件数据中查找相同件号
                var isFind = false
                var findIndex = 0
                for (var i = 0; i < that.dataPurchased.length; i++) {
                  if (item[keyIndex] === that.dataPurchased[i].purchased_part_key_number) {
                    isFind = true
                    findIndex = i
                    break
                  }
                }

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
      }
    },
    mounted () {
      const editData = this.$store.state.editStepData.stepEditData
      this.flowID = editData.flow_id
      this.currentStep = editData.current_step
      this.showDispatchUser = true

      // 获取引用数据（维修前测试选择的维修东东）
      // 先选择了维修什么才需要评估
      getSelectRepairData({ FlowID: this.flowID }).then(res => {
        // 阀门 "1"
        // 执行机构 "2"
        // 阀门+执行机构 "3"
        // 阀门+执行机构+附件 "4"
        // 零部件 "5"
        // 执行机构+附件 "6"
        switch (res.select_repair) { // 与 baseInfo 选择的维修部件下拉列表一致
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

        this.$nextTick(() => {
          // 防止表单未注册
          assessmentFields.forEach(v => this.form.getFieldDecorator(v))

          if (editData.step_data.length > 0) {
            const assessmentData = JSON.parse(editData.step_data[0].JSON)
            if (assessmentData.purchased_parts) {
              this.dataPurchased = assessmentData.purchased_parts
            }
            this.form.setFieldsValue(pick(assessmentData, assessmentFields))
            this.$refs.uploadImg.imgFileList = assessmentData.uploads
            // this.repairRadioChangeImpl(this.form.getFieldsValue(['assessment_check_or_repair']).assessment_check_or_repair)
          }
        })
      })
    }
}
</script>

<style>

</style>
