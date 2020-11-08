
<template>
  <div v-if="showInModel">
    <a-modal
      :title="$t('menu.workOrder.repair.workOrderDetail')"
      :width="1024"
      :visible="visible"
      :maskClosable="false"
      @ok="cancel"
      @cancel="cancel"
    >
      <a-tabs :default-active-key="current_step" @change="stepTabChange">
        <a-tab-pane v-for="item in stepGlideList" :key="item.key" :tab="$t(item.tab)"/>
      </a-tabs>
      <div class="card-container">
        <a-spin :spinning="loading">
          <StepBaseInfo v-if="stepDetailSwitchMap['(start)'].switch" />
          <ReceiptInfo v-if="stepDetailSwitchMap['Receipt'].switch" />
          <IntoFactoryCheckInfo v-if="stepDetailSwitchMap['IntoFactoryCheck'].switch" />
          <PreRepairTestlInfo v-if="stepDetailSwitchMap['PreRepairTest'].switch" />
          <TearDownInfo v-if="stepDetailSwitchMap['TearDown'].switch" />
          <AssessmentInfo v-if="stepDetailSwitchMap['Assessment'].switch" />
          <RepairInfo v-if="stepDetailSwitchMap['Repair'].switch" />
          <AssembleInfo v-if="stepDetailSwitchMap['Assemble'].switch" />
          <InstallActuatorInfo v-if="stepDetailSwitchMap['InstallActuator'].switch" />
          <LeakPressureTestInfo v-if="stepDetailSwitchMap['LeakPressureTest'].switch" />
          <InstallSlaveInfo v-if="stepDetailSwitchMap['InstallSlave'].switch" />
          <AdjustInfo v-if="stepDetailSwitchMap['Adjust'].switch" />
          <FinalCheckInfo v-if="stepDetailSwitchMap['FinalCheck'].switch" />
          <LocatorIntoFactoryCheckInfo v-if="stepDetailSwitchMap['LocatorIntoFactoryCheck'].switch" />
          <LocatorPreRepairTestDetailInfo v-if="stepDetailSwitchMap['LocatorPreRepairTest'].switch" />
          <LocatorAssessmentInfo v-if="stepDetailSwitchMap['LocatorAssessment'].switch" />
          <LocatorRepairInfo v-if="stepDetailSwitchMap['LocatorRepair'].switch" />
          <LocatorAdjustInfo v-if="stepDetailSwitchMap['LocatorAdjust'].switch" />
        </a-spin>
      </div>
    </a-modal>
  </div>
  <div v-else>
    <a-tabs :default-active-key="current_step" @change="stepTabChange">
      <a-tab-pane v-for="item in stepGlideList" :key="item.key" :tab="$t(item.tab)"/>
    </a-tabs>
    <div class="card-container">
      <a-spin :spinning="loading">
        <StepBaseInfo v-if="stepDetailSwitchMap['(start)'].switch" />
        <ReceiptInfo v-if="stepDetailSwitchMap['Receipt'].switch" />
        <IntoFactoryCheckInfo v-if="stepDetailSwitchMap['IntoFactoryCheck'].switch" />
        <PreRepairTestlInfo v-if="stepDetailSwitchMap['PreRepairTest'].switch" />
        <TearDownInfo v-if="stepDetailSwitchMap['TearDown'].switch" />
        <AssessmentInfo v-if="stepDetailSwitchMap['Assessment'].switch" />
        <RepairInfo v-if="stepDetailSwitchMap['Repair'].switch" />
        <AssembleInfo v-if="stepDetailSwitchMap['Assemble'].switch" />
        <InstallActuatorInfo v-if="stepDetailSwitchMap['InstallActuator'].switch" />
        <LeakPressureTestInfo v-if="stepDetailSwitchMap['LeakPressureTest'].switch" />
        <InstallSlaveInfo v-if="stepDetailSwitchMap['InstallSlave'].switch" />
        <AdjustInfo v-if="stepDetailSwitchMap['Adjust'].switch" />
        <FinalCheckInfo v-if="stepDetailSwitchMap['FinalCheck'].switch" />
        <LocatorIntoFactoryCheckInfo v-if="stepDetailSwitchMap['LocatorIntoFactoryCheck'].switch" />
        <LocatorPreRepairTestDetailInfo v-if="stepDetailSwitchMap['LocatorPreRepairTest'].switch" />
        <LocatorAssessmentInfo v-if="stepDetailSwitchMap['LocatorAssessment'].switch" />
        <LocatorRepairInfo v-if="stepDetailSwitchMap['LocatorRepair'].switch" />
        <LocatorAdjustInfo v-if="stepDetailSwitchMap['LocatorAdjust'].switch" />
      </a-spin>
    </div>
  </div>
</template>

