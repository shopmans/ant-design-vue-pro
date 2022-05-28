<template>
  <div ref="farther">
    <page-header-wrapper style="position: fixed;z-index: 9;border-bottom: 1px solid #e8e8e8" :style="{width:fartherWidth}">
      <template slot="extra">
        <a-checkbox key="1" v-model="not_applicable" @change="naChange">
          不适用
        </a-checkbox>
      </template>
    </page-header-wrapper>
    <br>
    <br>
    <br>
    <br>
    <a-form @submit="handleSubmit" :form="form" class="form">
      <a-tabs default-active-key="1" @change="tabChange">
        <a-tab-pane key="1" tab="阀门拆解" :forceRender="true" v-if="ValveTD">
          <valveTearDown
            ref="valveTearDown"
            v-if="ValveTD"
            :flowID="flow_id"
            :currentStep="current_step"
            :disableAll="disableAll_1"
            :isMobile="isMobile"
            :isDone="isValveTDDone"
            @done="valveTDTabDone"
            @edit="editValveTDTab"
            @valveNa="valveNa" />
        </a-tab-pane>
        <a-tab-pane key="2" tab="执行机构拆解" :forceRender="true" v-if="ActuatorTD">
          <actuatorTearDown
            ref="actuatorTearDown"
            v-if="ActuatorTD"
            :flowID="flow_id"
            :currentStep="current_step"
            :disableAll="disableAll_2"
            :isMobile="isMobile"
            :isDone="isActuatorTDDone"
            @done="actuatorTDTabDone"
            @edit="editActuatorTDTab"
            @actuatorNa="actuatorNa" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="附件折解" :forceRender="true" v-if="AccessoryTD">
          <accessoryTearDown
            ref="accessoryTearDown"
            v-if="AccessoryTD"
            :flowID="flow_id"
            :currentStep="current_step"
            :disableAll="disableAll_3"
            :isMobile="isMobile"
            :isDone="isAccessoryTDDone"
            @done="accessoryTDTabDone"
            @edit="editAccessoryTDTab"
            @accessoryNa="accessoryNa" />
        </a-tab-pane>
      </a-tabs>
      <!-- 页脚 -->
      <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="cancelSubmit" v-if="!isMobile" >返回</a-button>
        <a-button style="margin-left: 38px" @click="handleStepDetail">{{ $t("menu.step.view") }}</a-button>
        <a-button style="margin-left: 8px" @click="handleStepDone">结束流程</a-button>
      </footer-tool-bar>
    </a-form>

    <stepAllDetailModel ref="stepAllDetailModel" :currenStep="current_step" :flowId="flow_id" />
  </div>
</template>