<script>
import { getFlowStepLog, getCurrentStepMap, getCurrentStepDetailSwitchMap, queryStepDataOnlyread } from '@/api/step'
import StepBaseInfo from './StepBaseInfo'
import ReceiptInfo from './ReceiptInfo'
import IntoFactoryCheckInfo from './IntoFactoryCheckInfo'
import PreRepairTestlInfo from './PreRepairTestDetailInfo'
import TearDownInfo from './TearDownInfo'
import AssessmentInfo from './AssessmentInfo'
import RepairInfo from './RepairInfo'
import AssembleInfo from './AssembleInfo'
import InstallActuatorInfo from './InstallActuatorInfo'
import LeakPressureTestInfo from './LeakPressureTestInfo'
import InstallSlaveInfo from './InstallSlaveInfo'
import AdjustInfo from './AdjustInfo'
import FinalCheckInfo from './FinalCheckInfo'
import LocatorIntoFactoryCheckInfo from './LocatorIntoFactoryCheckInfo'
import LocatorPreRepairTestDetailInfo from './LocatorPreRepairTestDetailInfo'
import LocatorAssessmentInfo from './LocatorAssessmentInfo'
import LocatorRepairInfo from './LocatorRepairInfo'
import LocatorAdjustInfo from './LocatorAdjustInfo'

export default {
    name: 'AllStepDetailDialog',
    props: {
      showInModel: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
          visible: false,
          loading: false,
          current_step: '(start)',
          flow_id: '',
          stepGlideList: [],
          flowList: [],
          stepDetailSwitchMap: getCurrentStepDetailSwitchMap(),
          currentStepMap: getCurrentStepMap()
        }
    },
    methods: {
      stepTabChange (activeKey) {
        this.loading = true
        queryStepDataOnlyread({ id: this.flow_id, current_step: activeKey }).then(res => {
          this.$store.commit('SET_STEP_EDIT_DATA', res.result)
          for (var a in this.stepDetailSwitchMap) {
            this.stepDetailSwitchMap[a].switch = false
          }
          if (res.result.step_data.length <= 0) {
            this.loading = false
            return
          }
          this.stepDetailSwitchMap[activeKey].switch = true
          this.loading = false
        }).catch(e => { this.loading = false })
      },
      showSetpDetailData (flowID, currentStep) {
        if (!flowID || !currentStep) {
          return
        }
        const that = this
        this.flow_id = flowID
        this.current_step = currentStep
        this.visible = true
        let noSaveData = false
        if (!this.$store.state.editStepData) {
          noSaveData = true
        } else if (!this.$store.state.editStepData.stepEditData.step_data || !this.$store.state.editStepData.stepEditData.step_data.length || this.$store.state.editStepData.stepEditData.step_data.length <= 0) {
          noSaveData = true
        }
        // 当前流程没有保存数据，显示出已保存数据的流程
        if (noSaveData) {
          getFlowStepLog({ FlowID: flowID }).then(e => {
            if (e.FlowStepLogs.length > 0) {
              that.stepGlideList.length = 0
              e.FlowStepLogs.forEach(e => {
                that.stepGlideList.push({
                  key: e.current_step,
                  tab: that.currentStepMap[e.current_step].text
                })
              })
              that.stepDetailSwitchMap[currentStep].switch = true
            }
          })
          return
        }

        const editData = this.$store.state.editStepData.stepEditData
        const hasData = editData.step_data.length > 0
        this.current_step = editData.current_step
        this.flow_id = editData.flow_id
        getFlowStepLog({ FlowID: editData.flow_id }).then(e => {
          if (e.FlowStepLogs.length > 0) {
            that.stepGlideList.length = 0
            e.FlowStepLogs.forEach(e => {
              that.stepGlideList.push({
                key: e.current_step,
                tab: that.currentStepMap[e.current_step].text
              })
            })
          }
        })
        if (hasData) {
          this.stepDetailSwitchMap[this.current_step].switch = true
        }
      },
      cancel () {
        for (var a in this.stepDetailSwitchMap) {
          this.stepDetailSwitchMap[a].switch = false
        }
        this.visible = false
        // this.$store.commit('SET_UPLOAD_MD5', [])
        // this.$store.commit('SET_STEP_EDIT_DATA', {})
        // this.$emit('cancel')
        // this.$destroy('AllStepDetailDialog')
      }
    },
    components: {
      StepBaseInfo,
      ReceiptInfo,
      IntoFactoryCheckInfo,
      PreRepairTestlInfo,
      TearDownInfo,
      AssessmentInfo,
      RepairInfo,
      AssembleInfo,
      InstallActuatorInfo,
      LeakPressureTestInfo,
      InstallSlaveInfo,
      AdjustInfo,
      FinalCheckInfo,
      LocatorIntoFactoryCheckInfo,
      LocatorPreRepairTestDetailInfo,
      LocatorAssessmentInfo,
      LocatorRepairInfo,
      LocatorAdjustInfo
    }
}
</script>

<style scope>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