<script>
  import moment from 'moment'
  import FooterToolBar from '@/components/FooterToolbar'
  import { baseMixin } from '@/store/app-mixin'
  import { saveTearDown } from '@/api/tearDown'
  import accessoryTearDown from './AccessoryTearDown'
  import actuatorTearDown from './ActuatorTearDown'
  import valveTearDown from './ValveTearDown'
  import { stepDone, queryStepData } from '@/api/step'
  import pick from 'lodash.pick'
  import uploadImg from '../../modules/UploadImg'
  import stepDetail from '../../modules/StepBaseInfo'
  import stepAllDetailModel from '../../modules/StepAllDetailModel'

  const tearDonwFields = ['teardown_valve_total_minute', 'teardown_actuator_total_minute', 'teardown_accessory_total_minute',
  'teardown_valve_content', 'teardown_actuator_content', 'teardown_accessory_content', 'not_applicable', 'teardown_actuator_date',
  'teardown_valve_date', 'teardown_accessory_date', 'teardown_valve_not_applicable', 'teardown_actuator_not_applicable',
  'teardown_accessory_not_applicable']

  export default {
    name: 'TearDown',
    mixins: [baseMixin],
    components: {
      accessoryTearDown,
      actuatorTearDown,
      valveTearDown,
      FooterToolBar,
      baseMixin,
      uploadImg,
      stepDetail,
      stepAllDetailModel
    },
    data () {
      return {
        form: this.$form.createForm(this),
        AccessoryTD: false,
        ActuatorTD: false,
        ValveTD: false,
        flow_id: '',
        current_step: '',
        baseInfoData: null,
        showDispatchUser: false,
        not_applicable: false,
        baseInfo: {},
        valueNaValue: false,
        actuatorNaValue: false,
        accessoryNaValue: false,
        disableAll_1: false,
        disableAll_2: false,
        disableAll_3: false,
        currentImgFlag: '1',
        isValveTDDone: false,
        isActuatorTDDone: false,
        fartherWidth: '',
        isAccessoryTDDone: false
      }
    },
    watch: {
      fartherWidth: {
        handler (val) {
          this.fartherWidth = val
        }
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
            values.not_applicable = this.not_applicable
            values.teardown_valve_not_applicable = this.disableAll_1
            values.teardown_actuator_not_applicable = this.disableAll_2
            values.teardown_accessory_not_applicable = this.disableAll_3

            var tmpUpload = []
            // 阀门拆解
            if (this.$refs.valveTearDown) {
              this.$refs.valveTearDown.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 执行机构拆解
            if (this.$refs.actuatorTearDown) {
              this.$refs.actuatorTearDown.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            // 附件折解
            if (this.$refs.accessoryTearDown) {
              this.$refs.accessoryTearDown.getUploadImgData().forEach(e => {
                tmpUpload.push(e)
              })
            }
            values.uploads = tmpUpload
            values.is_valve_td_done = this.isValveTDDone
            values.is_actuator_td_done = this.isActuatorTDDone
            values.is_accessory_td_done = this.isAccessoryTDDone

            saveTearDown(values).then(res => {
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
      },
      refreshUploads () {
        queryStepData({ id: this.flow_id, current_step: this.current_step }).then(res => {
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
      valveNa (e) {
        this.disableAll_1 = e.target.checked
        this.checkDiskableAll()
      },
      actuatorNa (e) {
        this.disableAll_2 = e.target.checked
        this.checkDiskableAll()
      },
      accessoryNa (e) {
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
          tearDonwFields.forEach(v => this.form.getFieldDecorator(v))
          if (this.$refs.valveTearDown) {
            this.$refs.valveTearDown.setUploadImgData(imgList1)
          }
          if (this.$refs.actuatorTearDown) {
            console.log(imgList2)
            this.$refs.actuatorTearDown.setUploadImgData(imgList2)
          }
          if (this.$refs.accessoryTearDown) {
            this.$refs.accessoryTearDown.setUploadImgData(imgList3)
          }
        }, 0)
      },
      // tab 操作完成
      // 阀tab操作完成
      valveTDTabDone () { this.isValveTDDone = true },
      editValveTDTab () { this.isValveTDDone = false },
      actuatorTDTabDone () { this.isActuatorTDDone = true },
      editActuatorTDTab () { this.isActuatorTDDone = false },
      accessoryTDTabDone () { this.isAccessoryTDDone = true },
      editAccessoryTDTab () { this.isAccessoryTDDone = false }
    },
    mounted () {
      // 防止表单未注册
      tearDonwFields.forEach(v => this.form.getFieldDecorator(v))
      // 修改数据
      const editData = this.$store.state.editStepData.stepEditData
      this.flow_id = editData.flow_id
      this.current_step = editData.current_step
      this.showDispatchUser = true
      // 供flutter刷新上传文件列表
      window.refreshUploads = this.refreshUploads
      window.getCurrentImgFlag = this.getCurrentImgFlag

      // 获取引用数据（维修前测试选择的维修东东）
      queryStepData({ id: this.flow_id, current_step: '(start)' }).then(res => {
        res.result.step_data.forEach(stepItem => {
          switch (stepItem.DataNum) {
            case 1: // 基本信息
              this.baseInfo = JSON.parse(stepItem.JSON)
              break
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
            this.ValveTD = true
            break
          }
          case '2': { // 执行机构维修
            this.ActuatorTD = true
            break
          }
          case '3': { // 阀门+执行机构
            this.ValveTD = true
            this.ActuatorTD = true
            break
          }
          case '4': { // 阀门+执行机构+附件
            this.ValveTD = true
            this.ActuatorTD = true
            this.AccessoryTD = true
            break
          }
          case '6': { // 执行机构+附件
            this.AccessoryTest = true
            this.ActuatorTD = true
            break
          }
        }

        if (editData.step_data.length > 0) {
          const uploadFiles = JSON.parse(editData.step_data[0].JSON)
          // 初始化日期
          if (!uploadFiles.teardown_valve_date || uploadFiles.teardown_valve_date.indexOf('0001-') >= 0) {
            uploadFiles.teardown_valve_date = moment()
          }
          if (!uploadFiles.teardown_actuator_date || uploadFiles.teardown_actuator_date.indexOf('0001-') >= 0) {
            uploadFiles.teardown_actuator_date = moment()
          }
          if (!uploadFiles.teardown_accessory_date || uploadFiles.teardown_accessory_date.indexOf('0001-') >= 0) {
            uploadFiles.teardown_accessory_date = moment()
          }

          if (uploadFiles) {
            this.form.setFieldsValue(pick(uploadFiles, tearDonwFields))
            if (uploadFiles.not_applicable) {
              this.not_applicable = uploadFiles.not_applicable
            }
            if (uploadFiles.teardown_valve_not_applicable) {
              this.disableAll_1 = uploadFiles.teardown_valve_not_applicable
            }
            if (uploadFiles.teardown_actuator_not_applicable) {
              this.disableAll_2 = uploadFiles.teardown_actuator_not_applicable
            }
            if (uploadFiles.teardown_accessory_not_applicable) {
              this.disableAll_3 = uploadFiles.teardown_accessory_not_applicable
            }
            this.refreshImageList(uploadFiles.uploads)

            // tab操作完成
            if (uploadFiles.is_valve_td_done) {
              this.isValveTDDone = uploadFiles.is_valve_td_done
            }
            if (uploadFiles.is_actuator_td_done) {
              this.isActuatorTDDone = uploadFiles.is_actuator_td_done
            }
            if (uploadFiles.is_accessory_td_done) {
              this.isAccessoryTDDone = uploadFiles.is_accessory_td_done
            }
          }
        } else {
          this.form.setFieldsValue(pick({ teardown_valve_date: moment() }, tearDonwFields))
          this.form.setFieldsValue(pick({ teardown_actuator_date: moment() }, tearDonwFields))
          this.form.setFieldsValue(pick({ teardown_accessory_date: moment() }, tearDonwFields))
        }
      })
      this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
      window.onresize = () => {
        this.fartherWidth = this.$refs.farther.clientWidth + 50 + 'px'
      }
    }
  }
</script>

<style>

</style>
